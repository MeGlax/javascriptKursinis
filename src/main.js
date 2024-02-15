let sortSelect = document.getElementById('sortSelect')



async function fetchGenerateDisplayCards () {
    let response = await fetch("https://65c7734ae7c384aada6e8c82.mockapi.io/ads")
    let data = await response.json()

    let allCards=[]
    let whichPage=1
    let cardsPerPage=10
    let cardArrayPortion=[]



    sortSelect.addEventListener('change', createPagesAndSort)


    function createPagesAndSort () {
        if (sortSelect.value==="byPriceAscending")  {allCards=[...data].sort((a,b)=>a.price-b.price)}
        else if (sortSelect.value==="byPriceDescending") {allCards=[...data].sort((a,b)=>b.price-a.price)}
        else {allCards=data}    
        let pagesCount = Math.ceil(allCards.length/cardsPerPage)
        let allPagesList = []
        for (let i=1; i<=pagesCount; i++) {allPagesList.push(i)}
        let pageCountWrapper=document.getElementById('pageCountWrapper')  // gauna elementą, į kurį dės skaičius puslapio
        function brabra () {
            cardArrayPortion = []
            pageCountWrapper.innerHTML=''
            allPagesList.forEach((pageNumber)=>{
                if (pageNumber===whichPage) {
                    cardArrayPortion = []
                    cardArrayPortion.push(...allCards.slice( (pageNumber*cardsPerPage-cardsPerPage), (pageNumber*cardsPerPage) ))
                    let pageNumberElement=document.createElement('a')
                    pageNumberElement.classList.add('pageNumberClicked')
                    pageCountWrapper.append(pageNumberElement)
                    pageNumberElement.textContent=pageNumber
                    return;
                }
                let pageNumberElement=document.createElement('a')
                pageNumberElement.classList.add('pageNumbers')
                pageCountWrapper.append(pageNumberElement)
                pageNumberElement.textContent=pageNumber

                pageNumberElement.addEventListener('click', ()=>{
                    whichPage=pageNumber
                    createPagesAndSort()
                })
            })
            displayCards()
        }
        brabra()
    }
    createPagesAndSort()


    function displayCards () {
        let cardHolder = document.getElementById('cardHolder')
        cardHolder.innerHTML=""
        cardArrayPortion.forEach(arr => {
            let card = document.createElement('a')
            let cardImageWrapper = document.createElement('div')
            let favorite = document.createElement('button')
            let cardImage = document.createElement('img')
            let cardTitle = document.createElement('h4')
            let cardInfo = document.createElement('div')
            let cardPrice = document.createElement('p')
            let cardCity = document.createElement('p')
        
            card.classList.add('card')
            cardImageWrapper.classList.add('cardImageWrapper')
            favorite.classList.add('favorite')
            cardImage.classList.add('cardImage')
            cardTitle.classList.add('cardTitle')
            cardInfo.classList.add('cardInfo')
            cardPrice.classList.add('cardPrice')
            cardCity.classList.add('cardCity')
        
            cardImage.src=arr.image
            card.href="../pages/itemPage.html"
            cardTitle.textContent=arr.title
            cardPrice.textContent=`${arr.price} eu`
            cardCity.textContent=arr.city
        
            cardHolder.append(card)
            card.append(cardImageWrapper)
            cardImageWrapper.append(favorite)
            cardImageWrapper.append(cardImage)
            card.append(cardTitle)
            card.append(cardInfo)
            cardInfo.append(cardPrice)
            cardInfo.append(cardCity)
    
            card.addEventListener('click', getId)
            function getId () {
                localStorage.setItem("itemId", arr.id)
            }
        })
    }
}
fetchGenerateDisplayCards ()

