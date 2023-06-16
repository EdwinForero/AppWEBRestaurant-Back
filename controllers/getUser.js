const User = require('../models/user');

const getUserById = async (req,res) =>{

    const {id} = req.params;

    if(id.length === 24){
        User.findById(id).then(user =>{
        if(!user){
            return res.json({mensaje : "No se ha encontrado ese usuario"})    
        }else{
            const { _id, contraseña, __v, ...resto } = user._doc;
            res.json(resto);
        }
        
        });
    }else{
        res.json({ mensaje: "No existe tal id"});
    }
}

module.exports = getUserById;