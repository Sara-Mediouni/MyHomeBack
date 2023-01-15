const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const PORT=process.env.PORT||3000
const AnnonceRoutes=require('./routes/AnnonceRoutes')
const UserRoutes=require('./routes/UserRoutes')
const BrouillonRoutes=require('./Routes/BrouillonRoutes.js')
const app=express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
const uri="mongodb+srv://Sara:admin@cluster0.cxqyjam.mongodb.net/myhome?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser : true,
    useUnifiedTopology: true });
const db=mongoose.connection
db.on('error',(err)=>{
    console.log(err);
})
db.once('open',()=>{
    console.log('Database Connection established !')
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.use('/api/annonce',AnnonceRoutes)
app.use('/api/user',UserRoutes)
app.use('/api/brouillon',BrouillonRoutes)
app.use('/images',express.static('images'))

console.log(__dirname)
