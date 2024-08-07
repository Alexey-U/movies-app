import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import man from '../images/man.png';
import woman from '../images/woman.png';
import { useGlobalContext } from "../context";

function ActorsContent() {
  const {actors} = useGlobalContext();



  function handleKnownFor(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].title) {
        result.push(arr[i].title);
      } else {
        result.push(arr[i].name);
      }
    }
    return result.join(', ').slice(0, 30) + '...';
  }

  return (
    <>
      <h1 style={{ color : 'white', textAlign : 'center' }} >Popular Actors</h1>
        <div className="actor-content">
        { actors !== null && actors[0].results.map((actor) => {
          var {id, name, profile_path, known_for, gender} = actor;
          var gen = (gender == 1) ? woman : man;
          profile_path = (profile_path !== null) ? "http://image.tmdb.org/t/p/w300/" + profile_path : gen;
          return (
            <Link to={`actor/${id}`} style={{ textDecoration : 'none' }}>
              <div key={id} className="movie-cast-wrapper">
                <img src={profile_path} width="250" height="350" style={{ borderRadius : '5px' }} alt={name} />
                <h2 style={{ textAlign : 'center' }} >{name}</h2>
                <p>{handleKnownFor(known_for)}</p>
              </div>
            </Link>
          );
        }) }
        </div>
    </>
  );
}

export default ActorsContent;
