import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  newNote: Omit<Note, 'id'> = {
    name: '',
    content: '',
    createdDate: new Date()
  };
  editingNote: Note | null = null;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  saveNote() {
    if (this.editingNote) {
      this.notesService.updateNote({
        ...this.editingNote,
        ...this.newNote
      });
      this.editingNote = null;
    } else {
      this.notesService.addNote(this.newNote);
    }
    this.resetForm();
  }

  editNote(note: Note) {
    this.editingNote = note;
    this.newNote = {
      name: note.name,
      content: note.content,
      createdDate: note.createdDate
    };
  }

  deleteNote(id: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(id);
    }
  }

  cancelEdit() {
    this.editingNote = null;
    this.resetForm();
  }

  private resetForm() {
    this.newNote = {
      name: '',
      content: '',
      createdDate: new Date()
    };
  }
} 