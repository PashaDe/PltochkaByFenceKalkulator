import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Validator } from 'classes/Forms';
import { ___ } from 'classes/Translation';


class FormLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'default',
			fields: {
				// _token: {},
				login: {
					validators: [
						new Validator(null, 'not_blank'),
					],
				},
				password: {
					validators: [
						new Validator(null, 'not_blank'),
					],
				},
			},
		};

		this.form = new Form(this, 'users/login/', 'form');
	}

	error = (message) => {
		switch (message) {
			case 'Twoje konto wygasło. Aby je przedłużyć, kliknij tutaj.':
				return (<>{___('Twoje konto wygasło. Aby je przedłużyć')}, <Link to="/extend/">{___('kliknij tutaj')}</Link>.</>);

			default:
				return message;
		}
	}

	onSubmit = (response) => {
		switch (response.status) {
			case 0:
				this.form.setResponseErrors(response);
				break;

			case 1:
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
							<input type="hidden" name="_token" value={this.state.fields._token?.value} />

							<fieldset className="fields">
								<div className="grid">
									<div>
										<div className="item">
											<div className="input">
												<input type="text" name="login" value={this.state.fields.login.value} placeholder={___('Adres e-mail')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.login.errors.length ? (
													<ul>{this.state.fields.login.errors.map((message, key) => <li key={key}>{this.error(message)}</li>)}</ul>
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
													<ul>{this.state.fields.password.errors.map((message, key) => <li key={key}>{this.error(message)}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>

									<div>
										<small><Link to="/reset-password/" className="color-link">{___('Nie pamiętam hasła')}</Link></small>
									</div>
								</div>
							</fieldset>

							<fieldset className="submit">
								<button type="submit" className="button">{___('Zaloguj się')}</button>
							</fieldset>

							<br />

							<fieldset className="submit">
								<Link to="/register/" className="button" style={{ fontSize: '1.2em' }}>{___('Załóż konto')}</Link>
							</fieldset>
						</form>
					</div>
				);

			case 'success':
				localStorage.removeItem('search.user');
				localStorage.removeItem('search.search');
				localStorage.removeItem('search.date_from');
				localStorage.removeItem('search.date_to');

				return window.location.replace('/');
		}
	}
}


export default FormLogin;