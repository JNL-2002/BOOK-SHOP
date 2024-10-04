const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

const allBooks =  (req, res) => {
    let {category_id} = req.query;

        if (category_id) {
            let sql = `SELECT * FROM books WHERE category_id=?`;
        conn.query(sql, category_id,
            (err, result) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(result.length)
                return res.status(StatusCodes.OK).json(result);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        })
    } else {
    let {id} = req.params;

    let sql = `SELECT * FROM books WHERE id=?`;
    conn.query(sql, id,
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(result[0])
            return res.status(StatusCodes.OK).json(result[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    })}
};

const bookDetail =  (req, res) => {
    res.json('개별 도서 조회');
};

module.exports = {
    allBooks,
    bookDetail,
};