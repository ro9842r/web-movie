import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieListService } from '../../services/movie-list.service';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputText,
    DropdownModule,
  ],
  templateUrl: './create-movie-list.component.html',
  styleUrls: ['./create-movie-list.component.scss'],
  providers: [MessageService],
})
export class CreateMovieListComponent implements OnInit {
  movieListForm!: FormGroup;
  genres: any[] = [];

  @Output() movieListCreated = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly movieService: MovieService,
    private readonly movieListService: MovieListService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.movieListForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      genreId: [null, Validators.required],
    });
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getMovieGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (err) => {
        console.error('Error loading genres', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar gêneros.',
        });
      },
    });
  }

  onSubmit(): void {
    if (this.movieListForm.valid) {
      const selectedGenre = this.genres.find(
        (genre) => genre.id === this.movieListForm.value.genreId
      );
      if (!selectedGenre) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Gênero selecionado inválido.',
        });
        return;
      }

      const createDto = {
        ...this.movieListForm.value,
        genreName: selectedGenre.name,
      };

      this.movieListService.createList(createDto).subscribe({
        next: (response) => {
          console.log('Movie list created successfully', response);
          this.movieListForm.reset();
          this.movieListCreated.emit();
          this.router.navigate(['/movie-lists', response.id]);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Lista de filmes criada com sucesso!',
          });
        },
        error: (err) => {
          console.error('Error creating movie list', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao criar lista de filmes.',
          });
        },
      });
    }
  }
}
