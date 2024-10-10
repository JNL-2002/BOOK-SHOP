const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

exports.addLike =  (req, res) => {
    
    const {id} = req.params;
    const {user_id} = req.body;

    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
    let values = [user_id, id];
    conn.query(sql, values,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(result);
    })
};

exports.removeLike = (req, res) => {

    const {id} = req.params;
    const {user_id} = req.body;

    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = 3;`;
    let values = [user_id, id];
    conn.query(sql, values,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

            return res.status(StatusCodes.OK).json(result);
    })
};

