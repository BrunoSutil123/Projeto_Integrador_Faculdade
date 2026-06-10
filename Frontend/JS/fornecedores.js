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

// ======================
// MODAL
// ======================

const modalFornecedor =
    document.getElementById("modalFornecedor");

const btnNovoFornecedor =
    document.getElementById("btnNovoFornecedor");

const btnFecharModal =
    document.getElementById("btnFecharModal");

const formFornecedor =
    document.getElementById("formFornecedor");

btnNovoFornecedor.addEventListener("click", () => {
    modalFornecedor.showModal();
});

btnFecharModal.addEventListener("click", () => {
    modalFornecedor.close();
});


// ======================
// DADOS
// ======================

const fornecedoresLista = [];


// ======================
// PAGINAÇÃO
// ======================

let paginaAtual = 1;

const itensPorPagina = 20;


// ======================
// RENDERIZAR FORNECEDORES
// ======================

function renderizarFornecedores() {

    const lista =
        document.getElementById("listaFornecedores");

    lista.innerHTML = "";

    const inicio =
        (paginaAtual - 1) * itensPorPagina;

    const fim =
        inicio + itensPorPagina;

    const fornecedoresPagina =
        fornecedoresLista.slice(inicio, fim);

    fornecedoresPagina.forEach(fornecedor => {

        lista.innerHTML += `

        <article class="fornecedor-item">

            <span>${fornecedor.nome}</span>

            <span>${fornecedor.cnpj}</span>

            <span>${fornecedor.telefone}</span>

            <button class="btn-editar">
                Editar
            </button>

        </article>

        `;

    });

    renderizarPaginacao();

}


// ======================
// PAGINAÇÃO
// ======================

function renderizarPaginacao() {

    const paginacao =
        document.querySelector(".paginacao");

    paginacao.innerHTML = "";

    const totalPaginas =
        Math.ceil(
            fornecedoresLista.length /
            itensPorPagina
        );

    if (paginaAtual > 1) {

        const btnAnterior =
            document.createElement("button");

        btnAnterior.textContent = "<";

        btnAnterior.classList.add("pagina");

        btnAnterior.addEventListener("click", () => {

            paginaAtual--;

            renderizarFornecedores();

        });

        paginacao.appendChild(btnAnterior);

    }

    for (let i = 1; i <= totalPaginas; i++) {

        const botao =
            document.createElement("button");

        botao.textContent = i;

        botao.classList.add("pagina");

        if (i === paginaAtual) {
            botao.classList.add("ativa");
        }

        botao.addEventListener("click", () => {

            paginaAtual = i;

            renderizarFornecedores();

        });

        paginacao.appendChild(botao);

    }

    if (paginaAtual < totalPaginas) {

        const btnProximo =
            document.createElement("button");

        btnProximo.textContent = ">";

        btnProximo.classList.add("pagina");

        btnProximo.addEventListener("click", () => {

            paginaAtual++;

            renderizarFornecedores();

        });

        paginacao.appendChild(btnProximo);

    }

}


// ======================
// CADASTRAR FORNECEDOR
// ======================

formFornecedor.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome =
        document.getElementById("nomeFornecedor").value;

    const cnpj =
        document.getElementById("cnpjFornecedor").value;

    const razaoSocial =
        document.getElementById("razaoFornecedor").value;

    const telefone =
        document.getElementById("telefoneFornecedor").value;

    const endereco =
        document.getElementById("enderecoFornecedor").value;


    const cnpjExiste =
        fornecedoresLista.some(fornecedor =>
            fornecedor.cnpj.trim() ===
            cnpj.trim()
        );

    if (cnpjExiste) {

        alert(
            "Já existe um fornecedor cadastrado com este CNPJ."
        );

        return;

    }

    fornecedoresLista.push({

        nome,
        cnpj,
        razaoSocial,
        telefone,
        endereco

    });

    paginaAtual =
        Math.ceil(
            fornecedoresLista.length /
            itensPorPagina
        );

    renderizarFornecedores();

    formFornecedor.reset();

    modalFornecedor.close();

});


// ======================
// INICIAR TELA
// ======================

renderizarFornecedores();