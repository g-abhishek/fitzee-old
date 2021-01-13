import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'


import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import DefaultLayout from './components/DefaultLayout/DefaultLayout';

function App() {

  

  return (
    <Router>
      <React.Suspense>
      <Switch>
        {/* both will work */}
        {/* <Route path="/" name="home" render={props => <DefaultLayout />} /> */}
        

        <Route  path="/logout" name="logout" component={Login} />
        {/* <Route exact="true" path="/login" name="login" component={Login} /> */}
        {/* <Route exact path="/login" name="login" render={props => <Login {...props}/>}/>         */}
        <Route path="/forgot" name="forgot" component={ForgotPassword} />
        {/* <Redirect from="/" to="/home" /> */}
        {/* {localStorage.fitzeeNekot ? <DefaultLayout /> : <Login />} */}
        {localStorage.fitzeeNekot ? <Login /> : <DefaultLayout />}
        <Route path="/" name="Home" component={DefaultLayout} />
      </Switch>
      
      </React.Suspense>
      
    </Router>
    
  );
}

export default App;
