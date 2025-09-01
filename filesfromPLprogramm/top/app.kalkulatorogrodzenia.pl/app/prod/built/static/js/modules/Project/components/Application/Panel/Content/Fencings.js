import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as dialogActions from 'modules/assets/Dialog/redux/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import ColorsList from 'components/ui/ColorsList';
import FlexList from 'components/ui/FlexList';
import OptionsList from 'components/ui/OptionsList';


class Fencings extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.fencings;

		this.state = this.props.object;
	}

	start = () => {
		this.setState({
			status: true,
		}, () => {
			if (Objects.count(this.config) === 1) {
				this.selectGroup(Objects.first(this.config));
			}
		});
	}

	clear = () => {
		dialogActions.confirm(
			___('Usunąć ?'),
			() => {
				this.setState({
					status: false,
					group: null,
					system: null,
					variant: null,
					space: null,
					color: null,
				}, () => {
					container.app.actions.setFencings(this.state);
				});
			},
		);
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
			container.app.actions.setFencings(this.state);
		});
	}

	selectSystem = (id) => {
		if (id === this.state.system) return;

		this.setState((prevState) => ({
			system: id,
			variant: this.config[prevState?.group].systems[id].default.variant,
			space: this.config[prevState.group].systems[id].pattern.customizable?.space ? this.config[prevState.group].systems[id].pattern.customizable.space.default : null,
			color: this.config[prevState?.group].systems[id].default.color,
		}), () => {
			container.app.actions.setFencings(this.state);
		});
	}

	selectVariant = (id) => {
		this.setState({ variant: id }, () => {
			container.app.actions.setFencings(this.state);
		});
	}

	selectSpace = (id) => {
		this.setState({ space: id }, () => {
			container.app.actions.setFencings(this.state);
		});
	}

	selectColor = (id) => {
		this.setState({ color: id }, () => {
			container.app.actions.setFencings(this.state);
		});
	}

	render() {
		return (
			<>
				<div className="title">
					{(this.state.system) && (
						<ButtonOptions action={() => this.clear()} type="remove" description={___('Usuń wypełnienia')} />
					)}

					<h2>{___('Ustawienia wypełnień')}</h2>
				</div>

				<div className="info">{___('Wypełnienia zamieszczone w wizualizacji zostały przedstawione wyłącznie podglądowo.')} {___('W celu uzyskania wyceny prosimy o kontakt z działem obsługi klienta indywidualnego lub najbliższym dystrybutorem.')}</div>

				{(!this.state.status) ? (
					<>
						<br />
						<button onClick={this.start}>{___('Dodaj')}</button>
					</>
				) : (
					<>
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
							</>
						)}
					</>
				)}
			</>
		);
	}
}


Fencings.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Fencings;