//Mudança de tema escuro / claro:

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



//Sistema de Login:

const form = document.getElementById("loginForm")

form.addEventListener("submit", function (event) {

    event.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Simulação de usuários
    if (username === "ana" && password === "123") {
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "vendedora");
        localStorage.setItem("username", "Ana");
        window.location.href = "dashboard.html";
    }

    else if (username === "fernanda" && password === "123") {
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "vendedora");
        localStorage.setItem("username", "Fernanda");
        window.location.href = "dashboard.html";
    }

    else if (username === "admin" && password === "123") {
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", "Administrador");
        window.location.href = "dashboard.html";
    } else {
        alert("Usuário ou senha incorretos!")
    }

})