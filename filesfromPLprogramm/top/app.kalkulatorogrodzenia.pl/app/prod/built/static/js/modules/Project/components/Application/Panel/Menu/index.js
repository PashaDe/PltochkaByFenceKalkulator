import React from 'react';

import container from 'redux/container';

import { ___ } from 'classes/Translation';

import Button from './Button';


class Menu extends React.Component {
	render() {
		return (
			<section className="menu">
				<Button action={() => container.app.extensions.storage.save(true)} text={___('Zapisz')} description={[___('Zapisz projekt'), '(F9)'].join(' ')} />
				<Button action={() => container.app.actions.clear()} text={___('Wyczyść')} description={___('Usuń wszystkie słupki i przęsła')} />
				<Button action={() => container.app.actions.reset()} text={___('Zresetuj')} description={___('Zmień system i zacznij projekt od nowa')} />
				<Button action={() => window.location.replace('/')} text={___('Zamknij')} description={___('Wróć do listy projektów')} />
			</section>
		);
	}
}


export default Menu;