import React from 'react';
import PropTypes from 'prop-types';

import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import OptionsList from 'components/ui/OptionsList';


class Dimension extends React.Component {
	render() {
		return (
			<>
				<div className="title">
					{(!this.props.object.boundary) && (
						<ButtonOptions action={() => this.props.object.actions.remove()} type="remove" description={`${___('Usuń pomiar')} (DEL)`} />
					)}

					<h2>{___('Ustawienia pomiaru')}</h2>
				</div>

				{(!this.props.object.boundary) && (
					<OptionsList action={(id) => this.props.object.actions.type(id)} title={___('Typ')} options={this.props.object.typesList} value={this.props.object.config.type} />
				)}

				<OptionsList action={(id) => this.props.object.actions.position(id)} title={___('Pozycja')} options={this.props.object.getPositionsList()} value={this.props.object.config.position} />

				<OptionsList action={(id) => this.props.object.actions.align(id)} title={___('Wyrównanie')} options={this.props.object.alignsList} value={this.props.object.config.align} />
			</>
		);
	}
}


Dimension.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Dimension;