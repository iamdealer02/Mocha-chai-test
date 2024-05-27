const Note = require('../models/note.model');


exports.create = async (noteObj) => {
    try {
        if (!noteObj.title || !noteObj.content) {
            throw new Error('Title and content are required');
        }
        const { title, content } = noteObj;
        let note = new Note({
            title,
            content
        });
        return await note.save();

    } catch (error) {
        throw Promise.reject(error);
    }
    };
// get all notes

exports.findAll = async () => {
    try {
        return await Note.find();
    } catch (error) {
        throw Promise.reject(error);
    }
};

// get a single note
exports.findOne = async (id) => {
    try {
        return await Note.findById(id);
    } catch (error) {
        throw Promise.reject(error);
    }
};

// update a note
exports.update = async (id, noteObj) => {
    try {
        return await Note.findByIdAndUpdate
        (id, noteObj, { new: true });
    }
    catch (error) {
        throw Promise.reject(error);
    }
}

// delete a note
exports.delete = async (id) => {
    try {
        return await Note.findByIdAndDelete(id);
    } catch (error) {
        throw Promise.reject(error);
    }
}