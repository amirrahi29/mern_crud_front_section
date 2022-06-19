const express = require('express');
const cors = require('cors');
const User = require('./db/User');
const product = require('./db/Product');
const Product = require('./db/Product');
const { response } = require('express');
require('./db/config');
const app = express();

app.use(express.json());
app.use(cors());

app.post("/add_user", async (req,res)=>{

    //save user
    let user = new User(req.body);
    let result = await user.save();

    //remove one value from json
    result = result.toObject();
    delete result.password 
    
    //show user as json
    res.send(result);
})

app.post("/login_user", async (req,res)=>{
    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }
        else{
            res.send("No user found!");
        }
    }
    else{
        res.send("No user found!");
    }
    
})


app.post('/add_product', async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/all_products', async (req,res)=>{
    let all_products = await Product.find();
    if(all_products.length > 0)
    {
        res.send(all_products);
    }
    else
    {
        res.send({result:"No products found!", success:"false"});
    }
})

app.delete('/delete_product/:id', async (req, res)=>{
    //req.params.id (we can access any paramaters like this)
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);

});

app.get("/edit_product/:id", async (req, res)=>{
    let result = await Product.findOne({_id: req.params.id});
    if(result)
    {
        res.send(result)
    }
    else{
        res.send({result:"No record found"})
    }
})

app.put("/update_product/:id", async(req, res)=>{
    let result = await Product.updateOne(
        {
            _id: req.params.id
        },
        {
            $set : req.body
        }
    )
    res.send(result);
})

app.get('/search/:key',async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    });
    res.send(result);
})

app.listen(1000);