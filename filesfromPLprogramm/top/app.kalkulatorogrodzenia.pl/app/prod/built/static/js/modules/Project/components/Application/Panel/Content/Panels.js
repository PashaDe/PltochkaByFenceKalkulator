import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import OptionsList from 'components/ui/OptionsList';


class Panels extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.panels;

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
			height: null,
		}, () => {
			this.props.object.actions.set(this.state);
			this.componentDidMount();
		});
	}

	selectGroup = (id) => {
		if (id === this.state.group) return;

		this.setState(() => ({
			group: id,
			model: null,
			height: null,
		}), () => {
			this.props.object.actions.set(this.state);
			this.componentDidMount();
		});
	}

	selectModel = (id) => {
		if (id === this.state.model) return;

		this.setState((prevState) => ({
			model: id,
			height: (this.config[prevState.group].models[id].heights[prevState.height]) ? prevState.height : Objects.first(this.config[prevState.group].models[id].heights),
		}), () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectHeight = (id) => {
		this.setState({ height: id }, () => {
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

					<ButtonOptions action={() => { panelActions.set('wall', this.props.object.wall.config, this.props.object.wall); }} type="prev" description={___('Wróć')} />

					<h2>{___('Ustawienia paneli')}</h2>
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
						options={this.config[this.state.group].models}
						value={this.state?.model}
					/>
				)}

				{(this.state.model) && (
					<>
						<OptionsList
							action={(id) => this.selectHeight(id)}
							title={___('Wysokość')}
							options={this.config[this.state.group].models[this.state.model].heights}
							value={this.state?.height}
						/>
					</>
				)}
			</>
		);
	}
}


Panels.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Panels;