import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {AuthProvider} from './context/auth'
import AuthRoute from './AuthRouter'

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Nav from './components/Nav';
import Posts from './components/pages/Posts';
import SinglePost from './components/pages/SinglePost'
import SingleUser from './components/pages/SingleUser';
import followPost from './components/pages/followPost'
function App() {
  return (
  <AuthProvider>
   <Router>
     <Nav/>
     <Route exact path='/' component={Home}/>
     <AuthRoute exact path='/login' component={Login}/>
     <AuthRoute exact path='/register' component={Register}/>
     <Route exact path='/post' component={Posts}/>
     <Route exact path='/posts/:postId' component={SinglePost}/>
     <Route exact path='/users/:username' component={SingleUser}/>
     <Route exact path='/follow' component={followPost}/>
   </Router>
   </AuthProvider>
  );
}

export default App;
