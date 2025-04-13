import { Album } from "../models/album"
import { Track } from "../models/track"
import { cloudinary } from "../utils/cloudinary"
 
exports.getAlbums = async (req, res) => {
    const albums = await Album.find()
    res.json({
        status: 'success',
        albums
    })
}


exports.postAlbum = async (req, res) => {
    try {
        const { artist, description } = req.body;
        let albumImage = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Wavy/albumImages',
                resource_type: 'image'
            });
            albumImage = result.secure_url;
        }

        const newAlbum = new Album({
            artist: artist,
            description: description,
            albumImage: albumImage
        })
        await newAlbum.save()
        res.json({
            status: "success",
            message: "Album created successfully.",
            newAlbum
        })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}


exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
          }
        res.json({ status: "Success", album })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}


exports.getTracksByAlbumId = async (req, res) => {
    try {
        const albumTrack = await Track.find({albumId: req.params.id});
        if (!albumTrack) {
            return res.status(404).json({ message: "Album Tracks not found" });
          }
        res.json({ status: "Success", Tracks: albumTrack })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}