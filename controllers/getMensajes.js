const Comentario = require('../models/comentarios');


const getMensajes = async (req, res) => {
    
    
    await Comentario.find().then((mensajes) =>{
        if(mensajes){
            res.json(mensajes);
        }else{
            res.json({mensaje: "No se encontraron mensajes"})
        }
    })
};

module.exports = getMensajes;
