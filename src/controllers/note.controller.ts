import { Inote } from 'src/interface/note.interface';
import { HydratedDocument } from 'mongoose';
import { Note } from 'src/models/note.model';

export const create = async (noteObj: Inote): Promise<Inote> => {
  if (!noteObj || !noteObj.title || !noteObj.content) {
    throw new Error('Title and content are required');
  }
  try {
    const { title, content } = noteObj;
    const note: HydratedDocument<Inote> = new Note({
      title,
      content,
    });
    return await note.save();
  } catch (error) {
    throw Promise.reject(error);
  }
};
// get all notes

export const findAll = async (): Promise<Inote[]> => {
  try {
    return await Note.find();
  } catch (error) {
    throw Promise.reject(error);
  }
};

// get a single note
export const findOne = async (id: string): Promise<Inote | null> => {
  if (!id) throw new Error('Note id is required');
  try {
    return await Note.findById(id);
  } catch (error) {
    throw Promise.reject(error);
  }
};

// update a note
export const update = async (
  id: string,
  noteObj: Inote,
): Promise<Inote | null> => {
  if (!id) throw new Error('Note id is required');
  if (!noteObj || !noteObj.title || !noteObj.content) {
    throw new Error('Title and content are required');
  }
  try {
    return await Note.findByIdAndUpdate(id, noteObj, { new: true });
  } catch (error) {
    throw Promise.reject(error);
  }
};

// delete a note
export const deleteNote = async (id: string) => {
  if (!id) throw new Error('Note id is required');
  try {
    return await Note.findByIdAndDelete(id);
  } catch (error) {
    throw Promise.reject(error);
  }
};
