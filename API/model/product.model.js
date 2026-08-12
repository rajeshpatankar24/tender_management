import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';
const productSchema = mongoose.Schema({
    _id : Number,
    title:{
        type:String,
        required:[true,"Title is required"],
        lowercase:true,
        trim:true
    },
    catnm:{
        type:String,
        required:[true," Category name is required"],
        lowercase:true,
        trim:true,
    },
    subcatnm:{
        type:String,
        required:[true,"Sub category name  is required"],
        lowercase:true,
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        trim:true
    },
    
     piconnm:{
        type:String,
        required:[true," subcategory icon name is required"],
        trim:true
    },
    baseprice:Number,
    uid:String,
    tenderNumber:{
        type:String,
        uppercase:true,
        trim:true
    },
    startDate:{
        type:String,
        trim:true
    },
    endDate:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        default:'draft',
        lowercase:true,
        trim:true
    },
    location:{
        type:String,
        trim:true
    },
    info:String
});
// apply the uniqueValidater plugin to ProductSchema.
productSchema.plugin(uniqueValidator);
// compile schema to model
const TenderSchemaModel = mongoose.model('tenders_collection', productSchema);

export default TenderSchemaModel;