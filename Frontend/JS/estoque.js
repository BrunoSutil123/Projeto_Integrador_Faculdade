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


// Mudança de tema
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
const navLinks   = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Permissões de menu
const role = localStorage.getItem("role");

const produtos      = document.getElementById("produtos");
const estoque       = document.getElementById("Estoque");
const vendas        = document.getElementById("vendas");
const clientes      = document.getElementById("clientes");
const fornecedores  = document.getElementById("fornecedores");
const relatorios    = document.getElementById("relatorios");
const configuracoes = document.getElementById("configuracoes");

if (role === "vendedora") {
    fornecedores.style.display  = "none";
    relatorios.style.display    = "none";
    configuracoes.style.display = "none";
}


// ======================
// MODAL
// ======================

const modalEstoque       = document.getElementById("modalEstoque");
const btnGerenciarProduto = document.getElementById("btnGerenciarProduto");
const btnFecharModal     = document.getElementById("btnFecharModal");
const formEstoque        = document.getElementById("formEstoque");

btnGerenciarProduto.addEventListener("click", () => {
    // Limpa o formulário e remove índice de edição antes de abrir
    formEstoque.reset();
    formEstoque.removeAttribute("data-edit-index");
    document.querySelector("#modalEstoque h2").textContent = "Gerenciar Produto";
    modalEstoque.showModal();
});

btnFecharModal.addEventListener("click", () => {
    modalEstoque.close();
});


// ======================
// DADOS
// ======================

const estoqueLista = [];


// ======================
// PAGINAÇÃO
// ======================

let paginaAtual    = 1;
const itensPorPagina = 20;


// ======================
// RENDERIZAR ESTOQUE
// ======================

function renderizarEstoque() {

    const lista  = document.getElementById("listaEstoque");
    lista.innerHTML = "";

    const termoBusca = document.getElementById("buscarEstoque").value.toLowerCase().trim();

    const filtrado = termoBusca
        ? estoqueLista.filter(p =>
            p.nome.toLowerCase().includes(termoBusca) ||
            p.sku.toLowerCase().includes(termoBusca)
          )
        : estoqueLista;

    const inicio  = (paginaAtual - 1) * itensPorPagina;
    const fim     = inicio + itensPorPagina;
    const pagina  = filtrado.slice(inicio, fim);

    pagina.forEach((produto, indexNaPagina) => {

        // Índice real no array original (para edição)
        const indexReal = estoqueLista.indexOf(produto);

        // Badge de alerta de estoque baixo (≤ 5 unidades)
        const baixoEstoque = Number(produto.estoque) <= 5;
        const badge = baixoEstoque
            ? `<span class="badge-alerta" title="Estoque baixo">!</span>`
            : "";

        lista.innerHTML += `
            <article class="estoque-item" data-index="${indexReal}">
                <span>${produto.nome}</span>
                <span>${produto.sku}</span>
                <span>${produto.unidade}</span>
                <span>${produto.preco}</span>
                <span class="col-estoque">
                    ${produto.estoque}${badge}
                </span>
            </article>
        `;
    });

    // Clique na linha abre modal de edição
    document.querySelectorAll(".estoque-item").forEach(item => {
        item.addEventListener("click", () => {
            const idx = Number(item.getAttribute("data-index"));
            abrirEdicao(idx);
        });
    });

    renderizarPaginacao(filtrado.length);
}


// ======================
// EDIÇÃO AO CLICAR
// ======================

function abrirEdicao(index) {
    const p = estoqueLista[index];
    if (!p) return;

    document.getElementById("nomeEstoque").value    = p.nome;
    document.getElementById("skuEstoque").value     = p.sku;
    document.getElementById("unidadeEstoque").value = p.unidade;
    document.getElementById("precoEstoque").value   = p.precoRaw;
    document.getElementById("qtdEstoque").value     = p.estoque;

    document.querySelector("#modalEstoque h2").textContent = "Editar Produto";
    formEstoque.setAttribute("data-edit-index", index);

    modalEstoque.showModal();
}


// ======================
// RENDERIZAR PAGINAÇÃO
// ======================

function renderizarPaginacao(totalItens) {

    const paginacao    = document.querySelector(".paginacao");
    paginacao.innerHTML = "";

    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    if (paginaAtual > 1) {
        const btn = document.createElement("button");
        btn.textContent = "<";
        btn.classList.add("pagina");
        btn.addEventListener("click", () => { paginaAtual--; renderizarEstoque(); });
        paginacao.appendChild(btn);
    }

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("pagina");
        if (i === paginaAtual) btn.classList.add("ativa");
        btn.addEventListener("click", () => { paginaAtual = i; renderizarEstoque(); });
        paginacao.appendChild(btn);
    }

    if (paginaAtual < totalPaginas) {
        const btn = document.createElement("button");
        btn.textContent = ">";
        btn.classList.add("pagina");
        btn.addEventListener("click", () => { paginaAtual++; renderizarEstoque(); });
        paginacao.appendChild(btn);
    }
}


// ======================
// BUSCA
// ======================

document.getElementById("buscarEstoque").addEventListener("input", () => {
    paginaAtual = 1;
    renderizarEstoque();
});


// ======================
// SALVAR (cadastro ou edição)
// ======================

formEstoque.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome    = document.getElementById("nomeEstoque").value.trim();
    const sku     = document.getElementById("skuEstoque").value.trim();
    const unidade = document.getElementById("unidadeEstoque").value.trim();
    const precoRaw = Number(document.getElementById("precoEstoque").value);
    const estoque = document.getElementById("qtdEstoque").value.trim();

    const preco = "R$ " + precoRaw.toFixed(2).replace(".", ",");

    const editIndex = formEstoque.getAttribute("data-edit-index");

    if (editIndex !== null && editIndex !== "") {

        // Edição
        estoqueLista[Number(editIndex)] = { nome, sku, unidade, preco, precoRaw, estoque };

    } else {

        // Novo — valida SKU duplicado
        const skuExiste = estoqueLista.some(p =>
            p.sku.toLowerCase() === sku.toLowerCase()
        );

        if (skuExiste) {
            alert("Já existe um produto cadastrado com este SKU.");
            return;
        }

        estoqueLista.push({ nome, sku, unidade, preco, precoRaw, estoque });
        paginaAtual = Math.ceil(estoqueLista.length / itensPorPagina);
    }

    renderizarEstoque();
    formEstoque.reset();
    formEstoque.removeAttribute("data-edit-index");
    modalEstoque.close();
});


// ======================
// INICIAR TELA
// ======================

renderizarEstoque();