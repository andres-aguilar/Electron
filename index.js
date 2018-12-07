'use strict'

const { app, BrowserWindow } = require('electron')

app.on('before-quit', () => {
    console.log('Saliendo...')
})

app.on('ready', () => {
    // Crear una nueva ventana
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hola mundo',
        center: true,
        show: false
    })

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

    window.loadURL('https://devdocs.io/')
})
