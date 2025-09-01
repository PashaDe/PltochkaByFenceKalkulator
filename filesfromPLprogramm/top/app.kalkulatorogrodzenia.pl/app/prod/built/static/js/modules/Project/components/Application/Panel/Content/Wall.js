import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import Helper from 'classes/Tools/Helper';
import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import FlexList from 'components/ui/FlexList';
import OptionsList from 'components/ui/OptionsList';
import PlusMinus from 'components/ui/PlusMinus';


class Wall extends React.Component {
	setFencingHeight = (event) => {
		let value = event.target.value;

		if (event.type === 'blur') {
			value = Helper.numberFormat(parseFloat(value), 2, '.');
		}

		this.props.object.actions.fencingHeight(value);
	}

	render() {
		return (
			<>
				<div className="title">
					<ButtonOptions action={() => this.props.object.actions.remove()} type="remove" description={`${___('Usuń przęsło')} (DEL)`} />

					<h2>{___('Ustawienia przęsła')}</h2>
				</div>

				<OptionsList action={(id) => this.props.object.actions.kind(id)} title={___('Rodzaj')} options={this.props.object.kindsList} value={this.props.object.config.kind} />

				{(this.props.object.config.kind === 'wall') && (
					<OptionsList action={(id) => this.props.object.actions.blockMaterial(id)} title={___('Materiał')} options={this.props.object.getBlockMaterialsList()} value={this.props.object.config.blockMaterialId} />
				)}

				{(this.props.object.config.kind === 'wall' && this.props.object.blockMaterial.block.resizeable.height) && (
					<PlusMinus actionPlus={() => this.props.object.actions.heightPlus()} actionMinus={() => this.props.object.actions.heightMinus()} title={___('Wysokość')} value={this.props.object.config.size.height} size={this.props.object.height} />
				)}

				{(this.props.object.config.kind === 'wall' && container?.app?.getSystem()?.adds.combo && container.app.combo.status && container.app.combo.system && container.app.combo.variant && container.app.combo.color) && (
					<div className="option">
						<h3>{___('Kombo')}</h3>

						<FlexList
							action={(value) => this.props.object.actions.combo(value)}
							options={{ on: ___('Tak'), off: ___('Nie') }}
							value={this.props.object.config.combo}
							align="half"
						/>
					</div>
				)}

				{((this.props.object.config.kind === 'wall' || this.props.object.config.kind === 'space') && container?.app?.getSystem()?.adds.fencings && container.app.fencings.status && container.app.fencings.group && container.app.fencings.system && container.app.fencings.variant && container.app.fencings.color) && (
					<>
						<div className="option">
							<h3>{___('Wypełnienie')}</h3>

							<FlexList
								action={(value) => this.props.object.actions.fencing(value)}
								options={{ on: ___('Tak'), off: ___('Nie') }}
								value={this.props.object.config.fencing}
								align="half"
							/>
						</div>

						{(this.props.object.config.fencing === 'on') && (
							<div className="option">
								<h3>{___('Wysokość wypełnienia')}</h3>
								<input type="number" min="0" step="0.01" value={this.props.object.config.fencingHeight} placeholder={___('Domyślnie')} onChange={this.setFencingHeight} onBlur={this.setFencingHeight} style={{ width: '75px' }} /> <small>m</small>
							</div>
						)}
					</>
				)}

				{(this.props.object.config.kind === 'wicket' && container?.app?.getSystem()?.adds.wickets) && (
					<button onClick={() => panelActions.set('wicket', this.props.object.manufacture.config, this.props.object.manufacture)}>{___('Szczegóły furtki')}</button>
				)}

				{(this.props.object.config.kind === 'gate' && container?.app?.getSystem()?.adds.gates) && (
					<button onClick={() => panelActions.set('gate', this.props.object.manufacture.config, this.props.object.manufacture)}>{___('Szczegóły bramy')}</button>
				)}

				{((this.props.object.config.kind === 'wall' || this.props.object.config.kind === 'space') && container?.app?.getSystem()?.adds.panels) && (
					<button onClick={() => panelActions.set('panels', this.props.object.panels.config, this.props.object.panels)}>{___('Szczegóły paneli')}</button>
				)}
			</>
		);
	}
}


Wall.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Wall;