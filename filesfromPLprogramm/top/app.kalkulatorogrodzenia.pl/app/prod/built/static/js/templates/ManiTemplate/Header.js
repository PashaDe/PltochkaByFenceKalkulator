/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import container from 'redux/container';

import { ___ } from 'classes/Translation';


class Header extends React.Component {
	render() {
		return (
			<section id="header">
				<div className="wrapper">
					<div className="grid">
						<div className="logo">
							<Link to="/">
								<img src="/assets/img/logo-red.png" className="img-responsive" alt="" />
							</Link>
						</div>

						{(this.props.type !== 'login') && (
							<div>
								{(!container.user) ? (
									<div className="user-menu">
										<Link to="/login/">{___('Zaloguj się')}</Link>

										<div className="more">
											<div className="arrow" />
											<ul>
												<li><Link to="/register/">{___('Załóż konto')}</Link></li>
											</ul>
										</div>
									</div>
								) : (
									<div className="user-menu">
										<Link to="/logout/">{___('Wyloguj się')}</Link>

										<div className="more">
											<div className="arrow" />
											<ul>
												<li><Link to="/account/change-password/">{___('Zmień hasło')}</Link></li>
											</ul>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</section>
		);
	}
}


export default Header;