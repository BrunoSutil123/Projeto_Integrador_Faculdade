//Validar login...
const auth = localStorage.getItem("auth")
if (auth !== "true") {
    window.location.href = "login.html"
}
// Logout
const btnSair = document.getElementById("exitCount");
btnSair.addEventListener("click", function () {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
});


// Mudança de tema Escuro / Claro
let darkMode = localStorage.getItem('darkMode');

const mudancaTema = document.getElementById('mudancaTema');

const enabledarkMode = () => {
    document.body.classList.add('darkMode');
    localStorage.setItem('darkMode', 'active');
};

const disabledarkMode = () => {
    document.body.classList.remove('darkMode');
    localStorage.setItem('darkMode', null);
};

if (darkMode === "active") enabledarkMode();

mudancaTema.addEventListener("click", () => {
    darkMode = localStorage.getItem('darkMode');
    darkMode !== "active" ? enabledarkMode() : disabledarkMode();
});


// Username
const username = localStorage.getItem("username");
document.getElementById("user-name").textContent = username;


// Navbar hamburguer
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Permissões de menu
const role = localStorage.getItem("role");

const produtos     = document.getElementById("produtos");
const estoque      = document.getElementById("Estoque");
const vendas       = document.getElementById("vendas");
const clientes     = document.getElementById("clientes");
const fornecedores = document.getElementById("fornecedores");
const relatorios   = document.getElementById("relatorios");
const configuracoes = document.getElementById("configuracoes");

if (role === "vendedora") {
    fornecedores.style.display = "none";
    relatorios.style.display = "none";
    configuracoes.style.display = "none";
}


// ======================
// MODAL
// ======================

const modalCliente   = document.getElementById("modalCliente");
const btnNovoCliente = document.getElementById("btnNovoCliente");
const btnFecharModal = document.getElementById("btnFecharModal");
const formCliente    = document.getElementById("formCliente");

btnNovoCliente.addEventListener("click", () => {
    modalCliente.showModal();
});

btnFecharModal.addEventListener("click", () => {
    modalCliente.close();
});


// ======================
// DADOS
// ======================

const clientesLista = [];


// ======================
// PAGINAÇÃO
// ======================

let paginaAtual = 1;
const itensPorPagina = 20;


// ======================
// RENDERIZAR CLIENTES
// ======================

function renderizarClientes() {

    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim    = inicio + itensPorPagina;

    const clientesPagina = clientesLista.slice(inicio, fim);

    clientesPagina.forEach(cliente => {

        lista.innerHTML += `
            <article class="cliente-item">
                <span>${cliente.nome}</span>
                <span>${cliente.telefone}</span>
                <span class="email-cell">${cliente.email}</span>
            </article>
        `;

    });

    renderizarPaginacao();
}


// ======================
// RENDERIZAR PAGINAÇÃO
// ======================

function renderizarPaginacao() {

    const paginacao   = document.querySelector(".paginacao");
    paginacao.innerHTML = "";

    const totalPaginas = Math.ceil(clientesLista.length / itensPorPagina);

    if (paginaAtual > 1) {
        const btnAnterior = document.createElement("button");
        btnAnterior.textContent = "<";
        btnAnterior.classList.add("pagina");
        btnAnterior.addEventListener("click", () => {
            paginaAtual--;
            renderizarClientes();
        });
        paginacao.appendChild(btnAnterior);
    }

    for (let i = 1; i <= totalPaginas; i++) {
        const botao = document.createElement("button");
        botao.textContent = i;
        botao.classList.add("pagina");
        if (i === paginaAtual) botao.classList.add("ativa");
        botao.addEventListener("click", () => {
            paginaAtual = i;
            renderizarClientes();
        });
        paginacao.appendChild(botao);
    }

    if (paginaAtual < totalPaginas) {
        const btnProximo = document.createElement("button");
        btnProximo.textContent = ">";
        btnProximo.classList.add("pagina");
        btnProximo.addEventListener("click", () => {
            paginaAtual++;
            renderizarClientes();
        });
        paginacao.appendChild(btnProximo);
    }
}


// ======================
// BUSCA
// ======================

document.getElementById("buscarCliente").addEventListener("input", function () {
    const termo = this.value.toLowerCase().trim();
    const itens = document.querySelectorAll(".cliente-item");

    itens.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? "" : "none";
    });
});


// ======================
// CADASTRAR CLIENTE
// ======================

formCliente.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome     = document.getElementById("nomeCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const email    = document.getElementById("emailCliente").value.trim();

    const emailExiste = clientesLista.some(c =>
        c.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExiste) {
        alert("Já existe um cliente cadastrado com este e-mail.");
        return;
    }

    clientesLista.push({ nome, telefone, email });

    paginaAtual = Math.ceil(clientesLista.length / itensPorPagina);

    renderizarClientes();

    formCliente.reset();
    modalCliente.close();
});


// ======================
// INICIAR TELA
// ======================

renderizarClientes();
