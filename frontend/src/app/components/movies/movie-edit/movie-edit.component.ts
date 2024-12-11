import { Component, inject, Input, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  NgForm,
  FormControl,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../common/interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css',
})
export class MovieEditComponent implements OnInit {
  @Input('id') id!: string;
  private readonly movieService: MovieService = inject(MovieService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  formMovie: FormGroup = this.formBuilder.group({
    _id: [],
    title: ['', [Validators.required, Validators.minLength(2)]],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1880), Validators.max(new Date().getFullYear())]],
    director: [''],
    plot: [''],
    genres: [],
    poster: [],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0],
    }),
  });
  movie!: Movie;
  genresList: string[] = [];
  myNewGenre: FormGroup = this.formBuilder.group({
    newGenre: [''],
  });

  ngOnInit() {
    this.loadMovie();
  }

  get title(): any {
    return this.formMovie.get('title');
  }
  get year(): any {
    return this.formMovie.get('year');
  }
  get director(): any {
    return this.formMovie.get('director');
  }
  get plot(): any {
    return this.formMovie.get('plot');
  }
  get poster(): any {
    return this.formMovie.get('poster');
  }
  get genres(): any {
    return this.formMovie.get('genres');
  }
  get imdb(): any {
    return this.formMovie.get('imdb');
  }
  get rating(): any {
    return this.formMovie.get('imdb.rating');
  }
  get votes(): any {
    return this.formMovie.get('imdb.votes');
  }
  get newGenre(): any {
    return this.myNewGenre.get('newGenre');
  }

  private loadMovie() {
    if (this.id) {
      this.editar = true;
      this.movieService.getMovie(this.id).subscribe({
        next: (value) => {
          this.formMovie.setValue(value.status);
        },
        complete: () => {
          console.log('Movie loaded successfully');
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.formMovie.reset();
      this.editar = false;
    }
    this.movieService.getGenres().subscribe({
      next: (value) => {
        console.log(value);
        this.genresList = value.status;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Genres loaded');
      },
    });
  }

  protected readonly Date: DateConstructor = Date;
  editar = false;
  addMovie() {
    if (this.editar) {
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigateByUrl('/movies/list');
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigateByUrl('/movies/list');
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  addNewGenre() {
    let newGenres = this.genres.value;
    if(!this.editar){
      this.genresList.push(this.newGenre.value);
    }else{
      newGenres = this.genres.value;
      newGenres.push(this.newGenre.value);
      this.genresList.push(this.newGenre.value);
      this.formMovie.setControl(
        'genres', new FormControl(newGenres)

      )
    }
    this.myNewGenre.reset();
  }
}
