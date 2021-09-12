const mongoose = require('mongoose');
const express = require('express');
const { searchProduct } = require('../../Controller/searchController/search');
const router = express.Router();

//POST API for searching products by Product Name
router.post('/product/search',searchProduct);

module.exports = router;
