const conn = require('../db');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.addToCart =  (req, res) => {
    const {book_id,quantity} = req.body;

    let authorization = ensureAuthorization(req, res);

    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 다시 하세용~"
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰이에용~"
        });
    } else  {
        let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
        let values = [book_id, quantity, authorization.id];
        conn.query(sql, values,
            (err, result) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
    
            return res.status(StatusCodes.OK).json(result);
        })}
};

exports.getCartItems =  (req, res) => {
    const {selected} = req.body;

    let authorization = ensureAuthorization(req, res);

    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 다시 하세용~"
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰이에용~"
        });
    } else {
        let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
        FROM cartItems LEFT JOIN books
        ON cartItems.book_id = books.id
        WHERE user_id=? AND cartItems.id IN (?)`;

    let values = [authorization.id, selected];
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

    })
    };

    
};

exports.removeCartItem =  (req, res) => {
    const cartItemId = req.params.id;

    let sql = `DELETE FROM cartItems WHERE id = ?`;
    conn.query(sql, cartItemId,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

            return res.status(StatusCodes.OK).json(result);
    })
};

function ensureAuthorization (req, res) {
    try {
        let receuvedJwt = req.headers["authorization"];
        let decodedJwt = jwt.verify(receuvedJwt, process.env.PRIVATE_KEY);
        return decodedJwt;
    } catch (err) {
        return err
    }
    
};

