const Comentario = require('../models/comentarios');
const User = require('../models/user');

const addComment = async (req, res) => {
    const { userId } = req.params;
    const { comentario } = req.body;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.json({ mensaje: 'No se encuentra el usuario' });
        }

        const enviarComentario = new Comentario({
            correo: user.correo,
            comentario: comentario,
        });

        enviarComentario.save().then(() => res.json({ mensaje: 'Reseña enviada' }));
    } catch (error) {
        console.log('Error al agregar el comentario:', error);
        res.status(500).json({ mensaje: 'Error al agregar el comentario' });
    }
};

module.exports = addComment;
