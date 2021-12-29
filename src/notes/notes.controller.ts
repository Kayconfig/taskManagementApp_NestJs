import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/notes-createNote.dto';
import { UpdateNoteDto } from './dto/notes-updateNote.dto';
import { NoteI } from './notes.interface';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(@Body(ValidationPipe) createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Get()
  async getAllNotes(): Promise<NoteI[]> {
    return this.notesService.getNotes();
  }

  @Get('/:id')
  async getNoteById(@Param('id') id: string): Promise<NoteI> {
    return this.notesService.getNoteById(id);
  }

  @Put('/:id')
  async updateNote(
    @Param('id') id: string,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto,
  ): Promise<NoteI> {
    return this.notesService.updateNote(id, updateNoteDto);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<NoteI> {
    return this.notesService.deleteNote(id);
  }
}
