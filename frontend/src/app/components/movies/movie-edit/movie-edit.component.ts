import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit {
@Input("id") id!:string
ngOnInit() {
  this.loadMovie();
}
private loadMovie(){
  if(this.id){

  }
  else{

  }
}
}
