import '../model/connection.js';// mongodb connection
import url from 'url';
import path from 'path';
import categorySchemaModel from '../model/category.model.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export const save = async (req, res) => {
  var cList = await categorySchemaModel.find();
  var l = cList.length;
  var _id = l == 0 ? 1 : cList[l - 1]._id + 1; // for dynamic id increment
  const file = req.files.caticon;
  // console.log(file);
  var caticonnm = file.name;
  const filePath = path.join(__dirname, '../../tender-new/public/assets/uploads/caticons', caticonnm);
  const cDetails = { ...req.body, "_id": _id, 'caticonnm': caticonnm }
  try {
    await categorySchemaModel.create(cDetails)
    res.status(201).json({ "status": true });
    file.mv(filePath)
  }
  catch (error) {
    res.status(500).json("false")
  }
}

export const fetch = async (req, res) => {
  let condition_obj = url.parse(req.url, true).query.condition_obj;
  const category = await categorySchemaModel.find(condition_obj);
  if (category.length != 0)
    res.status(200).json(category);
  else
    res.status(400).json("resource not found");


}

export const update = async (req, res) => {
  var cList = await categorySchemaModel.find(JSON.parse(req.body.condition_obj));
  if (cList) {
    let category = await categorySchemaModel.updateOne(JSON.parse(req.body.condition_obj), { $set: (JSON.parse(req.body.content_obj)) });
    if (category)
      res.status(200).json("success");
    else
      res.status(500).json("server error");
  }
  else
    res.status(400).json("Resource is not found");
}

export const deleteCat = async (req, res) => {
  var cList = await categorySchemaModel.findOne(JSON.parse(req.body.condition_obj));

  if (cList) {
    let category = await categorySchemaModel.deleteOne(JSON.parse(req.body.condition_obj));
    if (category)
      res.status(200).json("success");
    else
      res.status(500).json("server error");
  }
  else
    res.status(400).json("Resource not found");
}

// rest api working Thankyou 


