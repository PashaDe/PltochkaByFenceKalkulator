import Http from 'classes/Http';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import Dimension from '../objects/Dimension';


class Storage {
	constructor(instance) {
		this.instance = instance;

		if (this.instance.editMode()) {
			this.initShortkeys();
		}
	}

	initShortkeys = () => {
		['keydown'].forEach((event) => document.addEventListener(event, (e) => {
			if (e.keyCode === 120) {
				if (!document.documentElement.classList.contains('loading')) {
					this.save(true);
				}
			}
		}));
	}

	encode = () => {
		const data = {
			system: this.instance.system,
			blocksFamily: this.instance.blocksFamily,
			blocksColor: this.instance.blocksColor,
			peaksFamily: this.instance.peaksFamily,
			peaksColor: this.instance.peaksColor,
			settings: {
				move: this.instance.settings.move,
				autosave: this.instance.settings.autosave,
				defaultDistance: this.instance.settings.defaultDistance,
				heightPoles: this.instance.settings.heightPoles,
				heightWalls: this.instance.settings.heightWalls,
			},
			combo: this.instance.combo,
			fencings: this.instance.fencings,
			poles: [],
			walls: [],
			dimensionsPredefined: [],
			dimensions: [],
		};

		if (Objects.count(this.instance.getBlocksFamily().options)) {
			Objects.entries(this.instance.getBlocksFamily().options).forEach(([key]) => {
				data.settings[key] = this.instance.settings[key];
			});
		}

		data.settings.chemicals = this.instance.settings.chemicals;

		Objects.entries(this.instance.poles).forEach(([key, entry]) => {
			// poles
			data.poles[key] = {
				id: key,
				width: entry.config.size.width,
				depth: entry.config.size.depth,
				height: entry.config.size.height,
				polygonBreak: entry.config.polygonBreak,
				virtual: entry.config.virtual,
				blockMaterialId: entry.config.blockMaterialId,
				position: {
					x: entry.position.x,
					y: entry.position.y,
					z: entry.position.z,
				},
				temporary: {
					width: {
						line: entry.configTemporary.width.line,
						corner: entry.configTemporary.width.corner,
					},
					depth: {
						line: entry.configTemporary.depth.line,
						corner: entry.configTemporary.depth.corner,
					},
					blockMaterialId: {
						line: entry.configTemporary.blockMaterialId.line,
						corner: entry.configTemporary.blockMaterialId.corner,
					},
				},
				additionals: {
					mailbox: {
						group: entry.additionals.mailbox.config.group,
						model: entry.additionals.mailbox.config.model,
						color: entry.additionals.mailbox.config.color,
						frame: entry.additionals.mailbox.config.frame,
						roof: entry.additionals.mailbox.config.roof,
						side: entry.additionals.mailbox.config.side,
					},
					lamp: {
						group: entry.additionals.lamp.config.group,
						model: entry.additionals.lamp.config.model,
					},
					ledblock: {
						group: entry.additionals.ledblock.config.group,
						model: entry.additionals.ledblock.config.model,
						color: entry.additionals.ledblock.config.color,
					},
				},
			};

			// walls
			if (entry.wall) {
				data.walls[key] = {
					id: key,
					height: entry.wall.config.size.height,
					kind: entry.wall.config.kind,
					blockMaterialId: entry.wall.config.blockMaterialId,
					combo: entry.wall.config.combo,
					fencing: entry.wall.config.fencing,
					fencingHeight: entry.wall.config.fencingHeight,
					manufacture: entry.wall.manufacture.config,
					panels: entry.wall.panels.config,
				};
			} else {
				data.walls[key] = null;
			}
		});

		// dimensions predefined
		Objects.entries(this.instance.extensions.dimensions.objectsPredefined).forEach(([key, entry]) => {
			data.dimensionsPredefined[key] = {
				id: key,
				position: entry.config.position,
				align: entry.config.align,
			};
		});

		// dimensions
		Objects.entries(this.instance.extensions.dimensions.objects).forEach(([key, entry]) => {
			data.dimensions[key] = {
				id: key,
				pole1: entry.pole1,
				pole2: entry.pole2,
				type: entry.config.type,
				position: entry.config.position,
				align: entry.config.align,
			};
		});

		return {
			data,
			title: this.instance.settings.title,
			description: this.instance.settings.description,
		};
	}

