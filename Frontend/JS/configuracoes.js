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

//Main

// ==========================================
// CARREGAR CONFIGURAÇÕES EXISTENTES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Carrega dados salvos das Regras de Negócio
    const comissaoSalva = localStorage.getItem("param_comissao");
    const alertaSalvo = localStorage.getItem("param_alerta");
    
    if (comissaoSalva) document.getElementById("param-comissao").value = comissaoSalva;
    if (alertaSalvo) document.getElementById("param-alerta").value = alertaSalvo;

    // Se o usuário logado for vendedora, esconde a seção gerencial inteira por segurança
    if (localStorage.getItem("role") === "vendedora") {
        const secaoGerencial = document.getElementById("secao-gerencial");
        if (secaoGerencial) secaoGerencial.style.display = "none";
    }
});

// ==========================================
// SALVAR PERFIL DO USUÁRIO
// ==========================================
document.getElementById("form-perfil").addEventListener("submit", (e) => {
    e.preventDefault();
    const novoNome = document.getElementById("perf-nome").value;
    const novaSenha = document.getElementById("perf-senha").value;

    localStorage.setItem("username", novoNome);
    document.getElementById("user-name").textContent = novoNome; // Atualiza na barra topo na hora

    if (novaSenha.trim() !== "") {
        alert("Perfil e senha atualizados com sucesso!");
    } else {
        alert("Nome do perfil atualizado com sucesso!");
    }
    document.getElementById("perf-senha").value = "";
});

// ==========================================
// SALVAR PARÂMETROS DA LOJA (ADMIN)
// ==========================================
const formParametros = document.getElementById("form-parametros");
if (formParametros) {
    formParametros.addEventListener("submit", (e) => {
        e.preventDefault();
        const valorComissao = document.getElementById("param-comissao").value;
        const valorAlerta = document.getElementById("param-alerta").value;

        localStorage.setItem("param_comissao", valorComissao);
        localStorage.setItem("param_alerta", valorAlerta);

        alert("Parâmetros do sistema salvos com sucesso!");
    });
}

// ==========================================
// EXPORTAR BACKUP DOS DADOS DA LOJA
// ==========================================
document.getElementById("btn-exportar").addEventListener("click", () => {
    const todosDados = { ...localStorage };
    const dadosString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todosDados, null, 2));
    
    const linkDownload = document.createElement("a");
    linkDownload.setAttribute("href", dadosString);
    linkDownload.setAttribute("download", "backup_alexsani_semijoias.json");
    document.body.appendChild(linkDownload);
    linkDownload.click();
    linkDownload.remove();
});

// ==========================================
// LIMPAR DADOS LOCAIS DO SISTEMA
// ==========================================
document.getElementById("btn-reset").addEventListener("click", () => {
    const confirmar = confirm("Atenção: Isso irá apagar todos os registros locais do estoque, vendas e clientes salvos neste navegador. Deseja prosseguir?");
    if (confirmar) {
        localStorage.clear();
        alert("O sistema foi resetado. Você será redirecionado para a tela de login.");
        window.location.href = "login.html";
    }
});