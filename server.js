var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var path=require("path");
var Category=require("./models/vehicle_category");
var Vechicle=require("./models/vehicle_data");
var multer=require("multer");



mongoose.connect("mongodb://localhost:27017/vehicledb")

var urlencoder=bodyparser.urlencoded({extended:true});

const storage=multer.diskStorage({
    destination:"./uploads/",
    filename:function(err,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    }
})

const upload=multer({storage:storage});
//set up template engine
app.set('view engine','hbs');
app.use('/uploads',express.static("uploads"));
app.set('views',path.join(__dirname,"views"))
app.use(bodyparser.json())


app.get("/AddProduct",(req,res)=>{
    Category.find({},(err,data)=>{
    if(err) throw err;
    res.render('add',{data:data});
    })
})


app.post("/AddProduct",upload.single("image"),urlencoder,(req,res)=>{
    const totalPrice=parseFloat(((req.body.price)-(req.body.depreciation))/req.body.years);
    var newVechicle=new Vechicle({
        vehicleBrand:req.body.brand,
        categoryName:req.body.category,
        vehiclePicture:req.file.filename,
        Price:req.body.price,
        depreciation:req.body.depreciation,
        NumberOfYears:req.body.years,
        TotalPrice:totalPrice
    }).save((err,data)=>{
        if(err) throw err;
        res.redirect('/list');
    })
})

app.get("/list",(req,res)=>{
    Vechicle.find({},(err,data)=>{
        if(err) throw err;
        res.render('list',{listData:data});
    })
})

app.listen(8000);
console.log('You are listening to port 8000')