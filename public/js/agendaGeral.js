import logout from "/js.utils/logout.js";

document.getElementById('sair').addEventListener('click', () => {
    console.log('saindo...');
    logout();
});