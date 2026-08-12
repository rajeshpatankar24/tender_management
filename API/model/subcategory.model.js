
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const subSchema = mongoose.Schema({
_id:Number,
catnm:{
    type:String,
    required:[true,"category name is reqiured"],
    trim:true,
    

},
subcatnm:{
    type:String,
    required:[true,"sub category name is reqiured"],
    trim:true,
    unique:true
},
subcaticonnm:
{
    type:String,
    required:[true,"sub category icon name is reqiured"],
    trim:true
},
subcategoryCode:{
    type:String,
    uppercase:true,
    trim:true
},
description:{
    type:String,
    trim:true
},
status:{
    type:String,
    default:'active',
    lowercase:true,
    trim:true
}
});

subSchema.plugin(uniqueValidator);

 const subSchemaModel=mongoose.model('subcategory-collection',subSchema);
 export default subSchemaModel;