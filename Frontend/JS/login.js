const form = document.getElementById("loginForm")

form.addEventListener("submit", function(event){

event.preventDefault()

const username = document.getElementById("username").value
const password = document.getElementById("password").value

//Login e senha
const usuarioCorreto = "admin"
const senhaCorreta = "123456"

if(username === usuarioCorreto && password === senhaCorreta){

alert("Login correto!")

window.location.href = "rec_senha.html"

}else{

alert("Usuário ou senha incorretos!!!")

}

})