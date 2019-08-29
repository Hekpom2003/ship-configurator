import React from 'react';
import Logo from './images/logo-new17.png';
import {Link} from 'react-router-dom';
import moment from 'moment';
import './Header.scss';
import {connect} from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	
	
	render() {
		const date = moment().locale('ru').format('DD.MM.YYYY');
		
		let login = <Link to={'/user-account/login/'}>Вход в ЛК</Link>;
		if (this.props.auth.auth && this.props.auth.isClient) {
			login = <Link to={"/ship-configurator/"}>Личный кабинет</Link>;
		} else if (this.props.auth.auth && this.props.auth.isPassenger) {
			login = <Link to={"/user-account/"}>Личный кабинет</Link>;
		}
		
		return (
			<header>
				<div className="container-fluid" style={{backgroundColor: '#064e901a'}}>
					<div className="header-top">
						<ul className="header-top__menu header-top-menu">
							<li><Link to={'/catalog/'}>Речные круизы</Link></li>
							<li><Link to={'/catalog/'}>Круизы класса Люкс</Link></li>
							<li><Link to={'/catalog/'}>Морские круизы</Link></li>
						</ul>
						<div className="header-top__course-valutes">Курс на {date}:</div>
						<div className="header-top__get-status">Проверить статус заказа</div>
						<div className="header-top__auth">{login}</div>
					</div>
				</div>
				<div className="container-fluid">
					<div className="header-middle">
						<div className="header-middle__logo">
							<img src={Logo} alt=""/>
						</div>
						<div className="header-middle__text">
						</div>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateProp = state => ({
	auth: state.authentication,
});

const mapDispachProps = dispatch => {
	return {
		// _setDataFromServer: data => dispatch({ type: SHIP_EDIT__SET_ITEM, payload: data }),
		
	}
};

export default connect(mapStateProp, mapDispachProps)(Header);