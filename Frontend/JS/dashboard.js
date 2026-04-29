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

    //inf no dashboard vendedora
    const nome = localStorage.getItem("username");

    document.getElementById("filtroVendedora").style.display = "none";

    // força filtro dela
    function filtrarDados() {
        const mesSelecionado = document.getElementById("filtroMes").value;

        return dados.filter(item => {
            const matchMes = !mesSelecionado || item.data.startsWith(mesSelecionado);
            const matchUser = item.vendedora === nome;

            return matchMes && matchUser;
        });
    }

    // esconder cards que não interessam
    document.getElementById("totalProdutos").parentElement.style.display = "none";
    document.getElementById("estoqueBaixo").parentElement.style.display = "none";
}




//MAIN

//informações do dashboard:
if (role === "admin") {

    // Simulação de dados (depois usamos com o banco)
    document.getElementById("vendasHoje").textContent = "R$ 300,00";
    document.getElementById("totalProdutos").textContent = "120";
    document.getElementById("totalClientes").textContent = "45";
    document.getElementById("estoqueBaixo").textContent = "8";

}

const dados = [
    { data: "2026-01-10", valor: 50, vendedora: "Ana" },
    { data: "2026-01-11", valor: 200, vendedora: "Fernanda" },
    { data: "2026-01-11", valor: 150, vendedora: "Fernanda" },
    { data: "2026-01-12", valor: 300, vendedora: "Fernanda" },
    { data: "2026-02-01", valor: 300, vendedora: "Ana" },
    { data: "2026-02-03", valor: 400, vendedora: "Fernanda" },
    { data: "2026-02-04", valor: 100, vendedora: "Ana" },
    { data: "2026-02-10", valor: 30, vendedora: "Ana" },
    { data: "2026-03-01", valor: 600, vendedora: "Ana" },
    { data: "2026-03-03", valor: 100, vendedora: "Fernanda" },
    { data: "2026-03-04", valor: 200, vendedora: "Fernanda" },
    { data: "2026-03-05", valor: 50, vendedora: "Ana" },
    { data: "2026-04-01", valor: 20, vendedora: "Ana" },
    { data: "2026-04-10", valor: 500, vendedora: "Fernanda" },
    { data: "2026-04-11", valor: 80, vendedora: "Ana" },
    { data: "2026-04-15", valor: 100, vendedora: "Fernanda" },
    { data: "2026-04-16", valor: 100, vendedora: "Ana" },
    { data: "2026-04-16", valor: 500, vendedora: "Fernanda" },
    { data: "2026-04-16", valor: 300, vendedora: "Fernanda" },
    { data: "2026-04-28", valor: 1500, vendedora: "Ana" },
];

//filtro p/ data
function filtrarDados() {
    const mesSelecionado = document.getElementById("filtroMes").value;
    const vendedoraSelecionada = document.getElementById("filtroVendedora").value;

    return dados.filter(item => {
        const matchMes = !mesSelecionado || item.data.startsWith(mesSelecionado);
        const matchVendedora = !vendedoraSelecionada || item.vendedora === vendedoraSelecionada;

        return matchMes && matchVendedora;
    });
}

//filtro vendedora / funcionarios
function carregarVendedoras() {
    const select = document.getElementById("filtroVendedora");

    const vendedoras = [...new Set(dados.map(d => d.vendedora))];

    vendedoras.forEach(nome => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    });
}

//cards de informação:
function atualizarCards() {
    const dadosFiltrados = filtrarDados();
    const hoje = new Date().toISOString().split("T")[0];
    const mesSelecionado = document.getElementById("filtroMes").value;

    let vendasHoje = 0;
    let vendasMes = 0;
    let vendasAno = 0;

    dadosFiltrados.forEach(item => {
        if (item.data === hoje) vendasHoje += item.valor;

        if (mesSelecionado && item.data.startsWith(mesSelecionado)) {
            vendasMes += item.valor;
        }

        if (mesSelecionado) {
            const ano = mesSelecionado.split("-")[0];
            if (item.data.startsWith(ano)) {
                vendasAno += item.valor;
            }
        }
    });

    document.getElementById("vendasHoje").textContent = `R$ ${vendasHoje}`;
    document.getElementById("vendasMes").textContent = `R$ ${vendasMes}`;
    document.getElementById("vendasAno").textContent = `R$ ${vendasAno}`;
}


//Grafico começo (Mês atual):
const hoje = new Date();
const mesAtual = hoje.toISOString().slice(0, 7);

document.getElementById("filtroMes").value = mesAtual;

//Graficos c/ filtro:
let grafico;

//titulo de acordo com o filtro:
function gerarTituloGrafico() {
    const mes = document.getElementById("filtroMes").value;
    const vendedora = document.getElementById("filtroVendedora").value;

    let titulo = "Vendas";

    if (mes) titulo += ` - ${mes}`;
    if (vendedora) titulo += ` (${vendedora})`;

    return titulo;
}

//Grafico:
function criarGrafico() {
    const dadosFiltrados = filtrarDados();

    const agrupado = {};

    dadosFiltrados.forEach(item => {
        const data = new Date(item.data);

        const chave = document.getElementById("filtroMes").value
            ? item.data.split("-").reverse().join("/") // 10/01/2026
            : `${String(data.getMonth() + 1).padStart(2, "0")}/${data.getFullYear()}`;

        if (!agrupado[chave]) agrupado[chave] = 0;
        agrupado[chave] += item.valor;
    });

    const labels = Object.keys(agrupado);
    const valores = Object.values(agrupado);

    if (grafico) grafico.destroy();

    grafico = new Chart(document.getElementById("graficoVendas"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Vendas",
                data: valores
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: gerarTituloGrafico()
                }
            }
        }
    });
}



// Atualiza ao mudar filtro
document.getElementById("filtroMes").addEventListener("change", atualizarTudo);
document.getElementById("filtroVendedora").addEventListener("change", atualizarTudo);

function atualizarTudo() {
    atualizarCards();
    criarGrafico();
}

// Carrega inicial
carregarVendedoras();

atualizarTudo();
