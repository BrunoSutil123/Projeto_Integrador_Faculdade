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

const modalProduto =
    document.getElementById("modalProduto");

const btnNovoProduto =
    document.getElementById("btnNovoProduto");

const btnFecharModal =
    document.getElementById("btnFecharModal");

const formProduto =
    document.getElementById("formProduto");

btnNovoProduto.addEventListener("click", () => {
    modalProduto.showModal();
});

btnFecharModal.addEventListener("click", () => {
    modalProduto.close();
});


// ======================
// DADOS
// ======================

const produtosLista = [

    {
        nome: "Brinco Ouro",
        sku: "1-001",
        unidade: "Unid.",
        preco: "R$ 15,00",
        estoque: 3
    },

    {
        nome: "Colar Prata",
        sku: "1-002",
        unidade: "Unid.",
        preco: "R$ 25,90",
        estoque: 5
    }

];


// ======================
// PAGINAÇÃO
// ======================

let paginaAtual = 1;

const itensPorPagina = 5;


// ======================
// RENDERIZAR PRODUTOS
// ======================

function renderizarProdutos() {

    const lista =
        document.getElementById("listaProdutos");

    lista.innerHTML = "";

    const inicio =
        (paginaAtual - 1) * itensPorPagina;

    const fim =
        inicio + itensPorPagina;

    const produtosPagina =
        produtosLista.slice(inicio, fim);

    produtosPagina.forEach(produto => {

        lista.innerHTML += `
            <article class="produto-item">

                <span>${produto.nome}</span>

                <span>${produto.sku}</span>

                <span>${produto.unidade}</span>

                <span>${produto.preco}</span>

                <span>${produto.estoque}</span>

            </article>
        `;

    });

    renderizarPaginacao();

}


// ======================
// RENDERIZAR PAGINAÇÃO
// ======================

function renderizarPaginacao() {

    const paginacao =
        document.querySelector(".paginacao");

    paginacao.innerHTML = "";

    const totalPaginas =
        Math.ceil(
            produtosLista.length /
            itensPorPagina
        );

    // Botão anterior

    if (paginaAtual > 1) {

        const btnAnterior =
            document.createElement("button");

        btnAnterior.textContent = "<";

        btnAnterior.classList.add("pagina");

        btnAnterior.addEventListener("click", () => {

            paginaAtual--;

            renderizarProdutos();

        });

        paginacao.appendChild(btnAnterior);

    }

    // Números das páginas

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

            renderizarProdutos();

        });

        paginacao.appendChild(botao);

    }

    // Botão próximo

    if (paginaAtual < totalPaginas) {

        const btnProximo =
            document.createElement("button");

        btnProximo.textContent = ">";

        btnProximo.classList.add("pagina");

        btnProximo.addEventListener("click", () => {

            paginaAtual++;

            renderizarProdutos();

        });

        paginacao.appendChild(btnProximo);

    }

}


// ======================
// CADASTRAR PRODUTO
// ======================

formProduto.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome =
        document.getElementById("nomeProduto").value;

    const sku =
        document.getElementById("skuProduto").value;

    const unidade =
        document.getElementById("unidadeProduto").value;

    const preco =
        document.getElementById("precoProduto").value;

    const estoque =
        document.getElementById("estoqueProduto").value;

    produtosLista.push({

        nome,
        sku,
        unidade,

        preco:
            "R$ " +
            Number(preco)
                .toFixed(2)
                .replace(".", ","),

        estoque

    });

    // Vai automaticamente para a última página

    paginaAtual =
        Math.ceil(
            produtosLista.length /
            itensPorPagina
        );

    renderizarProdutos();

    formProduto.reset();

    modalProduto.close();

});


// ======================
// INICIAR TELA
// ======================

renderizarProdutos();