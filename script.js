
const form = document.getElementById("form");
const insertShortenedUrl = document.getElementById("insert-shortened-url")


form.addEventListener('submit', function(e){
    e.preventDefault()
    shortenUrl()
})

function shortenUrl(){
    const inputElm = document.getElementById("shorten-text");
    const  encodedUrl = encodeURIComponent(inputElm.value)
    fetch(`https://is.gd/create.php?format=json&url=${encodedUrl}`)
         .then(res => res.json())
         .then(data => {
            console.log(data)
            let shortUrl = ''
            shortUrl  = `
                         <div class="shortened-url-container">
                             <p class="reduce-length"> ${inputElm.value} </p>
                             <hr/>
                             <p class="shortened-link">${data.shorturl}</p>
                             <button class="copy" data-id="copy">Copy</button>
                         </div>
            `
            console.log(shortUrl)
            localStorage.setItem("shortUrl", JSON.stringify(shortUrl))
            insertShortenedUrl.innerHTML = JSON.parse(localStorage.getItem("shortUrl"))
            shortUrl = JSON.parse(localStorage.getItem("shortUrl"))

        })
}

insertShortenedUrl.innerHTML = JSON.parse(localStorage.getItem("shortUrl"))


document.addEventListener('click', function(e){
    if(e.target.classList.contains('copy')){
        console.log(e.target.dataset)
    }
})
