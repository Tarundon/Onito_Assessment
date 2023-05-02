const express = require('express');
require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./model/User')
const app = express();
const bodyParser = require('body-parser')
app.use(cors());

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));

const url = process.env.MONGO_URL;

app.post('/register', async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        dob: req.body.DOB,
        gender: req.body.gender,
        mobile: req.body.mobile,
        govtIdType: req.body.govtIdType,
        govtIdNumber: req.body.govtIdNumber,
        guardianTitle: req.body.guardianTitle,
        guardianName: req.body.guardianName,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
        pincode: req.body.pincode,
        nationality: req.body.nationality,
      });
      const userSave = await user.save();
      res.status(200).send(userSave);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });
  
  app.get('/register',async(req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json({
            status: 'success',
            data: {
                user : user
            }
        })
    }catch(err){
        res.send("Error : " + err.message);
    }
  })


const PORT = process.env.PORT || 9000

const connectDB = async () => {
    const conn = await mongoose.connect(url);
  
    console.log(`MongoDB Connected: ${conn.connection.host}...!!!`);
  }

connectDB();
  

app.listen(PORT, () => {
    console.log(`Server listening at : ${PORT}`);
})