'use strict'

const { app, BrowserWindow } = require('electron')

app.on('before-quit', () => {
    console.log('Saliendo...')
})

app.on('ready', () => {
    let window = new BrowserWindow()

    window.on('colsed', () => {
        window = null
        app.quit()
    })
})
