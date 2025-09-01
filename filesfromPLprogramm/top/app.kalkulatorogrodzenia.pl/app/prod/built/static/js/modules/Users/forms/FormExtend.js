import React from 'react';
import { Redirect } from 'react-router-dom';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import { Form } from 'classes/Forms';
import Helper from 'classes/Tools/Helper';
import { ___ } from 'classes/Translation';


class FormExtend extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'default',
			info: null,
			fields: {
				_token: {},
				login: {},
				password: {},
			},
		};

		this.form = new Form(this, 'users/extend/', 'form');
	}

	onSubmit = (response) => {
		switch (response.status) {
			case 0:
				this.form.setResponseErrors(response);
				break;

			case -1:
				this.setState({ view: 'info', info: response.info });
				break;

			case 1:
				noticesActions.set(`${___('Konto zostało przedłużone na')} ${Helper.countWord(response.days, `${___('kolejny')} ${response.days} ${___('dzień')}`, `${___('kolejne')} ${response.days} ${___('dni')}`, `${___('kolejne')} ${response.days} ${___('dni')}`)}.`);
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
												<input type="text" name="login" value={this.state.fields.login.value} placeholder={___('Adres e-mail')} autoComplete="off" onChange={this.form.onChange} />
											</div>

											<div className="form-error">
												{this.state.fields.login.errors.length ? (
													<ul>{this.state.fields.login.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
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
								</div>
							</fieldset>

							<fieldset className="submit">
								<button type="submit" className="button">{___('Przedłuż konto')}</button>
							</fieldset>
						</form>
					</div>
				);

			case 'info':
				return (
					<p>{this.state.info}</p>
				);

			case 'success':
				return (
					<Redirect to="/login/" />
				);
		}
	}
}


export default FormExtend;