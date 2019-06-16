const express= require('express');
const app= express();
const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
const cookieParser= require('cookie-parser');
const morgan= require('morgan');
const usersRouter= require('./routes/usersRouter');
const errorHandler=require('./middleware/errorHandler');

const PORT= process.env.PORT || 4000;
mongoose.set('useNewUrlParser', true);

app.listen(PORT, async()=>{
    try{
        console.log(`Server is listening to Port ${PORT}`);
        console.log('Seconds before connecting to DB');
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to local DB');
        //console.log('Connected to Atlas DB');
    }catch(error){
        console.log(error);
    }
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/users', usersRouter);



app.use(errorHandler);
