import * as THREE from 'three';


class ThreeEnvironment {
	constructor(instance, three) {
		this.instance = instance;
		this.three = three;

		this.objects = [];
		this.lights = [];
	}

	addFog = (view, options) => {
		const defaults = {
			color: 0xffffff,
			distance: 500,
		};

		const args = { ...defaults, ...options };

		this.three.scenes[view].background = new THREE.Color(args.color);
		this.three.scenes[view].fog = new THREE.Fog(args.color, 0, args.distance);
	}

	removeFog = (view) => {
		this.three.scenes[view].background = new THREE.Color(0xffffff);
		this.three.scenes[view].fog = null;
	}

	addGrid = (view, id, options) => {
		const defaults = {
			size: 500,
			frequency: 1,
			color: 0x000000,
			maincolor: 0x000000,
			resetClick: false,
		};

		const args = { ...defaults, ...options };

		this.objects[id] = new THREE.GridHelper(args.size, args.size / args.frequency, args.maincolor, args.color);
		this.objects[id].position.set(0, 0, 0);

		this.three.scenes[view].add(this.objects[id]);

		if (args.resetClick) {
			this.instance.resetClick(this.objects[id]);
		}
	}

	addSky = (view, id, options) => {
		const defaults = {
			material: 'Lambert',
			source: null,
			color: 0xffffff,
			size: 300,
			points: 8,
			repeatX: 1,
			repeatY: 1,
			intensity: 0.00,
			opacity: 1.00,
			transparent: false,
			visible: true,
			resetClick: false,
		};

		const args = { ...defaults, ...options };

		if (args.source) {
			let texture = this.three.loader.load(args.source, () => {
				this.objects[id].visible = args.visible;
			});

			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(args.repeatX, args.repeatY);
			texture.anisotropy = this.instance.details.anisotropy / 2;

			args.parameters = { map: texture, aoMap: texture, aoMapIntensity: args.intensity };
		} else {
			args.parameters = { color: args.color };
		}

		let material = new THREE[`Mesh${args.material}Material`]({ ...args.parameters, ...{ opacity: args.opacity, transparent: args.transparent } });

		let geometry = new THREE.SphereGeometry(args.size, args.points, args.points);
		geometry.scale(-1, 1, 1);

		this.objects[id] = new THREE.Mesh(geometry, material);
		this.objects[id].position.set(0, 0, 0);
		this.objects[id].visible = false;

		this.three.scenes[view].add(this.objects[id]);

		if (args.resetClick) {
			this.instance.resetClick(this.objects[id]);
		}
	}

	addGround = (view, id, options) => {
		const defaults = {
			material: 'Lambert',
			source: null,
			color: 0xffffff,
			size: 600,
			repeatX: 1,
			repeatY: 1,
			intensity: 0.00,
			opacity: 1.00,
			transparent: false,
			rotation: 'top',
			visible: true,
			resetClick: false,
		};

		const args = { ...defaults, ...options };

		if (args.source) {
			let texture = this.three.loader.load(args.source, () => {
				this.objects[id].visible = args.visible;
			});

			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(args.repeatX, args.repeatY);
			texture.anisotropy = this.instance.details.anisotropy / 2;

			args.parameters = { map: texture, aoMap: texture, aoMapIntensity: args.intensity };
		} else {
			args.parameters = { color: args.color };
		}

		let material = new THREE[`Mesh${args.material}Material`]({ ...args.parameters, ...{ opacity: args.opacity, transparent: args.transparent } });

		let geometry = new THREE.PlaneBufferGeometry(args.size, args.size);

		this.objects[id] = new THREE.Mesh(geometry, material);
		this.objects[id].receiveShadow = true;
		this.objects[id].position.set(0, this.instance.dpsi(-2), 0);
		this.objects[id].rotation.x = (args.rotation === 'top') ? -Math.PI / 2 : 0;
		this.objects[id].visible = false;

		this.three.scenes[view].add(this.objects[id]);

		if (args.resetClick) {
			this.instance.resetClick(this.objects[id]);
		}
	}

	addLogo = (view, id, options) => {
		const defaults = {
			material: 'Lambert',
			source: null,
			color: 0xffffff,
			size: 600,
			repeatX: 1,
			repeatY: 1,
			intensity: 0.00,
			opacity: 1.00,
			transparent: false,
			rotation: 'top',
			visible: true,
			resetClick: false,
		};

		const args = { ...defaults, ...options };

		if (args.source) {
			let texture = this.three.loader.load(args.source, () => {
				this.objects[id].visible = args.visible;
			});

			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(args.repeatX, args.repeatY);
			texture.anisotropy = this.instance.details.anisotropy / 2;

			args.parameters = { map: texture, aoMap: texture, aoMapIntensity: args.intensity };
		} else {
			args.parameters = { color: args.color };
		}

		let material = new THREE[`Mesh${args.material}Material`]({ ...args.parameters, ...{ opacity: args.opacity, transparent: args.transparent } });

		let geometry = new THREE.PlaneBufferGeometry(args.size, args.size);

		this.objects[id] = new THREE.Mesh(geometry, material);
		this.objects[id].position.set(0, this.instance.dpsi(-1), 0);
		this.objects[id].rotation.x = (args.rotation === 'top') ? -Math.PI / 2 : 0;
		this.objects[id].visible = false;

		this.three.scenes[view].add(this.objects[id]);

		if (args.resetClick) {
			this.instance.resetClick(this.objects[id]);
		}
	}

	addLight = (view, id, options) => {
		const defaults = {
			intensity: 0.50,
			color: 0xffffff,
			position: [-50, 50, 100],
			shadow: true,
			helper: false,
		};

		const args = { ...defaults, ...options };

		this.lights[id] = [];
		this.lights[id].light = new THREE.DirectionalLight(args.color, args.intensity);
		this.lights[id].light.position.set(args.position[0], args.position[1], args.position[2]);

		if (args.shadow) {
			const { controls } = this.three.cameras[view];
			const limitX = (controls?.maxPositionX) ? controls.maxPositionX * 0.5 : 50;
			const limitZ = (controls?.maxPositionZ) ? controls.maxPositionZ * 0.5 : 25;

			this.lights[id].light.castShadow = !!this.instance.details.shadowsPrecision;
			this.lights[id].light.shadow.mapSize.width = 2 * limitX * this.instance.details.shadowsPrecision;
			this.lights[id].light.shadow.mapSize.height = 2 * limitZ * this.instance.details.shadowsPrecision;
			this.lights[id].light.shadow.camera = new THREE.OrthographicCamera(-limitX, limitX, -limitZ, limitZ, 0.04, 500);
		}

		this.three.scenes[view].add(this.lights[id].light);

		// helper
		if (args.helper) {
			this.lights[id].helper = new THREE.CameraHelper(this.lights[id].light.shadow.camera);
			this.three.scenes[view].add(this.lights[id].helper);
		}
	}
}


export default ThreeEnvironment;