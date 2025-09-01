import * as panelActions from '../../../redux/panel/actions';

import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';
import GeometryPoints from '../../tools/GeometryPoints';

import WallActions from './WallActions';
import WallMesh from './WallMesh';
import WallTechnical from './WallTechnical';

import Combo from '../Combo';
import Fencing from '../Fencing';
import Manufacture from '../Manufacture';
import Panels from '../Panels';


class Wall extends WallMesh {
	constructor(instance, pole1, pole2, kind) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new WallActions(instance, this);

		this.sketchColor = this.instance.colors.sketchWall;
		this.highlightSize = 0.50;
		this.highlightColor = 0xffff00;
		this.highlightOpacity = 0.40;

		// system
		this.system = this.instance.getSystem();
		this.blocksFamily = this.instance.getBlocksFamily();
		this.peaksFamily = this.instance.getPeaksFamily();

		this.kindsList = {
			wall: ___('Murek'),
			wicket: ___('Furtka'),
			gate: ___('Brama'),
			space: ___('Pusta przestrzeń'),
		};

		// config
		this.config = {
			size: {
				depth: this.blocksFamily.wall.default.depth,
				height: this.blocksFamily.wall.default.height,
			},
			kind,
			blockMaterialId: this.instance.getDefaultMaterial(this.blocksFamily.wall),
			peakMaterialId: null,
			combo: 'on',
			fencing: 'on',
			fencingHeight: '',
		};

		this.blockMaterial = this.setBlockMaterial();
		this.peakMaterial = this.setPeakMaterial();

		// objects
		this.objects = {
			sketch: null,
			description: null,
			wall: {
				wall: null,
				add1: null,
				add2: null,
			},
			peak: null,
			highlight2d: null,
			highlight3d: null,
		};

		// settings
		this.pole1 = pole1;
		this.pole2 = pole2;
		this.error = false;
		this.status = this.setStatus();

		this.depth = this.calcDepth();
		this.height = this.calcHeight();
		this.fullHeight = this.calcFullHeight();

		this.data = this.calcData();
		this.width = this.calcWidth();
		this.fullWidth = this.calcFullWidth();

		this.descriptionWallWidth = this.calcDescriptionWallWidth();
		this.wallWidth = this.calcWallWidth();
		this.wallElements = this.calcWallElements();
		this.peakWidth = this.calcPeakWidth();

		this.points = null; // punkty geometrii obiektu
		this.offset = 0; // przesunięcie początku tekstury
		this.rotation = this.calcRotation(); // obrót wokół własnej osi
		this.position = this.calcPosition();

		this.technical = new WallTechnical(this.instance, this);

		this.do();
		this.instance.setOffsets();

