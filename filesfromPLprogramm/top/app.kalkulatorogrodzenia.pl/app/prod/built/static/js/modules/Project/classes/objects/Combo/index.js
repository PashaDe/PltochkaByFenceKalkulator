import * as panelActions from '../../../redux/panel/actions';

import Colors from 'classes/Tools/Colors';
import Objects from 'classes/Tools/Objects';

import ComboMesh from './ComboMesh';


class Combo extends ComboMesh {
	constructor(instance, wall) {
		super();

		this.instance = instance;
		this.three = instance.three;

		// objects
		this.objects = {
			episode: null,
		};

		// settings
		this.wall = wall;

		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.material = this.setMaterial();
		this.destination = this.setDestination();
		this.data = this.calcData();

		this.elements = [];
		this.lock = {
			episode: null,
		};

		this.valuation = {};

		this.do();
	}

	getColor = () => Colors.hex(this.instance.config.combo[this.instance.combo.system].colors[this.instance.combo.color].color);

	setStatus = () => !!(this.wall.config.combo !== 'off' && this.wall.config.kind === 'wall' && !this.wall.panels.getStatus() && this.wall.status && !this.wall.error)

	calcPosition = () => ({
		x: this.wall.position.normal.x,
		y: this.getWallHeight(),
		z: this.wall.position.normal.z,
	})

	setMaterial = () => {
		if (this.instance.combo.status && this.instance.combo.system && this.instance.combo.variant) {
			return this.instance.config.combo[this.instance.combo.system].variants[this.instance.combo.variant];
		}

		return null;
	}

	setDestination = () => {
		let destination = false;

		if (this.status && this.material && this.material.destinations) {
			Objects.entries(this.material.destinations).forEach(([key, entry]) => {
				if (destination) return;

				if (this.instance.isModBackward(this.wall.width, entry.destination)) {
					destination = key;
				}
			});
		}

		return destination;
	}

	calcData = () => {
		let material;

		if (this.material) {
			material = { ...this.material.destinations[this.destination], ...{ elements: this.instance.config.combo[this.instance.combo.system].elements } };
		}

		return {
			width: this.wall.width,
			height: {
				normal: this.getMaxHeight(),
				full: this.getMaxHeight() + (this.wall.blocksFamily.settings.sameAlignment ? this.wall.peakMaterial.height + ((this.wall.peakMaterial.tip) ? this.wall.peakMaterial.tip.height : 0) : 0),
			},
			material,
		};
	}

	do = () => {
		if (this.instance.isLoading) return;

		if (!this.instance.isMoving) {
			this.doEpisode();
		}
	}

	update = () => {
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.destination = this.setDestination();
		this.data = this.calcData();

		this.do();
	}

	reload = () => {
		this.material = this.setMaterial();
		this.destination = this.setDestination();
		this.data = this.calcData();

		this.do();
	}

	remove = () => {
		this.three.scenes['3d'].remove(this.objects.episode);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('wall', this.wall.config, this.wall);
		this.instance.setHighlight(this.wall);
	}


	/* --- FUNCTIONS ------------------------------------------ */

	getMaxHeight = () => {
		let maxPolesHeight = this.getMaxPolesHeight();

		if (maxPolesHeight > 0 && maxPolesHeight < Infinity) {
			let maxHeight = maxPolesHeight - this.getWallHeight();

			return (maxHeight > 0) ? maxHeight : 0;
		}

		return 0;
	}

	getMaxPolesHeight = () => {
		let pole1Height = (!this.wall.pole1.config.virtual) ? this.wall.pole1.fullHeight : 0;
		let pole2Height = (!this.wall.pole2.config.virtual) ? this.wall.pole2.fullHeight : 0;

		if (!pole1Height && this.wall.pole1.prev && this.wall.pole1.prev.config.polygonBreak) {
			pole1Height = Infinity;
		}

		if (!pole2Height && this.wall.pole2.config.polygonBreak) {
			pole2Height = Infinity;
		}

		return Math.min.apply(null, [pole1Height, pole2Height]);
	}

	getWallHeight = () => this.wall.height + this.wall.peakMaterial.height + ((this.wall.peakMaterial.tip) ? this.wall.peakMaterial.tip.height : 0)
}


export default Combo;