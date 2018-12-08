import fs from 'fs'

function applyFilter(filter, image) {
    let imgObj = new Image()
    imgObj.src = image.src

    filterous.importImage(imgObj, {})
        .applyInstaFilter(filter)
        .renderHtml(image)
}

function saveImage(fileName) {
    let fileSrc = document.getElementById('image-displayed').src
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')

    fs.writeFile(fileName, fileSrc, 'base64', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = { applyFilter, saveImage }