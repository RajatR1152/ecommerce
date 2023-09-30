const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const connection_url = 'mongodb+srv://rajatrandai7:rajatR1152@cl1.mn4rcix.mongodb.net/crud?retryWrites=true&w=majority';


app.use(cors())
app.use(express.json());
app.use(express.urlencoded())

mongoose.connect(connection_url,{useNewUrlParser:true}).then(() => {
    console.log('connected ');
})


const dataSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cart: Array,
    orders: Array,
    country:String,
    mobile:String,
    gender:String
});

const user = mongoose.model('user', dataSchema);

app.get('/', (req, res) => {
    res.send('this is homepage');
})

app.post('/cart', (req, res) => {
    user.findOne({ "username": req.body.user }).then((data) => {
        data.cart.push(req.body)
        data.save();
        res.status(200).send(data);
    })
});

app.post('/placed', (req, res) => {
    user.findOne({ "username": req.body.user }).then((data) => {
        data.orders.push(req.body)
        data.save();
        res.status(200).send(data);
    })
})

app.post('/login', (req, res) => {
    user.findOne(req.body).then((data) => {
        if (data) {
            res.status(200).send({ message: "user found : ", data })
        }
        else {
            res.status(401).send({ message: "user not found : " });
        }
    })
})

app.post('/register', (req, res) => {
    const newData = new user(req.body);
    newData.save().then(() => {
        res.status(200).send({ message: "user created successfully", data: req.body });
        console.log('user created successfully');
    })
})

app.post('/cartData', (req, res) => {
    user.findOne(req.body).then((d) => {
        res.status(200).send(d)
    })
})

app.post('/ordersData', (req, res) => {
    user.findOne(req.body).then((d) => {
        res.status(200).send(d)
    })
})

app.listen(port, () => {
    console.log(`listening on : ${port}`);
})
