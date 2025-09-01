import React from 'react';

import container from 'redux/container';
import * as panelActions from '../redux/panel/actions';
import * as workspaceActions from '../redux/workspace/actions';

import ThreeFonts from 'classes/Three/ThreeFonts';
import Loop from 'classes/Tools/Loop';
import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';
import GeometryPoints from './tools/GeometryPoints';
import { ___ } from 'classes/Translation';

import Core from './Core';
import Actions from './Actions';
// import Test from './Test';

import Pole from './objects/Pole';
import Wall from './objects/Wall';
import Flag from './objects/Flag';

import ButtonImage from 'components/ui/ButtonImage';
import ButtonText from 'components/ui/ButtonText';


class App extends Core {
	constructor(args) {
		super(args);

		this.actions = new Actions(this);

		// settings
		this.settings = {
			title: '',
			description: '',
			move: true,
			autosave: false,
			defaultDistance: 0,
			heightPoles: 0,
			heightWalls: 0,
		};

		// systems
		this.system = null;
		this.blocksFamily = null;
		this.blocksColor = null;
		this.peaksFamily = null;
		this.peaksColor = null;

		// combo
		this.combo = {
			status: false,
			system: null,
			variant: null,
			color: null,
		};

		// fencings
		this.fencings = {
			status: false,
			group: null,
			system: null,
			variant: null,
			space: null,
			color: null,
		};

		// objects
		this.poles = [];
		this.flags = [];

		this.firstPole = null;
		this.lastPole = null;

		// run
		this.window = this.details.window;

		this.fonts = new ThreeFonts({
			normal: '/assets/fonts/helvetiker_normal.json',
			bold: '/assets/fonts/helvetiker_bold.json',
		}, () => {
			this.init();
			this.events();
		});
	}

	run = () => {
		this.addFlags();

		this.extensions.dimensions.addPredefined();

		if (!this.id) {
			this.system = this.project.data.system;

			this.blocksFamily = this.project.data.blocksFamily;
			this.blocksColor = this.getBlocksFamily().default.blocksColor;

			this.peaksFamily = this.getBlocksFamily().default.peaksFamily;
			this.peaksColor = this.getBlocksFamily().default.peaksColor;

			this.settings.defaultDistance = this.getBlocksFamily().settings.distance.min * this.getBlocksFamily().settings.distance.default;
			this.settings.heightPoles = this.getBlocksFamily().pole.default.height;
			this.settings.heightWalls = this.getBlocksFamily().wall.default.height;

			if (Objects.count(this.getBlocksFamily().options)) {
				Objects.entries(this.getBlocksFamily().options).forEach(([key, entry]) => {
					this.settings[key] = entry.default;
				});
			}

			this.settings.chemicals = true;

			this.updateTextures();
		} else {
			this.extensions.storage.load(this.project);
		}

		if (this.editMode()) {
			workspaceActions.add('bottom-left', 'window', (
				<ButtonImage action={() => this.actions.switchWindow()} type="window" description={___('Zmień widok')} />
			));
		}

		if (!this.editMode()) {
			workspaceActions.add('bottom-right', 'switcher', (<div className="p-2"><ButtonText action={() => this.actions.switchView()} text="2D/3D" /></div>));
		}

		workspaceActions.edit('day-night', { status: this.getSystem().adds.lamps });

		this.extensions.autosave.set(this.settings.autosave);
		this.extensions.timer.init();

		this.actions.switchWindow(this.window);
		this.actions.setPanel('settings');

		// this.test = new Test(this);
	}

	reset = () => {
		document.getElementById('application').style.display = '';

		const defaultDistance = this.getBlocksFamily().settings.distance.min * this.getBlocksFamily().settings.distance.default;

		this.projectClear();

		setTimeout(() => {
			panelActions.reset();

			this.system = this.project.data.system;

			this.blocksFamily = this.project.data.blocksFamily;
			this.blocksColor = this.getBlocksFamily().default.blocksColor;

			this.peaksFamily = this.getBlocksFamily().default.peaksFamily;
			this.peaksColor = this.getBlocksFamily().default.peaksColor;

			if (this.settings.defaultDistance < this.getBlocksFamily().settings.distance.min) {
				this.settings.defaultDistance = this.getBlocksFamily().settings.distance.min;
			}

			if (this.settings.defaultDistance === defaultDistance) {
				this.settings.defaultDistance = this.getBlocksFamily().settings.distance.min * this.getBlocksFamily().settings.distance.default;
			}

			this.updateTextures();

			workspaceActions.edit('day-night', { status: this.getSystem().adds.lamps });

			this.actions.setPanel('settings');
		}, 500);
	}

