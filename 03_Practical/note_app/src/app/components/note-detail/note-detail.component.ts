import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.note = this.notesService.getNoteById(id);
    if (!this.note) {
      this.router.navigate(['/']);
    }
  }
} 