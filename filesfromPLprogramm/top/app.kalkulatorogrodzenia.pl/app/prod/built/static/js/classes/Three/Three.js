import * as THREE from 'three';
import { GLTFLoader } from 'three-gltfloader';
import Stats from 'stats-js';

import Objects from 'classes/Tools/Objects';


class Three {
	constructor(instance, canvas) {
		this.instance = instance;
		this.canvas = canvas;

		this.orientationControlsStatus = true;

		this.check3dSupport();
		this.stats();
		this.init();
	}

	check3dSupport = () => {
		let canvas = document.createElement('canvas');
		let webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		if (webgl && webgl instanceof WebGLRenderingContext) {
			// alert('Congratulations! Your browser supports WebGL.');
		} else {
			// alert('Your browser or device may not support WebGL.');
		}
	}

	stats = () => {
		if (this.instance.debug) {
			this.stats = new Stats();
			this.stats.domElement.style.position = 'absolute';
			this.stats.domElement.style.top = 'auto';
			this.stats.domElement.style.left = '0';
			this.stats.domElement.style.right = 'auto';
			this.stats.domElement.style.bottom = '0';
			this.stats.domElement.style.zIndex = 1;

			this.canvas.appendChild(this.stats.domElement);
		} else {
			this.stats = null;
		}
	}

	init = () => {
		this.setSizeAndAspect();

		// dependencies
		this.timestamp = 0;
		this.fps = 1000 / 30;
		this.clock = new THREE.Clock();
		this.render = new THREE.WebGLRenderer({
			alpha: true,
			antialias: !this.instance.vr && this.instance.details.antialiassing === 'on',
		});
		this.mixers = [];

		this.loader = new THREE.TextureLoader();
		this.gltf = new GLTFLoader();

		// settings
		this.render.setPixelRatio((window.devicePixelRatio < 2) ? window.devicePixelRatio : 2);
		this.render.setSize(this.width, this.height);
		this.render.shadowMap.enabled = true;
		this.render.localClippingEnabled = true;
		this.render.sortObjects = false;

		// vr
		/* if (this.instance.vr) {
			window.addEventListener('deviceorientation', this.setOrientationControls.bind(this), true);

			this.effect = new StereoEffect(this.render);
			this.effect.eyeSeparation = 10;
			this.effect.setSize(this.width, this.height);
		} */

		// add to canvas
		this.canvas.insertBefore(this.render.domElement, this.canvas.firstChild);

		// window events
		this.resize();

		// run animation
		this.reqestAnimation();
	}

	reqestAnimation = () => {
		this.reqestAnimationID = window.requestAnimationFrame(() => {
			if (this.instance.details.framelimit === 'on') {
				if (Date.now() > this.timestamp) {
					this.refresh();

					this.timestamp += this.fps;

					if (this.timestamp < Date.now()) {
						this.timestamp = Date.now();
					}
				}
			} else {
				this.refresh();
			}

			this.reqestAnimation();
		});
	}

	cancelAnimation = () => {
		if (this.reqestAnimationID) {
			window.cancelAnimationFrame(this.reqestAnimationID);
		}
	}

	refresh = () => {
		if (this.animations) {
			this.animations.render();
		}

		if (this.scene && this.camera) {
			this.render.render(this.scene, this.camera);

			if (Objects.count(this.mixers)) {
				Objects.values(this.mixers).forEach((mixer) => {
					mixer.update(this.clock.getDelta());
				});
			}
		}

		if (this.labels) {
			this.labels.render();
		}

		/* if (this.instance.vr && this.camera) {
			this.camera.controls.update(this.clock.getDelta());
			this.effect.render(this.scene, this.camera);
		} */

		if (this.stats) {
			this.stats.update();
		}
	}

	reset = () => {
		this.setSizeAndAspect();

		Objects.values(this.cameras).forEach((camera) => {
			switch (camera.type) {
				case 'PerspectiveCamera':
					camera.aspect = this.aspect;
					break;

				case 'OrthographicCamera':
					camera.left = -this.width / this.ratio;
					camera.right = this.width / this.ratio;
					camera.top = this.height / this.ratio;
					camera.bottom = -this.height / this.ratio;
					break;

				default:
			}

			camera.updateProjectionMatrix();
		});

		this.render.setSize(this.width, this.height);

		/* if (this.instance.vr) {
			this.effect.setSize(this.width, this.height);
		} */
	}

	resize = () => {
		['resize'].forEach((event) => window.addEventListener(event, () => {
			this.reset();
		}));
	}

	setSizeAndAspect = () => {
		this.width = this.canvas.offsetWidth;
		this.height = this.canvas.offsetHeight;
		this.aspect = this.width / this.height;
		this.ratio = 56.5;
	}

	setOrientationControls = () => {
		/* if (this.instance.vr) {
			if (!this.orientationControlsStatus || !e.alpha) {
				return;
			}

			this.camera.controls = new DeviceOrientationControls(this.camera, true);
			this.camera.controls.connect();
			this.camera.controls.update();
		} */

		this.orientationControlsStatus = false;
	}

	raycaster = (e) => {
		if (typeof e.layerX === 'undefined') {
			const touch = e.touches[0];

			if (touch) {
				e.layerX = touch.pageX - (this.canvas.getBoundingClientRect().left + window.scrollX);
				e.layerY = touch.pageY - (this.canvas.getBoundingClientRect().top + window.scrollY);

				this.layerX = e.layerX;
				this.layerY = e.layerY;
			} else {
				e.layerX = this.layerX;
				e.layerY = this.layerY;
			}
		}

		const x = (e.layerX / this.width) * 2 - 1;
		const y = -(e.layerY / this.height) * 2 + 1;

		const pointer = new THREE.Vector2(x, y);
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(pointer, this.camera);

		return raycaster;
	}
}


export default Three;