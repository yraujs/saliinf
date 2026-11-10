const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const conectarBanco = require('./app/repositories/database/database');
const { engine } = require('express-handlebars');
const helpers = require('./helpers/handlebars.helpers');
const cookieParser = require('cookie-parser');

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, "views"));

app.engine('handlebars', engine({
    helpers
}))

app.use(express.static(path.join(__dirname, 'public')));

conectarBanco();
app.use(cookieParser());

//Rotas das páginas
const routes_pages = require('./app/routes/routes.pages');
app.use(routes_pages);

//Rotas das páginas de Admin
const routes_pages_admin = require('./app/routes/admin/routes_pages.admin');
app.use(routes_pages_admin);

//Rotas para statics(CSS, JS, etc...)
const routes_assets = require('./app/routes/routes.assets');
app.use(routes_assets);

//Rotas para statics para Admin(CSS, JS, etc...)
const routes_assets_admin = require('./app/routes/admin/routes_assets.admin');
app.use(routes_assets_admin);

//Rotas para API REST
const routes_app = require('./app/routes/routes');
app.use(routes_app);

//Rotas de Admin para API REST
const routes_app_admin = require('./app/routes/admin/routes.admin');
app.use(routes_app_admin);

app.listen(3000, () => {
    console.log('servidor ligado');
});