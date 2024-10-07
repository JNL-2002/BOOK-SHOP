const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

const allBooks =  (req, res) => {
    let {category_id, news, limit, currentPage } = req.query;
        

    let offset = limit * (currentPage-1);

    let sql = `SELECT * FROM books`;
    let values = [];
        if (category_id && news) {
            sql += `WHERE category_id=? AND pub_date BETWEEN`;
            values = [category_id];
        }
            else if (category_id) {
            sql += `WHERE category_id=?`;
            values = [category_id];
        }
        else if (news) {
            sql += `WHERE pub_date BETWEEN`;
        }

        sql +=  `LIMIT ? OFFSET ?`
        values.push(parseInt(limit), offset);

        conn.query(sql, values,
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
    };

const bookDetail =  (req, res) => {
    let {id} = req.params;

    let sql = `SELECT * FROM books LEFT JOIN category
            ON books.category_id = category_id; WHERE books.id=?;`;
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
    })
};

module.exports = {
    allBooks,
    bookDetail
};