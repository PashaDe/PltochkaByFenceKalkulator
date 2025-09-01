import React from 'react';
import { Redirect } from 'react-router-dom';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import { Form } from 'classes/Forms';
import { ___ } from 'classes/Translation';


class FormRegister extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'default',
			fields: {
				_token: {},
				name: {},
				email: {},
				password: {},
				password_repeat: {},
				phone: {},
				zip_code: {},
				city: {},
				agreement_privacy: {},
				agreement_regulation: {},
			},
		};

		this.form = new Form(this, 'users/register/', 'form');
	}

	onSubmit = (response) => {
		switch (response.status) {
			case 0:
				this.form.setResponseErrors(response);
				break;

			case 1:
				noticesActions.set(`${___('Na podany adres e-mail został wysłany kod aktywacyjny')}.`);
				this.setState({ view: 'success' });
				break;

			default:
		}
	}

	render() {
		switch (this.state.view) {
			default:
				return (
					<div className="form">
						<form onSubmit={this.form.onSubmit}>
							<input type="hidden" name="_token" value={this.state.fields._token.value} />

							<fieldset className="fields">
								<div className="grid">
									<div>
										<div className="item">
											<div className="input">
												<input type="text" name="name" value={this.state.fields.name.value} placeholder={___('Imię i nazwisko')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.name.errors.length ? (
													<ul>{this.state.fields.name.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<input type="text" name="email" value={this.state.fields.email.value} placeholder={___('Adres e-mail')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.email.errors.length ? (
													<ul>{this.state.fields.email.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<input type="password" name="password" value={this.state.fields.password.value} placeholder={___('Hasło')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.password.errors.length ? (
													<ul>{this.state.fields.password.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<input type="password" name="password_repeat" value={this.state.fields.password_repeat.value} placeholder={___('Powtórz hasło')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.password_repeat.errors.length ? (
													<ul>{this.state.fields.password_repeat.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<input type="text" name="phone" value={this.state.fields.phone.value} placeholder={___('Numer telefonu')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.phone.errors.length ? (
													<ul>{this.state.fields.phone.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<input type="text" name="zip_code" value={this.state.fields.zip_code.value} placeholder={___('Kod pocztowy')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.zip_code.errors.length ? (
													<ul>{this.state.fields.zip_code.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<input type="text" name="city" value={this.state.fields.city.value} placeholder={___('Miejscowość')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.city.errors.length ? (
													<ul>{this.state.fields.city.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</fieldset>

							<fieldset className="agreements">
								<div className="grid">
									<div>
										<div className="item">
											<div className="input">
												<label>
													<input type="checkbox" name="agreement_privacy" onChange={this.form.onChange} />
													<i className="checkbox" />
													<div>
														{___('Zapoznałem/am się z')} <a href="https://www.joniec.pl/firma/polityka.html" target="blank">{___('Polityką Prywatności')}</a> {___('Firmy JONIEC®')}.
													</div>
												</label>
											</div>

											<div className="form-error">
												{this.state.fields.agreement_privacy.errors.length ? (
													<ul>{this.state.fields.agreement_privacy.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<div className="item">
											<div className="input">
												<label>
													<input type="checkbox" name="agreement_regulation" onChange={this.form.onChange} />
													<i className="checkbox" />
													<div>
														{___('Administratorem Państwa danych osobowych zawartych w niniejszym formularzu jest firma F.P.U.H. JONIEC Mieczysław Joniec z siedzibą: 34-650 Tymbark 109. Dane wpisane w formularzu będą przetwarzane w celu utworzenia konta logowania do programu kalkulatorogrodzenia.pl i przesłania na wskazany w formularzu adres danych dostępowych do konta zgodnie z')} <a href="https://www.kalkulatorogrodzenia.pl/regulamin" target="blank">{___('REGULAMINEM')}</a>.
													</div>
												</label>
											</div>

											<div className="form-error">
												{this.state.fields.agreement_regulation.errors.length ? (
													<ul>{this.state.fields.agreement_regulation.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</fieldset>

							<fieldset className="submit">
								<button type="submit" className="button">{___('Załóż konto')}</button>
							</fieldset>
						</form>
					</div>
				);

			case 'success':
				return (
					<Redirect to="/login/" />
				);
		}
	}
}


export default FormRegister;