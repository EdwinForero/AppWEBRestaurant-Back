const User = require('../models/user');

const editprofile = async (req, res) => {

    const { userId } = req.params;
    const { nombre ,contraseña, contraseñaConf } = req.body;

   
    const esta = await User.findById(userId);

    if(esta){
        if(contraseña === contraseñaConf){
            await User.updateOne({_id: userId}, { contraseña: contraseña });
            await User.updateOne({_id: userId}, { nombre: nombre });
            res.json({mensaje : "Información Actualizada con exito "});
        }else{
            res.json({mensaje : "Las contraseñas no coinciden"});
        }
    }else{
            res.json({mensaje : "No se pudo actualizar su perfil, intente de nuevo"});
    }





}


module.exports = editprofile;
