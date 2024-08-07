import { useEffect, useState } from 'react';
import { BiCameraMovie } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useGlobalContext } from '../context';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Header() {
    const {mainContent} = useGlobalContext();
    const [searchText, setSearchText] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [circleLoader, setCircleLoader] = useState(true);
    const [searchResults, setSearchResults] = useState(false);

useEffect(() => {
    if(mainContent !== null) {
        handleSearch();
    }
}, [searchText]);

    function handleSearch(mode = 'movie') {
        let result = [];
        if(searchText.length > 0){
            document.body.querySelector('.search-list').style.opacity = "1";
            if(mode === 'movie') {
                // из mainContent мы должны взять poster_path и название.
                for (let i = 0; i < mainContent.results.length; i++) {
                    if(mainContent.results[i].title.substr(0, searchText.length).toLowerCase() === searchText.toLowerCase()) {
                        result.push({'id' : mainContent.results[i].id,'title' : mainContent.results[i].title, 'poster_path' : mainContent.results[i].poster_path});
                    }
                }
                // setFoundMovies(result);
                if(result.length > 0) {
                    setTimeout(() => { setFoundMovies(result); }, 2000);
                }
            } else {
                            // нужно определить какой объект вызываем.
            }
            setCircleLoader(false);
            setTimeout(() => { setCircleLoader(true); }, 2000);
            if(result.length === 0) {
                setTimeout(() => { setSearchResults(true); }, 1000);
                setTimeout(() => { setSearchResults(false); setSearchText(''); }, 3000);
            }
        } else {
            document.body.querySelector('.search-list').style.opacity = "0";
            setFoundMovies([]);
        }
    }

  return (
    <>
    <header className="movies-header">
        <div className="movies-logo">
            <div><Link to="/">< BiCameraMovie size={70} color={'green'} /></Link></div>
            <div><span style={{ color : 'orange', fontWeight : '800' }}>Movies</span><span style={{ color : 'red', fontWeight : '800' }}>App</span></div>
        </div>
        <ul className="pages-list">
            <li>
                <Link to="/">Movies</Link>
            </li>
            <li>
                <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li>
                <Link to="/actors">Actors</Link>
            </li>
        </ul>
        <div className="movies-search">
            <input type="text" placeholder="search" autoFocus={true} value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleSearch} onBlur={() => setSearchText('')} />
            { circleLoader === false && <Loader type="Puff" color="#00BFFF" height={20} width={20} className="circle-loader" /> } 
            <div className="search-list">
                <ul>
                    { foundMovies !== [] && foundMovies.map((movie) => {
                        const {id, title, poster_path} = movie;
                        return (
                            <Link key={id} to={'/movie/' + id} style={{ textDecoration : 'none', color : 'white', margin : '0px' }}>
                            <li className="movie-search-link"><img src={"http://image.tmdb.org/t/p/w300/" + poster_path} width="40" height="55" alt="logo" /> <span style={{ marginLeft : '10px' }}>{title}</span></li>
                            <hr/>
                            </Link>
                        );
                    })}
                    { searchResults === true && <li style={{ color : 'white', textAlign:'center' }}><span style={{ color:'white' }}>No results...</span></li> }
                </ul>
            </div>
        </div>
    </header>
    <hr/>
    </>
  );
}

export default Header;


/* 



*/