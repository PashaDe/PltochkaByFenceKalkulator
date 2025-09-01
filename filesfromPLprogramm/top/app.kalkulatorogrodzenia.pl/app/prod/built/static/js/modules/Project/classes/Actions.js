import * as panelActions from '../redux/panel/actions';
import * as dialogActions from 'modules/assets/Dialog/redux/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';


class Actions {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;
	}

	setPanel = (type) => {
		switch (type) {
			case 'episode':
				panelActions.set(type);
				break;

			case 'colors-blocks':
				panelActions.set(type, {
					blocksFamily: this.instance.blocksFamily,
					blocksColor: this.instance.blocksColor,
				});
				break;

			case 'colors-peaks':
				panelActions.set(type, {
					peaksFamily: this.instance.peaksFamily,
					peaksColor: this.instance.peaksColor,
				});
				break;

			case 'combo':
				panelActions.set(type, this.instance.combo, this.instance.combo);
				break;

			case 'fencings':
				panelActions.set(type, this.instance.fencings, this.instance.fencings);
				break;

			case 'migration':
				panelActions.set(type);
				break;

			case 'settings':
				panelActions.set(type, this.instance.settings, this.instance.settings);
				break;

			default:
		}
	}

	setSetting = (name, value = null) => {
		switch (name) {
			case 'move':
				value = !(this.instance.settings[name]);
				break;

			case 'autosave':
				value = !(this.instance.settings[name]);

				this.instance.extensions.autosave.set(value);
				break;

			case 'defaultDistance':
				value = parseFloat(value);
				break;

			case 'heightPoles':
				value = parseInt(value, 10);
				break;

			case 'heightWalls':
				value = parseInt(value, 10);
				break;

			default:
		}

		this.instance.settings[name] = value;
		this.instance.setModified();
	}

	addPole = () => {
		this.instance.addPole(null, null, null, this.instance.settings.defaultDistance, 'wall', false);
		this.instance.setModified();
	}

	addCurtain = () => {
		this.instance.addPole(null, null, null, this.instance.settings.defaultDistance, 'wall', true);
		this.instance.setModified();
	}

	addWicket = () => {
		this.instance.addPole(null, null, null, 1, 'wicket', false);
		this.instance.setModified();
	}

	addGate = () => {
		this.instance.addPole(null, null, null, 4, 'gate', false);
		this.instance.setModified();
	}

	addSpace = () => {
		this.instance.addPole(null, null, null, this.instance.settings.defaultDistance, 'space', false);
		this.instance.setModified();
	}

	clear = () => {
		dialogActions.confirm(
			___('Usunąć wszystkie słupki i przęsła?'),
			() => {
				this.instance.projectClear();

				this.instance.resetOptions();
				this.instance.setModified();
			},
		);
	}

	reset = () => {
		dialogActions.confirm(
			___('Zmienić system i zacząć wszystko od nowa?'),
			() => {
				document.getElementById('application').style.display = 'none';

				this.instance.intro.instance.state.project.data.system = false;
				this.instance.intro.forceUpdate();
			},
		);
	}

	migration = (key) => {
		dialogActions.confirm(
			___('Kontynuować?'),
			() => {
				this.instance.migration(key, Objects.first(this.instance.config.systems[key].blocks));
			},
		);
	}

	setBlocksColor = (key, color) => {
		this.instance.blocksColor = key;
		if (color.force?.peaksColor && Objects.in(this.instance.peaksColor, color.force.peaksColor)) {
			this.instance.peaksColor = key;
		}
		this.instance.updateTextures();

		this.setPanel('colors-blocks');
		this.instance.setModified();
	}

	setPeaksColor = (key, color) => {
		if (color.force?.blocksColor && Objects.in(this.instance.blocksColor, color.force.blocksColor)) {
			this.instance.blocksColor = key;
		}
		this.instance.peaksFamily = color.family;
		this.instance.peaksColor = key;
		this.instance.updateTextures();

		this.setPanel('colors-peaks');
		this.instance.setModified();
	}

	setAllHeightPoles = () => {
		let size = this.instance.settings.heightPoles;

		if (size >= 0 && size <= 30) {
			let status = true;

			Objects.values(this.instance.poles).forEach((entry) => {
				let targetSize = Math.round(size - entry.seating / entry.seatingMaterialHeight);

				if (targetSize < entry.getMinHeight()) {
					status = false;
				}
			});

			if (status) {
				Objects.values(this.instance.poles).forEach((entry) => {
					let targetSize = Math.round(size - entry.seating / entry.seatingMaterialHeight);

					entry.resizeHeight(targetSize);
				});

				this.instance.extensions.communique.set(`${___('Zmiany zostały zastosowane')}.`);
			} else {
				this.instance.extensions.communique.set(`${___('Przynajmniej jeden z elementów nie pozwala na zastosowanie zmian')}.`);
			}
		} else {
			this.instance.extensions.communique.set(`${___('Podano nieprawidłową wartość')}.`);
		}
	}

	setAllHeightWalls = () => {
		let size = this.instance.settings.heightWalls;

		if (size >= 1 && size <= 30) {
			let status = true;

			Objects.values(this.instance.poles).forEach((entry) => {
				entry = entry.wall;

				if (size > entry.getMaxHeight()) {
					status = false;
					return;
				}

				// zabezpieczenie ósemek
				let height = size * entry.blockMaterial.block.height;
				let potentialHeight = entry.getMaxPotentialHeight(size);

				if (entry.blocksFamily.settings.sameAlignment) {
					if (height > potentialHeight) {
						status = false;
					}
				} else if (height >= potentialHeight) {
					status = false;
				}
			});

			if (status) {
				Objects.values(this.instance.poles).forEach((entry) => {
					entry = entry.wall;

					entry.resizeHeight(size);
				});

				this.instance.extensions.communique.set(`${___('Zmiany zostały zastosowane')}.`);
			} else {
				this.instance.extensions.communique.set(`${___('Przynajmniej jeden z elementów nie pozwala na zastosowanie zmian')}.`);
			}
		} else {
			this.instance.extensions.communique.set(`${___('Podano nieprawidłową wartość')}.`);
		}
	}

	setAllMaterialPoles = (key) => {
		Objects.values(this.instance.poles).forEach((entry) => {
			if (entry) {
				const pole = entry;
				const list = pole.getBlockMaterialsList();

				let id;
				const material = pole.config.blockMaterialId;

				if (material.indexOf('c2-') === 0) {
					if (list[`c2-${key}`]) {
						id = `c2-${key}`;
					} else if (list[`c1-${key}`]) {
						id = `c1-${key}`;
					}
				} else if (material.indexOf('c1-') === 0) {
					if (list[`c1-${key}`]) {
						id = `c1-${key}`;
					} else if (list[`c2-${key}`]) {
						id = `c2-${key}`;
					}
				} else {
					id = key;
				}

				if (id && list[id]) {
					pole.actions.blockMaterial(id);
				}
			}
		});

		this.instance.actions.setPanel('settings');
		this.instance.setHighlight(null);
	}

	setAllMaterialWalls = (key) => {
		Objects.values(this.instance.poles).forEach((entry) => {
			if (entry && entry.next && entry.next.wall) {
				const wall = entry.next.wall;
				const list = wall.getBlockMaterialsList();

				let id = key;

				if (id && list[id]) {
					wall.actions.blockMaterial(id);
				}
			}
		});

		this.instance.actions.setPanel('settings');
		this.instance.setHighlight(null);
	}

	setCombo = (state) => {
		this.instance.combo = state;
		this.instance.comboReload();
		this.instance.fencingsReload();

		this.instance.setModified();
	}

	setFencings = (state) => {
		this.instance.fencings = state;
		this.instance.comboReload();
		this.instance.fencingsReload();

		this.instance.setModified();
	}

	switchView = (view = false) => {
		if (view) {
			this.instance.setView(view);
		} else if (this.three.view.get() === '2d') {
			this.instance.setView('3d');
		} else {
			this.instance.setView('2d');
		}
	}

	switchWindow = (variant = null) => {
		const app = document.getElementById('application');
		const variants = ['none', 'vertical', 'horizontal', 'cascade-technical', 'cascade-main'];

		if (!variant) {
			const key = variants.indexOf(this.instance.window) + 1;

			if (key < variants.length) {
				variant = variants[key];
			} else {
				variant = variants[0];
			}
		}

		this.instance.window = variant;

		Objects.values(variants).forEach((id) => {
			app.classList.remove(`window-${id}`);
		});

		app.classList.add(`window-${variant}`);

		// canvas resize
		this.instance.three.reset();
		this.instance.threeHelper.reset();
	}
}


export default Actions;