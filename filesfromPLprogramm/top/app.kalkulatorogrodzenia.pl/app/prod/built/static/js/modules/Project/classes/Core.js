import * as THREE from 'three';
import DragControls from 'three-dragcontrols';

import * as panelActions from '../redux/panel/actions';
import * as workspaceActions from '../redux/workspace/actions';
import * as dialogActions from 'modules/assets/Dialog/redux/actions';
import * as popupActions from 'modules/assets/Popup/redux/actions';

import Three from 'classes/Three/Three';
import ThreeAnimations from 'classes/Three/ThreeAnimations';
import ThreeBuffer from 'classes/Three/ThreeBuffer';
import ThreeEnvironment from 'classes/Three/ThreeEnvironment';
import ThreeView from 'classes/Three/ThreeView';

import Average from './extensions/Average';
import Autosave from './extensions/Autosave';
import Communique from './extensions/Communique';
import DayNight from './extensions/DayNight';
import Details from './extensions/Details';
import Dimensions from './extensions/Dimensions';
import PhotoBackground from './extensions/PhotoBackground';
import Screenshot from './extensions/Screenshot';
import Storage from './extensions/Storage';
import Timer from './extensions/Timer';
import Valuation from './extensions/Valuation';


class Core {
	constructor(args) {
		panelActions.reset();
		workspaceActions.reset();
		dialogActions.hide();
		popupActions.hide();

		this.intro = args.intro;
		this.canvas = args.canvas;
		this.config = args.config;
		this.type = args.type;
		this.debug = args.debug;
		this.id = args.id;
		this.project = args.project;

		this.vr = this.type === 'vr';

		this.details = this.loadDetails();
		this.colors = this.loadColors();
		this.params = {
			dimension: {
				color: 0x000000,
				distance: {
					main: 1.50,
					between: 0.75,
					adapt: 0.75,
					technical: 0.25,
				},
				depth: 0.01,
				arrows: 0.12,
			},
			texture: {
				aoMapIntensity: 0.00,
				metalness: 0.00,
				roughness: 1.00,
			},
			wood: {
				aoMapIntensity: 0.00,
				metalness: 0.25,
				roughness: 0.60,
			},
			perfor: {
				aoMapIntensity: 0.00,
				metalness: 0.25,
				roughness: 0.20,
				transparent: true,
			},
			ghost: {
				opacity: 0.35,
				transparent: true,
			},
			disabled: {
				opacity: 0.15,
				transparent: 1,
			},
			hidden: {
				opacity: 0.15,
				transparent: 1,
			},
		};

		this.three = new Three(this, this.canvas[0]);
		this.three.view = new ThreeView(this, this.three);
		this.three.environment = new ThreeEnvironment(this, this.three);
		this.three.animations = new ThreeAnimations(this, this.three);

		this.threeHelper = new Three(this, this.canvas[1]);
		this.threeHelper.view = new ThreeView(this, this.threeHelper);
		this.threeHelper.environment = new ThreeEnvironment(this, this.threeHelper);

		this.extensions = {
			storage: new Storage(this),
			communique: new Communique(this),
			dimensions: new Dimensions(this),
			average: new Average(this),
			autosave: new Autosave(this),
			screenshot: new Screenshot(this),
			photoBackground: new PhotoBackground(this),
			dayNight: new DayNight(this),
			details: new Details(this),
			valuation: new Valuation(this),
			timer: new Timer(this),
		};

		this.font = {
			weight: 'bold',
			size: 0.20,
			family: '"Arial", "sans-serif"',
			color: '#000000',
		};

		this.textures = [];
		this.materials = [];

		this.highlight = null;

		this.dragging = 0;
		this.isLoading = false;
		this.isMoving = false;
		this.isModified = false;
	}

	init = () => {
		this.buffer = new ThreeBuffer(null, () => {
			this.run();
		}, () => {
			this.update();
		});

		this.loadScenes();
		this.loadTextures();
		this.loadMaterials();
		this.loadEvents();
	}

