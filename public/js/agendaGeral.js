import logout from "/js.utils/logout.js";

document.getElementById('sair').addEventListener('click', () => {
    console.log('saindo...');
    logout();
});

document.getElementById('href-por_lab').addEventListener('click', () => {window.location.href="/agenda/laboratorio"})