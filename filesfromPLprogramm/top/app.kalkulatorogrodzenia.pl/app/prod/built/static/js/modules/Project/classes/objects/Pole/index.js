import * as panelActions from '../../../redux/panel/actions';

import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';
import GeometryPoints from '../../tools/GeometryPoints';

import PoleActions from './PoleActions';
import PoleMesh from './PoleMesh';
import PoleTechnical from './PoleTechnical';

import Wall from '../Wall';

import Mailbox from '../Mailbox';
import Lamp from '../Lamp';
import Ledblock from '../Ledblock';


class Pole extends PoleMesh {
	constructor(instance, id, x, z, virtual) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new PoleActions(instance, this);

		this.sketchColor = this.instance.colors.sketchPole;
		this.virtualSize = 0.50;
		this.highlightSize = 0.50;
		this.highlightColor = 0xffff00;
		this.highlightOpacity = 0.40;

		// system
		this.system = this.instance.getSystem();
		this.blocksFamily = this.instance.getBlocksFamily();
		this.peaksFamily = this.instance.getPeaksFamily();

		// config
		this.config = {
			size: {
				width: this.blocksFamily.pole.default.width,
				depth: this.blocksFamily.pole.default.depth,
				height: this.blocksFamily.pole.default.height,
				fullHeight: this.blocksFamily.pole.default.height,
			},
			polygonBreak: false,
			virtual,
			blockMaterialId: this.instance.getDefaultMaterial(this.blocksFamily.pole),
			peakMaterialId: null,
		};

		this.configTemporary = {
			width: {
				line: this.blocksFamily.pole.default.width,
				corner: this.blocksFamily.pole.materials[this.blocksFamily.settings.autocorner].block.minimum.width,
			},
			depth: {
				line: this.blocksFamily.pole.default.depth,
				corner: this.blocksFamily.pole.materials[this.blocksFamily.settings.autocorner].block.minimum.depth,
			},
			polygonBreak: false,
			virtual,
			blockMaterialId: {
				line: this.instance.getDefaultMaterial(this.blocksFamily.pole),
				corner: this.blocksFamily.settings.autocorner,
			},
		};

		this.modifiable = 'line';
		this.modifiableTemporary = 'line';

		this.blockMaterial = this.setBlockMaterial();
		this.peakMaterial = this.setPeakMaterial();

		// objects
		this.objects = {
			sketch: null,
			description: null,
			pole: null,
			peak: null,
			highlight2d: null,
			highlight3d: null,
		};

		// settings
		this.id = id;
		this.prev = this.instance.lastPole;
		this.next = this.instance.firstPole;

		this.width = this.calcWidth();
		this.depth = this.calcDepth();
		this.height = this.calcHeight();
		this.fullHeight = this.calcFullHeight();
		this.coupler = this.calcCoupler();

		this.poleWidth = this.calcPoleWidth();
		this.poleDepth = this.calcPoleDepth();
		this.peakWidth = this.calcPeakWidth();

		this.points = null; // punkty geometrii obiektu
		this.break = true; // przerwanie ciągu murka
		this.offset = 0; // przesunięcie początku tekstury
		this.seating = 0; // wysokość osadzenia na murku
		this.seatingMaterialHeight = 1; // rozmiar materiału osadzenia; podmurówka może mieć inną wysokość niż słupek
		this.angle = 0; // kąt (dla narożników)
		this.rotation = 0; // obrót wokół własnej osi
		this.position = { x, y: 0, z };

		this.technical = new PoleTechnical(this.instance, this);

