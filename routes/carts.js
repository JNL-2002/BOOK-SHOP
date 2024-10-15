const express = require ('express');
const router = express.Router();
const Cart = require('../controller/CartController');
router.use(express.json());

// 장바구니 담기
router.post('/', Cart.addToCart);

// 장바구니 조회
router.get('/', Cart.getCartItems);

// 장바구니 도서 삭제
router.delete('/:id',Cart.removeCartItem);

module.exports = router;