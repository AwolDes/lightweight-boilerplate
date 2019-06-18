import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import Header from './common/components/ui/header';
import Login from './login';
import Signup from './signup';
import Settings from './settings';
import * as serviceWorker from './serviceWorker';

import './common/scss/global.scss';
import NotFound from './common/components/ui/NotFound';
import configureStore from './store/configureStore';

const store = configureStore();

const hasHeader = Component => props => (
  <>
    <div>
      <Header {...props} />
    </div>
    <Component {...props} />
  </>
);

render(
  <Provider store={store}>
    {/* eslint-disable-next-line */}
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/settings" component={hasHeader(Settings)} />
        <Route exact path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'), // eslint-disable-line
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
