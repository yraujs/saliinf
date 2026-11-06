const container = document.getElementById('container');
const toRegisterBtn = document.getElementById('to-register');
const toLoginBtn = document.getElementById('to-login');

toRegisterBtn.addEventListener('click', () => {
    container.classList.add('active');
});

toLoginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});
