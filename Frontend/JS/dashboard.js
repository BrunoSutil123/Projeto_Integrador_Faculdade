//Validar login...
const auth = localStorage.getItem("auth")
if (auth !== "true") {
    window.location.href = "login.html"
}

//Logout...
const btnSair = document.getElementById("exitCount");
btnSair.addEventListener("click", function () {
    localStorage.removeItem("auth") // remove a sessão

    window.location.href = "login.html" // volta pro login
});


//Mudança de tema Escuro / Claro...
let darkMode = localStorage.getItem('darkMode')

const mudancaTema = document.getElementById('mudancaTema')

const enabledarkMode = () => {
    document.body.classList.add('darkMode')
    localStorage.setItem('darkMode', 'active')
}


const disabledarkMode = () => {
    document.body.classList.remove('darkMode')
    localStorage.setItem('darkMode', null)
}


if (darkMode === "active") enabledarkMode()

mudancaTema.addEventListener("click", () => {
    darkMode = localStorage.getItem('darkMode')
    darkMode !== "active" ? enabledarkMode() : disabledarkMode()
})


//Username Login..
const username = localStorage.getItem("username");

document.getElementById("user-name").textContent = username;


//Ativar navbar Hamburguer click...
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

