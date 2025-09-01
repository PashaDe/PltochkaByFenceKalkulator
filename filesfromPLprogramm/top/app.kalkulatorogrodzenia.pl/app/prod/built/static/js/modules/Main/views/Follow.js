import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as noticesActions from 'modules/assets/Notices/redux/actions';

import { Form, Validator } from 'classes/Forms';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.id = (this.props.match.params.id) ? parseInt(this.props.match.params.id, 10) : 0;

		this.state = {
			view: Objects.in(container.user.type, ['admin', 'employee']) ? 'default' : 'success',
			fields: {
				user: {
					validators: [
						new Validator(___('Podaj poprawny adres e-mail'), 'email'),
					],
				},
			},
		};

		this.form = new Form(this, `follow/${this.id}/`);
	}

	onSubmit = (response) => {
		switch (response.status) {
			case 1:
				noticesActions.set(response.info, 'success');
				this.setState({ view: 'success' });
				break;

			case -1:
				noticesActions.set(response.info, 'error');
				break;

			default:
		}
	}

	render() {
		switch (this.state.view) {
			default:
				return (
					<Template>
						<h1>{___('Przekaż projekt')}</h1>

						<div className="form">
							<form onSubmit={this.form.onSubmit}>
								<p>{`${___('Podaj adres e-mail użytkownika, któremu przekazujesz projekt')}:`}</p><br />

								<fieldset className="fields">
									<div className="grid">
										<div>
											<div className="item">
												<div className="input">
													<input type="text" name="user" value={this.state.fields.user.value} placeholder="" autoComplete="off" onChange={this.form.onChange} />
												</div>

												<div className="form-error">
													{this.state.fields.user.errors.length ? (
														<ul>{this.state.fields.user.errors.map((message, key) => <li key={key}>{message}</li>)}</ul>
													) : null}
												</div>
											</div>
										</div>
									</div>
								</fieldset>

								<fieldset className="submit">
									<button type="submit" className="button">{___('Przekaż')}</button>
								</fieldset>
							</form>
						</div>
					</Template>
				);

			case 'success':
				return (
					<Redirect to="/" />
				);
		}
	}
}


View.defaultProps = {
	match: null,
};

View.propTypes = {
	match: PropTypes.object,
};


export default View;