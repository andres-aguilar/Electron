import fs from 'fs'

function applyFilter(filter, image) {
    let imgObj = new Image()
    imgObj.src = image.src

    filterous.importImage(imgObj, {})
        .applyInstaFilter(filter)
        .renderHtml(image)
}

function saveImage(fileName, callback) {
    let fileSrc = document.getElementById('image-displayed').src
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')

    fs.writeFile(fileName, fileSrc, 'base64', callback)
}

module.exports = { applyFilter, saveImage }