import { RouterLink } from '@angular/router';
import { Movie } from '../../../common/interfaces';
import { MovieService } from './../../../services/movie.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: MovieService = inject(MovieService);
  movies: Movie[] = [];
  constructor(){
    this.loadMovies();}
    
    private loadMovies(){
      this.movieService.getMovies().subscribe(
        {
          next: value =>{
            this.movies=value.status;
          },
          complete: () => {
            console.log('Movie loaded succesfully');
          },
          error: err => {
            console.error(err.message);
          },
        }
      )
    }
  }


