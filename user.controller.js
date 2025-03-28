import '../models/connection.js';
import url from 'url';
import jwt from 'jwtoken';
import userSchemaModel from '/user.model.js';

export const save=async(req,res)=>{
    var userList=await userSchemaModel.find();
    //console.log(userList);
    var len=userList.length;
    //console.log(len);
    var _id=(len==0)?1:userList[len-1]._id+1;
    //console.log(_id);
    var userDetail = req.body;
    //console.log(userDetail);
    //sprade operator are used to upend key values paring pervious object
    userDetail={...userDetail,"_id":_id,"Role":"User","Status":0,"Info":Date()};
    //console.log(userDetail);
    try{
    var user=await userSchemaModel.create(userDetail);
    res.status(201).json({"status":true});
    }
    catch(err)
    {
    res.status(500).json({"status":false});
    }
}

export const fetch=async(req,res)=>{
    var condition_obj=url.parse(req.url,true).query;
    //console.log(condition_obj);
    var user=await userSchemaModel.findOne(condition_obj);
    console.log(user);
    if(user)
    {
        res.status(200).json(user)
    }
    else
    {
        res.status(404).json({"msg":"resource not found"});
    }
}
export const update=async(req,res)=>{
    var users=await userSchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(users)
    {
        var userDetail=awaituserSchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set:(JSON.parse(req.body.content_obj))});
        if(userDetail)
        {
            res.status(200).json({"msg":"user update succesfull"});
        }
        else
        {
            res.status(500).json({"msg":"user not update succesfull"});
        }
    }
    else
    {
        res.status(404).json({"msg":"resource not found"});
    }
}
export const deleteUser=async(req,res)=>{
    var users=await userSchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(users)
    {
        var userDetail=awaituserSchemaModel.deleteOne(JSON.parse(req.body.condition_obj));
        if(userDetail)
        {
            res.status(200).json({"msg":"user delete succesfull"});
        }
        else
        {
            res.status(500).json({"msg":"user not delete succesfull"});
        }
    }
    else
    {
        res.status(404).json({"msg":"resource not found"});
    }
}
export const login=async(req,res)=>{
    var userDetail={...req.body,"status":1};
    //console.log(userDetail);
    var user=await userSchemaModel.find(userDetail);
    //console.log(user);
    if(user.length=0)
    {
        const payload={"subject":user[0].email};
        const key=rs.generate();
        const token=jwt.sign(payload,key);
        res.status(200).json({"status":"login successfully"});
    }
    else
    {
        res.status(500).json({"error":"login unsucessfully"});
    }
}