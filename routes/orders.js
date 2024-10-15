const express = require ('express');
const router = express.Router();
const Module = require('../controller/OrdersController');

router.use(express.json());

// 주문하기
router.post('/', Module.order);

// 주문 목록 조회
router.get('/', Module.getOrders);

// 주문 상세 상품 조회
router.get('/:id', Module.getOrderDeteail);

module.exports = router;