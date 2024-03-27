import { TryCatch } from "../middlewares/error.js";
import { Password } from "../models/password.js";
import { ErrorHandler } from "../utils/utility-class.js";


export const newPassword = TryCatch(async(req,res,next)=>{
      
      const {_id, site, username, password} = req.body;

      console.log(`
         _id: ${_id}
         site: ${site}
         username: ${username}
         password: ${password}
      `)

      if(!_id || !site || !username || !password) return next(new ErrorHandler("Not provided fields", 400));
 
      const pass = await Password.create({
             _id, site, username, password
      });
      return res.status(200).json({
           success: true,
           message: "password created successfully",
          
      });
});


export const allPassword = TryCatch(async(req,res,next)=>{
      
      const passwords = await Password.find({});
      return res.status(200).json({
            success: true,
            passwords
       });``
});


export const getSingle = TryCatch(async(req,res,next)=>{
      const id = req.params.id;
    
      if(!id) return next(new ErrorHandler("Id is not provided", 400));

      const pass = await Password.findById({_id: id});

      if(!pass) return next(new ErrorHandler("Password not found", 400));

      return res.status(200).json({
            success: true,
            pass
       });
});


export const del = TryCatch(async(req,res,next)=>{
      
      const id = req.params.id;
    
      if(!id) return next(new ErrorHandler("Id is not provided", 400));

      const pass = await Password.findById({_id: id});

      if(!pass) return next(new ErrorHandler("Password not found", 400));

      const deletedPassword = await pass.deleteOne();
      
      return res.status(200).json({
            success: true,
            password: deletedPassword
       });
});


export const update = TryCatch(async (req, res, next) => {
      const id = req.params.id;
  
      if (!id) return next(new ErrorHandler("Id is not provided", 400));
  
      const pass = await Password.findById(id);
  
      if (!pass) return next(new ErrorHandler("Invalid Id", 400));
  
      const { site, username, password } = req.body;
      const updatePassword = {};
  
      if (site) updatePassword.site = site;
      if (username) updatePassword.username = username;
      if (password) updatePassword.password = password;
  
      await pass.updateOne(updatePassword); // Await the update operation
  
      return res.status(200).json({
          success: true,
      });
  });
  