	loadDetails = () => {
		let window = this.editMode() ? (localStorage.getItem('graphic-details-window') || 'none') : 'none';
		let theme = localStorage.getItem('graphic-details-theme') || 'white';
		let framelimit = localStorage.getItem('graphic-details-framelimit') || 'on';
		let antialiassing = localStorage.getItem('graphic-details-antialiassing') || 'on';
		let anisotropy = 4;
		let shadows = localStorage.getItem('graphic-details-shadows') || 'slow';
		let ground = localStorage.getItem('graphic-details-ground') || 'pavement';

		let shadowsPrecision;

		switch (shadows) {
			case 'off':
				shadowsPrecision = 0;
				break;

			case 'slow':
				shadowsPrecision = 15;
				break;

			case 'medium':
				shadowsPrecision = 50;
				break;

			case 'high':
				shadowsPrecision = 100;
				break;

			case 'full':
				shadowsPrecision = 150;
				break;

			default:
		}

		let groundRepeat;

		switch (ground) {
			case 'pavement':
				groundRepeat = { x: 200, y: 400 };
				break;

			case 'gravel':
				groundRepeat = { x: 300, y: 300 };
				break;

			case 'grass':
				groundRepeat = { x: 50, y: 50 };
				break;

			default:
		}

		return {
			window,
			theme,
			framelimit,
			antialiassing,
			anisotropy,
			shadows,
			ground,

			shadowsPrecision,
			groundRepeat,
		};
	}

	loadColors = () => {
		switch (this.details.theme) {
			case 'dark':
				return {
					background: 0x666666,
					grid0: 0x333333,
					grid1: 0x5a5a5a,
					grid10: 0x444444,
					sketchPole: 0xffffff,
					sketchWall: 0xcccccc,
					sketchManufacture: 0xaaaaaa,
					sketchSpace: 0x888888,
					dimensionDefault: 0xffffff,
					dimensionCustom: 0x909090,
				};

			default:
				return {
					background: 0xffffff,
					grid0: 0x909090,
					grid1: 0xeaeaea,
					grid10: 0xcacaca,
					sketchPole: 0x707070,
					sketchWall: 0xd0d0d0,
					sketchManufacture: 0xc0c0c0,
					sketchSpace: 0xd0d0d0,
					dimensionDefault: 0x404040,
					dimensionCustom: 0xb0b0b0,
				};
		}
	}

	loadScenes = () => {
		// 2d
		this.three.view.add('2d', {
			background: this.colors.background,
			perspective: true,
			tone: THREE.NoToneMapping,
			light: 1,
			position: [0, 15, 0],
			controlsMinDistance: 2.50,
			controlsMaxDistance: 100,
			controlsRotate: false,
			controlsMouseButtons: { LEFT: THREE.MOUSE.PAN, MIDDLE: null, RIGHT: THREE.MOUSE.ROTATE },
		});

		this.three.environment.addGrid('2d', 'grid-1', { frequency: 1, maincolor: this.colors.grid0, color: this.colors.grid1, resetClick: true });
		this.three.environment.addGrid('2d', 'grid-10', { frequency: 10, maincolor: this.colors.grid0, color: this.colors.grid10 });
		this.three.environment.addLogo('2d', 'logo-2d', { source: '/assets/img/environment/logos-red.png', repeatX: 50, repeatY: 150, opacity: 0.10, transparent: true });

		// 3d
		this.three.view.add('3d', {
			background: 0xffffff,
			perspective: true,
			tone: THREE.LinearToneMapping,
			light: 2.50,
			position: [10, 5, 20],
			controlsMaxDistance: 100,
			controlsMouseButtons: { LEFT: THREE.MOUSE.PAN, MIDDLE: null, RIGHT: THREE.MOUSE.ROTATE },
		});

		this.three.environment.addSky('3d', 'sky', { source: '/assets/img/environment/clouds.jpg', repeatX: 12, repeatY: 24, resetClick: true });
		this.three.environment.addGround('3d', 'ground', { source: `/assets/img/environment/${this.details.ground}.jpg`, repeatX: this.details.groundRepeat.x, repeatY: this.details.groundRepeat.y, resetClick: true });
		this.three.environment.addLogo('3d', 'logo-3d', { source: '/assets/img/environment/logos-red.png', repeatX: 50, repeatY: 150, opacity: 0.40, transparent: true });
		this.three.environment.addLight('3d', 'sun', { intensity: 0.65, position: [-40, 50, 100] });
		this.three.environment.addLight('3d', 'sun2', { intensity: 0.50, position: [40, 50, -100], shadow: false });
		this.three.environment.addLight('3d', 'sun3', { intensity: 0.10, position: [-40, 50, 0], shadow: false });
		this.three.environment.addLight('3d', 'sun4', { intensity: 0.10, position: [40, 50, 0], shadow: false });

		// helper
		this.threeHelper.view.add('2d', {
			background: this.colors.background,
			perspective: false,
			tone: THREE.NoToneMapping,
			light: 1,
			position: [0, 0, 5],
			controlsMouseButtons: { LEFT: THREE.MOUSE.PAN, MIDDLE: null, RIGHT: null },
			controlsMinPolarAngle: Math.PI / 2,
			controlsMaxPolarAngle: Math.PI / 2,
			controlsPanVertical: false,
		});

		this.threeHelper.cameras['2d'].zoom = 2.5;
		this.threeHelper.cameras['2d'].updateProjectionMatrix();

		// set default
		if (this.type === 'normal') {
			this.setView('2d');
		} else {
			this.setView('3d');
		}
	}

