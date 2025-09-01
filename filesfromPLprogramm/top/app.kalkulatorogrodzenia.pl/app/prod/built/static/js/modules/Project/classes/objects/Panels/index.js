import * as panelActions from '../../../redux/panel/actions';

import PanelsActions from './PanelsActions';
import PanelsMesh from './PanelsMesh';


class Panels extends PanelsMesh {
	constructor(instance, wall) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new PanelsActions(instance, this);

		this.minWidth = 0.20;

		// config
		this.config = {
			group: null,
			model: null,
			height: null,
		};

		// objects
		this.objects = {
			episode: null,
		};

		// settings
		this.wall = wall;

		this.status = this.setStatus();

		this.material = this.setMaterial();
		this.data = this.calcData();

		this.elements = [];
		this.lock = {
			episode: null,
		};

		this.valuation = {};

		this.do();
	}

	setStatus = () => !!((this.wall.config.kind === 'wall' || this.wall.config.kind === 'space') && this.wall.status && !this.wall.error && this.wall.width > this.minWidth + 0.095)

	setMaterial = () => {
		if (this.config.group && this.config.model) {
			return this.instance.config.panels[this.config.group]?.models[this.config.model];
		}

		return null;
	}

	calcData = () => {
		if (this.material) {
			const joinstart = (!this.wall.pole1.isFirst() && this.wall.pole1.config.virtual && this.wall.pole1.wall.panels.status) ? 1 : 0;
			const joinend = (!this.wall.pole2.isLast() && this.wall.pole2.config.virtual && this.wall.pole2.next.wall.panels.status) ? 1 : 0;

			const start = (!this.wall.pole1.isFirst() && this.wall.pole1.config.virtual && this.wall.pole1.wall.panels.status && this.wall.pole1.wall.panels.getHeight() >= this.getHeight()) ? 0 : 1;
			const end = (!this.wall.pole2.isLast() && this.wall.pole2.config.virtual && this.wall.pole2.next.wall.panels.status && this.wall.pole2.next.wall.panels.getHeight() > this.getHeight()) ? 0 : 1;

			const pole = this.material.variant.pole - this.material.variant.slip * 2;
			const booths = (start + end) * (this.material.variant.pole - this.material.variant.slip); // start & end poles
			const interval = this.material.variant.width + pole;

			const episode = this.wall.width;
			const origin = { start: this.material.variant.pole / 2 * joinstart, end: this.material.variant.pole / 2 * joinend };
			const width = episode + origin.start + origin.end;
			const intervals = Math.floor((width + (pole - booths)) / interval);
			const rest = width - (intervals * interval + (start + end) * this.material.variant.pole / 2) - this.material.variant.slip;

			let prelast = this.material.variant.width;
			let last = 0;

			if (rest >= 0.01) {
				if (rest < this.minWidth) {
					// eslint-disable-next-line no-multi-assign
					prelast = last = (prelast + rest) / 2;
				} else {
					last = rest;
				}
			}

			return {
				start,
				end,
				pole,
				origin,
				// width: intervals * interval + (start + end) * this.material.variant.pole / 2, //
				panels: intervals + ((rest >= 0.02) ? 1 : 0),
				prelast,
				last,
			};
		}

		return null;
	}

	do = () => {
		if (this.instance.isLoading) return;

		if (!this.instance.isMoving) {
			this.doEpisode();
		}
	}

	update = () => {
		this.status = this.setStatus();

		this.material = this.setMaterial();
		this.data = this.calcData();

		this.do();
	}

	reload = () => {
		this.material = this.setMaterial();
		this.data = this.calcData();

		this.do();

		this.wall.combo.update();
		this.wall.fencing.update();

		// prev
		this.wall.pole1.wall.panels.update();

		// next
		this.wall.pole2.next.wall.panels.update();
	}

	reset = () => {
		this.config = {
			group: null,
			model: null,
			height: null,
		};
	}

	remove = () => {
		this.three.scenes['3d'].remove(this.objects.episode);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('panels', this.config, this);
		this.instance.setHighlight(this.wall);
	}


	/* --- FUNCTIONS ------------------------------------------ */

	getStatus = () => this.config.group && this.config.model && this.config.height

	getHeight = () => {
		if (this.config.group && this.config.model && this.config.height) {
			return parseFloat(this.config.height.replace('_', ''));
		}

		return 0;
	}

	getWallHeight = () => {
		if (this.wall.config.kind === 'space') {
			return 0;
		}

		return this.wall.height + this.wall.peakMaterial.height + ((this.wall.peakMaterial.tip) ? this.wall.peakMaterial.tip.height : 0);
	}
}


export default Panels;