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

    //Login e senha
    const usuarioCorreto = "admin"
    const senhaCorreta = "123456"

    if (username === usuarioCorreto && password === senhaCorreta) {

        localStorage.setItem("auth", "true")
        localStorage.setItem("username", username);

        alert("Login correto!")

        window.location.href = "dashboard.html"

    } else {

        alert("Usuário ou senha incorretos!!!")

    }

})