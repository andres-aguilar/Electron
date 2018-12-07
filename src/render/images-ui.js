import url from 'url'
import path from 'path'

import applyFilter from './filters'

function addImagesEvents() {
    // Agregar eventos a cada imagen listada
    const thumbs = document.querySelectorAll('li.list-group-item')

    for (let i = 0, length1 = thumbs.length; i < length1; i++) {
        thumbs[i].addEventListener('click', function () {
            changeImage(this)
        })
    }
}

function changeImage(node) {
    // Cambiar la imagen mostrada
    if (node) {
        const selected = document.querySelector('li.selected')

        if (selected) {
            selected.classList.remove('selected')
        }

        node.classList.add('selected')

        document.getElementById('image-displayed').src = node.querySelector('img').src
    } else {
        document.getElementById('image-displayed').src = ''
    }
}

function selectFirstImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)')
    changeImage(image)
}

function searchImagesEvent() {
    const searchBox = document.getElementById('search-box')

    searchBox.addEventListener('keyup', function () {
        const regex = new RegExp(this.value.toLowerCase(), 'gi')

        const thumbs = document.querySelectorAll('li.list-group-item img')
        if (this.value.length > 0) {
            for (let i = 0, length1 = thumbs.length; i < length1; i++) {

                const fileUrl = url.parse(thumbs[i].src)
                const fileName = path.basename(fileUrl.pathname)

                if (fileName.match(regex)) {
                    thumbs[i].parentNode.classList.remove('hidden')
                } else {
                    thumbs[i].parentNode.classList.add('hidden')
                }
            }
            selectFirstImage()
        } else {
            for (let i = 0, length1 = thumbs.length; i < length1; i++) {
                thumbs[i].parentNode.classList.remove('hidden')
            }
        }
        addImagesEvents()
    })
}

function selectEvent() {
    const select = document.getElementById('filters')

    select.addEventListener('change', function () {
        console.log('Applying ' + this.value)
        applyFilter(this.value, document.getElementById('image-displayed'))
    })
}

function clearImages() {
    const oldImages = document.querySelectorAll('li.list-group-item')

    oldImages.forEach(image => {
        image.parentNode.removeChild(image)
    })
}

function loadImages(images) {
    const imagesList = document.querySelector('ul.list-group')

    images.forEach(image => {
        const template = `<li class="list-group-item">
                <img class="media-object pull-left" src="${image.src}" height="32">
                <div class="media-body">
                    <strong>${image.filename}</strong>
                    <p>size: ${image.size}</p>
                </div>
            </li>`

        imagesList.insertAdjacentHTML('beforeend', template)
    })
}

module.exports = {
    addImagesEvents,
    changeImage,
    selectFirstImage,
    searchImagesEvent,
    selectEvent,
    clearImages,
    loadImages
}