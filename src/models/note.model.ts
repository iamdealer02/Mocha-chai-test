// models/Note.js

import { Inote } from 'src/interface/note.interface';
import { Schema, model } from 'mongoose';

const noteSchema = new Schema<Inote>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Note = model<Inote>('Note', noteSchema);
