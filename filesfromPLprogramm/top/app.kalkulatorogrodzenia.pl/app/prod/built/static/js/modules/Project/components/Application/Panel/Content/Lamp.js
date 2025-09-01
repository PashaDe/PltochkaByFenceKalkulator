import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import ColorsList from 'components/ui/ColorsList';
import OptionsList from 'components/ui/OptionsList';


class Lamp extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.lamps;

		this.state = this.props.object.config;
	}

	componentDidMount = () => {
		if (Objects.count(this.config) === 1) {
			this.selectGroup(Objects.first(this.config));
		}
	}

	clear = () => {
		this.setState({
			group: null,
			model: null,
		}, () => {
			this.props.object.actions.set(this.state);
			this.componentDidMount();
		});
	}

	selectGroup = (id) => {
		this.setState({ group: id });
	}

	selectModel = (id) => {
		if (id === this.state.model) return;

		this.setState({
			model: id,
		}, () => {
			this.props.object.actions.set(this.state);
		});
	}

	render() {
		return (
			<>
				<div className="title">
					{(this.state.model) && (
						<ButtonOptions action={() => this.clear()} type="remove" description={___('Usuń')} />
					)}

					<ButtonOptions action={() => { panelActions.set('additionals', null, this.props.object.target); }} type="prev" description={___('Wróć')} />

					<h2>{___('Lampa')}</h2>
				</div>

				{(Objects.count(this.config) > 1) && (
					<OptionsList
						action={(id) => this.selectGroup(id)}
						title={___('Grupa')}
						options={this.config}
						value={this.state?.group}
					/>
				)}

				{(this.state.group) && (
					<ColorsList
						action={(id) => this.selectModel(id)}
						options={this.props.object.getModelsList(this.config[this.state.group].models)}
						value={this.state?.model}
					/>
				)}
			</>
		);
	}
}


Lamp.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Lamp;