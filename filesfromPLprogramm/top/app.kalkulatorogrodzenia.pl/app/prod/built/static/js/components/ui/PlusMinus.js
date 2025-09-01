import React from 'react';
import PropTypes from 'prop-types';

import Helper from 'classes/Tools/Helper';
import { ___ } from 'classes/Translation';


class PlusMinus extends React.Component {
	getSize = () => {
		let value = Helper.numberFormat(this.props.size, 3);

		let meters = value.substring(0, value.length - 1);
		let milimeters = value.slice(-1);

		return (
			<>
				{meters}<small>.{milimeters}</small>
			</>
		);
	}

	render() {
		return (
			<div className="option">
				<h4>{this.props.title}</h4>

				<div className="plus-minus">
					<button onClick={this.props.actionPlus} title={___('Powiększ')} aria-label={___('Powiększ')} className="plus" />
					<button onClick={this.props.actionMinus} title={___('Pomniejsz')} aria-label={___('Pomniejsz')} className="minus" />

					<p>
						{this.props.value} {Helper.countWord(this.props.value, ___('bloczek'), ___('bloczki'), ___('bloczków'))} ({this.getSize()} m)
					</p>
				</div>
			</div>
		);
	}
}


PlusMinus.defaultProps = {
	actionPlus: null,
	actionMinus: null,
	title: null,
	value: null,
	size: null,
};

PlusMinus.propTypes = {
	actionPlus: PropTypes.func,
	actionMinus: PropTypes.func,
	title: PropTypes.string,
	value: PropTypes.number,
	size: PropTypes.number,
};


export default PlusMinus;