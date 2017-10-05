import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom'
import Musician from '../client/Musician.jsx'
import Composer from '../client/Composer.jsx'
import Login from './Login.jsx'
import Forum from './Forum.jsx'
import Navigation from './Navigation.jsx'

ReactDOM.render((
  <BrowserRouter>
    <Navigation>
      <Route path="/" exact={true} component={Composer} />
      <Route path="/forum" component={Forum} />
    </Navigation>
  </BrowserRouter>
), document.getElementById('app'));
