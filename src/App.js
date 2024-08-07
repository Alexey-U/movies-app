import './index.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import MoviesContent from './components/MoviesContent';
import Movie from './components/Movie';
import Show from './components/Show';
import Actor from './components/Actor';
import TVshowsContent from './components/TVshowsContent';
import ActorsContent from './components/ActorsContent';
import Error from './pages/Error';
import Footer from './components/Footer';

function App() {
  return (
  <Router>
    <Header />
      <Switch>
        <Route exact path="/">
          <MoviesContent />
          <Footer />
        </Route>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/tv-shows">
          < TVshowsContent />
          <Footer />
        </Route>
        <Route path="/show/:id">
          < Show />
        </Route>
        <Route path="/actors">
          < ActorsContent />
          <Footer />
        </Route>
        <Route path="/actor/:id">
          < Actor />
        </Route>
        <Route path="*">
          < Error />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;


/* 
Что я хочу сделать?
	- 

Проблемы
- при попытке перейти на фильм из поиска, срабатывает onBlur, и переход не происходит.
- при нажатии на кнопку увеличения страницы, она не срабатывает с первого раза.
- добавить фото(общее) если нет фото актера.
*/