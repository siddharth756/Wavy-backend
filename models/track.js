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

let Track;

if (mongoose.models.Track) {
  Track = mongoose.models.Track;  // Use the existing model if it exists
} else {
  Track = mongoose.model('Track', trackSchema);  // Create the model if it doesn't exist
}

module.exports = { Track };