const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//Rotas das páginas
const routes_pages = require('./app/routes/routes.pages');
app.use(routes_pages);

//Rotas para statics(CSS, JS, etc...)
const routes_assets = require('./app/routes/routes.assets');
app.use(routes_assets);

//Rotas para API REST
const routes_app = require('./app/routes/routes');
app.use(routes_app);

app.listen(3000, () => {
    console.log('servidor ligado');
});