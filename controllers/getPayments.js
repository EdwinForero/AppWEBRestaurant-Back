const Bill = require('../models/Bill');

const getPayments = async (req,res) =>{

    const esta = await Bill.find();
    if(esta){
       res.json({esta});
    }else{
       res.json({mensaje: "no existe"});
    }

}

module.exports = getPayments;