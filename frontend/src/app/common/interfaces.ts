export interface ApiResponsesMovies {
    status: Movie[]
  }

  export interface ApiResponsesMovie {
    status: Movie
  }
  
  
  export interface Movie {
    imdb: Imdb
    _id: string
    title: string
    year: number
    director: string
    plot: string
    genres: string[]
    poster: string
  }
  
  export interface Imdb {
    rating: number
    votes: number
  }
  