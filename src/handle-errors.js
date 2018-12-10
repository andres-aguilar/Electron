import { app, dialog } from 'electron'

function setupErrors(window) {
    window.webContents.on('crashed', () => {
        relaunchApp(window)
    })

    window.on('unresponsive', () => {
        dialog.showMessageBox(window, { 
            buttons:['Esperar', 'Reiniciar'], 
            type: 'warning', 
            title: 'Platzipics', 
            message: 'La ventana no responde'
        }, () => {
            app.relaunch()
            app.exit(0)
        })
    })

    process.on('uncaughtException', (err)=> {
        relaunchApp(window)
    })
}

function relaunchApp(window) {
    dialog.showMessageBox(window, { 
        buttons:['OK'], 
        type: 'error', 
        title: 'Platzipics', 
        message: 'Ocurrió un error inesperado, se reiniciará la ventana'
    }, () => {
        app.relaunch()
        app.exit(0)
    })
}

module.exports = setupErrors