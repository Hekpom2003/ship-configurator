import React from 'react';

class WrongRoleError extends React.Component {
	render(){
		return (
			<div style={{color: 'red', fontWeight: 'bold'}}>
				Неправильная группа пользователей.
				Обратитесь к администратору или смените аккаунт.
			</div>
		);
	}
}

export default WrongRoleError;