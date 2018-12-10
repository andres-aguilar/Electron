import fs from 'fs-extra'

function applyFilter(filter, image) {
    let imgObj = new Image()
    imgObj.src = image.src

    filterous.importImage(imgObj, {})
        .applyInstaFilter(filter)
        .renderHtml(image)
}

function saveImage(fileName, callback) {
    let fileSrc = document.getElementById('image-displayed').src

    if (fileSrc.indexOf('base64') != -1) {
        fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')
        fs.writeFile(fileName, fileSrc, 'base64', callback)
    } else {
        fileSrc  = fileSrc.replace('file://', '')
        fs.copy(fileSrc, fileName, callback)
    }

}

module.exports = { applyFilter, saveImage }