const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    title: {
        type: String,
        required: [true,"title required."]
    },
    artist: {
        type: String,
        default: "Unknown Artist"
    },
    trackImage: {
        type: String,
        required: [true, "trackImage required."]
    },
    audio: {
        type: String,
        required: [true,"audio required."]
    },
    duration: {
        type: String
    }
},{timestamps: true});

exports.Track = mongoose.model('Track',trackSchema)