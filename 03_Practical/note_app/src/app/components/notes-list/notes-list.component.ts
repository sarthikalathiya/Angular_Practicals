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
    createdDate: new Date(),
    status: 'default'
  };
  editingNote: Note | null = null;
  deletingNoteId: number | null = null;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  saveNote() {
    // Trim whitespace from name and content
    const trimmedName = this.newNote.name.trim();
    const trimmedContent = this.newNote.content.trim();

    // Check if either field is empty after trimming
    if (!trimmedName || !trimmedContent) {
      alert('Note title and content cannot be empty');
      return;
    }

    // Update the newNote with trimmed values
    this.newNote.name = trimmedName;
    this.newNote.content = trimmedContent;

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
      createdDate: note.createdDate,
      status: note.status
    };
  }

  deleteNote(id: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.deletingNoteId = id;
      setTimeout(() => {
        this.notesService.deleteNote(id);
        this.deletingNoteId = null;
      }, 300);
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
      createdDate: new Date(),
      status: 'default'
    };
  }
} 