//connection start
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rojkharido:rojkharido123@cluster0.inawa.mongodb.net/ecommerce?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true}
).then(()=>{
    console.log("server connected");
});
//connection end