	migration = (system, family) => {
		const project = this.extensions.storage.encode();

		this.projectClear();

		setTimeout(() => {
			const migration = {
				config: this.getSystem().migration,
				oldSystem: this.system,
				newSystem: system,
			};

			const blocksFamily = this.config.systems[system].blocks[family];

			project.data.system = system;

			project.data.blocksFamily = family;
			project.data.blocksColor = blocksFamily.default.blocksColor;

			project.data.peaksFamily = blocksFamily.default.peaksFamily;
			project.data.peaksColor = blocksFamily.default.peaksColor;

			project.data.settings.defaultDistance = blocksFamily.settings.distance.min * blocksFamily.settings.distance.default;

			Objects.values(project.data.poles).forEach((pole) => {
				if (pole) {
					pole.blockMaterialId = this.migrate(migration, 'pole', pole.blockMaterialId);
					pole.temporary.blockMaterialId.line = this.migrate(migration, 'pole', pole.temporary.blockMaterialId.line);
					pole.temporary.blockMaterialId.corner = this.migrate(migration, 'pole', pole.temporary.blockMaterialId.corner);
				}
			});

			Objects.values(project.data.walls).forEach((wall) => {
				if (wall) {
					wall.blockMaterialId = this.migrate(migration, 'wall', wall.blockMaterialId);
				}
			});

			this.extensions.storage.load(project);

			this.updateTextures();

			workspaceActions.edit('day-night', { status: this.getSystem().adds.lamps });

			this.actions.setPanel('settings');
		}, 500);
	}

	migrate = (migration, group, id) => {
		let result;

		Objects.values(this.config.migrations[migration.config][group]).forEach((basket) => {
			if (!result) {
				if (basket[migration.oldSystem] && Objects.in(id, basket[migration.oldSystem])) {
					result = basket[migration.newSystem][0];
				}
			}
		});

		return result;
	}

	update = () => {
		this.projectReload();
	}

	events = () => {
		['keydown'].forEach((event) => document.addEventListener(event, (e) => {
			if (e.keyCode === 46) {
				switch (panelActions.get('type')) {
					case 'pole':
					case 'wall':
						{
							const object = panelActions.get('object');

							object.actions.remove();
						}
						break;

					case 'dimension':
						{
							const object = panelActions.get('object');

							if (!object.boundary) {
								object.actions.remove();
							}
						}
						break;

					default:
				}
			}
		}));
	}


	/* --- FLAGS ---------------------------------------------- */

	addFlags = () => {
		this.addFlag(-2, -15);
		this.addFlag(0, -15);
		this.addFlag(2, -15);
	}

	addFlag = (x, z) => {
		this.flags.push(new Flag(this, x, z));
	}

	moveFlags = (left, right, top) => {
		if (!(left.z < Infinity && right.z > -Infinity && top.z < Infinity)) {
			left = { x: 0, y: 0, z: 0 };
			right = { x: 0, y: 0, z: 0 };
			top = { x: 0, y: 0, z: 0 };
		}

		let h = (left.x + right.x) / 2;
		let v = top.z - 15;

		this.flags[0].move(h - 2, v);
		this.flags[1].move(h, v);
		this.flags[2].move(h + 2, v);
	}

	showFlags = () => {
		Objects.values(this.flags).forEach((entry) => entry.show());
	}

	hideFlags = () => {
		Objects.values(this.flags).forEach((entry) => entry.hide());
	}


	/* --- SYSTEMS -------------------------------------------- */

	getSystemDir = () => `${this.config.systemsDir}${this.system}/`

	getSystem = () => this.config.systems[this.system]

