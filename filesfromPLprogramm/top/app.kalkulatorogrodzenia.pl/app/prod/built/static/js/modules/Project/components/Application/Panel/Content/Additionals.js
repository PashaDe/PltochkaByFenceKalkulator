import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';


class Additionals extends React.Component {
	render() {
		return (
			<>
				<div className="title">
					<ButtonOptions action={() => { panelActions.set('pole', this.props.object.config, this.props.object); }} type="prev" description={___('Wróć')} />

					<h2>{___('Dodatki')}</h2>
				</div>

				{(container.app.getSystem().adds.mailboxes) && (
					<>
						<button onClick={() => panelActions.set('mailbox', this.props.object.additionals.mailbox.config, this.props.object.additionals.mailbox)}>{___('Skrzynki na listy')}</button><br />
					</>
				)}

				{(container.app.getSystem().adds.lamps) && (
					<>
						<button onClick={() => panelActions.set('lamp', this.props.object.additionals.lamp.config, this.props.object.additionals.lamp)}>{___('Lampy')}</button><br />
					</>
				)}

				{(container.app.getSystem().adds.ledblocks) && (
					<>
						<button onClick={() => panelActions.set('ledblock', this.props.object.additionals.ledblock.config, this.props.object.additionals.ledblock)}>{___('Lampy LED BLOCK')}</button><br />
					</>
				)}
			</>
		);
	}
}


Additionals.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Additionals;