const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

exports.addToCart =  (req, res) => {
    const {book_id,quantity,user_id} = req.body;

    let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
    let values = [book_id, quantity, user_id];
    conn.query(sql, values,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(result);
    })
};

exports.getCartItems =  (req, res) => {
    const {user_id, selected} = req.body;

    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
            FROM cartItems LEFT JOIN books
            ON cartItems.book_id = books.id
            WHERE user_id=? AND cartItems.id IN (?)`;
    let values = [user_id, selected];
    conn.query(sql, values,
           (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(result[0])
            return res.status(StatusCodes.OK).json(result[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    });
};

exports.removeCartItem =  (req, res) => {
    const {id} = req.params;

    let sql = `DELETE FROM cartItems WHERE id = ?`;
    conn.query(sql, id,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

            return res.status(StatusCodes.OK).json(result);
    })
};


