import { RouterLink } from '@angular/router';
import { Movie } from '../../../common/interfaces';
import { MovieService } from './../../../services/movie.service';
import { Component, inject } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons/faTrashCan";
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
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

    protected readonly faTrashCan = faTrashCan;

    protected deleteMovie(movie:Movie){
      if(confirm('Delete movie'+ movie.title+'?')){
        this.movieService.deleteMovie(movie._id).subscribe({
          next: value => {
            console.log(value);
          },
          error: err => {
            console.error(err);
          }
        })
      }
    }
  }


