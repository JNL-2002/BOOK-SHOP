const express = require ('express');
const router = express.Router();
const Likes = require('../controller/likeController');

router.use(express.json());

// 좋아요 추가
router.post('/:id', Likes.addLike);

// 좋아요 삭제
router.delete('/:id', Likes.removeLike);

module.exports = router;