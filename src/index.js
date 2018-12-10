'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import fs from 'fs'
import isImage from 'is-image'
import filesize from 'filesize'
import path from 'path'
import devtools from './devtools'

import handleErrors from './handle-errors'

if (process.env.NODE_ENV == 'dev') {
    devtools()
}

app.on('before-quit', () => { console.log('Saliendo...')})

let window

app.on('ready', () => {
    // Crear una nueva ventana
    window = new BrowserWindow({
        width: 800,
        height: 500,
        title: 'Hola mundo',
        center: true,
        show: false
    })

    handleErrors(window)

    // Mostrar la ventana cuando ya esté lista para mostrarse
    window.once('ready-to-show', () => {
        window.show()
    })

    // Escuchar el evento de mover la ventana
    window.on('move', () => {
        const position = window.getPosition()
        // console.log(`La posición de la ventana es: ${position}`)
    })

    // Escuchar el evento de cerrar la ventana
    window.on('colsed', () => {
        window = null
        app.quit()
    })

    // Cargar el archivo index.html local
    window.loadURL(`file://${__dirname}/render/index.html`)
    //window.loadURL('https://devdocs.io')

    // Activar las devtools
    //window.toggleDevTools()
})

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