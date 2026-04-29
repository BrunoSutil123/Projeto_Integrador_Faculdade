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


//Permições de menu ativas/desativadas
const role = localStorage.getItem("role");

// Elementos do menu
const produtos = document.getElementById("produtos");
const estoque = document.getElementById("Estoque");
const vendas = document.getElementById("vendas");
const clientes = document.getElementById("clientes");
const fornecedores = document.getElementById("fornecedores");
const relatorios = document.getElementById("relatorios");
const configuracoes = document.getElementById("configuracoes");

// Se for vendedora
if (role === "vendedora") {

    // Esconde o que ela NÃO pode acessar
    fornecedores.style.display = "none";
    relatorios.style.display = "none";
    configuracoes.style.display = "none";
}








//MAIN:

const lista = document.getElementById("listaProdutos");
const cadastro = document.getElementById("cadastroProduto");

const btnNovo = document.getElementById("btnNovoProduto");
const btnCancelar = document.getElementById("btnCancelar");

// Abrir cadastro
btnNovo.addEventListener("click", () => {
    lista.style.display = "none";
    cadastro.style.display = "block";
});

// Voltar pra lista
btnCancelar.addEventListener("click", () => {
    cadastro.style.display = "none";
    lista.style.display = "block";
});

//dados fake
let produtosLista = [
    { nome: "Brinco Ouro", sku: "1-001", unidade: "Unid.", preco: 15.90, estoque: 3 },
    { nome: "Colar Prata", sku: "1-002", unidade: "Unid.", preco: 25.90, estoque: 5 },
];



//renderizar tabela
function renderizarProdutos() {
    const tbody = document.getElementById("tbodyProdutos");
    tbody.innerHTML = "";

    produtosLista.forEach(prod => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td data-label="Nome">${prod.nome}</td>
            <td data-label="SKU">${prod.sku}</td>
            <td data-label="Unidade">${prod.unidade}</td>
            <td data-label="Preço">R$ ${prod.preco}</td>
            <td data-label="Estoque">${prod.estoque}</td>
        `;

        tbody.appendChild(tr);
    });
}

renderizarProdutos();


//salvar novo produto
const form = document.getElementById("formProduto");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const novoProduto = {
        nome: document.getElementById("nomeProduto").value,
        sku: document.getElementById("sku").value,
        unidade: document.getElementById("unidade").value,
        preco: document.getElementById("preco").value,
        estoque: document.getElementById("estoque").value
    };

    produtosLista.push(novoProduto);

    renderizarProdutos();

    form.reset();

    cadastro.style.display = "none";
    lista.style.display = "block";
});