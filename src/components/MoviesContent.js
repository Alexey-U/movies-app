import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

function MoviesContent() {
    const {handleDate, handleGenres, moviesGenre, mainContent, handleMoviesContent} = useGlobalContext();

  return (
    <section className="movies-content">
        <div className="genres-list">
            <h2 className="movies-content-popular" onClick={() => handleMoviesContent('popular', 'movie')} >POPULAR MOVIES</h2>
            <h2 className="movies-content-upcoming" onClick={() => handleMoviesContent('upcoming', 'movie')} >UPCOMING MOVIES</h2>
            <h2 className="movies-content-top" onClick={() => handleMoviesContent('top', 'movie')} >TOP-RATED MOVIES</h2>
        </div>
        <div className="movies-block-wrapper">
       { mainContent !== null && moviesGenre !== null && mainContent.results.map((movie) => {
            const {id, title, vote_average, genre_ids, poster_path, release_date} = movie;
            return (
                <Link key={id} to={`/movie/${id}`}>
                <div key={id} className="movie-block">
                    <img src={"http://image.tmdb.org/t/p/w300/" + poster_path} width="250" height="350" alt="Logo" />
                    <div className="movie-block-title">{title.slice(0, 36)}</div>
                    <div className="movie-block-rating-date"><span style={{ color : 'orangered' }}>Rating {vote_average}</span>  <span style={{ color : 'olivegreen' }}>{handleDate(release_date)}</span></div>
                    <div className="movie-block-ganre">{handleGenres(genre_ids)}</div>
                </div> 
                </Link>
            );
        }) }
        </div>
    </section>
  );
}

export default MoviesContent;
