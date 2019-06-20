const express= require('express');
const app= express();
const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
const cookieParser= require('cookie-parser');
const morgan= require('morgan');
const usersRouter= require('./routes/usersRouter');
const errorHandler=require('./middleware/errorHandler');
const path = require('path');
//const DB_URL = 'mongodb://localhost:27017/dciProject';
const DB_URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0-wuxiw.mongodb.net/finalProject`;

const PORT= process.env.PORT || 4000;
mongoose.set('useNewUrlParser', true);

app.listen(PORT, async()=>{
    try{
        console.log(`Server is listening to Port ${PORT}`);
        console.log('Seconds before connecting to DB');
        await mongoose.connect(DB_URL);
        console.log('Connected to Atlas DB');
        //await mongoose.connect(DB_URL);
        //console.log('Connected to local DB');
    }catch(error){
        console.log(error);
    }
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/users', usersRouter);

app.use(express.static('browser/build'));
 app.get('*', (req, res, next) => {
      res.sendFile(path.resolve('browser', 'build', 'index.html'));
    })
    
//if (process.env.NODE_ENV === 'production') {
    //app.use(express.static('browser/build'));
  
   // app.get('*', (req, res, next) => {
     // res.sendFile(path.resolve('browser', 'build', 'index.html'));
    //})
 // }


app.use(errorHandler);