	getBlocksFamily = () => this.getSystem().blocks[this.blocksFamily]

	getPeaksFamily = () => this.getSystem().peaks[this.peaksFamily]

	getDefaultMaterial = (config) => {
		const materialId = config.default.material;

		if (config.materials[materialId].disabled && Objects.in(this.peaksColor, config.materials[materialId].disabled.colors)) {
			return config.materials[materialId].disabled.material;
		}

		return materialId;
	}

	updateTextures = () => {
		if (!this.textures.systems) {
			this.textures.systems = [];
		}

		// system
		if (!(this.system in this.textures.systems)) {
			this.textures.systems[this.system] = { blocks: {}, peaks: {} };
		}

		// blocks
		if (!(this.blocksFamily in this.textures.systems[this.system].blocks)) {
			this.textures.systems[this.system].blocks[this.blocksFamily] = [];
		}

		// peaks
		if (!(this.peaksFamily in this.textures.systems[this.system].peaks)) {
			this.textures.systems[this.system].peaks[this.peaksFamily] = [];
		}

		// update
		if ((this.blocksColor in this.textures.systems[this.system].blocks[this.blocksFamily]) && (this.peaksColor in this.textures.systems[this.system].peaks[this.peaksFamily])) {
			this.projectReload();
		}

		if (!(this.blocksColor in this.textures.systems[this.system].blocks[this.blocksFamily])) {
			this.textures.systems[this.system].blocks[this.blocksFamily][this.blocksColor] = { pole: {}, wall: {} };

			Objects.keys(this.getBlocksFamily().pole.materials).forEach((materialId) => {
				this.textures.systems[this.system].blocks[this.blocksFamily][this.blocksColor].pole[materialId] = { texture: {} };

				Objects.entries(this.getBlocksFamily().pole.materials[materialId].block.texture).forEach(([texture, entry]) => {
					let source = `${this.getSystemDir()}blocks/${this.getBlocksFamily().path}/${this.blocksColor}/${entry.src}`;

					this.textures.systems[this.system].blocks[this.blocksFamily][this.blocksColor].pole[materialId].texture[texture] = this.createTexture(source, true);
				});
			});

			Objects.keys(this.getBlocksFamily().wall.materials).forEach((materialId) => {
				this.textures.systems[this.system].blocks[this.blocksFamily][this.blocksColor].wall[materialId] = { texture: {} };

				Objects.entries(this.getBlocksFamily().wall.materials[materialId].block.texture).forEach(([texture, entry]) => {
					let source = `${this.getSystemDir()}blocks/${this.getBlocksFamily().path}/${this.blocksColor}/${entry.src}`;

					this.textures.systems[this.system].blocks[this.blocksFamily][this.blocksColor].wall[materialId].texture[texture] = this.createTexture(source, true);
				});
			});
		}

		if (!(this.peaksColor in this.textures.systems[this.system].peaks[this.peaksFamily])) {
			this.textures.systems[this.system].peaks[this.peaksFamily][this.peaksColor] = [];

			Objects.keys(this.getPeaksFamily().materials).forEach((materialId) => {
				this.textures.systems[this.system].peaks[this.peaksFamily][this.peaksColor][materialId] = { texture: {} };

				Objects.entries(this.getPeaksFamily().materials[materialId].texture).forEach(([texture, entry]) => {
					let source = `${this.getSystemDir()}peaks/${this.getPeaksFamily().path}/${this.peaksColor}/${entry.src}`;

					this.textures.systems[this.system].peaks[this.peaksFamily][this.peaksColor][materialId].texture[texture] = this.createTexture(source, true);
				});
			});
		}
	}

	getCurrentBlocksColorsList = () => {
		let output = [];

		Objects.entries(this.getBlocksFamily().colors).forEach(([key, entry]) => {
			let path = `${this.getSystemDir()}blocks/${this.getBlocksFamily().path}/${key}.jpg`;

			output[key] = {
				family: this.blocksFamily,
				label: entry.label,
				force: entry.force,
				path,
			};
		});

		return output;
	}