	loadTextures = () => {
		this.envMapDay = this.createTexture('/assets/new/environment/day_1k.jpg');
		this.envMapDay.mapping = THREE.EquirectangularReflectionMapping;

		this.envMapNight = this.createTexture('/assets/new/environment/night_1k.jpg');
		this.envMapNight.mapping = THREE.EquirectangularReflectionMapping;

		this.envMap = this.envMapDay;

		this.textures.wood = this.createTexture('/assets/img/manufactures/textures/wood.jpg');
		this.textures.wood.wrapS = THREE.RepeatWrapping;
		this.textures.wood.wrapT = THREE.RepeatWrapping;

		this.textures.perfor = {};

		/*
		this.textures.perfor['square-5-t8'] = this.createTexture('/assets/img/manufactures/textures/perfor/square-5-t8_x2.png');
		this.textures.perfor['square-5-t8'].wrapS = THREE.RepeatWrapping;
		this.textures.perfor['square-5-t8'].wrapT = THREE.RepeatWrapping;
		// this.textures.perfor['square-5-t8'].offset.x = -50 / 80 * 2;
		// this.textures.perfor['square-5-t8'].offset.y = -50 / 80 * 2;

		this.textures.perfor['square-5-t16'] = this.createTexture('/assets/img/manufactures/textures/perfor/square-5-t16_x2.png');
		this.textures.perfor['square-5-t16'].wrapS = THREE.RepeatWrapping;
		this.textures.perfor['square-5-t16'].wrapT = THREE.RepeatWrapping;
		// this.textures.perfor['square-5-t16'].offset.x = -50 / 160 * 2;
		// this.textures.perfor['square-5-t16'].offset.y = -50 / 160 * 2;

		this.textures.perfor['square-10-t8'] = this.createTexture('/assets/img/manufactures/textures/perfor/square-10-t8_x2.png');
		this.textures.perfor['square-10-t8'].wrapS = THREE.RepeatWrapping;
		this.textures.perfor['square-10-t8'].wrapT = THREE.RepeatWrapping;
		// this.textures.perfor['square-10-t8'].offset.x = -100 / 200 * 2;
		// this.textures.perfor['square-10-t8'].offset.y = -100 / 200 * 2;

		this.textures.perfor['circle-3-t6'] = this.createTexture('/assets/img/manufactures/textures/perfor/circle-3-t6_x2.png');
		this.textures.perfor['circle-3-t6'].wrapS = THREE.RepeatWrapping;
		this.textures.perfor['circle-3-t6'].wrapT = THREE.RepeatWrapping;
		// this.textures.perfor['circle-3-t6'].offset.x = -30 / 60 * 2;
		// this.textures.perfor['circle-3-t6'].offset.y = -30 / 60 * 2;

		this.textures.perfor['circle-3-t7'] = this.createTexture('/assets/img/manufactures/textures/perfor/circle-3-t7_x2.png');
		this.textures.perfor['circle-3-t7'].wrapS = THREE.RepeatWrapping;
		this.textures.perfor['circle-3-t7'].wrapT = THREE.RepeatWrapping;
		// this.textures.perfor['circle-3-t7'].offset.x = -30 / 74 * 2;
		// this.textures.perfor['circle-3-t7'].offset.y = -30 / 74 * 2;

		this.textures.perfor['circle-6-t16'] = this.createTexture('/assets/img/manufactures/textures/perfor/circle-6-t16_x2.png');
		this.textures.perfor['circle-6-t16'].wrapS = THREE.RepeatWrapping;
		this.textures.perfor['circle-6-t16'].wrapT = THREE.RepeatWrapping;
		// this.textures.perfor['circle-6-t16'].offset.x = -60 / 160 * 2;
		// this.textures.perfor['circle-6-t16'].offset.y = -60 / 160 * 2;
		*/

		this.textures.mokka = this.createTexture('/assets/new/panels/default/mokka1.jpg');
		this.textures.mokka.wrapS = THREE.RepeatWrapping;
		this.textures.mokka.wrapT = THREE.RepeatWrapping;
	}

