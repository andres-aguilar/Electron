import path from 'path'
import {ipcRenderer } from 'electron'
import { saveImage } from './filters'
import { loadImages, clearImages, addImagesEvents, selectFirstImage } from './images-ui'

function setIpc() {
    ipcRenderer.on('load-images', function(event, images) {
        clearImages()
        loadImages(images)
        addImagesEvents()
        selectFirstImage()
    })

    ipcRenderer.on('save-image', (event, file) => {
        saveImage(file, err => {
            if (err) {
                return showDialog('error', 'Patzipics', err.message)
            } else {
                return showDialog('info', 'Patzipics', 'imagen guardada')
            }
        })
    })
}

function saveFile() {
    const image = document.getElementById('image-displayed').dataset.original
    const ext = path.extname(image)

    ipcRenderer.send('open-save-dialog', ext)
}

function showDialog(type, title, message) {
    ipcRenderer.send('show-dialog', {type, title, message})
}

function openDirectory() {
    ipcRenderer.send('open-directory')
}

module.exports = {
    setIpc, openDirectory, saveFile
}