	getCurrentPeaksColorsList = () => {
		let output = [];

		Objects.entries(this.getSystem().peaks).forEach(([peaksFamily, entry]) => {
			output[peaksFamily] = {
				label: entry.label,
				colors: [],
			};

			Objects.entries(this.getSystem().peaks[peaksFamily].colors).forEach(([key, subentry]) => {
				let path = `${this.getSystemDir()}peaks/${this.getSystem().peaks[peaksFamily].path}/${key}.jpg`;

				output[peaksFamily].colors[key] = {
					family: peaksFamily,
					label: subentry.label,
					force: subentry.force,
					path,
				};
			});
		});

		return output;
	}

	getPoleMaterialsList = () => {
		let output = [];

		Objects.entries(this.getBlocksFamily().pole.materials).forEach(([key, entry]) => {
			if (entry.disabled) {
				if (!entry.disabled.colors) {
					return;
				}

				if (entry.disabled.colors && Objects.in(this.blocksColor, entry.disabled.colors)) {
					return;
				}

				if (entry.disabled.colors && Objects.in(this.peaksColor, entry.disabled.colors) && entry.disabled.peaks) {
					return;
				}
			}

			output[key] = {
				label: entry.label,
				modifiable: entry.modifiable,
			};
		});

		return output;
	}

	getWallMaterialsList = () => {
		let output = [];

		Objects.entries(this.getBlocksFamily().wall.materials).forEach(([key, entry]) => {
			if (entry.disabled) {
				if (!entry.disabled.colors) {
					return;
				}

				if (entry.disabled.colors && Objects.in(this.blocksColor, entry.disabled.colors)) {
					return;
				}

				if (entry.disabled.colors && Objects.in(this.peaksColor, entry.disabled.colors) && entry.disabled.peaks) {
					return;
				}
			}

			output[key] = {
				label: entry.label,
				support: entry.support,
			};
		});

		return output;
	}

	getMaterialPoles = () => {
		const output = [];

		Objects.entries(this.getBlocksFamily().pole.materials).forEach(([material, m]) => {
			if (material.indexOf('c2-') === 0) {
				//
			} else if (material.indexOf('c1-') === 0) {
				//
			} else if (!(m.disabled && m.disabled.material && !m.disabled.colors)) {
				output[material] = m.label;
			}
		});

		return output;
	}

	getMaterialWalls = () => {
		const output = [];

		Objects.entries(this.getBlocksFamily().wall.materials).forEach(([material, m]) => {
			if (!(m.disabled && m.disabled.material && !m.disabled.colors)) {
				output[material] = m.label;
			}
		});

		return output;
	}

	getSystemOptions = () => {
		let output = [];

		Objects.entries(this.getBlocksFamily().options).forEach(([key, entry]) => {
			const currentUserType = container.user?.type || 'client';

			if (!entry.permissions || Objects.in(currentUserType, entry.permissions)) {
				output[key] = entry;
			}
		});

		return output;
	}


	/* --- METHODS -------------------------------------------- */

	addEpisode = (distance, between, angle) => {
		const blocksFamily = this.getBlocksFamily();

		const poleMaterialId = this.getDefaultMaterial(blocksFamily.pole);
		const poleMaterial = blocksFamily.pole.materials[poleMaterialId];

		// const wallMaterialId = this.getDefaultMaterial(blocksFamily.wall);
		// const wallMaterial = blocksFamily.wall.materials[wallMaterialId];

		const start = {};

		if (!this.lastPole) {
			const x = (-distance + poleMaterial.block.width) / 2;

			const point = Maths.rotatePointDegrees({ x, z: 0 }, angle);

			start.position = point;
			start.angle = 0;
			start.diff = 0;
			start.first = true;
		} else {
			start.position = this.lastPole.position;
			start.angle = -Maths.rotationToDegrees(this.lastPole.rotation);
			start.diff = 0;
			start.first = false;

			if (angle) {
				const points = GeometryPoints.Corner(this.lastPole.width, this.lastPole.depth, this.lastPole.width, this.lastPole.depth, 180 + angle);
				const x = poleMaterial.block.width / 2 + points.r.x;

				const diff = Maths.rotatePointDegrees({ x, z: 0 }, -start.angle);

				this.lastPole.position.x += diff.x;
				this.lastPole.position.z -= diff.z;

				start.diff = x;
			}
		}

		const firstPoleSize = (start.first || start.diff) ? poleMaterial.block.width : 0;
		const first = Number(!start.first);
		const last = Math.ceil((distance - firstPoleSize - 0.02) / (poleMaterial.block.width + between));

		const data = {
			last: distance - firstPoleSize,
			prelast: (poleMaterial.block.width + between) * (last - 1),
		};

		if ((data.last - data.prelast) < poleMaterial.block.width * 2) {
			data.prelast -= (between - (data.last - data.prelast - poleMaterial.block.width)) / 2;
		}

		for (let i = first; i <= last; i++) {
			let x;

			switch (i) {
				case last:
					x = data.last;
					break;

				case last - 1:
					x = data.prelast;
					break;

				default:
					x = (poleMaterial.block.width + between) * i;
			}

			const diff = Maths.rotatePointDegrees({ x: x + start.diff, z: 0 }, start.angle + angle);

			this.addPole(null, start.position.x + diff.x, start.position.z + diff.z);
		}
	}

