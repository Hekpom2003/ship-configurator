import React from 'react';
import Logo from './images/logo-new17.png';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.scss';

class Header extends React.Component {
  render() {
    const date = moment().locale('ru').format('DD.MM.YYYY');


    return (
      <header>
        <div className="container-fluid">
          <div className="header-top">
            <ul className="header-top__menu header-top-menu">
              <li><Link to={'/catalog/'}>Речные круизы</Link></li>
              <li><Link to={'/catalog/'}>Круизы класса Люкс</Link></li>
              <li><Link to={'/catalog/'}>Морские круизы</Link></li>
            </ul>
            <div className="header-top__course-valutes">Курс на {date}:</div>
            <div className="header-top__get-status">Проверить статус заказа</div>
            <div className="header-top__auth">Личный кабинет</div>
          </div>
        </div>
        <div className="header-middle">
          <div className="header-middle__logo">
            <img src={Logo} alt=""/>
          </div>
          <div className="header-middle__text">
          </div>
        </div>
      </header>
    );
  }
}

export default Header;