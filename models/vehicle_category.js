var mongoose=require("mongoose");

var vehicleCategorySchema=mongoose.Schema({
    categoryName: String
})

module.exports=mongoose.model('Category',vehicleCategorySchema);