import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as dialogActions from 'modules/assets/Dialog/redux/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import ColorsList from 'components/ui/ColorsList';
import OptionsList from 'components/ui/OptionsList';


class Combo extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.combo;

		this.state = this.props.object;
	}

	start = () => {
		this.setState({
			status: true,
		});
	}

	clear = () => {
		dialogActions.confirm(
			___('Usunąć ?'),
			() => {
				this.setState({
					status: false,
					system: null,
					variant: null,
					color: null,
				}, () => {
					container.app.actions.setCombo(this.state);
				});
			},
		);
	}

	selectSystem = (id) => {
		if (id === this.state.system) return;

		this.setState({
			system: id,
			variant: null,
			color: this.config[id].default.color,
		}, () => {
			container.app.actions.setCombo(this.state);
		});
	}

	selectVariant = (id) => {
		this.setState({ variant: id }, () => {
			container.app.actions.setCombo(this.state);
		});
	}

	selectColor = (id) => {
		this.setState({ color: id }, () => {
			container.app.actions.setCombo(this.state);
		});
	}

	getSystemsList = () => {
		let result = [];

		Objects.entries(this.config).forEach(([key, entry]) => {
			if (key in container.app.getSystem().adds.combo) {
				result[key] = entry;
			}
		});

		return result;
	}

	getVariantsList = () => {
		let result = [];

		Objects.entries(this.config[this.state.system].variants).forEach(([key, entry]) => {
			if (key.indexOf(`${container.app.getSystem().adds.combo[this.state.system]}/`) === 0) {
				result[key] = entry;
			}
		});

		return result;
	}

	render() {
		return (
			<>
				<div className="title">
					{(this.state.system) && (
						<ButtonOptions action={() => this.clear()} type="remove" description={___('Usuń kombo')} />
					)}

					<h2>{___('Ustawienia kombo')}</h2>
				</div>

				{(!this.state.status) ? (
					<>
						<br />
						<button onClick={this.start}>{___('Dodaj')}</button>
					</>
				) : (
					<>
						<OptionsList
							action={(id) => this.selectSystem(id)}
							title={___('System')}
							options={this.getSystemsList()}
							value={this.state?.system}
						/>

						{(this.state.system) && (
							<>
								<OptionsList
									action={(id) => this.selectVariant(id)}
									title={___('Konfiguracja')}
									options={this.getVariantsList()}
									value={this.state?.variant}
								/>

								<ColorsList
									action={(id) => this.selectColor(id)}
									title={___('Kolor')}
									options={this.config[this.state.system].colors}
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


Combo.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Combo;