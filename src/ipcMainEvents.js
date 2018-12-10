import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import isImage from 'is-image'
import filesize from 'filesize'
import path from 'path'

function setMainIpc(window) {
    // Agregamos el eschador del evento ping
    ipcMain.on('open-directory', (event) => {
        console.log('LLegó el evento open-directory')
        // event.sender.send('pong', new Date())
        dialog.showOpenDialog(window, {
            title: 'Seleccione la ubicación',
            buttonLabel: 'Abrir ubicación',
            properties: ['openDirectory']
        }, (dir) => {
            let images = []
            if (dir) {
                fs.readdir(dir[0], (err, files) => {
                    if (err) throw err
    
                    files.forEach(file => {
                        if(isImage(file)) {
                            // Obtener el path al archivo
                            let imageFile = path.join(dir[0], file)
                            // Obtener los detalles del archivo
                            let stats = fs.statSync(imageFile)
                            // Convertir el tamaño en algo 'human friendly'
                            let size = filesize(stats.size, {round: 0})
    
                            // Agregar la imagen con toda la info que necesitamos
                            images.push({
                                filename: file, 
                                src: `file://${imageFile}`,
                                size: size
                            })
                        }
                    })
                    event.sender.send('load-images', images)
                })
            }
        })
    })
    
    ipcMain.on('open-save-dialog', (event, ext) => {
        console.log(ext.substr(1))
    
        dialog.showSaveDialog(window, {
            title: 'Guardar imagen',
            buttonLabel: 'Gardar imagen',
            filters: [{name: 'images', extensions: [ext.substr(1)]}]
        }, file => {
            if (file) {
                event.sender.send('save-image', file)
            }
        })
    })
    
    ipcMain.on('show-dialog', (event, info) => {
        dialog.showMessageBox(window, { 
            buttons:['OK'], 
            type: info.type, 
            title: info.title, 
            message: info.message
        })
    })
}


module.exports = setMainIpc