const express = require('express');
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')
const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");
const uri = "mongodb://myAdmin:myPassword@127.0.0.1:27017";

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/greet', (req, res) => {
    let userName = req.query.name;
    res.send(`Hello ${userName}!`);
});

app.post('/product/create', async(req, res) => {
  const product = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('art_shop').collection('products').insertOne({
    product_name: product.product_name,
    product_code: product.product_code,
    image: product.image,
    price: product.price
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = "+product.product_code+" is created",
    "product": product
  });
})

app.get('/product', async(req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const product = await client.db('art_shop').collection('products').find({}).toArray();
  await client.close();
  res.status(200).send(product);
})

app.get('/product/:product_code', async(req, res) => {
  const product_code = req.params.product_code;
  const client = new MongoClient(uri);
  await client.connect();
  const product = await client.db('art_shop').collection('products').find({product_code: product_code}).toArray();
  await client.close();
  res.status(200).send(product[0]);
})

app.post('/artist/create', async(req, res) => {
  const artist = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('art_shop').collection('artist').insertOne({
    id: parseInt(artist.id),
    first_name: artist.first_name,
    last_name: artist.last_name,
    username: artist.username,
    email: artist.email,
    profile_desc: artist.profile_desc,
    profile_image: artist.profile_image
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = "+artist.id+" is created",
    "artist": artist
  });
})

app.get('/artist', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const artist = await client.db('art_shop').collection('artist').find({}).toArray();
  await client.close();
  res.status(200).send(artist);
})

app.get('/artist/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const artist = await client.db('art_shop').collection('artist').findOne({"id": id});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "artist": artist
  });
})

app.get('/province', async(req, res) => {
  const code = parseInt(req.query.code);

  const client = new MongoClient(uri);
  await client.connect();
  let province = [];

  if (code)
  {
    let query = { code: code };
    province = await client.db('art_shop').collection('thai_provinces').find(query).toArray();
  }
  else
  {
    province = await client.db('art_shop').collection('thai_provinces').find({}).toArray();
  }

  await client.close();
  res.status(200).send(province);
})

app.get('/amphur', async(req, res) => {
  const province_id = parseInt(req.query.province_id);

  const client = new MongoClient(uri);
  await client.connect();
  let amphur = [];

  if (province_id)
  {
    let query = { province_id: province_id };
    amphur = await client.db('art_shop').collection('thai_amphures').find(query).toArray();
  }
  else
  {
    amphur = await client.db('art_shop').collection('thai_amphures').find({}).toArray();
  }

  await client.close();
  res.status(200).send(amphur);
})

app.get('/tambon', async(req, res) => {

  const code = parseInt(req.query.code);

  const client = new MongoClient(uri);
  await client.connect();
  let tambon = [];

  if (code)
  {
    let query = { zip_code: code };
    tambon = await client.db('art_shop').collection('thai_tambons').find(query).toArray();
  }
  else
  {
    tambon = await client.db('art_shop').collection('thai_tambons').find({}).toArray();
  }
  
  await client.close();
  res.status(200).send(tambon);
})

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    var fileExp = file.originalname.split(".");
    var fileType = fileExp[fileExp.length - 1];
    callback(null, Date.now() + "." + fileType)
  },
})

const upload = multer({ storage })

app.post('/upload', upload.single('image_upload'), (req, res) => {
  res.send(req.file)
})

app.use('/images', express.static('uploads'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});