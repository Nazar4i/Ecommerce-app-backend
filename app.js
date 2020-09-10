const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);

module.exports = app;
