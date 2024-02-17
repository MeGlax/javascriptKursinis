let form = document.getElementById('form')
let submit = document.getElementById('submit')
let redirectingText = document.getElementById('redirectingText')
let secondCount = document.getElementById('secondCount')
let submitErrorMessage = document.getElementById('submitErrorMessage')



async function addItem () {
    let addItemDate =`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    let addItemUsername = localStorage.getItem('username')
    let addItemTitle = document.getElementById('itemTitle').value
    let addItemImageLink = document.getElementById('itemImageLink').value
    let itemDescription = document.getElementById('itemDescription').value
    let addItemPhoneNumber = document.getElementById('itemPhoneNumber').value
    let addItemPrice = document.getElementById('itemPrice').value
    let addItemCity = document.getElementById('itemCity').value
    let newItemObject = {
        "title": addItemTitle,
        "date": addItemDate,
        "image": addItemImageLink,
        "description": itemDescription,
        "phoneNumber": parseInt(addItemPhoneNumber),
        "price": parseInt(addItemPrice),
        "userInfo": addItemUsername,
        "city": addItemCity
    }
    submitErrorMessage.textContent=''
    if (addItemTitle.length<4) {
        submitErrorMessage.textContent='Pavadinima turi sudaryti bent 4 simboliai'
        return;
    }
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(addItemImageLink)) {
        submitErrorMessage.textContent='Turi buti tinkama nuoroda'
        return;
    }
    if (itemDescription.length<4) {
        submitErrorMessage.textContent='Bent kazka parasyk apie preke'
        return;
    }
    console.log(addItemPhoneNumber)
    if (/\D/.test(addItemPhoneNumber) || addItemPhoneNumber.length<4) {
        submitErrorMessage.textContent='Turi buti numeris sudarytas tik is skaiciu'
        return;
    }
    if (/\D/.test(addItemPrice) || addItemPrice.length<1) {
        submitErrorMessage.textContent='Turi buti kaina sudaryta tik is skaiciu'
        return;
    }
    let response = await fetch("https://65c7734ae7c384aada6e8c82.mockapi.io/ads" ,{
        method: 'POST',
        headers: {
            "Accept": "application, json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItemObject)
    })
    let data = await response.json()
    if (data) {
        form.classList.add('formDropping')
        setTimeout (()=>{
            redirectingText.classList.add('showReddirectingText')
        },1000)
        setTimeout (()=>{
            secondCount.textContent='2'
        },2000)
        setTimeout (()=>{
            secondCount.textContent='1'
        },3000)
        setTimeout (()=>{
            window.location.href = "index.html"
        },3500)
    }
}
submit.addEventListener('click', addItem)

