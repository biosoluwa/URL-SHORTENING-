
const form = document.getElementById("form");
const insertShortenedUrl = document.getElementById("insert-shortened-url")

form.addEventListener('submit', function(e){
    e.preventDefault()
   const inputElm = document.getElementById("shorten-text");
   if (!inputElm.value){
    alert("Paste a link in the input field")
   }else{
    shortenUrl()
   }
})

function shortenUrl(){
    const inputElm = document.getElementById("shorten-text");
    const  encodedUrl = encodeURIComponent(inputElm.value)
    const existing = JSON.parse(localStorage.getItem("shortUrl"))
    fetch(`https://is.gd/create.php?format=json&url=${encodedUrl}`)
         .then(res => res.json())
         .then(data => {
            console.log(data)
            let shortUrl = ''
            shortUrl  = `
                         <div class="shortened-url-container">
                             <p class="reduce-length"> ${inputElm.value} </p>
                             <hr/>
                             <div>
                                <p class="shortened-link">${data.shorturl}</p>
                                <button class="copy" id="copy" data-copy="${data.shorturl}">Copy</button>
                             </div>
                        </div>
            `
            const updated = existing + shortUrl
            localStorage.setItem("shortUrl", JSON.stringify(updated))
            insertShortenedUrl.innerHTML += shortUrl
                inputElm.value = ''
        })
}

insertShortenedUrl.innerHTML = JSON.parse(localStorage.getItem("shortUrl"))


document.addEventListener('click', function(e){
    if(e.target.classList.contains('copy')){
        navigator.clipboard.writeText(e.target.dataset.copy)
             e.target.classList.add('copied')
              e.target.textContent = 'Copied!'
        setTimeout(function(){
                e.target.classList.remove('copied')
                e.target.textContent = 'Copy'
        }, 2000)
    }
})
