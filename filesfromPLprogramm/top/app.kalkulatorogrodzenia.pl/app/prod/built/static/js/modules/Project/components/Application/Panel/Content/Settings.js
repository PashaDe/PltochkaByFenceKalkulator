import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Helper from 'classes/Tools/Helper';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';


class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.materialPoles = container.app.getMaterialPoles();
		this.materialWalls = container.app.getMaterialWalls();
		this.options = container.app.getSystemOptions();

		this.state = this.props.object;
	}

	componentDidMount = () => {
		Objects.entries(this.state).forEach(([name, value]) => {
			this.setState({ [name]: this.validate(name, value) });
		});
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

		this.setState({ [name]: value });
		container.app.actions.setSetting(name, this.validate(name, value));
	}

	onBlur = (event) => {
		const name = event.target.name;
		const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

		this.setState({ [name]: this.validate(name, value) });
	}

	validate = (name, value) => {
		let min;

		switch (name) {
			case 'defaultDistance':
				value = parseFloat(value) || 0;

				min = container.app.getBlocksFamily().settings.distance.min;

				if (value < min) {
					value = min;
				}

				value = Helper.numberFormat(value, 3, '.');
				break;

			case 'heightPoles':
			case 'heightWalls':
				value = parseInt(value, 10) || 0;

				min = 1;

				if (value < min) {
					value = min;
				}
				break;

			default:
		}

		return value;
	}

	field = (name, field) => {
		let status = true;

		if (field.conditions) {
			Objects.entries(field.conditions).forEach(([key, condition]) => {
				switch (key) {
					case 'peaksFamily':
						if (container.app.peaksFamily !== condition) {
							status = false;
						}
						break;

					default:
				}
			});
		}

		if (status) {
			switch (field.type) {
				case 'checkbox':
					return (
						<div className="checkbox" key={name}>
							<input
								type="checkbox"
								name={name}
								defaultChecked={this.state[name]}
								onChange={(event) => {
									this.onChange(event);

									if (field.reload) {
										container.app.projectReload();
									}
								}}
							/>
							<div>{field.label}</div>
						</div>
					);

				default:
			}
		}

		return <></>;
	}

	render() {
		return (
			<>
				<div className="title">
					<h2>{___('Ustawienia projektu')}</h2>
				</div>

				<div className="options-group">
					<h3>{___('Nazwa')}</h3>
					<input type="text" name="title" value={this.state.title} onChange={this.onChange} onBlur={this.onBlur} />

					<h3>{___('Opis')}</h3>
					<textarea name="description" rows="3" value={this.state.description} onChange={this.onChange} onBlur={this.onBlur} />
				</div>

				<div className="options-group">
					<h3>{___('Odległość między słupkami')}</h3>
					<input type="number" min="0" step="0.01" name="defaultDistance" value={this.state.defaultDistance} onChange={this.onChange} onBlur={this.onBlur} /> <small>m</small>

					<h3>{___('Wysokość ogrodzenia')}</h3>
					<input type="number" name="heightPoles" value={this.state.heightPoles} onChange={this.onChange} onBlur={this.onBlur} />&nbsp;
					<button onClick={() => container.app.actions.setAllHeightPoles()}>{___('Zastosuj do wszystkich')}</button>

					<h3>{___('Wysokość podmurówek')}</h3>
					<input type="number" name="heightWalls" value={this.state.heightWalls} onChange={this.onChange} onBlur={this.onBlur} />&nbsp;
					<button onClick={() => container.app.actions.setAllHeightWalls()}>{___('Zastosuj do wszystkich')}</button>

					{(Objects.count(this.materialPoles) > 1) && (
						<>
							<h3>{___('Rodzaj słupków')}</h3>
							<select name="materialPoles" value={this.state.materialPoles} onChange={this.onChange} ref={(element) => { this.materialPolesRef = element; }}>
								{Objects.entries(this.materialPoles).map(([value, label]) => (
									<option value={value} key={value}>{label}</option>
								))}
							</select>
							<button onClick={() => container.app.actions.setAllMaterialPoles(this.materialPolesRef.value)}>{___('Zastosuj do wszystkich')}</button>
						</>
					)}

					{(Objects.count(this.materialWalls) > 1) && (
						<>
							<h3>{___('Rodzaj podmurówek')}</h3>
							<select name="materialWalls" value={this.state.materialWalls} onChange={this.onChange} ref={(element) => { this.materialWallsRef = element; }}>
								{Objects.entries(this.materialWalls).map(([value, label]) => (
									<option value={value} key={value}>{label}</option>
								))}
							</select>
							<button onClick={() => container.app.actions.setAllMaterialWalls(this.materialWallsRef.value)}>{___('Zastosuj do wszystkich')}</button>
						</>
					)}
				</div>

				<div className="options-group">
					<h3>{___('Opcje systemu')}</h3>

					{(!!Objects.count(this.options)) && (
						<>
							{Objects.entries(this.options).map(([key, entry]) => this.field(key, entry))}
						</>
					)}

					{this.field('chemicals', { type: 'checkbox', label: ___('Dodaj chemię do betonu na wycenie') })}
				</div>
			</>
		);
	}
}


Settings.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Settings;