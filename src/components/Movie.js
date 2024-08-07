import { useEffect, useState } from 'react';
import { useGlobalContext } from "../context";
import { Link, useParams } from "react-router-dom";

function Movie() {
  const {handleDate, handleGenres} = useGlobalContext();
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [teaser, setTeaser] = useState(null);

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
      setMovie([data]);
    });
  }, []);

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
      setCredits([data]);
    });
  }, []);

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
    setTrailer(data.results);
    });
    getTrailerKey();
  }, []);

/*   useEffect(() => {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '/images?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
    setImages(data);
    });
  }, []); */

  function getTrailerKey() {
    if(trailer !== null) {
      for (let i = 0; i < trailer.length; i++) {
        if(trailer[i].type === 'Trailer'){
           setTeaser('https://www.youtube.com/watch?v=' + trailer[i].key + '');
           break;
        }
      }
    }
  }

/*   if(credits !== null) {
    console.log(credits);
  } */


  return (
    <>
      {movie !== null && movie.map((item) => {
        const {title, overview, vote_average, genres, poster_path, release_date} = item;
        return (
              <section key={id} className="movie-content">
                  <div className="movie-img">
                    <img src={"http://image.tmdb.org/t/p/w300/" + poster_path} alt="movie-logo" width="350" height="500" />
                  </div>
                  <div className="movie-data">
                    <h1>{title}</h1>
                    <p>rating {vote_average} | {handleDate(release_date)} | {handleGenres(genres)}</p>
                    <p>{overview}</p>
                    <h4 style={{ marginLeft : '0px' }}>Featured Cast</h4>
                    <div className="featured-cast-wrapper">
                      { credits !== null && credits[0].crew.slice(0, 2).map((crew) => {
                        const {id, name, department} = crew;
                        return (
                          <div key={id} className="featured-cast">
                          <span>{name}</span><br/>
                          <span style={{ color : 'lightgray', fontSize : '13px' }}>{department}</span>
                        </div>
                        );
                      })
                      }
                    </div>
                    <button type="button" className="trailer-button"><a style={{ color : 'black'}} href={teaser ? teaser : '#'} >Play Trailers</a></button>
                  </div>
              </section>
          );
      })}
      {/* <hr/> */}
      <h1 style={{ color : 'white', textAlign : 'center' }} >Cast</h1>
    <section className="movie-cast">
    { credits !== null && credits[0].cast.slice(0, 5).map((actor) => {
      const {cast_id, id, character, name, profile_path} = actor;
      return (
        <Link to={'/actor/' + id} style={{ textDecoration : 'none' }}>
          <div key={cast_id} className="movie-cast-wrapper">
            <img src={"http://image.tmdb.org/t/p/w300/" + profile_path} width="250" height="350" style={{ borderRadius : '5px' }} alt={name} />
            <h2 style={{ textAlign : 'center' }} >{name}</h2>
            <p>{character}</p>
          </div>
        </Link>
      );
    }) }
    </section>

{/*     <section className="movie-images">
      <img src="bg.jpg" alt="/" />
    </section> */}
    </>
  );
}

export default Movie;

/* 
здесь должен быть объект фильма.
onClick будет срабатывать useEffect.

нужно будет использовать id фильма для запроса к базе.
*/