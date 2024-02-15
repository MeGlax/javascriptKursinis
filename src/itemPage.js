let itemId=localStorage.getItem('itemId')
let username=localStorage.getItem('username')
let deleteButton=document.getElementById('deleteButton')
let notThatGuy=document.getElementById('notThatGuy')
let closeNotThatGuy=document.getElementById('closeNotThatGuy')
let backButton=document.getElementById('backButton')

deleteButton.addEventListener('click', deleteCurrentItem)
closeNotThatGuy.addEventListener('click', ()=>{notThatGuy.classList.toggle('notThatGuyHide')})
backButton.addEventListener('click', ()=>{window.history.back()})


async function fetchAndDisplayItem () {
    let response = await fetch(`https://65c7734ae7c384aada6e8c82.mockapi.io/ads/${itemId}`)
    let data = await response.json()
    
    let itemImage=document.getElementById('itemImage')
    let itemTitle=document.getElementById('itemTitle')
    let itemDate=document.getElementById('itemDate')
    let itemDescription=document.getElementById('itemDescription')
    let itemPhoneNumber=document.getElementById('itemPhoneNumber')
    let itemPrice=document.getElementById('itemPrice')
    let itemUserInfo=document.getElementById('itemUserInfo')
    let itemCity=document.getElementById('itemCity')

    itemImage.src=data.image
    itemTitle.textContent=data.title
    itemDate.textContent=`ikeltas: ${data.date}`
    itemDescription.textContent=`Aprasymas: ${data.description}`
    itemPhoneNumber.textContent=`Tel.nr: ${data.phoneNumber}`
    itemPrice.textContent=`kaina: ${data.price}`
    itemUserInfo.textContent=`vartotojas: ${data.userInfo}`
    itemCity.textContent=`miestas: ${data.city}`
}
fetchAndDisplayItem()

async function deleteCurrentItem () {
    if(username==='admin') {
        const response = await fetch ( `https://65c7734ae7c384aada6e8c82.mockapi.io/ads/${itemId}`  , {
        method: 'DELETE'})
        let data = await response.json()
        if (data) {
            let deletedSuccessfuly=document.createElement('div')
            let deletedMessage=document.createElement('span')
            let deletedMessageTimeLeft=document.createElement('span')

            deletedMessage.textContent='istriniai. Grisi uz '
            deletedMessageTimeLeft.textContent='3'
            deletedMessageTimeLeft.style.textDecoration='underline'

            deletedSuccessfuly.classList.add('deletedSuccessfuly')
            document.body.prepend(deletedSuccessfuly)
            deletedSuccessfuly.append(deletedMessage)
            deletedSuccessfuly.append(deletedMessageTimeLeft)
            setTimeout(()=>{
                deletedMessageTimeLeft.textContent='2'
            }, 1000)
            setTimeout(()=>{
                deletedMessageTimeLeft.textContent='1'
            }, 2000)
            setTimeout(()=>{
                deletedMessageTimeLeft.textContent='0'
            }, 3000)
            setTimeout(()=>{
                window.location.href="index.html"
            }, 3500)
        }
    }
    else {
        notThatGuy.classList.toggle('notThatGuyHide')
    }
}
