import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';
import * as panelActions from '../../../../redux/panel/actions';

import { ___ } from 'classes/Translation';

import ButtonOptions from 'components/ui/ButtonOptions';
import OptionsList from 'components/ui/OptionsList';
import PlusMinus from 'components/ui/PlusMinus';


class Pole extends React.Component {
	render() {
		return (
			<>
				<div className="title">
					<ButtonOptions action={() => this.props.object.actions.remove()} type="remove" description={`${___('Usuń słupek')} (DEL)`} />
					<ButtonOptions action={() => this.props.object.actions.polygonBreak()} type="polygon-break" description={___('Koniec ciągu')} param={{ enabled: this.props.object.config.polygonBreak }} />
					<ButtonOptions action={() => this.props.object.actions.virtual()} type="virtual" description={___('Słupek / granica muru')} param={{ enabled: this.props.object.config.virtual }} />

					<h2>{___('Ustawienia słupka')}</h2>
				</div>

				{(!this.props.object.config.virtual) && (
					<>
						<OptionsList action={(id) => this.props.object.actions.blockMaterial(id)} title={___('Materiał')} options={this.props.object.getBlockMaterialsList()} value={this.props.object.config.blockMaterialId} />

						{(this.props.object.blockMaterial.block.resizeable.height) && (
							<PlusMinus actionPlus={() => this.props.object.actions.heightPlus()} actionMinus={() => this.props.object.actions.heightMinus()} title={___('Wysokość')} value={this.props.object.config.size.height} size={this.props.object.height} />
						)}

						{(this.props.object.blockMaterial.block.resizeable.width) && (
							<PlusMinus actionPlus={() => this.props.object.actions.widthPlus()} actionMinus={() => this.props.object.actions.widthMinus()} title={___('Szerokość')} value={this.props.object.config.size.width} size={this.props.object.width} />
						)}

						{(this.props.object.blockMaterial.block.resizeable.depth) && (
							<PlusMinus actionPlus={() => this.props.object.actions.depthPlus()} actionMinus={() => this.props.object.actions.depthMinus()} title={___('Głębokość')} value={this.props.object.config.size.depth} size={this.props.object.depth} />
						)}

						{(container.app.getSystem().adds.mailboxes || container.app.getSystem().adds.lamps) && (
							<>
								<br />
								<button onClick={() => panelActions.set('additionals', null, this.props.object)}>{___('Dodatki')}</button>
							</>
						)}
					</>
				)}
			</>
		);
	}
}


Pole.propTypes = {
	object: PropTypes.object.isRequired,
};


export default Pole;