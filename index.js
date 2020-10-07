let counter = 13

main = document.getElementById("images")

// This function generates the rows of images to be added when we reach the end of webpage
function addImages() {
    for (let i = 0; i < 2; i++) {
        row = document.createElement("div")
        row.classList.add("row")

        for (let j = 0; j < 3; j++) {
            col = document.createElement("div")
            col.classList.add("col-sm", "text-center")
            img = document.createElement("img")
            img.classList.add("img-fluid", "img-thumbnail", "lazy")
            img.setAttribute("src", "https://picsum.photos/id/870/400/600?grayscale&blur=2")
            img.setAttribute("data-src", "https://picsum.photos/400/600?random" + counter)
            img.setAttribute("loading", "lazy")
            counter++
            col.append(img)
            row.append(col)
        }
        main.append(row)
    }
}

// Images are made to lazy-load using the IntersectionObserver API so that when the image comes into the view of the user,
// the image then loads up
function lazyLoad() {
    let lazyImages = document.querySelectorAll(".lazy")
    let imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Loading images...')
                let image = entry.target
                image.src = image.dataset.src
                image.classList.remove("lazy")
                imageObserver.unobserve(image)
            }
        })
    })

    lazyImages.forEach(image => {
        imageObserver.observe(image)
    })
}

// Whenever we scroll, the below event checks the sum of top of the windows position, the height of the window and 100
// & compares it with the document height so that when we're near the bottom it loads up the next set of images.
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
        addImages()
        console.log('Lazy loading...')
    }
    lazyLoad()
});

// When the document has been loaded and ready, we again add lazyload for images of first set as in mobiles we don't see all
// the images at the same time
$(document).ready(lazyLoad);
