import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './header.scss';

// TODO: add auth HOC
const Header = ({ location }) => (
  <div className="Header">
    <div className="container">
      <div className="row">
        <div className="col-2">
          {/* <img src={logo} className="Header__logo" alt="logo" /> */}
        </div>
        <div className="col-7">
          <ul className="Header__Navigation clearfix">
            <li className={classNames({ Header__Nav: true, 'nav--active': location.pathname === '/settings' })}>
              <Link to="/settings" className="Header__Link">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Header;
