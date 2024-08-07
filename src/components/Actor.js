import { useEffect, useState } from 'react';
import { useGlobalContext } from "../context";
import { Link, useParams } from "react-router-dom";

function Show() {
  const {handleDate, actors} = useGlobalContext();
  const {id} = useParams();
  const [actor, setActor] = useState(null);
  const [knownFor, setKnownFor] = useState(null);
  // const [actorMovieCredits, setActorMovieCredits] = useState(null);

  useEffect(() => {
    if(actors !== null) {
      // то есть нам нужно расширить поиск актера (мы можем искать актера из 20-ки) 
      const new_actor = actors[0].results.filter((actor) => {
        return parseInt(actor.id) === parseInt(id);
      });
      setKnownFor(new_actor);
    }
  }, [id]);

  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/person/' + id + '?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US&append_to_response=known_for';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
      setActor(data);
    });
  }, []);
/* 
  useEffect(() => {
    var url = 'https://api.themoviedb.org/3/find/' + id + '?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';
    fetch(url)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
      setActorMovieCredits(data);
    });
  }, []); */


  if(actor !== null) {
    console.log(actor);
  }

  return (
      <>
    {actor !== null &&
    <section className="single-actor">
        <div className="single-actor-img">
            <img src={"http://image.tmdb.org/t/p/w300/" + actor.profile_path} alt="logo" />
        </div>
        <div className="single-actor-description">
            <h1>{actor.name}</h1>
            <p>{handleDate(actor.birthday)} | {actor.place_of_birth}</p>
            <p style={{ maxWidth : '1000px' }}>{actor.biography}</p>
            <h5 style={{ color: 'orange' }}>Known For</h5>
            <div className="single-actor-known-for">
                { knownFor !== null && knownFor[0] !== undefined && knownFor[0].known_for.map((movie) => {
                    const {id, poster_path, title, name} = movie;
                    return (
                      <Link key={id} to={"/movie/" + id}>
                        <div className="sa-known-for-wrapper" key={id}>
                            <img style={{borderRadius : '5px'}} width="150" height="200" src={"http://image.tmdb.org/t/p/w300/" + poster_path} alt={title ? title : name} />
                            <h6 style={{ color : 'white', textAlign : 'center', marginTop : '0px' }}>{title ? title.slice(0, 30) : name.slice(0, 30)}</h6>
                        </div>
                      </Link>
                    );
                })}
            </div>
        </div>
    </section>
}
</>
  );
}

export default Show;

