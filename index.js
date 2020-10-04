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
            img.classList.add("img-fluid", "img-thumbnail")
            img.setAttribute("src", "https://picsum.photos/400/600?random" + counter)
            img.setAttribute("loading", "lazy")
            counter++
            col.append(img)
            row.append(col)
        }
        main.append(row)
    }
}

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
        addImages()
        console.log('Lazy loading...')
    }
});
