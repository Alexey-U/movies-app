import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

function TVshowsContent() {
  const {handleDate, handleGenres, moviesGenre, mainTvShowsContent, handleMoviesContent} = useGlobalContext();

  return (
    <section className="movies-content">
        <div className="genres-list">
            <h2 className="movies-content-popular" onClick={() => handleMoviesContent('popular', 'tv')} >POPULAR TV SHOWS</h2>
 {/*            <h2 className="movies-content-upcoming" onClick={() => handleMoviesContent('today', 'tv')} >AIRING TODAY TV SHOWS</h2> */}
            <h2 className="movies-content-top" onClick={() => handleMoviesContent('top', 'tv')} >TOP-RATED MOVIES</h2>
        </div>
        <div className="movies-block-wrapper">
       { mainTvShowsContent !== null && moviesGenre !== null && mainTvShowsContent.results.map((movie) => {
            const {id, name, vote_average, genre_ids, poster_path, first_air_date} = movie;
            return (
                <Link key={id} to={`/show/${id}`}>
                <div className="movie-block">
                    <img src={"http://image.tmdb.org/t/p/w300/" + poster_path} width="250" height="350" alt="Logo" />
                    <div className="movie-block-title">{name}</div>
                    <div className="movie-block-rating-date"><span style={{ color : 'orangered' }}>Rating {vote_average}</span>  <span style={{ color : 'olivegreen' }}>{handleDate(first_air_date)}</span></div>
                    <div className="movie-block-ganre">{handleGenres(genre_ids)}</div>
                </div> 
                </Link>
            );
        }) }
        </div>
    </section>
  );
}

export default TVshowsContent;
