//Validar login...
const auth = localStorage.getItem("auth")
if (auth !== "true") {
    window.location.href = "login.html"
}


//Logout...
const btnSair = document.getElementById("exitCount");
btnSair.addEventListener("click", function () {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
});


// Mudança de tema Escuro / Claro...
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


// Username Login...
const username = localStorage.getItem("username");
document.getElementById("user-name").textContent = username;


// Ativar navbar Hamburguer click...
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Permissões de menu ativas/desativadas
const role = localStorage.getItem("role");

const produtos = document.getElementById("produtos");
const estoque = document.getElementById("Estoque");
const vendas = document.getElementById("vendas");
const clientes = document.getElementById("clientes");
const fornecedores = document.getElementById("fornecedores");
const relatorios = document.getElementById("relatorios");
const configuracoes = document.getElementById("configuracoes");

if (role === "vendedora") {
    fornecedores.style.display = "none";
    relatorios.style.display = "none";
    configuracoes.style.display = "none";
}


// ======================
// MODAL
// ======================

const modalVenda =
    document.getElementById("modalVenda");

const btnNovaVenda =
    document.getElementById("btnNovaVenda");

const btnFecharModal =
    document.getElementById("btnFecharModal");

const formVenda =
    document.getElementById("formVenda");

btnNovaVenda.addEventListener("click", () => {
    modalVenda.showModal();
});

btnFecharModal.addEventListener("click", () => {
    modalVenda.close();
});


// ======================
// DADOS
// ======================

const vendasLista = [

];


// ======================
// PAGINAÇÃO
// ======================

let paginaAtual = 1;

const itensPorPagina = 20;


// ======================
// RENDERIZAR VENDAS
// ======================

function renderizarVendas() {

    const lista =
        document.getElementById("listaVendas");

    lista.innerHTML = "";

    const inicio =
        (paginaAtual - 1) * itensPorPagina;

    const fim =
        inicio + itensPorPagina;

    const vendasPagina =
        vendasLista.slice(inicio, fim);

    vendasPagina.forEach(venda => {

        lista.innerHTML += `
            <article class="produto-item">

                <span>${venda.numero}</span>

                <span>${venda.data}</span>

                <span>${venda.cliente}</span>

                <span>${venda.cpfCnpj}</span>

                <span>${venda.total}</span>

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
            vendasLista.length /
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
            renderizarVendas();
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
            renderizarVendas();
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
            renderizarVendas();
        });

        paginacao.appendChild(btnProximo);
    }

}


// ======================
// CADASTRAR VENDA
// ======================

formVenda.addEventListener("submit", (e) => {

    e.preventDefault();

    const numero =
        document.getElementById("numeroVenda").value;

    const data =
        document.getElementById("dataVenda").value;

    const cliente =
        document.getElementById("clienteVenda").value;

    const cpfCnpj =
        document.getElementById("cpfCnpjVenda").value;

    const total =
        document.getElementById("totalVenda").value;

    const numeroExiste = vendasLista.some(venda =>
        venda.numero.toLowerCase().trim() === numero.toLowerCase().trim()
    );

    if (numeroExiste) {
        alert("Já existe uma venda cadastrada com este número.");
        return;
    }

    // Formatar data de YYYY-MM-DD para DD/MM/YYYY
    const [ano, mes, dia] = data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    vendasLista.push({

        numero,
        data: dataFormatada,
        cliente,
        cpfCnpj,

        total:
            "R$ " +
            Number(total)
                .toFixed(2)
                .replace(".", ",")

    });

    // Vai automaticamente para a última página
    paginaAtual =
        Math.ceil(
            vendasLista.length /
            itensPorPagina
        );

    renderizarVendas();

    formVenda.reset();

    modalVenda.close();

});


// ======================
// INICIAR TELA
// ======================

renderizarVendas();
