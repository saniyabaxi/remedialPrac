var mongoose=require("mongoose");

var VehicleDataSchema=mongoose.Schema({
    vehicleBrand:{type:String},
    categoryName:{type:mongoose.Schema.Types.String,ref:'Category'},
    vehiclePicture:{type:String},
    Price:{type:Number},
    depreciation:{type:Number},
    NumberOfYears:{type:Number},
    TotalPrice:{type:Number}
});



module.exports=mongoose.model('VehicleData',VehicleDataSchema);