	addPole = (id = null, x = null, z = null, distance = null, kind = 'wall', virtual = false) => {
		if (!id && this.highlight instanceof Wall && this.restorePole(this.highlight, kind, virtual)) {
			return false;
		}

		if (x === null && z === null && distance) {
			// distance
			let diff1 = 0;
			let diff2 = 0;

			if (this.lastPole) {
				let block = this.getBlocksFamily().pole.materials[this.getBlocksFamily().pole.default.material].block.width;
				let width = (!Objects.isArray(block)) ? block : block[0];

				diff1 = this.lastPole.width / 2;
				diff2 = width / 2;
			}

			distance = distance + diff1 + diff2;

			// position
			let posX = -5; // default position of first pole
			let posZ = 0; // default position of first pole

			if (this.lastPole !== null) {
				let diffX = this.lastPole.prev.position.x - this.lastPole.position.x;
				let diffZ = this.lastPole.prev.position.z - this.lastPole.position.z;

				if (Math.abs(diffX) >= Math.abs(diffZ)) {
					if (diffX <= 0) {
						posX = this.lastPole.position.x + distance;
					} else {
						posX = this.lastPole.position.x - distance;
					}

					posZ = this.lastPole.position.z;
				} else {
					posX = this.lastPole.position.x;

					if (diffZ <= 0) {
						posZ = this.lastPole.position.z + distance;
					} else {
						posZ = this.lastPole.position.z - distance;
					}
				}
			}

			x = posX;
			z = posZ;
		}

		// id
		id = (id) || ((this.lastPole) ? parseInt(this.lastPole.id, 10) + 1 : 0);

		// pole
		let isFirst = !this.firstPole;
		let pole = new Pole(this, id, x, z, virtual);

		this.poles[id] = pole;

		if (this.firstPole === null) {
			this.firstPole = pole;
		}

		this.lastPole = pole;
		this.beforeLastPole = pole.prev;

		this.lastPole.after((!isFirst) ? kind : 'pole');

		return pole;
	}

	restorePole = (wall, kind, virtual) => {
		const prev = wall.pole1;
		const next = wall.pole2;

		const id = parseInt(next.id, 10) - 1;

		if (!this.poles[id]) {
			// console.log({ prev: prev.id, new: id, next: next.id });

			const pole = new Pole(this, id, wall.position.normal.x, wall.position.normal.z, virtual);

			prev.next = pole;
			next.prev = pole;
			next.wall.pole1 = pole;

			pole.prev = prev;
			pole.next = next;
			pole.wall = new Wall(this, prev, pole, kind);
			pole.setDirections();

			this.poles[id] = pole;

			this.extensions.dimensions.update();

			this.setHighlight(pole.wall);

			return true;
		}

		return false;
	}

