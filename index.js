let counter = 13

main = document.getElementById("images")

function addImages() {
    for (let i = 0; i < 2; i++) {
        row = document.createElement("div")
        row.classList.add("row")

        for (let j = 0; j < 3; j++) {
            col = document.createElement("div")
            col.classList.add("col-sm", "text-center")
            img = document.createElement("img")
            img.classList.add("img-fluid", "img-thumbnail", "lazy")
            img.setAttribute("src", "https://picsum.photos/id/870/300/300?grayscale&blur=2")
            img.setAttribute("data-src", "https://picsum.photos/400/600?random" + counter)
            img.setAttribute("loading", "lazy")
            counter++
            col.append(img)
            row.append(col)
        }
        main.append(row)
    }
}

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

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
        addImages()
        console.log('Lazy loading...')
    }
    lazyLoad()
});

$(document).ready(lazyLoad);
