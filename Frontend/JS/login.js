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
    if (username === "admin" && password === "123456") {

        localStorage.setItem("auth", "true")
        localStorage.setItem("username", username)
        localStorage.setItem("role", "admin")

        window.location.href = "dashboard.html"

    } else if (username === "vendedora" && password === "123456") {

        localStorage.setItem("auth", "true")
        localStorage.setItem("username", username)
        localStorage.setItem("role", "vendedora")

        window.location.href = "dashboard.html"

    } else {
        alert("Usuário ou senha incorretos!")
    }

})