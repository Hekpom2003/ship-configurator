import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.scss';

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <div className="container-fluid">
          <div className="navigation">
          <ul className="navigation__main-menu main-menu">
            <li><Link to={'/'}>Главная</Link></li>
            <li><Link to={'/crouises/'}>Круизы</Link></li>
            <li><Link to={'/about/'}>О нас</Link></li>

          </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;