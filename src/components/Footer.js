import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useGlobalContext } from '../context';

function Footer() {
    const {mainContent, getMainContent, getActors} = useGlobalContext();
    const [pageNumber, setPageNumber] = useState(1);
    const [actorsPageNumber, setActorsPageNumber] = useState(1);
    const [tvPageNumber, setTvPageNumber] = useState(1);

    const pageIncrease = () => {
        if(window.location.pathname === '/') {
            if(pageNumber < 500) setPageNumber(pageNumber +1);
            getMainContent('popular', 'movie', pageNumber);
        }
        if(window.location.pathname === '/tv-shows') {
            if(tvPageNumber < 500) setTvPageNumber(tvPageNumber +1);
            getMainContent('popular', 'tv', tvPageNumber);
        }
        if(window.location.pathname === '/actors') {
            if(actorsPageNumber < 500) setActorsPageNumber(actorsPageNumber +1);
            getActors(actorsPageNumber);
        }
    }

    const pageDecrease = () => {
        if(window.location.pathname === '/') {
            if(pageNumber > 1) setPageNumber(pageNumber - 1);
            getMainContent('popular', 'movie', pageNumber);
        }
        if(window.location.pathname === '/tv-shows') {
            if(tvPageNumber > 1) setTvPageNumber(tvPageNumber - 1);
            getMainContent('popular', 'tv', tvPageNumber);
        }
        if(window.location.pathname === '/actors') {
            if(actorsPageNumber > 1) setActorsPageNumber(actorsPageNumber - 1);
            getActors(actorsPageNumber);
        }
    }

    // console.log(window.location.pathname);

  return (
    <>
    <footer className="movies-footer">
        <div className="pagination-buttons">
            {/* { pageNumber > 1 &&  */}<button type="button" onClick={pageDecrease}>{'<'}</button>{/* } */}
            {/* { pageNumber < 500 &&  */}<button type="button" onClick={pageIncrease}>{'>'}</button>{/*  } */}
        </div>
    </footer>
    </>
  );
}

export default Footer;