		this.additionals = {
			mailbox: new Mailbox(this.instance, this),
			lamp: new Lamp(this.instance, this),
			ledblock: new Ledblock(this.instance, this),
		};
	}

	after = (kind) => {
		// first & next
		if (this.instance.firstPole) {
			this.instance.firstPole.prev = this.instance.lastPole;
		}

		if (this.instance.beforeLastPole) {
			this.instance.beforeLastPole.next = this.instance.lastPole;
		}

		// add wall
		this.wall = new Wall(this.instance, this.prev, this, kind);

		if (this.instance.firstPole) {
			this.instance.firstPole.wall.pole1 = this.instance.lastPole;
		}

		// update
		this.setDirections();

		this.prev.repair();

		if (!this.instance.isLoading) {
			this.instance.setTechnical(this);
		}
	}

	getPoleTextures = () => this.instance.textures.systems[this.instance.system].blocks[this.instance.blocksFamily][this.instance.blocksColor].pole[this.config.blockMaterialId].texture

	getPeakTextures = () => this.instance.textures.systems[this.instance.system].peaks[this.instance.peaksFamily][this.instance.peaksColor][this.config.peakMaterialId].texture

	getBlockMaterialsList = () => {
		let output = [];

		Objects.entries(this.instance.getPoleMaterialsList()).forEach(([key, entry]) => {
			if (Objects.in(this.modifiable, entry.modifiable)) {
				if (this.wall && this.wall.status && this.wall.config.kind === 'wall' && !Objects.in(key, this.wall.blockMaterial.support)) return;

				if (this.next && this.next.id !== this.id) {
					if (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall' && !Objects.in(key, this.next.wall.blockMaterial.support)) return;
				}

				output[key] = entry.label;
			}
		});

		return output;
	}

	getBlockMaterialId = (materialId, colorId) => {
		const material = this.blocksFamily.pole.materials[materialId];

		if (material.disabled && (!material.disabled.colors || Objects.in(colorId, material.disabled.colors))) {
			return material.disabled.material;
		}

		return materialId;
	}

	getPeakMaterialId = (materialId) => {
		const material = this.peaksFamily.materials[materialId];

		if (material.disabled && (!material.disabled.colors || Objects.in(this.instance.peaksColor, material.disabled.colors))) {
			if (material.disabled.target) {
				const blockMaterialId = this.getBlockMaterialId(this.config.blockMaterialId, this.instance.peaksColor);

				if (blockMaterialId !== this.config.blockMaterialId) {
					this.setBlockMaterialId(blockMaterialId, false, true);
				}
			}

			return material.disabled.material;
		}

		return materialId;
	}

	setBlockMaterial = () => this.blocksFamily.pole.materials[this.config.blockMaterialId]

	setPeakMaterialId = () => {
		let materialId;

		if (this.config.size.width === 1) {
			if (this.instance.settings.nopeak1) {
				materialId = this.blockMaterial.peak3[this.instance.peaksFamily];
			} else {
				materialId = this.blockMaterial.peak1[this.instance.peaksFamily];
			}
		} else {
			materialId = this.blockMaterial.peak3[this.instance.peaksFamily];
		}

		return this.getPeakMaterialId(materialId);
	}

	setPeakMaterial = () => {
		this.config.peakMaterialId = this.setPeakMaterialId();

		return this.peaksFamily.materials[this.config.peakMaterialId];
	}

	calcWidth = () => {
		if (!Objects.isArray(this.blockMaterial.block.width)) {
			return this.config.size.width * this.blockMaterial.block.width;
		}

		return this.blockMaterial.block.width[0] + (this.config.size.width - 1) * this.blockMaterial.block.width[1];
	}

	calcDepth = () => {
		if (!Objects.isArray(this.blockMaterial.block.depth)) {
			return this.config.size.depth * this.blockMaterial.block.depth;
		}

		return this.blockMaterial.block.depth[0] + (this.config.size.depth - 1) * this.blockMaterial.block.depth[1];
	}

	calcHeight = () => {
		if (Objects.isArray(this.blockMaterial.block.height)) {
			let height = 0;

			for (let i = 0; i < this.config.size.height; i++) {
				height += this.blockMaterial.block.height[i % this.blockMaterial.block.height.length];
			}

			return height;
		}

		return this.config.size.height * this.blockMaterial.block.height;
	}


	calcFullHeight = (target = 1) => {
		if (!this.config.virtual) {
			return this.seating + this.calcHeight();
		}

		if (target === 1) {
			return (this.wall && this.wall.status && this.wall.config.kind === 'wall') ? this.wall.height : 0;
		}

		if (target === 2) {
			return (this.next && this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall') ? this.next.wall.height : 0;
		}

		return Infinity;
	}

	calcCoupler = () => this.blockMaterial.block.coupler

	calcPoleWidth = () => this.width

	calcPoleDepth = () => this.depth

	calcPeakWidth = () => {
		let result;

		switch (this.blockMaterial.block.type) {
			case 'cuboid':
				result = this.width;

				result += this.peakMaterial.protrude * 2;
				break;

			case 'corner':
				result = this.width + this.depth;

				result += this.peakMaterial.protrude * 4;
				break;

			default:
		}

		return result;
	}

	calcPolePositionY = () => this.position.y + this.seating

	calcPeakPositionY = () => this.position.y + this.seating + this.height + this.additionals.ledblock.getHeight()

	calcAngle = () => {
		if (this.angle >= 0) {
			return (180 - this.angle) * -1;
		}

		return 180 + this.angle;
	}

	calcDescription = () => `${Math.round(this.calcAngle())}°`

	setDirections = (initiator = 0) => {
		if (this.instance.isLoading) {
			this.points = this.getGeometryPoints();

			if (initiator === 0 || initiator === 2) {
				this.setSeating();
			}
		} else {
			if (this.prev) {
				this.prev.setDirection(initiator);
			}

			this.setDirection(initiator);

			if (this.next) {
				this.next.setDirection(initiator);
			}

			this.wallUpdate();
		}
	}

	setDirection = (initiator) => {
		let materialId;
		let material;

		let angle = this.instance.findAngle(this.prev, this, this.next);
		let rotation = this.instance.findRotation(this.prev, this, this.next);

		this.angle = angle;
		this.rotation = rotation;
		this.points = this.getGeometryPoints();

		if ((initiator === 0 || initiator === 1 || initiator === -1) && this.blocksFamily.settings.autocorner) {
			if (!this.instance.isAngle(angle)) {
				materialId = this.configTemporary.blockMaterialId.corner;

				if ((angle > 89 && angle < 91) || (angle < -89 && angle > -91)) {
					this.modifiable = 'corner1';
				} else {
					this.modifiable = 'corner2';
				}
			} else {
				materialId = this.configTemporary.blockMaterialId.line;
				this.modifiable = 'line';
			}

			this.modifiableTemporary = this.modifiable;
			if (this.modifiableTemporary === 'corner1' || this.modifiableTemporary === 'corner2') this.modifiableTemporary = 'corner';

			// modifable replacement
			material = this.blocksFamily.pole.materials[materialId];
			if (!Objects.in(this.modifiable, material.modifiable) && material.modifiableReplacement) {
				materialId = material.modifiableReplacement;
			}

			// set other material if selected is not supported by wall
			material = this.blocksFamily.pole.materials[materialId];
			if (material.supportReplacement) {
				if (this.wall && this.wall.status && this.wall.config.kind === 'wall' && !Objects.in(materialId, this.wall.blockMaterial.support)) materialId = material.supportReplacement;
				if (this.next && this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall' && !Objects.in(materialId, this.next.wall.blockMaterial.support)) materialId = material.supportReplacement;
			}

			// block corner if cut is too big
			if (initiator !== -1) {
				this.config.virtual = this.configTemporary.virtual;

				material = this.blocksFamily.pole.materials[materialId];
				if (material.block.type === 'corner') {
					if (this.points && Maths.getDistance(this.points.c, this.points.d) > Math.min.apply(null, [this.width, this.depth])) {
						this.config.virtual = true;

						return this.setDirections(-1);
					}
				}
			}

			this.setBlockMaterialId(materialId, true);
		}

		if (initiator === 0 || initiator === 2) {
			this.setSeating();
			this.do();
		}

		return true;
	}

	setSeating = () => {
		if (this.blockMaterial.seating === 1 || this.blockMaterial.seating === 2) {
			this.seating = this.getSeating();
			this.seatingMaterialHeight = (this.seating) ? this.getSeatingMaterialHeight() : 1;
		} else {
			this.seating = 0;
			this.seatingMaterialHeight = 1;
		}

		this.config.size.height = Math.round(this.config.size.fullHeight - this.seating / this.seatingMaterialHeight);

		this.height = this.calcHeight();
		this.fullHeight = this.calcFullHeight();
	}

	setBreak = () => {
		this.break = true;

		if (this.isLast()) {
			return;
		}

		if (this.config.polygonBreak) {
			return;
		}

		if (this.instance.system !== 'joniec-gorc_peak') {
			if ((this.blockMaterial.block.type === 'corner' || this.config.virtual) && ((this.angle > 89 && this.angle < 91) || (this.angle < -89 && this.angle > -91))) {
				return;
			}
		}

		if (!(this.next && this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall')) {
			return;
		}

		if (this.blockMaterial.seating === 2) {
			if (this.wall && this.wall.status && this.wall.config.kind === 'wall') {
				if (this.getBlockDepth() === this.wall.blockMaterial.block.depth) {
					this.break = false;
				}
			}

			if (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall') {
				if (this.getBlockDepth() !== this.next.wall.blockMaterial.block.depth) {
					this.break = true;
				}
			}
		}
	}

	do = () => {
		if (this.instance.isLoading) return;

		this.doSketch();
		this.doDescription();
		this.doHighlight2d();

		if (!this.instance.isMoving) {
			setTimeout(() => {
				this.doPole();
				this.doPeak();
				this.doHighlight3d();

				this.technical.update();
			}, 100);
		}

		this.additionals.mailbox.update();
		this.additionals.lamp.update();
		this.additionals.ledblock.update();
	}

	update = () => {
		this.setSeating();
		this.do();

		this.wallUpdate();
	}

	reload = () => {
		this.blocksFamily = this.instance.getBlocksFamily();
		this.peaksFamily = this.instance.getPeaksFamily();

		this.blockMaterial = this.setBlockMaterial();
		this.peakMaterial = this.setPeakMaterial();

		// disabled materials control
		const blockMaterialId = this.getBlockMaterialId(this.config.blockMaterialId, this.instance.blocksColor);

		if (this.config.blockMaterialId !== blockMaterialId) {
			this.setBlockMaterialId(blockMaterialId, false, true);
		}

		const blockMaterialIdTemporaryLine = this.getBlockMaterialId(this.configTemporary.blockMaterialId.line, this.instance.blocksColor);

		if (this.configTemporary.blockMaterialId.line !== blockMaterialIdTemporaryLine) {
			this.configTemporary.blockMaterialId.line = blockMaterialIdTemporaryLine;
		}

		const blockMaterialIdTemporaryCorner = this.getBlockMaterialId(this.configTemporary.blockMaterialId.corner, this.instance.blocksColor);

		if (this.configTemporary.blockMaterialId.corner !== blockMaterialIdTemporaryCorner) {
			this.configTemporary.blockMaterialId.corner = blockMaterialIdTemporaryCorner;
		}

		this.do();
	}

	remove = () => {
		this.objects.sketch.drag.dispose();

		this.three.scenes['2d'].remove(this.objects.sketch);
		this.three.scenes['2d'].remove(this.objects.description);
		this.three.scenes['3d'].remove(this.objects.pole);
		this.three.scenes['3d'].remove(this.objects.peak);
		this.three.scenes['2d'].remove(this.objects.highlight2d);
		this.three.scenes['3d'].remove(this.objects.highlight3d);

		this.technical.remove();

		this.additionals.mailbox.remove();
		this.additionals.lamp.remove();
		this.additionals.ledblock.remove();
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('pole', this.config, this);
		this.instance.setHighlight(this);
	}

	move = (o, mode) => {
		if (this.instance.settings.move) {
			let tolerance = 0.15;

			let x = Maths.round(o.position.x, 2);
			let z = Maths.round(o.position.z, 2);

			if (!mode) {
				let r1x = false;
				let r1z = false;

				if (!this.isFirst()) {
					if (this.prev && !this.prev.config.polygonBreak) {
						r1x = this.prev.position.x;
						r1z = this.prev.position.z;
					}
				}

				if (r1x !== false && Math.abs(x - r1x) <= tolerance) {
					x = r1x;
				}

				if (r1z !== false && Math.abs(z - r1z) <= tolerance) {
					z = r1z;
				}
			} else {
				let point = false;

				if (!this.isFirst()) {
					if (this.prev && !this.prev.config.polygonBreak) {
						point = Maths.rotatePoint({ x: x - this.prev.position.x, z: z - this.prev.position.z }, this.prev.rotation);
					}
				}

				if (point !== false && Math.abs(point.z) <= tolerance) {
					const diff = Maths.rotatePoint({ x: point.x, z: 0 }, -this.prev.rotation);

					x = this.prev.position.x + diff.x;
					z = this.prev.position.z - diff.z;
				}
			}


			this.position.x = x;
			this.position.z = z;

			this.moveUpdate(true);
		} else {
			this.objects.sketch.position.set(this.position.x, this.objects.sketch.position.y, this.position.z);
		}
	}

	moved = () => {
		if (this.instance.settings.move) {
			this.moveUpdate(false);
		}
	}

	moveUpdate = (temporary) => {
		if (this.objects.sketch) {
			this.objects.sketch.position.set(this.position.x, this.objects.sketch.position.y, this.position.z);
		}

		if (this.objects.pole) {
			this.objects.pole.position.set(this.position.x, this.objects.pole.position.y, this.position.z);
		}

		if (this.objects.peak) {
			this.objects.peak.position.set(this.position.x, this.objects.peak.position.y, this.position.z);
		}

		this.setDirections();

		if (!temporary) {
			this.instance.setModified();
		}
	}

	setPolygonBreak = (polygonBreak) => {
		this.config.polygonBreak = polygonBreak;
		this.configTemporary.polygonBreak = polygonBreak;

		this.setDirections();
	}

	setVirtual = (virtual) => {
		if (!virtual) {
			let minHeight = this.getMinHeight();

			if (this.config.size.height < minHeight) {
				this.resizeHeight(minHeight);
			}
		}

		this.config.virtual = virtual;
		this.configTemporary.virtual = virtual;

		this.setDirections();
	}

	setBlockMaterialId = (blockMaterialId, auto = false, onDisabled = false) => {
		this.config.blockMaterialId = blockMaterialId;

		if (!auto) {
			this.configTemporary.blockMaterialId[this.modifiableTemporary] = blockMaterialId;
		}

		this.blockMaterial = this.setBlockMaterial();
		this.peakMaterial = this.setPeakMaterial();

		this.config.size.width = this.configTemporary.width[this.modifiableTemporary];
		this.config.size.depth = this.configTemporary.depth[this.modifiableTemporary];

		// default if no resizeable
		if (!this.blockMaterial.block.resizeable.width) {
			this.config.size.width = this.blocksFamily.pole.default.width;
		}

		if (!this.blockMaterial.block.resizeable.depth) {
			this.config.size.depth = this.blocksFamily.pole.default.depth;
		}

		if (!this.blockMaterial.block.resizeable.height) {
			this.config.size.height = this.blocksFamily.pole.default.height;
		}

		// allow to minimum
		if (this.config.size.width < this.blockMaterial.block.minimum.width) {
			this.config.size.width = this.blockMaterial.block.minimum.width;
		}

		if (this.config.size.depth < this.blockMaterial.block.minimum.depth) {
			this.config.size.depth = this.blockMaterial.block.minimum.depth;
		}

		this.width = this.calcWidth();
		this.depth = this.calcDepth();
		this.height = this.calcHeight();
		this.coupler = this.calcCoupler();

		this.poleWidth = this.calcPoleWidth();
		this.poleDepth = this.calcPoleDepth();
		this.peakWidth = this.calcPeakWidth();

		if (!auto && !onDisabled) {
			this.setDirections(1);
			this.setDirections();
		} else {
			this.setDirections(3);
			this.setDirections(2);
		}

		this.instance.extensions.dimensions.update();
	}

	resizeHeight = (size) => {
		if ((size >= 0 && size <= 30 && size >= this.getMinHeight()) || this.instance.isLoading) {
			this.config.size.height = size;
			this.config.size.fullHeight = Math.round(size + this.seating / this.seatingMaterialHeight);

			this.height = this.calcHeight();
			this.fullHeight = this.calcFullHeight();

			this.do();
			this.wallUpdate();
		}
	}

	resizeWidth = (size) => {
		if (size >= 1 && size <= Infinity && size <= this.getMaxWidth()) {
			this.config.size.width = size;
			this.configTemporary.width[this.modifiableTemporary] = size;
			this.width = this.calcWidth();

			this.peakMaterial = this.setPeakMaterial();

			this.poleWidth = this.calcPoleWidth();
			this.poleDepth = this.calcPoleDepth();
			this.peakWidth = this.calcPeakWidth();

			this.setDirections();
		}
	}

	resizeDepth = (size) => {
		if (size >= 1 && size <= Infinity && size <= this.getMaxDepth()) {
			this.config.size.depth = size;
			this.configTemporary.depth[this.modifiableTemporary] = size;
			this.depth = this.calcDepth();

			this.setDirections();
		}
	}


	/* --- FUNCTIONS ------------------------------------------ */

	getPotentialHeight = (size, wallHeight) => {
		if (this.blockMaterial.seating === 1 || this.blockMaterial.seating === 2) {
			return (this.config.size.fullHeight - size) * this.blockMaterial.block.height + size * wallHeight;
		}

		return this.height;
	}

	getSeating = () => {
		let list = [0];

		if ((this.prev && this.prev.id !== this.id) && (this.wall && this.wall.status && this.wall.config.kind === 'wall')) {
			if (this.getBlockDepth() === this.wall.blockMaterial.block.depth) {
				list.push(this.wall.height);
			}
		}

		if ((this.next && this.next.id !== this.id) && (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall')) {
			if (this.getBlockDepth() === this.next.wall.blockMaterial.block.depth) {
				list.push(this.next.wall.height);
			}
		}

		return (list.length) ? Math.max.apply(null, list) : 0;
	}

	getSeatingMaterialHeight = () => {
		let materialHeight = 1;

		if (this.prev && this.prev.id !== this.id) {
			if (this.wall && this.wall.status && this.wall.config.kind === 'wall') {
				materialHeight = this.wall.blockMaterial.block.height;
			}
		}

		if (this.next && this.next.id !== this.id) {
			if (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall') {
				materialHeight = this.next.wall.blockMaterial.block.height;
			}
		}

		return materialHeight;
	}

	getMinHeight = () => {
		let list = [];

		if (this.prev && this.prev.id !== this.id) {
			if (this.wall && this.wall.status && this.wall.config.kind === 'wall') {
				list.push(this.wall.height);
			}
		}

		if (this.next && this.next.id !== this.id) {
			if (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall') {
				list.push(this.next.wall.height);
			}
		}

		let height = (list.length) ? Math.max.apply(null, list) - this.seating : false;
		let size = (height !== false) ? this.getBlockSize(height) : 1;

		return (this.blocksFamily.settings.sameAlignment || height === false) ? size : size + 1;
	}

	getMaxWidth = () => {
		if (this.next && this.next.id !== this.id && this.next.wall) {
			let width = (!Objects.isArray(this.blockMaterial.block.width)) ? this.blockMaterial.block.width : this.blockMaterial.block.width[0];

			return Math.floor(this.next.wall.width / width) + this.config.size.width;
		}

		return Infinity;
	}

	getMaxDepth = () => {
		if (this.next && this.next.id !== this.id && this.next.wall) {
			let width = (!Objects.isArray(this.blockMaterial.block.width)) ? this.blockMaterial.block.width : this.blockMaterial.block.width[0];

			return Math.floor(this.next.wall.width / width) + this.config.size.depth;
		}

		return Infinity;
	}

	getHooks = (target) => {
		if (this.instance.isLoading) {
			return [{ x: this.position.x, z: this.position.z }];
		}

		let diffs = [false, false, false, false];

		switch (this.blockMaterial.block.type) {
			case 'cuboid':
				if (this.blockMaterial.modifiable === 'line') {
					diffs[0] = {
						x: -this.width / 2,
						y: 0,
						z: 0,
					};

					diffs[1] = {
						x: this.width / 2,
						y: 0,
						z: 0,
					};
				} else {
					diffs[0] = {
						x: -this.width / 2,
						y: 0,
						z: 0,
					};

					diffs[1] = {
						x: this.width / 2,
						y: 0,
						z: 0,
					};

					diffs[2] = {
						x: 0,
						y: 0,
						z: -this.depth / 2,
					};

					diffs[3] = {
						x: 0,
						y: 0,
						z: this.depth / 2,
					};
				}
				break;

			case 'corner':
				let h;

				if (this.points.status) {
					if (target === 1) {
						h = Maths.getCenter({ x: this.points.e.x, y: 0, z: this.points.e.y }, { x: this.points.f.x, y: 0, z: this.points.f.y });

						diffs[0] = {
							x: h.x,
							y: h.y,
							z: -h.z,
						};

						h = Maths.getCenter({ x: this.points.point.x, y: 0, z: this.points.point.y }, { x: this.points.m2.x, y: 0, z: this.points.m2.y });

						diffs[1] = {
							x: h.x,
							y: h.y,
							z: -h.z,
						};
					}

					if (target === 2) {
						h = Maths.getCenter({ x: this.points.a.x, y: 0, z: this.points.a.y }, { x: this.points.b.x, y: 0, z: this.points.b.y });

						diffs[0] = {
							x: h.x,
							y: h.y,
							z: -h.z,
						};

						h = Maths.getCenter({ x: this.points.point.x, y: 0, z: this.points.point.y }, { x: this.points.m1.x, y: 0, z: this.points.m1.y });

						diffs[1] = {
							x: h.x,
							y: h.y,
							z: -h.z,
						};
					}
				}
				break;

			default:
		}

		let output = [];

		Objects.keys(diffs).forEach((i) => {
			if (diffs[i]) {
				const diff = Maths.rotatePoint(diffs[i], this.rotation);

				output.push({ x: this.position.x + diff.x, z: this.position.z + diff.z });
			}
		});

		return output;
	}

	getNearestHook = (hooks, center) => {
		let hook = false;
		let nearest = Infinity;

		Objects.values(hooks).forEach((entry) => {
			let distance = Maths.getDistance({ x: center.x, y: center.z }, { x: entry.x, y: entry.z });

			if (distance < nearest) {
				hook = entry;
				nearest = distance;
			}
		});

		return hook;
	}

	getFarthestHook = (hooks, center) => {
		let hook = false;
		let farthest = 0;

		Objects.values(hooks).forEach((entry) => {
			let distance = Maths.getDistance({ x: center.x, y: center.z }, { x: entry.x, y: entry.z });

			if (distance > farthest) {
				hook = entry;
				farthest = distance;
			}
		});

		return hook;
	}

	getHook = (center, target, full) => {
		if (this.config.virtual) {
			return { x: this.position.x, z: this.position.z, r: 0 };
		}

		let hooks = this.getHooks(target);

		if (full) {
			if (this.seating) {
				if (this.blockMaterial.block.type === 'corner') {
					if (target === 1) {
						if (this.next && this.next.id !== this.id) {
							if (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall') {
								if (this.getBlockDepth() !== this.next.wall.blockMaterial.block.depth) {
									return this.getNearestHook(hooks, center);
								}
							}
						}
					}

					if (target === 2) {
						if (this.wall && this.wall.status && this.wall.config.kind === 'wall') {
							if (this.getBlockDepth() !== this.wall.blockMaterial.block.depth) {
								return this.getNearestHook(hooks, center);
							}
						}
					}

					return this.getFarthestHook(hooks, center);
				}
				let wall1Height = 0;
				let wall2Height = 0;

				if (this.prev && this.prev.id !== this.id) {
					if (this.wall && this.wall.status && this.wall.config.kind === 'wall') {
						if (this.getBlockDepth() === this.wall.blockMaterial.block.depth) {
							wall1Height = this.wall.height;
						}
					}
				}

				if (this.next && this.next.id !== this.id) {
					if (this.next.wall && this.next.wall.status && this.next.wall.config.kind === 'wall') {
						if (this.getBlockDepth() === this.next.wall.blockMaterial.block.depth) {
							wall2Height = this.next.wall.height;
						}
					} else {
						return this.getFarthestHook(hooks, center);
					}
				}

				// farthest variants
				if (target === 1) {
					if (wall1Height <= wall2Height) {
						return this.getFarthestHook(hooks, center);
					}
				}

				if (target === 2) {
					if (wall1Height > wall2Height || this.isLast()) {
						return this.getFarthestHook(hooks, center);
					}
				}
			}
		}

		return this.getNearestHook(hooks, center);
	}

	getGeometryPoints = () => {
		switch (this.blockMaterial.block.type) {
			case 'corner':
				return GeometryPoints.Corner(this.width, this.coupler, this.depth, this.coupler, this.angle);

			default:
				return null;
		}
	}

	getLimits = (type, sibling = false) => {
		let output = [];

		if (this.config.virtual) {
			let diffs;

			if (!this.isFirst()) {
				if (this.wall && this.wall.status) {
					diffs = [];

					if (this.wall.config.kind === 'wall') {
						diffs[0] = Maths.rotatePoint({ x: this.wall.points.c.x, y: 0, z: -this.wall.points.c.y }, this.wall.rotation.full);
						diffs[1] = Maths.rotatePoint({ x: this.wall.points.d.x, y: 0, z: -this.wall.points.d.y }, this.wall.rotation.full);
					} else {
						diffs[0] = Maths.rotatePoint({ x: this.wall.points.c.x, y: 0, z: 0 }, this.wall.rotation.full);
						diffs[1] = Maths.rotatePoint({ x: this.wall.points.d.x, y: 0, z: 0 }, this.wall.rotation.full);
					}

					Objects.keys(diffs).forEach((i) => {
						output.push({
							x: Maths.round(this.wall.position.full.x + diffs[i].x),
							y: 0,
							z: Maths.round(this.wall.position.full.z + diffs[i].z),
						});
					});
				}
			}

			if (!this.isLast()) {
				if (this.next && this.next.wall && this.next.wall.status) {
					diffs = [];

					if (this.wall.config.kind === 'wall') {
						diffs[0] = Maths.rotatePoint({ x: this.next.wall.points.a.x, y: 0, z: -this.next.wall.points.a.y }, this.next.wall.rotation.full);
						diffs[1] = Maths.rotatePoint({ x: this.next.wall.points.b.x, y: 0, z: -this.next.wall.points.b.y }, this.next.wall.rotation.full);
					} else {
						diffs[0] = Maths.rotatePoint({ x: this.next.wall.points.a.x, y: 0, z: 0 }, this.next.wall.rotation.full);
						diffs[1] = Maths.rotatePoint({ x: this.next.wall.points.b.x, y: 0, z: 0 }, this.next.wall.rotation.full);
					}

					Objects.keys(diffs).forEach((i) => {
						output.push({
							x: Maths.round(this.next.wall.position.full.x + diffs[i].x),
							y: 0,
							z: Maths.round(this.next.wall.position.full.z + diffs[i].z),
						});
					});
				}
			}
		} else {
			switch (this.blockMaterial.block.type) {
				case 'cuboid':
					switch (type) {
						case 'adapt':
							if (!sibling) {
								output.push({ x: -this.width / 2, y: 0, z: this.depth / 2 });
								output.push({ x: this.width / 2, y: 0, z: this.depth / 2 });
							} else {
								if (sibling === 'c') {
									output.push({ x: -this.width / 2, y: 0, z: this.depth / 2 });
									output.push({ x: this.width / 2, y: 0, z: this.depth / 2 });
								}

								if (sibling === 'd') {
									output.push({ x: -this.width / 2, y: 0, z: -this.depth / 2 });
									output.push({ x: this.width / 2, y: 0, z: -this.depth / 2 });
								}
							}
							break;

						default:
							output.push({ x: -this.width / 2, y: 0, z: -this.depth / 2 });
							output.push({ x: -this.width / 2, y: 0, z: this.depth / 2 });
							output.push({ x: this.width / 2, y: 0, z: this.depth / 2 });
							output.push({ x: this.width / 2, y: 0, z: -this.depth / 2 });
							break;
					}
					break;

				case 'corner':
					switch (type) {
						case 'adapt':
						case 'corner':
							output.push({ x: this.points.point.x, y: 0, z: -this.points.point.y });
							break;

						default:
							output.push({ x: this.points.a.x, y: 0, z: -this.points.a.y });
							output.push({ x: this.points.b.x, y: 0, z: -this.points.b.y });
							output.push({ x: this.points.c.x, y: 0, z: -this.points.c.y });
							output.push({ x: this.points.d.x, y: 0, z: -this.points.d.y });
							output.push({ x: this.points.e.x, y: 0, z: -this.points.e.y });
							output.push({ x: this.points.f.x, y: 0, z: -this.points.f.y });
							break;
					}
					break;

				default:
			}

			Objects.keys(output).forEach((i) => {
				let diff = Maths.rotatePoint(output[i], this.rotation);

				output[i] = {
					x: Maths.round(this.position.x + diff.x),
					y: 0,
					z: Maths.round(this.position.z + diff.z),
				};
			});
		}

		return output;
	}

	getBlockDepth = () => ((this.blockMaterial.block.type !== 'corner') ? this.blockMaterial.block.depth : this.blockMaterial.block.coupler)

	getBlockSum = () => {
		if (Objects.isArray(this.blockMaterial.block.height)) {
			return this.blockMaterial.block.height.reduce((a, b) => a + b, 0);
		}

		return this.blockMaterial.block.height;
	}

	getBlockSize = (height) => {
		if (Objects.isArray(this.blockMaterial.block.height)) {
			let i = 0;
			let size = 0;

			while (true) {
				size += this.blockMaterial.block.height[i % this.blockMaterial.block.height.length];
				i++;

				if (size >= height) {
					break;
				}
			}

			return i;
		}

		return Math.floor(height / this.blockMaterial.block.height);
	}

	isFirst = () => this.instance.firstPole && this.instance.firstPole.id === this.id

	isLast = () => this.instance.lastPole && this.instance.lastPole.id === this.id

	repair = () => {
		const minHeight = this.getMinHeight();

		if (this.config.size.height < minHeight) {
			this.config.size.height = minHeight;
			this.config.size.fullHeight = Math.round(minHeight + this.seating / this.seatingMaterialHeight);

			this.height = this.calcHeight();
			this.fullHeight = this.calcFullHeight();

			this.do();
		}
	}

	wallUpdate = (full = true) => {
		if (this.instance.isLoading) return;

		if (full && this.prev && this.prev.wall) {
			this.prev.wall.update();
		}

		if (this.wall) {
			this.wall.update();
		}

		if (full && this.next && this.next.wall) {
			this.next.wall.update();
		}
	}
}


export default Pole;