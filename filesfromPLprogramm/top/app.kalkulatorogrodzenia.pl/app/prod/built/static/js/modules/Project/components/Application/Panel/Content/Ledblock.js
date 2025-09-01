import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import ColorsList from 'components/ui/ColorsList';
import OptionsList from 'components/ui/OptionsList';


class Ledblock extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.ledblocks;

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
			color: null,
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

		this.setState((prevState) => {
			let color;

			if (this.config[prevState?.group].models[id].colors[prevState?.color]) {
				color = prevState.color;
			} else {
				color = Objects.first(this.config[prevState?.group].models[id].colors);
			}

			return {
				model: id,
				color,
			};
		}, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectColor = (id) => {
		this.setState({ color: id }, () => {
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

					<h2>{___('Lampa LED BLOCK')}</h2>
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
					<OptionsList
						action={(id) => this.selectModel(id)}
						options={this.props.object.getModelsList(this.config[this.state.group].models)}
						value={this.state?.model}
					/>
				)}

				{(this.state.model && this.config[this.state.group].models[this.state.model]) && (
					<>
						<ColorsList
							action={(id) => this.selectColor(id)}
							title={___('Kolor')}
							options={this.config[this.state.group].models[this.state.model].colors}
							value={this.state?.color}
						/>
					</>
				)}
			</>
		);
	}
}


Ledblock.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Ledblock;