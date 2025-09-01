import React from 'react';

import container from 'redux/container';

import { ___ } from 'classes/Translation';

import Button from './Button';


class ToolbarMain extends React.Component {
	render() {
		return (
			<section className="toolbar-main">
				<div>
					<Button action={() => container.app.actions.addPole()} type="pole" description={___('Dodaj słupek')} />
					<Button action={() => container.app.actions.addCurtain()} type="curtain" description={___('Dodaj mur')} />
					<Button action={() => container.app.actions.addWicket()} type="wicket" description={___('Dodaj furtkę')} />
					<Button action={() => container.app.actions.addGate()} type="gate" description={___('Dodaj bramę')} />
					<Button action={() => container.app.actions.addSpace()} type="space" description={___('Dodaj przerwę')} />
					<Button action={() => container.app.actions.setPanel('episode')} type="episode" description={___('Dodaj odcinek')} />
				</div>
			</section>
		);
	}
}


export default ToolbarMain;