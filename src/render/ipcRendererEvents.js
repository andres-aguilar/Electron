import {ipcRenderer } from 'electron'

import { loadImages, clearImages, addImagesEvents, selectFirstImage } from './images-ui'

function setIpc() {
    ipcRenderer.on('load-images', function(event, images) {
        clearImages()
        loadImages(images)
        addImagesEvents()
        selectFirstImage()
    })
}

function openDirectory() {
    ipcRenderer.send('open-directory')
}

module.exports = {
    setIpc, openDirectory
}