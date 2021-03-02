class UI {
    constructor() {
        this.loader = document.querySelector('.load-container')
        this.testimonialsCarousel = document.querySelector('#carouselExampleControls')
        this.testimonialsInner = document.querySelector('.carousel-inner')
    }

    showTestimonials(testimonials) {
        testimonials.forEach((testimonial) => {
            let carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item')
    
            carouselItem.innerHTML = `
            <div class="carousel-content d-md-flex text-center my-5 text-md-left align-items-center justify-content-center">
                <img src="${testimonial.pic_url}" class="rounded-circle" alt="Person carousel">
                <div class="carousel-content-text w-50 my-4 mx-auto m-md-0 ml-md-5">
                    <p class="text-white content-text">${testimonial.text}</p>
                    <p class="text-white font-weight-bold">${testimonial.name}</p>
                    <p class="text-white font-italic">${testimonial.title}</p>
                </div>
            </div>
            `
            this.testimonialsInner.append(carouselItem)
        })
        console.log(this.testimonialsInner)
        this.testimonialsInner.children[0].classList.add('active')
        this.loader.classList.add('d-none')
        this.testimonialsCarousel.classList.remove('d-none')
    }
}

class SmileSchool {
    async getTestimonials () {
        let data = await fetch('https://smileschool-api.hbtn.info/quotes')
        let response = await data.json()
        return response
    }
}

const App = (function () {

    let ui, smileschool

    //Determine which page user is on
    function render() {
        const view = document.querySelector('body').id

        //Instantiate UI and API controllers
        ui = new UI()
        smileschool = new SmileSchool()

        //populate page
        paint(view)
    }

    function paint(view) {
        if (view === 'homepage') {
            //fetch testimonials from API
            smileschool.getTestimonials()
                .then(data => {
                    ui.showTestimonials(data)
                })
        }
    }
    return {render}
})()

// start rendering content on page load
document.addEventListener('load', App.render())
