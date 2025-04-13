const { Track } = require('../models/track')
const mm = require('music-metadata');
import { cloudinary } from "../utils/cloudinary"
const fs = require('fs');


function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

exports.postTrack = async (req, res) => {
    try {
        const { albumId, artist } = req.body;
        const trackImage = req.files['trackImage']?.[0];
        const audioFile = req.files['audio']?.[0];

        if (!audioFile) {
            return res.status(400).json({ status: 'failed', message: 'Audio file is required.' });
        }


        let trackImageUrl = null;
        let audioUrl = null;

        if (trackImage) {
            const uploadedImage = await cloudinary.uploader.upload(trackImage.path, {
                folder: 'Wavy/trackImages',
                resource_type: 'image',
            });
            trackImageUrl = uploadedImage.secure_url;

            fs.unlinkSync(trackImage.path); // Clean up local file
        }


        const uploadedAudio = await cloudinary.uploader.upload(audioFile.path, {
            folder: 'Wavy/audio',
            resource_type: 'video', // Treats audio as video
        });
        fs.unlinkSync(audioFile.path); // Clean up audio file


        audioUrl = uploadedAudio.secure_url;

        // duration
        const metadata = await mm.parseFile(audioPath);
        const durationInSeconds = metadata.format.duration;


        const newTrack = new Track({
            albumId: albumId,
            title: audioFile.orginalname,
            artist: artist,
            trackImage: trackImageUrl,
            audio: audioUrl,
            duration: formatDuration(durationInSeconds)
        })
        await newTrack.save()
        res.json({
            status: "success",
            message: "Track created successfully.",
            newTrack
        })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}

exports.getTrackById = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id).populate('albumId');
        if (!track) {
            return res.status(404).json({ message: "Track not found" });
        }
        res.json({ status: "Success", track })
    } catch (err) {
        res.json({
            status: "failed",
            message: err
        })
    }
}