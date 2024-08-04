const router = require('express').Router();

const rootDir = require('../util/path');
const db = require('../models/database/db');

router.get('/', (req, res, next) => {
  const productList = db.products;
  res.render('shop', {
    prods: productList,
    docTitle: 'Shop',
    path: '/'
  });
});

routes.post('/new', );

exports.routes = router;
exports.products = products;
