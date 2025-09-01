import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';


class Notices extends React.Component {
	close = (id) => {
		if (window.noticesCurrent) {
			window.noticesCurrent.classList.remove('notice-active');

			setTimeout(() => {
				noticesActions.remove(id);
			}, 1000);
		}
	}

	componentDidUpdate = () => {
		if (window.noticesCurrent) {
			setTimeout(() => {
				window.noticesCurrent.classList.add('notice-active');
			}, 10);
		}
	}

	render() {
		return (
			<div id="notices">
				{Objects.entries(this.props.entities).map(([id, entity], i) => (
					<div
						className={classNames(
							'notice',
							entity.type ? `notice-${entity.type}` : null,
						)}
						ref={(element) => {
							if (i === 0) {
								window.noticesCurrent = element;
							}
						}}
						key={id}
					>
						<button onClick={() => this.close(id)} className="close" aria-label={___('Zamknij')} />

						<div>
							<div className="icon" />

							<div className="content">
								{(entity.title) && (
									<div className="title">{entity.title}</div>
								)}

								{(entity.content) && (
									<p>{entity.content}</p>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}


Notices.defaultProps = {
	entities: null,
};

Notices.propTypes = {
	entities: PropTypes.object,
};


const mapStateToProps = (state) => ({
	entities: state.notices.entities,
});

export default connect(mapStateToProps, null)(Notices);