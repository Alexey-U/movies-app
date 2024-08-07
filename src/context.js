import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US';

  const [moviesGenre, setMoviesGenre] = useState(null);
  const [mainContent, setMainContent] = useState(null);
  const [mainTvShowsContent, setMainTvshowsContent] = useState(null);
  const [actors, setActors] = useState(null);
  // const [scrollY, setScrollY] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getActors();
  }, []);

  useEffect(() => {
    fetch(genreUrl)
    .then(response => {
        if(response) {
            return response.json();
        } else {
            console.log('Something is not ok...');
        }
    }).then(data => {
        setMoviesGenre(data);
    });
}, []);


function getActors(actorsPage = 1) {
  var url = 'https://api.themoviedb.org/3/person/popular?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US&page=' + actorsPage;
  fetch(url)
  .then(response => {
      if(response) {
          return response.json();
      } else {
          console.log('Something is not ok...');
      }
  }).then(data => {
    setActors([data]);
  });
}


function getMainContent(url_str, mode, page = 1) {
  var url = 'https://api.themoviedb.org/3/' + mode + '/' + url_str + '?api_key=05463ed4a6aac723213aadd8e561d9f3&language=en-US&page=' + page;
    
  fetch(url)
  .then(response => {
      if(response) {
          return response.json();
      } else {
          console.log('Something is not ok...');
      }
  }).then(data => {
      if(mode === 'movie') {
          setMainContent(data);
      }
      if(mode === 'tv') {
        setMainTvshowsContent(data);
      }
  });
}

useEffect(() => {
    getMainContent('popular', 'movie');
    getMainContent('popular', 'tv');
}, []);

/* useEffect(() => {
  console.log(scrollY);
  if(scrollY > 2650) {
    setPage(page + 1);
    getMainContent('popular', 'movie', page);
    getMainContent('popular', 'tv', page);
    setScrollY(0);
  } else {
    getMainContent('popular', 'movie');
    getMainContent('popular', 'tv');
  }
}, [scrollY]); */

const handleDate = (str) => {
  if(str !== null && str !== undefined) {
    let month =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    str = str.split('-');
    return month[parseInt(str[1])-1] + ' ' + str[2] + ', ' + str[0];
  }
}

const handleGenres = (arr) => {
  let result = ''; 
  if(moviesGenre !== null) {
    for (let i = 0; i < moviesGenre.genres.length; i++) {
      if(arr.indexOf(moviesGenre.genres[i].id) > -1) {
        result += moviesGenre.genres[i].name + ', ';
      }
    }
    return result.slice(0, -2);
  }

}

const handleMoviesContent = (str, mode) => {
  if(str === 'popular') {
      if(mode === 'movie') {
          getMainContent('popular', 'movie');
      }
      if(mode === 'tv') {
          getMainContent('popular', 'tv');
      }
      document.body.querySelector('.movies-content-popular').style.color = "red";
      document.body.querySelector('.movies-content-top').style.color = "orange";
      // document.body.querySelector('.movies-content-upcoming').style.color = "orange";
  }
  if(str === 'top') {
      if(mode === 'movie') {
          getMainContent('top_rated', 'movie');
      }
      if(mode === 'tv') {
          getMainContent('top_rated', 'tv');
      }
      document.body.querySelector('.movies-content-popular').style.color = "orange";
      document.body.querySelector('.movies-content-top').style.color = "red";
      // document.body.querySelector('.movies-content-upcoming').style.color = "orange";
  }
  if(str === 'upcoming') {
      if(mode === 'movie') {
          getMainContent('upcoming', 'movie');
      }
      if(mode === 'tv') {
          getMainContent('upcoming', 'tv');
      }
      document.body.querySelector('.movies-content-popular').style.color = "orange";
      document.body.querySelector('.movies-content-top').style.color = "orange";
      // document.body.querySelector('.movies-content-upcoming').style.color = "red";
  }

  if(str === 'today') {
    if(mode === 'movie') {
        getMainContent('latest', 'movie');
    }
    if(mode === 'tv') {
        getMainContent('latest', 'tv');
    }
    document.body.querySelector('.movies-content-popular').style.color = "orange";
    document.body.querySelector('.movies-content-top').style.color = "orange";
    // document.body.querySelector('.movies-content-upcoming').style.color = "red";
  }
}



/* function logit() {
  setScrollY(window.pageYOffset);

}

useEffect(() => {
  function watchScroll() {
    window.addEventListener("scroll", logit);
  }
  watchScroll();
  return () => {
    window.removeEventListener("scroll", logit);
  };
}); */






/* 2700 */

  return (
    <AppContext.Provider
      value={{ handleDate, handleGenres, moviesGenre, getMainContent, mainContent, mainTvShowsContent, handleMoviesContent, actors, getActors }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
