import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Notes from "./pages/Notes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/layout/Navbar";
import Home from './pages/Home';
import User from './pages/User';
import Login from './components/auth/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-776841.okta.com/oauth2/default"
          client_id="0oact37i2avpSlUB6356"
          redirect_uri={window.location.origin + '/implicit/callback'}
          >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/notes" exact={true} component={Notes} />
              <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-776841.okta.com" />
                )}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>


        <div>      
      <Switch>
        <Route exact path="/" component={Notes} />
        <Route exact path="/notes" component={Notes} />
        <Route exact path="/notes/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>

      </Router>
    );
  }
}



export default App;
