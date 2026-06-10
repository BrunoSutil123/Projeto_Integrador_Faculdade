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





// MAIN

// --- MANTER SEU CÓDIGO ANTERIOR DE AUTENTICAÇÃO E TEMA AQUI ---
// (Validar login, Logout, Mudança de tema, Username, Hamburguer, Role...)

// --- LOGICA E MOCK DE DADOS PARA OS RELATÓRIOS ---

// Mock de dados de vendas registrados no sistema para simular os cálculos
const vendasBancoDados = [
    { id: 1, data: '2026-06-02', valor: 85.00, vendedora: 'mariana' },
    { id: 2, data: '2026-06-04', valor: 150.00, vendedora: 'paula' },
    { id: 3, data: '2026-06-05', valor: 350.00, vendedora: 'mariana' },
    { id: 4, data: '2026-06-09', valor: 42.00, vendedora: 'mariana' },
    { id: 5, data: '2026-06-10', valor: 220.00, vendedora: 'paula' },
    // Vendas do mês anterior (Maio) para cálculo MoM
    { id: 6, data: '2026-05-12', valor: 500.00, vendedora: 'mariana' },
    { id: 7, data: '2026-05-18', valor: 120.00, vendedora: 'paula' },
];

// Valores consolidados fake para cálculo YoY
const faturamentoAnoAtualAcumulado = 45000.00;
const faturamentoAnoAnteriorAcumulado = 38000.00;

let chartInstancia = null;

// Inicializador da página
document.addEventListener("DOMContentLoaded", () => {
    renderizarRelatorios();
    
    // Eventos para recálculo automático ao mudar os filtros
    document.getElementById("filtroData").addEventListener("change", renderizarRelatorios);
    document.getElementById("filtroVendedora").addEventListener("change", renderizarRelatorios);
});

function renderizarRelatorios() {
    const dataSelecionada = document.getElementById("filtroData").value; // Formato: "YYYY-MM"
    const vendedoraSelecionada = document.getElementById("filtroVendedora").value;

    // 1. Filtragem dos dados
    const vendasMesAtual = vendasBancoDados.filter(venda => {
        const noMes = venda.data.startsWith(dataSelecionada);
        const naVendedora = vendedoraSelecionada === 'todas' || venda.vendedora === vendedoraSelecionada;
        return noMes && naVendedora;
    });

    // Encontra mês anterior para o cálculo MoM
    const [ano, mes] = dataSelecionada.split('-').map(Number);
    const dataMesAnterior = mes === 1 ? `${ano - 1}-12` : `${ano}-${String(mes - 1).padStart(2, '0')}`;
    
    const vendasMesAnterior = vendasBancoDados.filter(venda => {
        const noMes = venda.data.startsWith(dataMesAnterior);
        const naVendedora = vendedoraSelecionada === 'todas' || venda.vendedora === vendedoraSelecionada;
        return noMes && naVendedora;
    });

    // 2. Cálculos matemáticos básicos
    const totalFaturamentoAtual = vendasMesAtual.reduce((acc, v) => acc + v.valor, 0);
    const totalFaturamentoAnterior = vendasMesAnterior.reduce((acc, v) => acc + v.valor, 0);
    const qtdVendasAtual = vendasMesAtual.length;
    const ticketMedio = qtdVendasAtual > 0 ? (totalFaturamentoAtual / qtdVendasAtual) : 0;

    // Cálculo MoM
    let percentualMoM = 0;
    if (totalFaturamentoAnterior > 0) {
        percentualMoM = ((totalFaturamentoAtual - totalFaturamentoAnterior) / totalFaturamentoAnterior) * 100;
    } else if (totalFaturamentoAtual > 0) {
        percentualMoM = 100; // Crescimento total se não houver histórico no mês passado
    }

    // Cálculo YoY
    const percentualYoY = ((faturamentoAnoAtualAcumulado - faturamentoAnoAnteriorAcumulado) / faturamentoAnoAnteriorAcumulado) * 100;

    // 3. Renderização dos Cards na tela
    document.getElementById("fatMensal").textContent = totalFaturamentoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("fatAnual").textContent = faturamentoAnoAtualAcumulado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("ticketMedio").textContent = ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Customização do indicador MoM
    const momIndicador = document.getElementById("momIndicador");
    momIndicador.textContent = `${percentualMoM >= 0 ? '+' : ''}${percentualMoM.toFixed(1)}% vs mês anterior`;
    momIndicador.className = `indicador ${percentualMoM >= 0 ? 'positivo' : 'negativo'}`;

    // Customização do indicador YoY
    const yoyIndicador = document.getElementById("yoyIndicador");
    yoyIndicador.textContent = `+${percentualYoY.toFixed(1)}% vs ano anterior`;

    // 4. Construção da Tabela de Distribuição por Faixas de Preço
    construirTabelaFaixas(vendasMesAtual, totalFaturamentoAtual, qtdVendasAtual);

    // 5. Renderização / Atualização do Gráfico Chart.js
    construirGrafico(totalFaturamentoAtual, totalFaturamentoAnterior, dataSelecionada);
}

function construirTabelaFaixas(vendas, fatTotal, qtdTotal) {
    const tabelasCorpo = document.getElementById("corpoTabelaFaixas");
    tabelasCorpo.innerHTML = "";

    // Definição das regras de negócio das faixas
    const faixas = [
        { nome: "R$ 0 a R$ 100", checar: v => v <= 100, qtd: 0, totalValor: 0 },
        { nome: "R$ 101 a R$ 300", checar: v => v > 100 && v <= 300, qtd: 0, totalValor: 0 },
        { nome: "Acima de R$ 300", checar: v => v > 300, qtd: 0, totalValor: 0 }
    ];

    // Classificação
    vendas.forEach(venda => {
        for (let faixa of faixas) {
            if (faixa.checar(venda.valor)) {
                faixa.qtd++;
                faixa.totalValor += venda.valor;
                break;
            }
        }
    });

    // Injeção de linhas dinâmicas no HTML aplicando cálculos percentuais
    faixas.forEach(faixa => {
        const percQtd = qtdTotal > 0 ? ((faixa.qtd / qtdTotal) * 100).toFixed(1) : "0.0";
        const percFat = fatTotal > 0 ? ((faixa.totalValor / fatTotal) * 100).toFixed(1) : "0.0";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${faixa.nome}</strong></td>
            <td>${faixa.qtd}</td>
            <td>${percQtd}%</td>
            <td>${faixa.totalValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td>${percFat}%</td>
        `;
        tabelasCorpo.appendChild(tr);
    });
}

function construirGrafico(faturamentoAtual, faturamentoAnterior, mesAno) {
    const ctx = document.getElementById('graficoComparativo').getContext('2d');
    
    // Destrói gráfico antigo para evitar bugs visuais de sobreposição ao atualizar filtros
    if (chartInstancia) {
        chartInstancia.destroy();
    }

    // Pega a cor atual do texto baseada nas variáveis do CSS
    const corTextoModo = document.body.classList.contains('darkMode') ? '#e3e3e3' : '#0c0c0c';

    chartInstancia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mês Anterior', `Mês Atual (${mesAno})`],
            datasets: [{
                label: 'Faturamento de Vendas',
                data: [faturamentoAnterior, faturamentoAtual],
                backgroundColor: ['#9c9c9c', '#f0a81c'], // Cinza vs Amarelo Padrão da Empresa
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: corTextoModo }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(128, 128, 128, 0.1)' },
                    ticks: { color: corTextoModo }
                },
                x: {
                    ticks: { color: corTextoModo }
                }
            }
        }
    });
}