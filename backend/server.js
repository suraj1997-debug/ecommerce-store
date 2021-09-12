const mongoose = require('mongoose');
const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

env.config();

mongoose.connect(process.env.URL,
{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('Database Connected');
}).catch((error)=>{
  console.log(error);
})

var userRouter = require('./routes/user/user');
var ProductRouter = require('./routes/ProductRoute/product');
var CartRouter = require('./routes/cartRoute/cart');
var OrderRouter = require('./routes/orderRoute/order');
var SearchRouter = require('./routes/searchRoute/search');

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public',express.static(path.join(__dirname, '/public/uploads')));
app.use(cors());

app.use('/api',userRouter);
app.use('/api',ProductRouter);
app.use('/api',CartRouter);
app.use('/api',OrderRouter);
app.use('/api',SearchRouter);

app.listen(process.env.PORT,()=>console.log(`SERVER RUNNING AT PORT ${process.env.PORT}`))

