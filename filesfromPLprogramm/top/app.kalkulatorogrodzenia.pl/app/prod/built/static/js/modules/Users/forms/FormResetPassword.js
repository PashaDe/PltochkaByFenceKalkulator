import React from 'react';
import { Redirect } from 'react-router-dom';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import { Form } from 'classes/Forms';
import { ___ } from 'classes/Translation';


class FormResetPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'default',
			fields: {
				_token: {},
				email: {},
			},
		};

		this.form = new Form(this, 'users/reset-password/', 'form');
	}

	onSubmit = (response) => {
		switch (response.status) {
			case 0:
				this.form.setResponseErrors(response);
				break;

			case 1:
				noticesActions.set(`${___('Na podany adres e-mail został wysłany link weryfikacyjny')}.`);
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
												<input type="text" name="email" value={this.state.fields.email.value} placeholder={___('Adres e-mail')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.email.errors.length ? (
													<ul>{this.state.fields.email.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</fieldset>

							<fieldset className="submit">
								<button type="submit" className="button">{___('Zresetuj hasło')}</button>
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


export default FormResetPassword;