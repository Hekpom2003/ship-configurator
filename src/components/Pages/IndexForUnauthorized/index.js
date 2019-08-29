import React from 'react';

class IndexForUnauthorized extends React.Component {
	render(){
		return (
			<div className="index index-for-clients">
				Главная для всех.
				Вы не вошли в аккаунт и можете только смотреть на статические страницы или авторизоваться.
			</div>
		);
	}
}

export default IndexForUnauthorized;