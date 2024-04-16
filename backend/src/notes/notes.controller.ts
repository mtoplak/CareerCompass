import { Controller, Get, Post, Body, Query, Patch, Param, Delete, ValidationPipe } from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Note } from './entities/note.entity'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body(new ValidationPipe({ whitelist: true })) createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto)
  }

  @Get()
  findAll(@Query() query: { skip: number; take: number }): Promise<{ items: Note[]; count: number }> {
    return this.notesService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ item: Note }> {
    return this.notesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe({ whitelist: true })) updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id)
  }
}
