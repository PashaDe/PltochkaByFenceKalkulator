import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import { Interaction } from 'three-interaction';


class ThreeView {
	constructor(instance, three) {
		this.instance = instance;
		this.three = three;

		this.current = false;

		this.three.scenes = [];
		this.three.scene = null;

		this.three.cameras = [];
		this.three.camera = null;
	}

	add = (id, options) => {
		const defaults = {
			background: null,
			perspective: true,
			tone: THREE.NoToneMapping,
			light: 1,
			lightColor: 0xffffff,
			position: [10, 5, 20],
			lookAt: [0, 0, 0],
			controls: true,
			controlsMinDistance: 1,
			controlsMaxDistance: 100,
			controlsRotate: true,
			controlsRotateSpeed: 0.2,
			controlsPan: true,
			controlsPanHorizontal: true,
			controlsPanVertical: true,
			controlsZoom: true,
			controlsKeys: false,
			controlsMouseButtons: { LEFT: THREE.MOUSE.ROTATE, MIDDLE: null, RIGHT: THREE.MOUSE.PAN },
			interaction: true,
		};

		const args = { ...defaults, ...options };

		this.three.scenes[id] = new THREE.Scene();

		if (args.perspective) {
			this.three.cameras[id] = new THREE.PerspectiveCamera(45, this.three.aspect, 0.04, 500);
		} else {
			this.three.cameras[id] = new THREE.OrthographicCamera(-this.width / this.ratio, this.width / this.ratio, this.height / this.ratio, -this.height / this.ratio, 0.04, 500);
		}

		this.three.cameras[id].position.set(args.position[0], args.position[1], args.position[2]);
		this.three.cameras[id].lookAt(args.lookAt[0], args.lookAt[1], args.lookAt[2]);
		this.three.cameras[id].active = false;

		// background
		if (args.background) {
			this.three.scenes[id].background = new THREE.Color(args.background);
		}

		// tone
		this.three.scenes[id].tone = args.tone;

		// light
		if (args.light) {
			this.three.scenes[id].AmbientLight = new THREE.AmbientLight(args.lightColor, args.light);
			this.three.scenes[id].add(this.three.scenes[id].AmbientLight);
		}

		// controls
		if (args.controls) {
			this.three.cameras[id].controls = new OrbitControls(this.three.cameras[id], this.three.render.domElement);
			this.three.cameras[id].controls.minDistance = args.controlsMinDistance;
			this.three.cameras[id].controls.maxDistance = args.controlsMaxDistance;
			this.three.cameras[id].controls.maxPositionX = (args.controlsMaxDistanceX !== undefined) ? args.controlsMaxDistanceX : args.controlsMaxDistance;
			this.three.cameras[id].controls.maxPositionY = (args.controlsMaxDistanceY !== undefined) ? args.controlsMaxDistanceY : args.controlsMaxDistance;
			this.three.cameras[id].controls.maxPositionZ = (args.controlsMaxDistanceZ !== undefined) ? args.controlsMaxDistanceZ : args.controlsMaxDistance;
			this.three.cameras[id].controls.rotateSpeed = (args.controlsRotate) ? args.controlsRotateSpeed : 0;
			this.three.cameras[id].controls.minPolarAngle = (args.controlsMinPolarAngle !== undefined) ? args.controlsMinPolarAngle : 0;
			this.three.cameras[id].controls.maxPolarAngle = (args.controlsMaxPolarAngle !== undefined) ? args.controlsMaxPolarAngle : Math.PI / 2 - 0.075;

			this.three.cameras[id].controls.enabled = false;
			this.three.cameras[id].controls.enablePan = args.controlsPan;
			this.three.cameras[id].controls.enablePanHorizontal = args.controlsPanHorizontal;
			this.three.cameras[id].controls.enablePanVertical = args.controlsPanVertical;
			this.three.cameras[id].controls.enableZoom = args.controlsZoom;
			this.three.cameras[id].controls.enableKeys = args.controlsKeys;
			this.three.cameras[id].controls.mouseButtons = args.controlsMouseButtons;
		}

		// interaction
		if (args.interaction) {
			this.three.scenes[id].interaction = new Interaction(this.three.render, this.three.scenes[id], this.three.cameras[id]);
		}

		this.set(id);
	}

	get = () => this.current

	set = (id) => {
		// before
		if (this.three.camera) {
			this.three.camera.active = false;

			if (this.three.camera.controls) {
				this.three.camera.controls.enabled = false;
			}
		}

		// set
		this.current = id;

		this.three.scene = this.three.scenes[id];
		this.three.camera = this.three.cameras[id];

		// tone
		this.three.render.toneMapping = this.three.scene.tone;

		if (this.three.scene.tone === THREE.NoToneMapping) {
			this.three.render.toneMappingExposure = 1;
			this.three.render.physicallyCorrectLights = false;
			this.three.render.outputEncoding = THREE.LinearEncoding;
		} else {
			this.three.render.toneMappingExposure = 1;
			this.three.render.physicallyCorrectLights = true;
			this.three.render.outputEncoding = THREE.LinearEncoding;
		}

		// after
		if (this.three.camera) {
			this.three.camera.active = true;

			if (this.three.camera.controls) {
				this.three.camera.controls.enabled = true;
			}
		}

		// html
		const displayViewAll = document.querySelector('.display-view');
		if (displayViewAll) displayViewAll.style.display = 'none';

		const displayViewCurrent = document.querySelector(`.display-view-${id}`);
		if (displayViewCurrent) displayViewCurrent.style.display = 'block';
	}
}


export default ThreeView;