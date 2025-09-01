import React from 'react';

import * as workspaceActions from '../../redux/workspace/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import Dimension from '../objects/Dimension';

import AddDimension from 'components/ui/AddDimension';


class Dimensions {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;

		this.bounds = [];
		this.boundary = {
			left: null,
			right: null,
			top: null,
			bottom: null,
		};

		this.cache = {
			active: false,
			position: null,
			start: null,
			end: null,
		};

		this.objectsPredefined = [];
		this.objects = [];

		if (this.instance.editMode()) {
			workspaceActions.add('main', 'addDimensionTop', (<AddDimension action={() => this.addStart('top')} position="top" description={___('Dodaj pomiar')} />), ['2d']);
			workspaceActions.add('main', 'addDimensionLeft', (<AddDimension action={() => this.addStart('left')} position="left" description={___('Dodaj pomiar')} />), ['2d']);
			workspaceActions.add('main', 'addDimensionRight', (<AddDimension action={() => this.addStart('right')} position="right" description={___('Dodaj pomiar')} />), ['2d']);
			workspaceActions.add('main', 'addDimensionBottom', (<AddDimension action={() => this.addStart('bottom')} position="bottom" description={___('Dodaj pomiar')} />), ['2d']);
		}
	}

	addPredefined = () => {
		this.objectsPredefined[0] = new Dimension(this.instance, 0, true, null, null, 'default', 'bottom', 'center', this.instance.colors.dimensionDefault);
		this.objectsPredefined[1] = new Dimension(this.instance, 1, true, null, null, 'default', 'right', 'center', this.instance.colors.dimensionDefault);
	}

	reset = () => {
		this.cache.active = false;
		this.cache.position = null;
		this.cache.start = null;
		this.cache.end = null;
	}

	addStart = (position) => {
		this.reset();

		this.cache.active = true;
		this.cache.position = position;

		this.instance.extensions.communique.set(`${___('Wybierz początek pomiaru')}...`);
	}

	addPoleToDimension = (id) => {
		if (this.cache.active) {
			if (this.instance.poles[id]) {
				if (!this.cache.start && !this.cache.end) {
					this.cache.start = this.instance.poles[id];

					this.instance.extensions.communique.set(`${___('Wybierz koniec pomiaru')}...`);

					return;
				}

				if (this.cache.start && !this.cache.end) {
					this.cache.end = this.instance.poles[id];

					this.instance.extensions.communique.set(null);
					this.add();
				}
			}
		}
	}

	add = () => {
		if (this.cache.position && this.cache.start && this.cache.end) {
			let last = Objects.last(this.objects);
			let id = (last) ? parseInt(last, 10) + 1 : 0;

			this.objects[id] = new Dimension(this.instance, id, false, this.cache.start, this.cache.end, 'default', this.cache.position, 'center');

			this.update(false);
		}

		this.reset();
	}

	removeDimension = (id) => {
		if (this.objects[id]) {
			this.objects[id].remove();
			delete this.objects[id];

			this.update(false);
		}
	}

	removeDimensionByPole = (id) => {
		Objects.entries(this.objects).forEach(([key, entry]) => {
			if (entry.pole1 === id || entry.pole2 === id) {
				entry.remove();
				delete this.objects[key];
			}
		});
	}

	update = (bounds = true) => {
		if (this.instance.isLoading) return;

		if (bounds) {
			this.updateBounds();
		}

		let order = { left: 0, right: 0, top: 0, bottom: 0 };

		// added
		Objects.values(this.objects).reverse().forEach((entry) => {
			if (entry.config.type === 'default') {
				entry.setOrder(order[entry.config.position]);

				order[entry.config.position]++;
			}

			entry.update();
		});

		// predefined
		Objects.values(this.objectsPredefined).reverse().forEach((entry) => {
			if (entry.config.type === 'default') {
				entry.setOrder(order[entry.config.position]);

				order[entry.config.position]++;
			}

			entry.update();
		});
	}

	updateBounds = () => {
		this.bounds = [];

		let left = { x: Infinity, z: null };
		let right = { x: -Infinity, z: null };
		let top = { x: null, z: Infinity };
		let bottom = { x: null, z: -Infinity };

		Objects.values(this.instance.poles).forEach((entry) => {
			let limits = entry.getLimits(false);

			Objects.values(limits).forEach((point) => {
				this.bounds.push(point);

				if (point.x < left.x) left = point;
				if (point.x > right.x) right = point;

				if (point.z < top.z) top = point;
				if (point.z > bottom.z) bottom = point;
			});
		});

		if (this.three.view.get() === '2d' && !this.instance.isMoving) {
			this.instance.moveFlags(left, right, top);
		}

		this.boundary.left = left;
		this.boundary.right = right;
		this.boundary.top = top;
		this.boundary.bottom = bottom;
	}
}


export default Dimensions;