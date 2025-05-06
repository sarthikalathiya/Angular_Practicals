import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [
    {
      id: 1,
      name: 'Shopping List',
      content: 'Milk, Bread, Eggs, Vegetables',
      createdDate: new Date('2025-03-10'),
      status: 'default'
    },
    {
      id: 2,
      name: 'Meeting Notes',
      content: 'Discuss project timeline and requirements',
      createdDate: new Date('2025-03-10'),
      status: 'default'
    },
    {
      id: 3,
      name: 'Ideas',
      content: 'New app features and improvements',
      createdDate: new Date('2025-03-10'),
      status: 'default'
    },
    {
      id: 4,
      name: 'Todo List',
      content: 'Complete project documentation',
      createdDate: new Date('2025-03-10'),
      status: 'default'
    },
    {
      id: 5,
      name: 'Books to Read',
      content: '1. The Pragmatic Programmer\n2. Clean Code\n3. Design Patterns',
      createdDate: new Date('2025-03-10'),
      status: 'default'
    }
  ];

  private notesSubject = new BehaviorSubject<Note[]>(this.notes);

  getNotes() {
    return this.notesSubject.asObservable();
  }

  addNote(note: Omit<Note, 'id'>) {
    const newNote = {
      ...note,
      id: this.notes.length > 0 ? Math.max(...this.notes.map(n => n.id)) + 1 : 1,
      status: 'new' as const
    };
    this.notes = [...this.notes, newNote];
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note) {
    this.notes = this.notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, status: 'updated' } : note
    );
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: number) {
    this.notes = this.notes.map(note => 
      note.id === id ? { ...note, status: 'deleted' } : note
    );
    this.notesSubject.next(this.notes);
  }

  getNoteById(id: number) {
    return this.notes.find(note => note.id === id);
  }
} 