let sortSelect = document.getElementById('sortSelect')


async function fetchGenerateDisplayCards () {
    let response = await fetch("https://65c7734ae7c384aada6e8c82.mockapi.io/ads")
    let data = await response.json()
    let allCards=[]
    let whichPage=1
    let cardsPerPage=10
    let cardArrayPortion=[]



    sortSelect.addEventListener('change', createPagesAndSort)  // pakeitus skelbimų sortinim'ą refreshin'a puslapį


    function createPagesAndSort () {
        ///sortinimas
        if (sortSelect.value==="byPriceAscending")  {allCards=[...data].sort((a,b)=>a.price-b.price)}
        else if (sortSelect.value==="byPriceDescending") {allCards=[...data].sort((a,b)=>b.price-a.price)}
        else if (sortSelect.value==="byFavorites") {allCards=[...data].sort((a,b)=> (a.favorite===b.favorite) ? 0 : (a.favorite===false) ? 1 : -1 )}
        else {allCards=data}
        //sortinimas


        // favorites
        let favoritesArray=(localStorage.getItem('favorites')) ? localStorage.getItem('favorites').split(",") : []  // Iš local file'ų pasiema favorites ir sudeda į array
        allCards.forEach((arr)=>{  
            if (favoritesArray.some((num)=>{return num===arr.id})) {arr.favorite=true}  
        }) // tie skelbimai, kurių id sutampa su favoriteArray id, pasikeičia tarp objekto favorites iš false į true
        // favorites


        let pagesCount = Math.ceil(allCards.length/cardsPerPage)
        let allPagesList = []
        for (let i=1; i<=pagesCount; i++) {allPagesList.push(i)}
        let pageCountWrapper=document.getElementById('pageCountWrapper')  // gauna elementą, į kurį dės skaičius puslapio
        function sortToPages () {
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
        sortToPages()
    }
    createPagesAndSort()


    function displayCards () {
        let cardHolder = document.getElementById('cardHolder')
        cardHolder.innerHTML=""
        cardArrayPortion.forEach(arr => {
            let card = document.createElement('a')
            let cardImageWrapper = document.createElement('div')
            let favoriteIcon = document.createElement('button')
            let cardImage = document.createElement('img')
            let cardTitle = document.createElement('h4')
            let cardInfo = document.createElement('div')
            let cardPrice = document.createElement('p')
            let cardCity = document.createElement('p')
        
            card.classList.add('card')
            cardImageWrapper.classList.add('cardImageWrapper')
            cardImage.classList.add('cardImage')
            cardTitle.classList.add('cardTitle')
            cardInfo.classList.add('cardInfo')
            cardPrice.classList.add('cardPrice')
            cardCity.classList.add('cardCity')
            if(arr.favorite){favoriteIcon.classList.add('favoriteActive')}
            else{favoriteIcon.classList.add('favoriteInactive')}
        
            cardImage.src=arr.image
            card.href="../pages/itemPage.html"
            cardTitle.textContent=arr.title
            cardPrice.textContent=`${arr.price} eu`
            cardCity.textContent=arr.city
        
            cardHolder.append(card)
            card.append(cardImageWrapper)
            cardImageWrapper.append(favoriteIcon)
            cardImageWrapper.append(cardImage)
            card.append(cardTitle)
            card.append(cardInfo)
            cardInfo.append(cardPrice)
            cardInfo.append(cardCity)
    
            card.addEventListener('click', getId)
            function getId () {
                localStorage.setItem("itemId", arr.id)
            }

            favoriteIcon.addEventListener('click', (event)=>{
                event.preventDefault()
                if (arr.favorite) {
                    console.log(`title is ${arr.title}, id is ${arr.id}`)
                    let favoriteIdArray = localStorage.getItem("favorites").split(",")
                    console.log(favoriteIdArray)
                    let indexToDelete=favoriteIdArray.findIndex(num=>num===arr.id)
                    console.log(`index to delete is ${indexToDelete}`)
                    favoriteIdArray.splice(indexToDelete, 1)
                    console.log(favoriteIdArray)
                    localStorage.setItem("favorites", favoriteIdArray)
                    arr.favorite=false
                    createPagesAndSort()
                    return;
                }
                if (localStorage.getItem("favorites")) {
                    let currentFavoriteIdArray=localStorage.getItem("favorites").split(",")
                    let newFavoriteIdArray=[...currentFavoriteIdArray, arr.id]
                    localStorage.setItem("favorites", newFavoriteIdArray)
                    createPagesAndSort()
                }
                else {
                    let newFavoriteIdArray = [arr.id]
                    localStorage.setItem("favorites", newFavoriteIdArray)
                    createPagesAndSort()
                }
            })

        })
    }
}
fetchGenerateDisplayCards ()


// localStorag

// console.log(!!localStorage.getItem("favorites"))