import { useEffect, useState } from 'react';
import { useGlobalContext } from "../context";
import { Link, useParams } from "react-router-dom";

function Show() {
  const {handleDate, handleGenres} = useGlobalContext();
  const {id} = useParams();
  const [show, setShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [teaser, setTeaser] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
      setShow([data]);
    });
  }, []);

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/tv/' + id + '/credits?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
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
    var url = 'https://api.themoviedb.org/3/tv/' + id + '/videos?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
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

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/tv/' + id + '/images?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
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
  }, []);

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

/*   if(images !== null){
    console.log(images);
  }
 */
  return (
    <>
      {show !== null && show.map((item) => {
            const {first_air_date, poster_path, name, genres, vote_average, overview} = item;
        return (
              <section key={id} className="movie-content">
                  <div className="movie-img">
                    <img src={"http://image.tmdb.org/t/p/w300/" + poster_path} alt="movie-logo" width="350" height="500" />
                  </div>
                  <div className="movie-data">
                    <h1>{name}</h1>
                    <p><span style={{ color : 'orangered' }}>rating {vote_average}</span> | <span style={{ color : 'green' }}>{handleDate(first_air_date)}</span> | {handleGenres(genres)}</p>
                    <p style={{ marginTop : '10px' }}>{overview}</p>
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
                    <button type="button" className="trailer-button"><a style={{ color : 'black'}} href={teaser !== null ? teaser : '#'} >Play Trailers</a></button>
                  </div>
              </section>
          );
      })}
      {/* <hr/> */}
      <h1 style={{ color : 'white', textAlign : 'center' }} >Cast</h1>
    <section className="movie-cast">
    { credits !== null && credits[0].cast.slice(0, 5).map((actor) => {
      const {credit_id, id, character, name, profile_path} = actor;
      return (
        <Link to={'/actor/' + id} style={{ textDecoration : 'none' }}>
          <div key={credit_id} className="movie-cast-wrapper">
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

export default Show;

