import { Component, inject, Input, NgModule, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, NgForm, FormControl} from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../common/interfaces';
@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit {
@Input("id") id!:string;
private readonly movieService: MovieService = inject(MovieService);
private readonly formBuilder: FormBuilder = inject(FormBuilder);
formMovie: FormGroup = this.formBuilder.group({
  _id:[],
  title: [''],
  year:[new Date().getFullYear()],
  director: [''],
  plot: [''],
  genres: [],
  poster: [],
  imdb: this.formBuilder.group({
    rating:[0],
    votes: [0]
  })
});
movie!: Movie;

ngOnInit() {
  this.loadMovie();
}

get title(): any {
  return this.formMovie.get('title')
}
get year(): any {
  return this.formMovie.get('year')
}
get director(): any {
  return this.formMovie.get('director')
}
get plot(): any {
  return this.formMovie.get('plot')
}
get poster(): any {
  return this.formMovie.get('poster')
}
get genres(): any {
  return this.formMovie.get('genres')
}
get imdb(): any {
  return this.formMovie.get('imdb')
}
get rating(): any {
  return this.formMovie.get('imdb.rating')
}
get votes(): any {
  return this.formMovie.get('imdb.votes')
}



private loadMovie(){
  if(this.id){ 
    this.editar= true;
    this.movieService.getMovie(this.id).subscribe({next: value =>{
      this.formMovie.setValue(value.status)
    },
    complete: () =>
    {
      console.log('Movie loaded successfully')
    },
    error: err => {
      console.error(err);
    }
  })
 
    

  }
  else{
    this.formMovie.reset();
    this.editar= false;
  }
}

protected readonly Date:DateConstructor = Date;
myNewGenre: FormGroup = this.formBuilder.group({
  newGenre: ['']
});
editar = false;
protected addMovie(){

}

protected addNewGenre(){
  let newGenres = this.genres.value;
  newGenres.push(this.myNewGenre.get('newGenres')?.value);
  this.formMovie.setControl(
    'genres',
    new FormControl(newGenres)
  );
  this.myNewGenre.reset();

}
}
