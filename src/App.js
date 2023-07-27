import React, { useState } from 'react'
import './App.css'
import 'h8k-components'
import { Search } from './components/Search';
import { MovieForm } from './components/MovieForm';
import { MovieList } from './components/MovieList';

const title = 'Favorite Movie Directory'

const movieDurationComparer = (movie1, movie2) => {
  const duration1 = parseFloat(movie1.duration);
  const duration2 = parseFloat(movie2.duration);
  if (duration1 > duration2) {
    return -1;
  }
  if (duration2 > duration1) {
    return 1;
  }
  return 0;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const addMovie = (movie) => setMovies([...movies, movie]);
  const onQueryChange = (event) => {
    const query = event.target.value;
    if (!query || query.length < 2) {
      setQuery("");
      return;
    }
    setQuery(query);
  }

  const filteredAndSortedMovies = movies.filter(movie => movie.title.toLowerCase().startsWith(query.toLowerCase())).sort(movieDurationComparer);

  return (
    <div>
      <h8k-navbar header={title} />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <MovieForm onAddMovie={addMovie} />
        </div>
        <div className='layout-column w-30'>
          <Search onQueryChange={onQueryChange} />
          {filteredAndSortedMovies.length > 0 && <MovieList movies={filteredAndSortedMovies} query={query} />}
          {query.length > 1 && filteredAndSortedMovies.length === 0 && <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default App;
