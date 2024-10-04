const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

const allCategory = (req, res) => {

    let sql = `SELECT * FROM category`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(result[0])
            return res.status(StatusCodes.OK).json(result[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    })};

module.exports = {
    allCategory
};