		this.panels = new Panels(this.instance, this);
		this.combo = new Combo(this.instance, this);
		this.fencing = new Fencing(this.instance, this);
		this.manufacture = new Manufacture(this.instance, this);
	}

	getWallTextures = () => this.instance.textures.systems[this.instance.system].blocks[this.instance.blocksFamily][this.instance.blocksColor].wall[this.config.blockMaterialId].texture

	getPeakTextures = () => this.instance.textures.systems[this.instance.system].peaks[this.instance.peaksFamily][this.instance.peaksColor][this.config.peakMaterialId].texture

	getBlockMaterialsList = () => {
		let output = [];

		Objects.entries(this.instance.getWallMaterialsList()).forEach(([key, entry]) => {
			if (this.pole1 && !this.pole1.config.virtual && !Objects.in(this.pole1.config.blockMaterialId, entry.support)) return;
			if (this.pole2 && !this.pole2.config.virtual && !Objects.in(this.pole2.config.blockMaterialId, entry.support)) return;

			output[key] = entry.label;
		});

		return output;
	}

	getBlockMaterialId = (materialId, colorId) => {
		const material = this.blocksFamily.wall.materials[materialId];

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
					this.setBlockMaterialId(blockMaterialId);
				}
			}

			return material.disabled.material;
		}

		return materialId;
	}

	setBlockMaterial = () => this.blocksFamily.wall.materials[this.config.blockMaterialId]

	setPeakMaterialId = () => {
		let materialId = this.blockMaterial.peak3[this.instance.peaksFamily];

		return this.getPeakMaterialId(materialId);
	}

	setPeakMaterial = () => {
		this.config.peakMaterialId = this.setPeakMaterialId();

		return this.peaksFamily.materials[this.config.peakMaterialId];
	}

	setStatus = () => {
		if (this.instance.lastPole && this.instance.lastPole.id === this.pole1.id) {
			return false;
		}

		if (this.pole1.config.polygonBreak) {
			return false;
		}

		return true;
	}

	calcWidth = () => this.data.normal.distance

	calcFullWidth = () => this.data.full.distance

	calcDepth = () => this.config.size.depth * this.blockMaterial.block.depth

	calcHeight = () => this.config.size.height * this.blockMaterial.block.height

	calcFullHeight = () => Math.min.apply(null, [this.pole1.calcFullHeight(1), this.pole2.calcFullHeight(2)])

	calcDescriptionWallWidth = () => {
		let result = this.width;

		result += Math.abs(this.data.normal.indent1 * this.depth / 2);
		result += Math.abs(this.data.normal.indent2 * this.depth / 2);

		return result;
	}

	calcWallWidth = () => {
		let result = this.fullWidth;

		result += Math.abs(this.data.full.indent1 * this.depth / 2);
		result += Math.abs(this.data.full.indent2 * this.depth / 2);

		return result;
	}

	calcWallElements = () => {
		let add1 = (this.pole1 && this.pole1.wall) ? this.pole1.wall.data.elements.add2 : null;
		let add2 = (this.pole2 && this.pole2.next && this.pole2.next.wall) ? this.pole2.next.wall.data.elements.add1 : null;

		return {
			add1: {
				size: {
					height: (add1) ? add1.sizeHeight : 0,
				},
				dimension: {
					width: (add1) ? add1.width : 0,
				},
				sizePosition: (add1) ? add1.sizePositionY : 0,
				rightAngle: (this.pole1) ? this.instance.isRightAngle(this.pole1.angle) : null,
			},
			add2: {
				size: {
					height: (add2) ? add2.sizeHeight : 0,
				},
				dimension: {
					width: (add2) ? add2.width : 0,
				},
				sizePosition: (add2) ? add2.sizePositionY : 0,
				rightAngle: (this.pole2) ? this.instance.isRightAngle(this.pole2.angle) : null,
			},
		};
	}

	calcPeakWidth = () => {
		let result = this.width;

		result += Math.abs(this.data.normal.indent1 * this.peakMaterial.depth / 2);
		result += Math.abs(this.data.normal.indent2 * this.peakMaterial.depth / 2);

		return result;
	}

	calcData = () => {
		let center = {
			x: (this.pole1.position.x + this.pole2.position.x) / 2,
			y: 0,
			z: (this.pole1.position.z + this.pole2.position.z) / 2,
		};

		let normal = this.calcDataNormal(center);
		let full = this.calcDataFull(center);
		let elements = this.calcDataElements();

		// errors
		let error = false;

		if (this.config.kind === 'wall') {
			if (this.rotation) {
				if (Math.abs(this.rotation.normal - this.pole1.rotation) > Math.PI * 0.75) {
					// error = true;
				}
			}

			if (full.indent1 * this.depth > this.blockMaterial.block.width || full.indent1 * this.depth < -this.blockMaterial.block.width) {
				error = true;

				normal.indent1 = 0;
				normal.indent2 = 0;

				full.indent1 = 0;
				full.indent2 = 0;
			}

			if (full.indent2 * this.depth > this.blockMaterial.block.width || full.indent2 * this.depth < -this.blockMaterial.block.width) {
				error = true;

				normal.indent1 = 0;
				normal.indent2 = 0;

				full.indent1 = 0;
				full.indent2 = 0;
			}
		} else {
			normal.indent1 = 0;
			normal.indent2 = 0;

			full.indent1 = 0;
			full.indent2 = 0;
		}

		this.error = error;

		return {
			normal,
			full,
			elements,
		};
	}

	calcDataNormal = (center) => {
		let point1 = this.pole1.getHook(center, 1, false);
		let point2 = this.pole2.getHook(center, 2, false);

		return this.calcDataDetails(point1, point2);
	}

	calcDataFull = (center) => {
		let point1 = this.pole1.getHook(center, 1, true);
		let point2 = this.pole2.getHook(center, 2, true);

		return this.calcDataDetails(point1, point2);
	}

	calcDataDetails = (point1, point2) => {
		let distance = Maths.getDistance({ x: point1.x, y: point1.z }, { x: point2.x, y: point2.z });
		let rotation = Maths.getRotation({ x: point1.x, y: point1.z }, { x: point2.x, y: point2.z });

		let angle1 = 0;
		let angle2 = 0;

		if (this.pole1.config.virtual) {
			angle1 = this.pole1.angle;

			if (angle1 === 0) angle1 = 180;
			if (angle1 > 0) {
				angle1 = 180 - angle1;
			} else {
				angle1 = -180 - angle1;
			}
		}

		if (this.pole2.config.virtual) {
			angle2 = this.pole2.angle;

			if (angle2 === 0) angle2 = 180;
			if (angle2 > 0) {
				angle2 = 180 - angle2;
			} else {
				angle2 = -180 - angle2;
			}
		}

		let indent1 = Math.tan(angle1 / 2 * Math.PI / 180) * (-1);
		let indent2 = Math.tan(angle2 / 2 * Math.PI / 180) * (1);

		return {
			point1,
			point2,
			distance,
			rotation,
			indent1,
			indent2,
		};
	}

	calcDataElements = () => {
		let height = (this.status && this.config.kind === 'wall') ? this.height : 0;
		let size = (this.status && this.config.kind === 'wall') ? this.config.size.height : 0;

		let wall = {
			width: this.fullWidth, height, sizeHeight: size, cut1: 0, cut2: 0, positionY: 0, sizePositionY: 0,
		};

		let add1 = {
			width: 0, height: 0, sizeHeight: 0, cut1: 0, cut2: 0, positionY: 0, sizePositionY: 0,
		};

		let add2 = {
			width: 0, height: 0, sizeHeight: 0, cut1: 0, cut2: 0, positionY: 0, sizePositionY: 0,
		};

		let c;
		let h;

		if (this.pole1 && !this.pole1.config.virtual && this.pole1.blockMaterial.block.type === 'corner') {
			if (this.pole1.seating) {
				c = (this.config.kind === 'wall' && this.blockMaterial.block.depth !== this.pole1.getBlockDepth()) ? -this.pole1.depth : 0;
				h = (this.blockMaterial.block.depth === this.pole1.getBlockDepth()) ? wall.height : 0;

				add1.height = this.pole1.seating - h;
				add1.sizeHeight = Math.round(add1.height / this.blockMaterial.block.height);
				add1.cut1 = c;
				add1.cut2 = wall.width - this.pole1.depth - c;
				add1.positionY = h;
				add1.sizePositionY = Math.round(add1.positionY / this.blockMaterial.block.height);

				add1.width = wall.width - add1.cut1 - add1.cut2;
			}
		}

		if (this.pole2 && !this.pole2.config.virtual && this.pole2.blockMaterial.block.type === 'corner') {
			if (this.pole2.seating) {
				c = (this.config.kind === 'wall' && this.blockMaterial.block.depth !== this.pole2.getBlockDepth()) ? -this.pole2.width : 0;
				h = (this.blockMaterial.block.depth === this.pole2.getBlockDepth()) ? wall.height : 0;

				add2.height = this.pole2.seating - h;
				add2.sizeHeight = Math.round(add2.height / this.blockMaterial.block.height);
				add2.cut1 = wall.width - this.pole2.width - c;
				add2.cut2 = c;
				add2.positionY = h;
				add2.sizePositionY = Math.round(add2.positionY / this.blockMaterial.block.height);

				add2.width = wall.width - add2.cut1 - add2.cut2;
			}
		}

		return {
			wall,
			add1,
			add2,
		};
	}

	calcRotation = () => ({
		normal: this.data.normal.rotation,
		full: this.data.full.rotation,
	})

	calcPosition = () => ({
		normal: {
			x: (this.data.normal.point1.x + this.data.normal.point2.x) / 2,
			y: 0,
			z: (this.data.normal.point1.z + this.data.normal.point2.z) / 2,
		},
		full: {
			x: (this.data.full.point1.x + this.data.full.point2.x) / 2,
			y: 0,
			z: (this.data.full.point1.z + this.data.full.point2.z) / 2,
		},
	})

	do = () => {
		if (this.instance.isLoading) return;

		this.doSketch();
		this.doDescription();
		this.doHighlight2d();

		if (!this.instance.isMoving) {
			setTimeout(() => {
				this.doWall();
				this.doPeak();
				this.doHighlight3d();

				this.technical.update();
			}, 200);
		}
	}

	update = () => {
		this.status = this.setStatus();

		this.depth = this.calcDepth();
		this.height = this.calcHeight();
		this.fullHeight = this.calcFullHeight();

		this.data = this.calcData();
		this.width = this.calcWidth();
		this.fullWidth = this.calcFullWidth();

		this.descriptionWallWidth = this.calcDescriptionWallWidth();
		this.wallWidth = this.calcWallWidth();
		this.wallElements = this.calcWallElements();
		this.peakWidth = this.calcPeakWidth();

		this.points = this.getGeometryPoints();
		this.rotation = this.calcRotation();
		this.position = this.calcPosition();

		this.do();
		this.instance.setOffsets();

		this.panels.update();
		this.combo.update();
		this.fencing.update();
		this.manufacture.update();
	}

	reload = () => {
		this.blocksFamily = this.instance.getBlocksFamily();
		this.peaksFamily = this.instance.getPeaksFamily();

		this.blockMaterial = this.setBlockMaterial();
		this.peakMaterial = this.setPeakMaterial();

		// disabled materials control
		const blockMaterialId = this.getBlockMaterialId(this.config.blockMaterialId, this.instance.blocksColor);

		if (blockMaterialId !== this.config.blockMaterialId) {
			this.setBlockMaterialId(blockMaterialId);
		}

		this.do();
	}

	remove = () => {
		this.objects.sketch.drag.dispose();
		this.objects.description.drag.dispose();

		this.three.scenes['2d'].remove(this.objects.sketch);
		this.three.scenes['2d'].remove(this.objects.description);
		this.three.scenes['3d'].remove(this.objects.wall.wall);
		this.three.scenes['3d'].remove(this.objects.wall.add1);
		this.three.scenes['3d'].remove(this.objects.wall.add2);
		this.three.scenes['3d'].remove(this.objects.peak);
		this.three.scenes['2d'].remove(this.objects.highlight2d);
		this.three.scenes['3d'].remove(this.objects.highlight3d);

		this.technical.remove();

		this.panels.remove();
		this.combo.remove();
		this.fencing.remove();
		this.manufacture.remove();
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('wall', this.config, this);
		this.instance.setHighlight(this);
	}

	setKind = (kind) => {
		if (kind !== this.config.kind) {
			this.panels.reset();
			this.manufacture.reset();
		}

		this.config.kind = kind;

		this.polesUpdate();
		this.update();
		this.polesRepair();

		this.instance.extensions.dimensions.update();
	}

	setBlockMaterialId = (blockMaterialId) => {
		this.config.blockMaterialId = blockMaterialId;

		this.blockMaterial = this.setBlockMaterial();
		this.peakMaterial = this.setPeakMaterial();

		this.polesUpdate();
		this.update();
	}

	resizeHeight = (size) => {
		if ((size >= 1 && size <= 30 && size <= this.getMaxHeight()) || this.instance.isLoading) {
			this.config.size.height = size;
			this.height = this.calcHeight();

			this.polesUpdate();
			this.update();
		}
	}


	/* --- FUNCTIONS ------------------------------------------ */

	getMaxHeight = () => {
		let pole1Height = (!this.pole1.config.virtual) ? this.pole1.fullHeight : Infinity;
		let pole2Height = (!this.pole2.config.virtual) ? this.pole2.fullHeight : Infinity;

		let height = Math.min.apply(null, [pole1Height, pole2Height]);
		let size = Math.floor(height / this.blockMaterial.block.height);

		return (this.blocksFamily.settings.sameAlignment) ? size : size - 1;
	}

	getMaxPotentialHeight = (size) => {
		let pole1Height = (!this.pole1.config.virtual) ? this.pole1.getPotentialHeight(size, this.blockMaterial.block.height) : Infinity;
		let pole2Height = (!this.pole2.config.virtual) ? this.pole2.getPotentialHeight(size, this.blockMaterial.block.height) : Infinity;

		return Math.min.apply(null, [pole1Height, pole2Height]);
	}

	getGeometryPoints = () => GeometryPoints.ParallelogramCut(this.wallWidth, this.depth, this.data.full.indent1 * this.depth, this.data.full.indent2 * this.depth, 0, 0, { a: 0, b: 0, c: 0, d: 0 })

	polesUpdate = () => {
		if (this.pole1) {
			this.pole1.update();
		}

		if (this.pole2) {
			this.pole2.update();
		}
	}

	polesRepair = () => {
		if (this.pole1) {
			this.pole1.repair();
		}

		if (this.pole2) {
			this.pole2.repair();
		}
	}
}


export default Wall;