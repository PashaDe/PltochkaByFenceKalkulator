import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Helper from 'classes/Tools/Helper';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ColorsList from 'components/ui/ColorsList';
import FlexList from 'components/ui/FlexList';
import OptionsList from 'components/ui/OptionsList';


class Wicket extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.wickets;

		this.state = this.props.object.config;
	}

	componentDidMount = () => {
		if (Objects.count(this.config) === 1) {
			this.selectGroup(Objects.first(this.config));
		}
	}

	clear = () => {
		this.setState({
			status: false,
			group: null,
			system: null,
			variant: null,
			space: null,
			color: null,
		}, () => {
			this.props.object.actions.set(this.state);
			this.componentDidMount();
		});
	}

	selectGroup = (id) => {
		if (id === this.state.group) return;

		this.setState(() => ({
			group: id,
			system: null,
			variant: null,
			space: null,
			color: null,
		}), () => {
			this.props.object.actions.set(this.state);
			this.componentDidMount();
		});
	}

	selectSystem = (id) => {
		if (id === this.state.system) return;

		this.setState((prevState) => ({
			status: true,
			system: id,
			variant: this.config[prevState?.group].systems[id].default.variant,
			space: this.config[prevState.group].systems[id].pattern.customizable?.space ? this.config[prevState.group].systems[id].pattern.customizable.space.default : null,
			color: prevState?.color || this.config[prevState?.group].systems[id].default.color,
		}), () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectVariant = (id) => {
		this.setState({ variant: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectSpace = (id) => {
		this.setState({ space: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectColor = (id) => {
		this.setState({ color: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectDirectionVertical = (id) => {
		this.setState({ directionVertical: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	selectDirectionHorizontal = (id) => {
		this.setState({ directionHorizontal: id }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	setSuggestedHeight = (event) => {
		let value = event.target.value;

		if (event.type === 'blur') {
			value = Helper.numberFormat(parseFloat(value), 2, '.');
		}

		this.setState({ suggestedHeight: value }, () => {
			this.props.object.actions.set(this.state);
		});
	}

	render() {
		return (
			<>
				<div className="title">
					<h2>{___('Ustawienia furtki')}</h2>
				</div>

				<div className="info">{___('Wypełnienia zamieszczone w wizualizacji zostały przedstawione wyłącznie podglądowo.')} {___('W celu uzyskania wyceny prosimy o kontakt z działem obsługi klienta indywidualnego lub najbliższym dystrybutorem.')}</div>

				<OptionsList
					action={() => this.clear()}
					options={{ default: ___('Niezdefiniowana') }}
					value={this.state?.status ? null : 'default'}
				/>

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
						action={(id) => this.selectSystem(id)}
						title={___('System')}
						options={this.config[this.state.group].systems}
						value={this.state?.system}
					/>
				)}

				{(this.state.system) && (
					<>
						<OptionsList
							action={(id) => this.selectVariant(id)}
							title={___('Konfiguracja')}
							options={this.config[this.state.group].systems[this.state.system].variants}
							value={this.state?.variant}
						/>

						{(this.config[this.state.group].systems[this.state.system].pattern.customizable?.space) && (
							<>
								<h3>{___('Przerwa między profilami')}</h3>

								<FlexList
									action={(id) => this.selectSpace(id)}
									options={this.config[this.state.group].systems[this.state.system].pattern.customizable.space.options}
									value={this.state?.space}
								/>
							</>
						)}

						<ColorsList
							action={(id) => this.selectColor(id)}
							title={___('Kolor')}
							options={this.config[this.state.group].systems[this.state.system].colors}
							value={this.state?.color}
						/>

						<div className="option">
							<h3>{___('Kierunek otwierania')}</h3>

							<FlexList
								action={(id) => this.selectDirectionVertical(id)}
								options={this.props.object.directionVerticalList}
								value={this.state?.directionVertical}
								align="half"
							/>

							<FlexList
								action={(id) => this.selectDirectionHorizontal(id)}
								options={this.props.object.directionHorizontalList}
								value={this.state?.directionHorizontal}
								align="half"
							/>
						</div>

						<div className="option">
							<h3>{___('Sugerowana wysokość')}</h3>
							<input type="number" min="0" step="0.01" value={this.state.suggestedHeight} placeholder={___('Domyślnie')} onChange={this.setSuggestedHeight} onBlur={this.setSuggestedHeight} style={{ width: '75px' }} /> <small>m</small>
						</div>
					</>
				)}
			</>
		);
	}
}


Wicket.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Wicket;