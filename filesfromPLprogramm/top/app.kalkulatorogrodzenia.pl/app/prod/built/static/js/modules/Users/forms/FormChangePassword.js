import React from 'react';
import { Redirect } from 'react-router-dom';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import { Form } from 'classes/Forms';
import { ___ } from 'classes/Translation';


class FormChangePassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'default',
			fields: {
				_token: {},
				old_password: {},
				password: {},
				password_repeat: {},
			},
		};

		this.form = new Form(this, 'users/account/change-password/', 'form');
	}

	onSubmit = (response) => {
		switch (response.status) {
			case 0:
				this.form.setResponseErrors(response);
				break;

			case 1:
				noticesActions.set(`${___('Hasło zostało pomyślnie zmienione')}.`);
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
												<input type="password" name="old_password" value={this.state.fields.old_password.value} placeholder={___('Stare hasło')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.old_password.errors.length ? (
													<ul>{this.state.fields.old_password.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
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
								</div>
							</fieldset>

							<fieldset className="submit">
								<button type="submit" className="button">{___('Zmień')}</button>
							</fieldset>
						</form>
					</div>
				);

			case 'success':
				return (
					<Redirect to="/" />
				);
		}
	}
}


export default FormChangePassword;