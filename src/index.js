'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

if (process.env.NODE_ENV == 'dev') {
    devtools()
}

app.on('before-quit', () => {
    console.log('Saliendo...')
})

app.on('ready', () => {
    // Crear una nueva ventana
    let window = new BrowserWindow({
        width: 800,
        height: 500,
        title: 'Hola mundo',
        center: true,
        show: false
    })

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
