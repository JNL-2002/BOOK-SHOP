// express 모듈
const express = require ('express');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
const cartsRouter = require('./routes/carts')
const likesRouter = require('./routes/likes');
const ordersRouter = require('./routes/orders');

app.use('/users', userRouter);
app.use('/books', booksRouter);
app.use('/category', categoryRouter);
app.use('/carts', cartsRouter);
app.use('/likes', likesRouter);
app.use('/orders', ordersRouter);