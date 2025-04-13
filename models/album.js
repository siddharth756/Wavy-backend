const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    albumImage: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

albumSchema.pre('remove', async function (next) {
    try {
        await Track.deleteMany({ albumId: this._id });
        next();
    } catch (err) {
        next(err);
    }
})


exports.Album = mongoose.model('Album', albumSchema);