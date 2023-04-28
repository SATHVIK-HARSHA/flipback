const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const mongoose = require('mongoose');
const Item = require('./models/item');
const Order = require('./models/order')
const SaveLater=require('./models/savelater');

mongoose.connect('mongodb://127.0.0.1:27017/Flipkart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
  console.error(err);
});

db.once('open', () => {
  console.log('Database connected');
});

// const newItems = [
//   // { name: 'Fossil', url: 'https://rukminim1.flixcart.com/image/612/612/l05lx8w0/watch/w/k/t/-original-imagcy8hkbshxtha.jpeg?q=70', price: 4323 },
//   // { name: 'Gorli', url: 'https://rukminim1.flixcart.com/image/832/832/ku79vgw0/watch/a/g/j/ch2601-fossil-men-original-imaff62hurpdhhha.jpeg?q=70', price: 3304 },
//   // { name: 'Diesel', url: 'https://rukminim1.flixcart.com/image/832/832/kwmfqfk0/watch/s/k/3/1-dz4530-diesel-men-original-imag998fgm4akhhd.jpeg?q=70', price: 5323 },
//   // {name:'Fastrack',url:"https://rukminim1.flixcart.com/image/832/832/xif0q/watch/w/f/w/1-3274sl06-fastrack-men-original-imagh7zkwnzth7dx.jpeg?q=70", price:998}
// ];

// Item.insertMany(newItems)
//   .then(() => console.log('Items saved to database'))
//   .catch(err => console.error(err));

//////////////////////////////////////////////////////////////  

const app = express();

app.use(bodyParser.json());

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

// get the list of items 
// to display in the home page
app.get('/savelaters',async (req,res)=>{

  try {
  const data =await SaveLater.find();
   res.json(data);
  }
  catch (err) {
     res.status(500).json({ message: err.message });
  }
})
app.get('/items', async (req, res) => {

  let {page,limit}=req.query;
  if(!page) page=1;
  if(!limit) limit=10;
  const skip=(page-1)*10;

  try {
    const items = await Item.find().skip(skip).limit(limit);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/items',(req,res)=>{

    Item.create(req.body)
    .then(Item => res.json({msg:"Item added succesfully"}))
    .catch(err=>res.json({err:"No"}).status(400));
});


// Get orders to display at the cart page
app.get('/orders', async (req, res) => {
  // try {
  //   const orders = await Order.find();
  //   res.json(orders);
  // } catch (err) {
  //   res.status(500).json({ "message": err.message });
  // }
  // console.log("Hello");
     Order.find()
    .then(items => res.json(items))
    .catch(err=>res.json({err:"No items found"}).status(404));

})

app.delete('/orders/:id',(req,res)=>{
    Order.findByIdAndRemove(req.params.id,req.body)
    .then((Item) => res.json({msg:"Item deleted succesfully"}))
    .catch((err)=>res.json({err:"Unable to delete item"}).status(400));
});

app.delete('/save/:id',(req,res)=>{
    SaveLater.findByIdAndRemove(req.params.id,req.body)
    .then((Item) => res.json({msg:"Item deleted succesfully"}))
    .catch((err)=>res.json({err:"Unable to delete item"}).status(400));
});



app.get('/:id',(req,res)=>{

    Item.findById(req.params.id)
    .then(items => res.json(items))
    .catch(err=>res.json({err:"No items found"}).status(404));
});

app.post('/orders', async(req, res) => {




  Order.create(req.body)
    .then(Item => res.json({msg:"Item added succesfully"}))
    .catch(err=>res.json({err:"No"}).status(400));
  // const { items } = req.body;
  // console.log(items);
  // // Create a new order with the given items
  // const newOrder = new Order({ items });

  // // Save the new order to MongoDB
  // // await newOrder.save((err) => {
  // //   if (err) {
  // //     console.error(err);
  // //     res.status(500).send('Failed to save order to database');
  // //   } else {
  // //     res.status(200).send('Order saved to database');
  // //   }
  // // });

  // await newOrder.save();
  // res.status(201).send("order successfully added")
});

app.get('/hello2', async(req,res)=>{
  console.log("Hello");
   SaveLater.find()
    .then(items => res.json(items))
    .catch(err=>res.json({err:"No products found"}).status(404));
});



// app.get('/savelaters', async (req, res) => {
//   try {
//     const items = await SaveLater.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });





app.post('/savelaters',(req,res)=>{

    SaveLater.create(req.body)
    .then(SaveLater => res.json({msg:"Item added succesfully"}))
    .catch(err=>res.json({err:"Unable to add Item"}).status(400));
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});