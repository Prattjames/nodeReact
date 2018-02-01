const express = require('express')
const router = express.Router()
const Gifts = require('../controllers/Gifts')

function catchAsyncErrors(fn) {  
  return (req, res, next) => {
      const routePromise = fn(req, res, next);
      if (routePromise.catch) {
          routePromise.catch(next);
      }
  }
}

router
  .route('/')
  .get(catchAsyncErrors(Gifts.read))
  .post(catchAsyncErrors(Gifts.create))

router
  .route('/:id')
  .delete(catchAsyncErrors(Gifts.delete))

router.
  route('/notify')
  .get(catchAsyncErrors(Gifts.notify))


module.exports = router
