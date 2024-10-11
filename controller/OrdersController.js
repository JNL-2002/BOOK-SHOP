const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

exports.order = (req, res) => {
    const {items, delivery, totalQuantity, totalPrice, userId, firstBookTitle} = req.body;

    let delivery_id;
    let order_id;

    let sql = `INSERT INTO delivery (adderss, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    // conn.query(sql, values,
    //     (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(StatusCodes.BAD_REQUEST).end();
    //     }

    //     delivery_id = result.insertId;

    //     return res.status(StatusCodes.OK).json(result);
    // })


        sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
            VALUES (?, ?, ?, ?, ?)`
        values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id]
        // conn.query(sql, values,
        //     (err, result) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(StatusCodes.BAD_REQUEST).end();
        //     }
    
        //     order_id = result.insertId;
    
        //     return res.status(StatusCodes.OK).json(result);
        // })
    
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    
    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity])
    })
    conn.query(sql, [values],
            (err, result) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
    
            return res.status(StatusCodes.OK).json(result);
        })
    
};

exports.getOrders = (req, res) => {
    res.json('주문 목록 조회');
};

exports.getOrderDeteail =  (req, res) => {
    res.json('주문 상세 상품 조회');
};