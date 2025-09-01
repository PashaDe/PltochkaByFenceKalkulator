import React from 'react';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			window: localStorage.getItem('graphic-details-window') || '',
			theme: localStorage.getItem('graphic-details-theme') || '',
			framelimit: localStorage.getItem('graphic-details-framelimit') || '',
			antialiassing: localStorage.getItem('graphic-details-antialiassing') || '',
			shadows: localStorage.getItem('graphic-details-shadows') || '',
			ground: localStorage.getItem('graphic-details-ground') || '',
		};
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

		this.setState({ [name]: value });
	}

	onSubmit = (event) => {
		event.preventDefault();

		Objects.entries(this.state).forEach(([name, value]) => {
			localStorage.setItem(`graphic-details-${name}`, value);
		});

		window.location.replace(document.referrer || '/');
	}

	render() {
		const colLeft = {
			paddingRight: '0.5em',
			paddingBottom: '0.5em',
			fontWeight: 'bold',
			textAlign: 'right',
			verticalAlign: 'top',
		};

		const colRight = {
			paddingBottom: '0.5em',
			textAlign: 'left',
			verticalAlign: 'top',
		};

		const label = {
			display: 'block',
		};

		return (
			<Template>
				<h1>{___('Ustawienia grafiki')}</h1>

				<div className="form">
					<form onSubmit={this.onSubmit}>
						<table>
							<tbody>
								<tr>
									<td style={colLeft}>
										{___('Układ okien')}:
									</td>

									<td style={colRight}>
										<label style={label}>
											<input type="radio" name="window" value="" checked={this.state.window === ''} onChange={this.onChange} />
											{___('Domyślnie')}
										</label>

										<label style={label}>
											<input type="radio" name="window" value="none" checked={this.state.window === 'none'} onChange={this.onChange} />
											{___('Brak')}
										</label>

										<label style={label}>
											<input type="radio" name="window" value="vertical" checked={this.state.window === 'vertical'} onChange={this.onChange} />
											{___('Pionowo')}
										</label>

										<label style={label}>
											<input type="radio" name="window" value="horizontal" checked={this.state.window === 'horizontal'} onChange={this.onChange} />
											{___('Poziomo')}
										</label>

										<label style={label}>
											<input type="radio" name="window" value="cascade-technical" checked={this.state.window === 'cascade-technical'} onChange={this.onChange} />
											{`${___('Kaskadowo')} - ${___('techniczny')}`}
										</label>

										<label style={label}>
											<input type="radio" name="window" value="cascade-main" checked={this.state.window === 'cascade-main'} onChange={this.onChange} />
											{`${___('Kaskadowo')} - ${___('główny')}`}
										</label>
									</td>
								</tr>

								<tr>
									<td style={colLeft}>
										{___('Schemat kolorów')}:
									</td>

									<td style={colRight}>
										<label style={label}>
											<input type="radio" name="theme" value="" checked={this.state.theme === ''} onChange={this.onChange} />
											{___('Domyślnie')}
										</label>

										<label style={label}>
											<input type="radio" name="theme" value="white" checked={this.state.theme === 'white'} onChange={this.onChange} />
											{___('Jasny')}
										</label>

										<label style={label}>
											<input type="radio" name="theme" value="dark" checked={this.state.theme === 'dark'} onChange={this.onChange} />
											{___('Ciemny')}
										</label>
									</td>
								</tr>

								<tr>
									<td style={colLeft}>
										{___('Limiter klatek')}:
									</td>

									<td style={colRight}>
										<label style={label}>
											<input type="radio" name="framelimit" value="" checked={this.state.framelimit === ''} onChange={this.onChange} />
											{___('Domyślnie')}
										</label>

										<label style={label}>
											<input type="radio" name="framelimit" value="on" checked={this.state.framelimit === 'on'} onChange={this.onChange} />
											{___('Włączony')}
										</label>

										<label style={label}>
											<input type="radio" name="framelimit" value="off" checked={this.state.framelimit === 'off'} onChange={this.onChange} />
											{___('Wyłączony')}
										</label>
									</td>
								</tr>

								<tr>
									<td style={colLeft}>
										{___('Wygładzanie krawędzi')}:
									</td>

									<td style={colRight}>
										<label style={label}>
											<input type="radio" name="antialiassing" value="" checked={this.state.antialiassing === ''} onChange={this.onChange} />
											{___('Domyślnie')}
										</label>

										<label style={label}>
											<input type="radio" name="antialiassing" value="on" checked={this.state.antialiassing === 'on'} onChange={this.onChange} />
											{___('Włączony')}
										</label>

										<label style={label}>
											<input type="radio" name="antialiassing" value="off" checked={this.state.antialiassing === 'off'} onChange={this.onChange} />
											{___('Wyłączony')}
										</label>
									</td>
								</tr>

								<tr>
									<td style={colLeft}>
										{___('Cienie')}:
									</td>

									<td style={colRight}>
										<label style={label}>
											<input type="radio" name="shadows" value="" checked={this.state.shadows === ''} onChange={this.onChange} />
											{___('Domyślnie')}
										</label>

										<label style={label}>
											<input type="radio" name="shadows" value="off" checked={this.state.shadows === 'off'} onChange={this.onChange} />
											{___('Wyłączone')}
										</label>

										<label style={label}>
											<input type="radio" name="shadows" value="slow" checked={this.state.shadows === 'slow'} onChange={this.onChange} />
											{___('Standardowe')}
										</label>

										<label style={label}>
											<input type="radio" name="shadows" value="medium" checked={this.state.shadows === 'medium'} onChange={this.onChange} />
											{___('Średnie')}
										</label>

										<label style={label}>
											<input type="radio" name="shadows" value="high" checked={this.state.shadows === 'high'} onChange={this.onChange} />
											{___('Dokładne')}
										</label>

										<label style={label}>
											<input type="radio" name="shadows" value="full" checked={this.state.shadows === 'full'} onChange={this.onChange} />
											{___('Bardzo dokładne')}
										</label>
									</td>
								</tr>

								<tr>
									<td style={colLeft}>
										{___('Podłoże')}:
									</td>

									<td style={colRight}>
										<label style={label}>
											<input type="radio" name="ground" value="" checked={this.state.ground === ''} onChange={this.onChange} />
											{___('Domyślnie')}
										</label>

										<label style={label}>
											<input type="radio" name="ground" value="pavement" checked={this.state.ground === 'pavement'} onChange={this.onChange} />
											{___('Kostka')}
										</label>

										<label style={label}>
											<input type="radio" name="ground" value="gravel" checked={this.state.ground === 'gravel'} onChange={this.onChange} />
											{___('Kamyczki')}
										</label>

										<label style={label}>
											<input type="radio" name="ground" value="grass" checked={this.state.ground === 'grass'} onChange={this.onChange} />
											{___('Trawa')}
										</label>
									</td>
								</tr>
							</tbody>
						</table>

						<fieldset className="submit">
							<button className="button">{___('Zapisz')}</button>
						</fieldset>
					</form>
				</div>
			</Template>
		);
	}
}


export default View;