	load = (project) => {
		const data = project.data;

		if (data && data.system && data.blocksFamily && data.blocksColor && data.peaksFamily && data.peaksColor && data.settings) {
			this.instance.isLoading = true;

			// system
			if (data.system in this.instance.config.systems) {
				this.instance.system = data.system;
			} else {
				window.location.replace('/');
			}

			this.instance.blocksFamily = data.blocksFamily;

			if (data.peaksFamily in this.instance.getSystem().peaks) {
				this.instance.peaksFamily = data.peaksFamily;
			} else {
				this.instance.peaksFamily = this.instance.getBlocksFamily().default.peaksFamily;
				this.instance.peaksColor = this.instance.getBlocksFamily().default.peaksColor;
				this.instance.extensions.communique.set(`${___('Wybrany wcześniej kolor nie jest już dostępny')}. <br /> ${___('Ustawiono domyślny dla danej konfiguracji')}.`);
			}

			if (data.blocksColor in this.instance.getBlocksFamily().colors) {
				this.instance.blocksColor = data.blocksColor;
			} else {
				this.instance.blocksColor = this.instance.getBlocksFamily().default.blocksColor;
				this.instance.extensions.communique.set(`${___('Wybrany wcześniej kolor nie jest już dostępny')}. <br /> ${___('Ustawiono domyślny dla danej konfiguracji')}.`);
			}

			if (data.peaksColor in this.instance.getPeaksFamily().colors) {
				this.instance.peaksColor = data.peaksColor;
			} else {
				this.instance.peaksColor = this.instance.getBlocksFamily().default.peaksColor;
				this.instance.extensions.communique.set(`${___('Wybrany wcześniej kolor nie jest już dostępny')}. <br /> ${___('Ustawiono domyślny dla danej konfiguracji')}.`);
			}

			// settings
			this.instance.settings.title = project.title;
			this.instance.settings.description = project.description;
			this.instance.settings.move = data.settings.move !== false;
			this.instance.settings.autosave = data.settings.autosave === true;
			this.instance.settings.defaultDistance = (data.settings.defaultDistance) ? data.settings.defaultDistance : this.instance.getBlocksFamily().settings.distance.min * this.instance.getBlocksFamily().settings.distance.default;
			this.instance.settings.heightPoles = data.settings.heightPoles;
			this.instance.settings.heightWalls = data.settings.heightWalls;

			if (Objects.count(this.instance.getBlocksFamily().options)) {
				Objects.entries(this.instance.getBlocksFamily().options).forEach(([key, entry]) => {
					this.instance.settings[key] = (typeof data.settings[key] !== 'undefined') ? data.settings[key] : entry.default;
				});
			}

			this.instance.settings.chemicals = (typeof data.settings.chemicals !== 'undefined') ? data.settings.chemicals : true;

			// combo
			if (typeof data.combo?.status !== 'undefined') this.instance.combo.status = data.combo.status;
			if (typeof data.combo?.system !== 'undefined') this.instance.combo.system = data.combo.system;
			if (typeof data.combo?.variant !== 'undefined') this.instance.combo.variant = data.combo.variant;
			if (typeof data.combo?.color !== 'undefined') this.instance.combo.color = data.combo.color;

			// fencings
			if (typeof data.fencings?.status !== 'undefined') this.instance.fencings.status = data.fencings.status;
			if (typeof data.fencings?.group !== 'undefined') this.instance.fencings.group = data.fencings.group;
			if (typeof data.fencings?.system !== 'undefined') this.instance.fencings.system = data.fencings.system;
			if (typeof data.fencings?.variant !== 'undefined') this.instance.fencings.variant = data.fencings.variant;
			if (typeof data.fencings?.space !== 'undefined') this.instance.fencings.space = data.fencings.space;
			if (typeof data.fencings?.color !== 'undefined') this.instance.fencings.color = data.fencings.color;

			// textures
			this.instance.updateTextures();

			// add
			Objects.values(data.poles).forEach((pole) => {
				if (pole) {
					this.instance.addPole(pole.id, pole.position.x, pole.position.z, null, 'wall', pole.virtual);
				}
			});

			// walls
			Objects.values(data.walls).forEach((wall) => {
				if (wall) {
					let entry = this.instance.poles[wall.id].wall;

					entry.setKind(wall.kind);
					entry.setBlockMaterialId(wall.blockMaterialId);
					entry.resizeHeight(wall.height);

					if (typeof wall.combo !== 'undefined') entry.config.combo = wall.combo;
					if (typeof wall.fencing !== 'undefined') entry.config.fencing = wall.fencing;
					if (typeof wall.fencingHeight !== 'undefined') entry.config.fencingHeight = wall.fencingHeight;

					// manufacture
					if (typeof wall.manufacture?.status !== 'undefined') entry.manufacture.config.status = wall.manufacture.status;
					if (typeof wall.manufacture?.group !== 'undefined') entry.manufacture.config.group = wall.manufacture.group;
					if (typeof wall.manufacture?.system !== 'undefined') entry.manufacture.config.system = wall.manufacture.system;
					if (typeof wall.manufacture?.type !== 'undefined') entry.manufacture.config.type = wall.manufacture.type;
					if (typeof wall.manufacture?.variant !== 'undefined') entry.manufacture.config.variant = wall.manufacture.variant;
					if (typeof wall.manufacture?.space !== 'undefined') entry.manufacture.config.space = wall.manufacture.space;
					if (typeof wall.manufacture?.color !== 'undefined') entry.manufacture.config.color = wall.manufacture.color;
					if (typeof wall.manufacture?.side !== 'undefined') entry.manufacture.config.side = wall.manufacture.side;
					if (typeof wall.manufacture?.directionVertical !== 'undefined') entry.manufacture.config.directionVertical = wall.manufacture.directionVertical;
					if (typeof wall.manufacture?.directionHorizontal !== 'undefined') entry.manufacture.config.directionHorizontal = wall.manufacture.directionHorizontal;
					if (typeof wall.manufacture?.suggestedHeight !== 'undefined') entry.manufacture.config.suggestedHeight = wall.manufacture.suggestedHeight;

					// panels
					if (typeof wall.panels?.group !== 'undefined') entry.panels.config.group = wall.panels.group;
					if (typeof wall.panels?.model !== 'undefined') entry.panels.config.model = wall.panels.model;
					if (typeof wall.panels?.height !== 'undefined') entry.panels.config.height = wall.panels.height;
				}
			});

			// poles
			Objects.values(data.poles).forEach((pole) => {
				if (pole) {
					let entry = this.instance.poles[pole.id];

					entry.configTemporary.width.line = pole.temporary.width.line;
					entry.configTemporary.width.corner = pole.temporary.width.corner;

					entry.configTemporary.depth.line = pole.temporary.depth.line;
					entry.configTemporary.depth.corner = pole.temporary.depth.corner;

					entry.configTemporary.blockMaterialId.line = pole.temporary.blockMaterialId.line;
					entry.configTemporary.blockMaterialId.corner = pole.temporary.blockMaterialId.corner;

					entry.setPolygonBreak(pole.polygonBreak);
					entry.setBlockMaterialId(pole.blockMaterialId, true);
					entry.resizeWidth(pole.width);
					entry.resizeDepth(pole.depth);
					entry.resizeHeight(pole.height);

					// mailbox
					if (typeof pole.additionals?.mailbox?.group !== 'undefined') entry.additionals.mailbox.config.group = pole.additionals.mailbox.group;
					if (typeof pole.additionals?.mailbox?.model !== 'undefined') entry.additionals.mailbox.config.model = pole.additionals.mailbox.model;
					if (typeof pole.additionals?.mailbox?.color !== 'undefined') entry.additionals.mailbox.config.color = pole.additionals.mailbox.color;
					if (typeof pole.additionals?.mailbox?.frame !== 'undefined') entry.additionals.mailbox.config.frame = pole.additionals.mailbox.frame;
					if (typeof pole.additionals?.mailbox?.roof !== 'undefined') entry.additionals.mailbox.config.roof = pole.additionals.mailbox.roof;
					if (typeof pole.additionals?.mailbox?.side !== 'undefined') entry.additionals.mailbox.config.side = pole.additionals.mailbox.side;
					entry.additionals.mailbox.reload();

					// lamp
					if (typeof pole.additionals?.lamp?.group !== 'undefined') entry.additionals.lamp.config.group = pole.additionals.lamp.group;
					if (typeof pole.additionals?.lamp?.model !== 'undefined') entry.additionals.lamp.config.model = pole.additionals.lamp.model;
					entry.additionals.lamp.reload();

					// ledblock
					if (typeof pole.additionals?.ledblock?.group !== 'undefined') entry.additionals.ledblock.config.group = pole.additionals.ledblock.group;
					if (typeof pole.additionals?.ledblock?.model !== 'undefined') entry.additionals.ledblock.config.model = pole.additionals.ledblock.model;
					if (typeof pole.additionals?.ledblock?.color !== 'undefined') entry.additionals.ledblock.config.color = pole.additionals.ledblock.color;
					entry.additionals.ledblock.reload();
				}
			});

			// dimensions predefined
			Objects.values(data.dimensionsPredefined).forEach((dimension) => {
				if (dimension) {
					if (this.instance.extensions.dimensions.objectsPredefined[dimension.id]) {
						this.instance.extensions.dimensions.objectsPredefined[dimension.id].setPosition(dimension.position);

						if (dimension.align) {
							this.instance.extensions.dimensions.objectsPredefined[dimension.id].setAlign(dimension.align);
						}
					}
				}
			});

			// dimensions
			Objects.values(data.dimensions).forEach((dimension) => {
				if (dimension) {
					if (this.instance.poles[dimension.pole1] && this.instance.poles[dimension.pole2]) {
						this.instance.extensions.dimensions.objects[dimension.id] = new Dimension(this.instance, dimension.id, false, this.instance.poles[dimension.pole1], this.instance.poles[dimension.pole2], dimension.type, dimension.position, dimension.align || 'center');
					}
				}
			});

			// fully reload
			this.instance.isLoading = false;

			Objects.values(data.poles).forEach((pole) => {
				if (pole) {
					let entry = this.instance.poles[pole.id];

					entry.setDirection(0);
					entry.wallUpdate(false);
					entry.resizeHeight(pole.height);
				}
			});

			// project
			this.instance.extensions.dimensions.update();
		}
	}

	save = (animation = true, callback = false) => {
		if (animation) {
			document.documentElement.classList.add('loading');
		}

		const project = this.encode();
		project.time = this.instance.extensions.timer.time;
		project.data = JSON.stringify(project.data);

		Http.post(`save/${(this.instance.id) ? `${this.instance.id}/` : ''}`, {
			data: { project },
			success: (response) => {
				if (response.status && response.id) {
					this.instance.id = response.id;
					window.history.pushState(false, false, this.instance.id);
				}

				this.instance.unsetModified();

				if (animation) {
					document.documentElement.classList.remove('loading');
				}

				if (callback) {
					callback();
				}
			},
		});
	}
}


export default Storage;