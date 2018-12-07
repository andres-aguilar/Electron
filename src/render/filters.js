function applyFilter(filter, image) {
    let imgObj = new Image()
    imgObj.src = image.src

    filterous.importImage(imgObj, {})
        .applyInstaFilter(filter)
        .renderHtml(image)
}

module.exports = applyFilter