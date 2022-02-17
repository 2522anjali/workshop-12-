const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./users');

const DB ="mongodb+srv://anjalikushwaha:anjali2522@cluster0.os5gc.mongodb.net/mongodb?retryWrites=true&w=majority"

 const db = mongoose.connection
 db.once('open', async() => {
     if(await User.countDocuments().exec() > 0)return
     Promise.all([
        User.create({ name : 'Anjali',
                    email:'anjali25@gmail.com',
                    address:'kankhal',
                    message:'1'}),
        User.create({ name : 'Abhi',
                    email:'abbhi25@gmail.com',
                    address:'shivaliknagar',
                    message:'2'}),
        User.create({ name : 'ayush',
                    email:'ayush22@gmail.com',
                    address:'kankhal1',
                    message:'3'}),
        User.create({ name : 'Abhishek',
                    email:'abhishek85@gmail.com',
                    address:'BHEL',
                    message:'4'}),
        User.create({ name : 'chavi',
                    email:'anjali22@gmail.com',
                    address:'kankhal',
                    message:'5'}),
        User.create({ name : 'durga',
                    email:'dk@gmail.com',
                    address:'ddun',
                    message:'6'}),
        User.create({ name : 'rohit',
                    email:'rohit23@gmail.com',
                    address:'delhi',
                    message:'7'}),
        User.create({ name : 'aniket',
                    email:'aniket12@gmail.com',
                    address:'haryana',
                    message:'8'}),
        User.create({ name : 'JAy',
                    email:'jay5@gmail.com',
                    address:'patna',
                    message:'9'}),
        User.create({ name : 'Dipesh',
                    email:'dip23@gmail.com',
                    address:'ranchi',
                    message:'10'})
     ]).then(() => console.log('Added Users'))
 })

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('no connection'));


app.get('/users',paginatedResults(User),(req,res) => {
    res.json(res.paginatedResults)
});


function paginatedResults(model){
    return async(req, res, next) => {
        const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1)*limit
    const endIndex = page * limit
     
   const results ={}
    
   if(endIndex < await model.countDocuments().exec()){
   results.next = {
       page: page + 1,
       limit: limit
        }
    }
    if(startIndex>0){
   results.previous = {
    page: page - 1,
    limit: limit
        }
    }
    try{
        results.results =model.find()
        .sort({
            message:1,
        })
        .limit(5).skip(1).exec()
        res.paginatedResults = results
        next()
    }catch(e) {
        res.status(500).json({ message: e.message})
    }
  }
}
app.listen(443)