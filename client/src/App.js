import { useEffect, useRef, useState } from 'react';
import Movie from './components/Movie';
import { URL_MOVIES, URL_MOVIES_SEARCH } from './Api';

const App = () => {
  const [movies, setMovies] = useState([])
  const searchEl = useRef(null)

  useEffect(()=>{
    fetchData(URL_MOVIES);
  },[])

  const fetchData = (URL) => {
    fetch(URL).then((response)=>{
      return response.json()
    }).then((data)=>{
      setMovies(data);
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const search = searchEl.current.value;

    if(search){
      fetchData(URL_MOVIES_SEARCH + search)
    }else{
      fetchData(URL_MOVIES);
    }
  }

  return(
    <>
    <div className="header">
      <form onSubmit={onSubmitHandler}>
        <input className="header-search" type="search" placeholder="Search" ref={searchEl}/>
      </form>
    </div>

    <div className="movie-container">
      {movies.map((movie) => (
        <Movie key={ movie.id } {...movie} />
        ))}
    </div>
    </>
  )
}

export default App;