	loadMaterials = () => {
		this.createMaterial('virtual', 'Basic', { source: '/assets/img/geometry/virtual.png', transparent: true });

		this.createMaterial('flash-center', 'Basic', { source: '/assets/img/flashes/center.png', opacity: 0.45, transparent: true });
		this.createMaterial('flash-top', 'Basic', { source: '/assets/img/flashes/top.png', opacity: 0.45, transparent: true });
		this.createMaterial('flash-bottom', 'Basic', { source: '/assets/img/flashes/bottom.png', opacity: 0.45, transparent: true });

		this.createMaterial('chrome', 'Standard', {
			color: 0xffffff,
			metalness: 0.75,
			roughness: 0.20,
			emissive: 0xffffff,
			emissiveIntensity: 0.06,
			envMap: this.envMap,
		});

		this.materials.metal = (color) => new THREE.MeshStandardMaterial({
			color,
			metalness: 0.25,
			roughness: 0.60,
		});

		this.materials.sheet = (color) => new THREE.MeshStandardMaterial({
			color,
			metalness: 0.15,
			roughness: 0.40,
		});

		this.materials.panels = {
			material: new THREE.MeshStandardMaterial({
				name: 'Material',
				color: 0x404040, // 0x303030
				metalness: 0.20,
				roughness: 0.40,
				envMap: this.envMap,
			}),
			roof: new THREE.MeshStandardMaterial({
				name: 'Roof',
				color: 0x404040, // 0x303030
				metalness: 0.10,
				roughness: 0.50,
				envMap: this.envMap,
			}),
			inside: new THREE.MeshStandardMaterial({
				name: 'Inside',
				color: 0xdbdbaa, // 0xddddc0
				metalness: 0.20,
				roughness: 0.30,
				envMap: this.envMap,
			}),
			mokka: new THREE.MeshStandardMaterial({
				name: 'Mokka',
				map: this.textures.mokka,
				aoMap: this.textures.mokka,
				aoMapIntensity: 0.00,
				metalness: 0.20,
				roughness: 0.30,
				envMap: this.envMap,
			}),
		};

		this.materials.mailbox = (name, color) => {
			if (color === 'inox') {
				if (!this.textures.inox) {
					this.textures.inox = this.createTexture('/assets/new/materials/inox.png');
					this.textures.inox.wrapS = THREE.RepeatWrapping;
					this.textures.inox.wrapT = THREE.RepeatWrapping;
					this.textures.inox.repeat.set(5, 5);
				}

				return new THREE.MeshStandardMaterial({
					name,
					map: this.textures.inox,
					aoMap: this.textures.inox,
					aoMapIntensity: 0.00,
					metalness: 0.75 / 3,
					roughness: 0.25,
					envMap: this.envMap,
				});
			}

			if (!this.textures.mat) {
				this.textures.mat = this.createTexture('/assets/new/materials/mat1.png');
				this.textures.mat.wrapS = THREE.RepeatWrapping;
				this.textures.mat.wrapT = THREE.RepeatWrapping;
				this.textures.mat.repeat.set(20, 20);
			}

			return new THREE.MeshStandardMaterial({
				name,
				color,
				map: this.textures.mat,
				aoMap: this.textures.mat,
				aoMapIntensity: 0.00,
				metalness: 0.50 / 3,
				roughness: 0.50,
				envMap: this.envMap,
			});
		};
	}

