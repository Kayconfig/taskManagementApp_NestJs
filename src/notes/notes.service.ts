import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/notes-createNote.dto';
import { UpdateNoteDto } from './dto/notes-updateNote.dto';
import { NoteI } from './notes.interface';
import { v4 } from 'uuid';

@Injectable()
export class NotesService {
  private notes: NoteI[] = [];
  private indexes: { [key: string]: number } = {};

  async createNote(createNoteDto: CreateNoteDto): Promise<NoteI> {
    const { title, body } = createNoteDto;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const id = v4();
    const newNote = { id, title, body, createdAt, updatedAt };
    this.notes.push(newNote);
    //update index
    this.indexes[id] = this.notes.length - 1;
    return newNote;
  }

  async getNotes(): Promise<NoteI[]> {
    return this.notes;
  }
  async getNoteById(id: string): Promise<NoteI> {
    const noteIndex = this.indexes[id];
    if (noteIndex === undefined) {
      throw new NotFoundException('Unable to get Note. Note id not found.');
    }
    return this.notes[noteIndex];
  }
  async updateNote(id: string, updateNoteDto: UpdateNoteDto): Promise<NoteI> {
    const { title, body } = updateNoteDto;
    const noteIndex = this.indexes[id];
    if (noteIndex === undefined) {
      throw new NotFoundException('Unable to update note. Note id not found');
    }
    const note = this.notes[noteIndex];
    title && (note.title = title);
    body && (note.body = body);
    //update the update time;
    note.updatedAt = new Date().toISOString();

    return note;
  }

  async deleteNote(id: string): Promise<NoteI> {
    const noteIndex = this.indexes[id];
    if (noteIndex === undefined) {
      throw new NotFoundException('Unable to delete note. Note id not found.');
    }
    const deletedNote = this.notes.splice(noteIndex, 1)[0];
    delete this.indexes[id];
    return deletedNote;
  }
}
