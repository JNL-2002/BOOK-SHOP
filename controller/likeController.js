const jwt = require('jsonwebtoken');
const conn = require('../db');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

exports.addLike =  (req, res) => {
    
    const book_id = req.params;

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
    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
    let values = [authorization.id, book_id];
    conn.query(sql, values,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(result);
    
        })
    }
};


exports.removeLike = (req, res) => {

    const book_id = req.params.id;

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
    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = 3;`;
    let values = [authorization.id, book_id];
    conn.query(sql, values,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

            return res.status(StatusCodes.OK).json(result);
        })
    }
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
