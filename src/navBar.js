function createNavBar () {
    let navBar = document.createElement('nav')
    let navBarContent = document.createElement('div')
    let navBarContentLeft = document.createElement('div')
        let addAdText = document.createElement('p')
        let addAdPlusImg = document.createElement('a')
    let navBarContentMiddle = document.createElement('div')
        let logoWrapper = document.createElement('a')
            let logo = document.createElement('img')
        let searchWrapper = document.createElement('div')
            let searchInput = document.createElement('input')
            let searchButton = document.createElement('button')
    let navBarContentRight = document.createElement('div')
        let isLoggedInImg = document.createElement('img')
        let isNotLoggedInImg = document.createElement('img')
        let loginRegisterButton = document.createElement('button')
        let navUsername = document.createElement('p')
        let logoutButton = document.createElement('button')

    navBar.classList.add('navBar')
    navBarContent.classList.add('navBarContent','container')
    navBarContentLeft.classList.add('navBarContentLeft')
        addAdText.classList.add('addAdText')
        addAdPlusImg.classList.add('addAdPlusImg')
    navBarContentMiddle.classList.add('navBarContentMiddle')
        logoWrapper.classList.add('logoWrapper')
            logo.classList.add('logo')
        searchWrapper.classList.add('searchWrapper')
            searchInput.id='searchInput'
            searchButton.id='searchButton'
    navBarContentRight.classList.add('navBarContentRight')
        isLoggedInImg.classList.add('loginImg')
        isNotLoggedInImg.classList.add('loginImg')
        loginRegisterButton.classList.add('navButtons')
        logoutButton.classList.add('navButtons')
        navUsername.classList.add('navUsername')
        
        searchButton.addEventListener('click', ()=>{
            if (!window.location.pathname.includes("pages/index.html"))  {
                window.location.href="index.html"
            }
        })

    addAdText.textContent='prideti'
    addAdPlusImg.href='../pages/addItem.html'

    logoWrapper.href="../pages/index.html"
    logo.src="../images/logo.png"

    isLoggedInImg.src="../images/onlineUser.svg"
    isNotLoggedInImg.src="../images/offlineUser.svg"
    loginRegisterButton.textContent="Prisijungti/Registruotis"
    logoutButton.textContent='Atsijungti'
    navUsername.textContent=localStorage.getItem("username")

    document.body.prepend(navBar)
    navBar.prepend(navBarContent)
    navBarContent.append(navBarContentLeft)
        navBarContentLeft.append(addAdText)
        navBarContentLeft.append(addAdPlusImg)
    navBarContent.append(navBarContentMiddle)
        navBarContentMiddle.append(logoWrapper)
        logoWrapper.append(logo)
        navBarContentMiddle.append(searchWrapper)
            searchWrapper.append(searchInput)
            searchWrapper.append(searchButton)
    navBarContent.append(navBarContentRight)

    // LOGIN IR REGISTER promptas

    let loginRegisterPrompt = document.createElement('div')
    let usernameInput = document.createElement('input')
    let passwordInput = document.createElement('input')
    let loginRegisterSubmitButton = document.createElement('button')
    let closeLoginRegister = document.createElement('button')
    let loginRegisterErrorMessage = document.createElement('p')

    loginRegisterPrompt.classList.add('loginRegisterPrompt')
    usernameInput.classList.add('loginRegisterInput')
    passwordInput.classList.add('loginRegisterInput')
    loginRegisterSubmitButton.classList.add('loginRegisterSubmitButton')
    closeLoginRegister.classList.add('closeLoginRegister')
    loginRegisterErrorMessage.classList.add('loginRegisterErrorMessage')

    usernameInput.placeholder='vartotojo vardas'
    passwordInput.placeholder='slaptazodis'
    passwordInput.type='password'
    loginRegisterSubmitButton.textContent='Prisijungt/registruotis'

    document.body.prepend(loginRegisterPrompt)
    loginRegisterPrompt.append(closeLoginRegister)
    loginRegisterPrompt.append(usernameInput)
    loginRegisterPrompt.append(passwordInput)
    loginRegisterPrompt.append(loginRegisterErrorMessage)
    loginRegisterPrompt.append(loginRegisterSubmitButton)


    closeLoginRegister.addEventListener('click', toggleLogout)
    loginRegisterButton.addEventListener('click', toggleLogout)
    function toggleLogout () {loginRegisterPrompt.classList.toggle('loginRegisterPromptHideShow')}


    loginRegisterSubmitButton.addEventListener('click', reigsterLoginAccount)
    async function reigsterLoginAccount () {
        if (usernameInput.value.length<4) {
            return loginRegisterErrorMessage.textContent="username must contain at least 5 characters"
        }
        if (passwordInput.value.length<4) {
            return loginRegisterErrorMessage.textContent="password must contain at least 5 characters"
        }
        let response = await fetch `https://65c7734ae7c384aada6e8c82.mockapi.io/users`
        let data = await response.json()
        console.log(usernameInput.value.toLocaleLowerCase())
        console.log(passwordInput.value.toLocaleLowerCase())

        let usernameIsTaken = data.find(arr=>arr.username===usernameInput.value.toLocaleLowerCase())
        if (!usernameIsTaken) {
            createAccount()
            async function createAccount () {
                let newUserInfo = {
                    username: usernameInput.value.toLocaleLowerCase(),
                    password: passwordInput.value.toLocaleLowerCase()
                }
                let response = await fetch (`https://65c7734ae7c384aada6e8c82.mockapi.io/users`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUserInfo)
                })
                const success = await response.json()
                if (success) {
                    localStorage.setItem("username", usernameInput.value.toLocaleLowerCase())
                    localStorage.setItem("password", passwordInput.value.toLocaleLowerCase())
                    window.location.reload()
                }
            }
        }
        else {
            if (usernameIsTaken.password===passwordInput.value.toLocaleLowerCase()) {
                localStorage.setItem("username", usernameInput.value.toLocaleLowerCase())
                localStorage.setItem("password", passwordInput.value.toLocaleLowerCase())
                window.location.reload()
            }
            else {
                loginRegisterErrorMessage.textContent="Password is incorrect"
            }
        }
    }


    if (localStorage.getItem('username')) {
        navBarContentRight.append(isLoggedInImg)
        navBarContentRight.append(navUsername)
        navBarContentRight.append('/')
        navBarContentRight.append(logoutButton)
    }
    else {
        navBarContentRight.append(isNotLoggedInImg)
        navBarContentRight.append(loginRegisterButton)
    }

    logoutButton.addEventListener('click', accountLogout)
    function accountLogout () {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        window.location.reload()
    }
}
createNavBar ()
