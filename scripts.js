
// HOMEPAGE LOADING 

let displayCard = (data) => {
    let carousel = document.querySelector('.carousel-inner')
    
    let carouselItem = document.createElement('div')
    carouselItem.className = `carousel-item`
    carouselItem.dataset.ride = `carousel`
    
    if (data.id === 1) {
        carouselItem.classList.add('active')
    }
    
    let carouselContent = document.createElement('div')
    carouselContent.className = `carousel-content d-md-flex text-center my-5 text-md-left align-items-center justify-content-center`
    
    let mainImage = document.createElement('img')
    mainImage.src = `${data.pic_url}`
    mainImage.className = `rounded-circle`
    mainImage.alt = 'Person carousel'
    
    let carouselContentText = document.createElement('div')
    carouselContentText.className = `carousel-content-text w-50 my-4 mx-auto m-md-0 ml-md-5`
    
    let paragraph = document.createElement('p')
    paragraph.className = `text-white content-text`
    paragraph.textContent = `${data.text}`
    
    let name = document.createElement('p')
    name.className = `text-white font-weight-bold`
    name.textContent = `${data.name}`
    
    let title = document.createElement('p')
    title.className = `text-white font-italic`
    title.textContent = `${data.title}`
    
    carouselContentText.append(paragraph, name, title)
    carouselContent.append(mainImage, carouselContentText)
    carouselItem.append(carouselContent)
    carousel.append(carouselItem)
}

const displayLoading = (loading) => {
    let list = document.querySelector('.section-main-carousel')
    let container = document.querySelector('.section-carousel')

    let loadContainer = document.createElement('div')
    loadContainer.className = 'load-container'
    let load = document.createElement('div')
    load.className = 'loader'

    loadContainer.append(load)
    
    if (loading) {
        container.style.display = 'none'
        list.prepend(loadContainer)

    } else {
        let loaded = document.querySelector('.load-container')
        list.removeChild(loaded)
        container.style.display = 'block'
    }
}

let getCard = async () => {

    displayLoading(true)

    let data = await fetch('https://smileschool-api.hbtn.info/quotes')
    let response = await data.json()

    return response
}

getCard()
    .then((res) => {
        displayLoading(false)
        res.forEach(item => displayCard(item))
    })
