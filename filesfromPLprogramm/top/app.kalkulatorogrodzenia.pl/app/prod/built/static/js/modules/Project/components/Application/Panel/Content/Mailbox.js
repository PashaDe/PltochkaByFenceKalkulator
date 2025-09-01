import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import ColorsList from 'components/ui/ColorsList';
import FlexList from 'components/ui/FlexList';
import OptionsList from 'components/ui/OptionsList';


class Mailbox extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.mailboxes;

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
			frame: '',
			roof: '',
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

	selectFrame = (id) => {
		this.setState({ frame: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectRoof = (id) => {
		this.setState({ roof: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectSide = (id) => {
		this.setState({ side: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	getAdditionalList = (id) => {
		let output = [];

		output[''] = ___('Nie');

		if (this.config[this.state.group].models[this.state.model].additionals[id]) {
			output[this.config[this.state.group].models[this.state.model].additionals[id].model] = ___('Tak');
		}

		return output;
	}

	render() {
		return (
			<>
				<div className="title">
					{(this.state.model) && (
						<ButtonOptions action={() => this.clear()} type="remove" description={___('Usuń')} />
					)}

					<ButtonOptions action={() => { panelActions.set('additionals', null, this.props.object.target); }} type="prev" description={___('Wróć')} />

					<h2>{___('Skrzynka na listy')}</h2>
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

				{(this.state.model) && (
					<>
						<ColorsList
							action={(id) => this.selectColor(id)}
							title={___('Kolor')}
							options={this.config[this.state.group].models[this.state.model].colors}
							value={this.state?.color}
						/>

						{(this.config[this.state.group].models[this.state.model].additionals.frame && !this.config[this.state.group].models[this.state.model].additionals.frame.auto) && (
							<div className="option">
								<h3>{___('Maskownica')}</h3>

								<FlexList
									action={(id) => this.selectFrame(id)}
									options={this.getAdditionalList('frame')}
									value={this.state?.frame}
									align="half"
								/>
							</div>
						)}

						{(this.config[this.state.group].models[this.state.model].additionals.roof && !this.config[this.state.group].models[this.state.model].additionals.roof.auto) && (
							<div className="option">
								<h3>{___('Daszek')}</h3>

								<FlexList
									action={(id) => this.selectRoof(id)}
									options={this.getAdditionalList('roof')}
									value={this.state?.roof}
									align="half"
								/>
							</div>
						)}

						<div className="option">
							<h3>{___('Strona')}</h3>

							<FlexList
								action={(id) => this.selectSide(id)}
								options={{ front: ___('Przód'), back: ___('Tył') }}
								value={this.state?.side}
								align="half"
							/>
						</div>
					</>
				)}
			</>
		);
	}
}


Mailbox.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Mailbox;