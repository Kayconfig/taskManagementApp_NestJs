import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TasksModule, NotesModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