	removePole = (id) => {
		let pole = this.poles[id];

		if (pole) {
			let polesLength = -1;
			Objects.values(this.poles).forEach(() => {
				polesLength++;
			});

			// first & last
			if (this.firstPole && this.firstPole.id === id) {
				this.firstPole = pole.next;
			}

			if (this.lastPole && this.lastPole.id === id) {
				this.lastPole = pole.prev;
				this.beforeLastPole = pole.prev.prev;
			}

			if (this.beforeLastPole && this.beforeLastPole.id === id) {
				this.beforeLastPole = pole.prev;
			}

			// prev & next
			if (pole.prev) {
				pole.prev.next = pole.next;
			}

			if (pole.next) {
				pole.next.prev = pole.prev;
			}

			// wall
			if (pole.next && pole.next.wall) {
				pole.next.wall.pole1 = pole.prev;
			}

			if (pole.wall) {
				pole.wall.remove();
			}

			// first & last set null
			if (polesLength < 1) this.firstPole = null;
			if (polesLength < 1) this.lastPole = null;
			if (polesLength < 2) this.beforeLastPole = null;

			// update
			if (polesLength < 2 && this.firstPole) {
				this.firstPole.rotation = 0;

				if (this.firstPole.next) {
					this.firstPole.next = null;
				}
			}

			if (pole.prev) {
				pole.prev.update();
			}

			if (pole.next) {
				pole.next.update();
			}

			pole.setDirections();

			// remove
			pole.remove();
			delete this.poles[id];

			// project
			this.setOffsets();

			this.extensions.dimensions.removeDimensionByPole(id);
			this.extensions.dimensions.update();
		}
	}

	projectClear = () => {
		// dimensions
		Objects.values(this.extensions.dimensions.objects).forEach((entry) => {
			this.extensions.dimensions.removeDimension(entry.id);
		});

		// poles & walls
		Objects.values(this.poles).forEach((entry) => {
			this.removePole(entry.id);
		});
	}

	projectReload = () => {
		Objects.values(this.poles).forEach((entry) => {
			entry.reload();

			if (entry.wall) {
				entry.wall.reload();
			}
		});
	}

	comboReload = () => {
		Objects.values(this.poles).forEach((entry) => {
			if (entry.wall && entry.wall.combo) {
				entry.wall.combo.status = entry.wall.combo.setStatus();
				entry.wall.combo.reload();
			}
		});
	}

	fencingsReload = () => {
		Objects.values(this.poles).forEach((entry) => {
			if (entry.wall && entry.wall.fencing) {
				entry.wall.fencing.status = entry.wall.fencing.setStatus();
				entry.wall.fencing.reload();
			}
		});
	}

	setOffsets = () => {
		if (!this.isMoving) {
			let offset = 0;

			Objects.values(this.poles).forEach((entry) => {
				switch (this.getBlocksFamily().settings.offsets) {
					case 'continuous':
						entry.setBreak();

						if (entry.next && entry.next.wall && entry.next.wall.status) {
							let wall = entry.next.wall;

							wall.offset = offset;
							wall.doWall();

							if (!entry.next.break) {
								offset += wall.wallWidth;
							} else {
								offset = 0;
							}
						}
						break;

					case 'modular-alternately':
						// pole
						entry.offset = offset;
						entry.doPole();

						if (!entry.config.virtual) {
							offset += (entry.blockMaterial.block.type !== 'corner') ? entry.poleWidth : entry.poleWidth + entry.poleDepth;
						}

						if (this.lastPole && this.lastPole.id === entry.id) {
							break;
						}

						// wall
						if (entry.next && entry.next.wall) {
							let wall = entry.next.wall;

							wall.offset = offset;
							wall.doWall();

							if (entry.next.wall.status && entry.next.wall.config.kind === 'wall') {
								offset += wall.wallWidth - Maths.fmod(wall.wallWidth, wall.blockMaterial.block.width) + (!this.isModDual(wall.wallWidth, wall.blockMaterial.block.width) ? wall.blockMaterial.block.width : 0);
							}
						}
						break;

					default:
				}
			});
		}
	}