	loadEvents = () => {
		['beforeunload'].forEach((event) => window.addEventListener(event, (e) => {
			if (!this.debug && this.isModified) {
				(e || window.event).returnValue = true;

				return true;
			}

			return false;
		}));
	}

	setView = (view) => {
		this.three.view.set(view);

		workspaceActions.setView(view);
	}


	/* --- CREATORS ------------------------------------------- */

	createTexture = (source, buffer = true) => {
		if (buffer) {
			this.buffer.add();
		}

		return this.three.loader.load(source, () => {
			if (buffer) {
				this.buffer.remove();
			}
		}, false, () => {
			if (buffer) {
				this.buffer.remove();
			}
		});
	}

	createMaterial = (id, type, options, buffer = true) => {
		const method = `Mesh${type}Material`;

		const defaults = {
			repeatX: 1,
			repeatY: 1,
			aoMapIntensity: 0.00,
			envMapIntensity: 1.00,
		};

		const args = { ...defaults, ...options };

		if (args.source) {
			if (buffer) {
				this.buffer.add();
			}

			this.three.loader.load(args.source, (image) => {
				const texture = image.clone();
				texture.needsUpdate = true;
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set(args.repeatX, args.repeatY);
				texture.anisotropy = this.details.anisotropy;

				this.materials[id] = new THREE[method]({ ...args, ...{ map: texture, aoMap: texture } });

				if (buffer) {
					this.buffer.remove();
				}
			}, false, () => {
				if (buffer) {
					this.buffer.remove();
				}
			});
		} else {
			this.materials[id] = new THREE[method](args);
		}
	}


	/* --- CLICK EVENTS --------------------------------------- */

	onClick = (o, callback) => {
		['click', 'touchend'].forEach((event) => o.on(event, () => {
			if (event === 'touchend') {
				setTimeout(() => {
					callback();
				}, 50);
			} else {
				callback();
			}
		}));
	}

	resetClick = (o) => {
		o.drag = new DragControls([o], {
			moveable: false,
		}, this.three.camera, this.three.render.domElement);

		['click', 'touchend'].forEach((event) => o.drag.addEventListener(event, () => {
			this.resetOptions();
		}));
	}

	resetOptions = () => {
		panelActions.reset();
		this.setHighlight(null);
	}


	/* --- HIGHLIGHT ------------------------------------------ */

	setHighlight = (o) => {
		if (this.highlight) {
			if (this.highlight.objects.highlight2d) {
				this.highlight.objects.highlight2d.visible = false;
			}

			if (this.highlight.objects.highlight3d) {
				this.highlight.objects.highlight3d.visible = false;
			}
		}

		if (o) {
			if (o.objects.highlight2d) {
				o.objects.highlight2d.visible = true;
			}

			if (o.objects.highlight3d) {
				o.objects.highlight3d.visible = true;
			}

			this.highlight = o;

			this.setTechnical(o);
		}
	}


	/* --- METHODS -------------------------------------------- */

	isDragging = () => {
		if (this.dragging + 100 >= Date.now()) {
			return true;
		}

		return false;
	}

	setModified = () => {
		this.isModified = true;
	}

	unsetModified = () => {
		this.isModified = false;
	}

	editMode = () => !(this.type === 'preview' || this.type === 'vr')


	/* --- FUNCTIONS ------------------------------------------ */

	dpsi = (row, i = 0) => {
		let drow = 0.01;
		let di = 0.003;

		return parseFloat(row) * drow + parseFloat(i) * di;
	}
}


export default Core;
