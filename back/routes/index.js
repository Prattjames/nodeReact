const express = require('express')
const router = express.Router()
const Gifts = require('../controllers/Gifts')

router
  .route('/')
  .get(Gifts.read)
  .post(Gifts.create)

router
  .route('/:id')
  .delete(Gifts.delete)

router.
  route('/notify')
  .get(Gifts.notify)


module.exports = router