	setTechnical = (object) => {
		if (object && this.window && this.window !== 'none') {
			let self = false;
			let rotation = false;
			let position = false;

			if (object instanceof Pole) {
				self = object;
				rotation = object.rotation;
				position = object.position;
			}

			if (object instanceof Wall) {
				self = object.pole2;
				rotation = object.rotation.normal;
				position = object.position.normal;
			}

			if (rotation !== false && position !== false) {
				const camera = this.threeHelper.cameras['2d'];

				const space = Maths.rotatePoint({ x: 0, y: 0, z: -5 }, rotation);

				camera.position.set(position.x + space.x, 0, position.z + space.z);
				camera.controls.target.set(position.x, 0, position.z);
				camera.controls.update();

				let list = [];
				let first;

				let current;
				let loop;

				current = self;

				loop = new Loop();
				loop.run(() => {
					if (!current.isFirst() && current.prev) {
						if (current.prev.blockMaterial.block.type === 'corner') {
							loop.break();
						}

						if (current.prev.config.polygonBreak) {
							loop.break();
							return;
						}

						current = current.prev;
					} else {
						loop.break();
					}
				});

				first = `${current.id}`;
				list.push(`${current.id}`);

				loop = new Loop();
				loop.run(() => {
					if (!current.isLast() && current.next) {
						if (current.next.blockMaterial.block.type === 'corner') {
							loop.break();
						}

						if (current.next.config.polygonBreak) {
							loop.break();
						}

						current = current.next;
						list.push(`${current.id}`);
					} else {
						loop.break();
					}
				});

				Objects.values(this.poles).forEach((entry) => {
					const id = `${entry.id}`;
					const status = Objects.in(id, list) ? 1 : 0;

					entry.technical.update((id === first && entry.blockMaterial.block.type === 'corner') ? 2 : status);

					if (entry.wall) {
						entry.wall.technical.update((id === first) ? 0 : status);
					}
				});
			}
		}
	}


	/* --- FUNCTIONS ------------------------------------------ */

	findAngle = (pole1, pole2, pole3) => {
		if (!pole1) {
			pole1 = pole2;
		}

		if (!pole3) {
			pole3 = pole2;
		}

		if (this.firstPole && this.firstPole.id === pole2.id) {
			pole1 = pole2;
		}

		if (this.lastPole && this.lastPole.id === pole2.id) {
			pole3 = pole2;
		}

		// polygonBreak
		if (pole1 && pole1.config.polygonBreak) {
			pole1 = pole2;
		}

		if (pole2.config.polygonBreak) {
			pole3 = pole2;
		}

		return Maths.findAngleBidirectional({ x: pole1.position.x, y: pole1.position.z }, { x: pole2.position.x, y: pole2.position.z }, { x: pole3.position.x, y: pole3.position.z });
	}

	findRotation = (pole1, pole2, pole3) => {
		if (!pole1) {
			pole1 = pole2;
		}

		if (!pole3) {
			pole3 = pole2;
		}

		if (this.firstPole && this.firstPole.id === pole2.id) {
			pole1 = pole2;
			pole2 = pole3;
		}

		// polygonBreak
		if (pole1 && pole1.config.polygonBreak) {
			pole1 = pole2;

			if (!pole2.config.polygonBreak) {
				if (!(this.lastPole && this.lastPole.id === pole2.id)) {
					pole2 = pole3;
				}
			}
		}

		if (pole1.id !== pole2.id) {
			return Maths.getRotation({ x: pole1.position.x, y: pole1.position.z }, { x: pole2.position.x, y: pole2.position.z });
		}

		return 0;
	}

	isAngle = (angle) => {
		if ((angle > 1 && angle < 179) || (angle < -1 && angle > -179)) {
			return false;
		}

		return true;
	}

	isRightAngle = (angle) => {
		if ((angle > 89 && angle < 91) || (angle < -89 && angle > -91)) {
			return true;
		}

		return false;
	}

	isMod = (val, divider) => {
		const mod = Maths.round(Maths.fmod(val, divider));

		return mod > 0 && mod < 0.02;
	}

	isModDual = (val, divider) => {
		const mod = Maths.round(Maths.fmod(val, divider));

		return mod > -0.02 && mod < 0.02;
	}

	isModBackward = (val, divider) => {
		const mod = Maths.round(Maths.fmod(val, divider));

		return mod > divider - 0.02 || mod < 0.02;
	}

	isTolerance = (value, expected, tolerance) => value > expected - tolerance && value < expected + tolerance
}


export default App;