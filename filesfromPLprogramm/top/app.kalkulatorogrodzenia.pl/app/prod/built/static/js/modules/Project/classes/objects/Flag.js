import * as THREE from 'three';


class Flag {
	constructor(instance, x, z) {
		this.instance = instance;
		this.three = instance.three;

		// objects
		this.objects = {
			stick: null,
			flag: null,
		};

		// settings
		this.id = this.instance.flags.length;

		this.width = 1;
		this.height = 4;
		this.indent = 1;

		this.position = { x, y: 0, z };

		this.do();

		this.animations();
	}

	do = () => {
		this.doStick();
		this.doFlag();
	}


	/* --- MESH ----------------------------------------------- */

	doStick = () => {
		if (!this.objects.stick) {
			let material = [
				new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.20, roughness: 0.10, envMap: this.instance.envMap }),
				new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.20, roughness: 0.10, envMap: this.instance.envMap }),
			];

			let geometry = new THREE.CylinderGeometry(0.05, 0.05, this.height + this.indent, 50);

			this.objects.stick = new THREE.Mesh(geometry, material);
			this.three.scenes['3d'].add(this.objects.stick);

			this.objects.stick.position.set(this.position.x, this.position.y + (this.height + this.indent) / 2, this.position.z);
		} else {
			this.objects.stick.position.x = this.position.x;
			this.objects.stick.position.z = this.position.z;
		}
	}

	doFlag = () => {
		if (!this.objects.flag) {
			let texture = this.three.loader.load('/assets/img/flags/flag-red.png');
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(1, 1);
			texture.anisotropy = this.instance.details.anisotropy;

			let material = [
				new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: texture, aoMap: texture, side: THREE.DoubleSide }),
			];

			let geometry = new THREE.PlaneGeometry(this.width, this.height, this.width * 20, this.height * 10);

			this.objects.flag = new THREE.Mesh(geometry, material);
			this.three.scenes['3d'].add(this.objects.flag);
		}

		this.objects.flag.position.set(this.position.x + this.width / 2, this.position.y + this.height / 2 + this.indent, this.position.z);
	}


	/* --- ACTIONS -------------------------------------------- */

	move = (x, z) => {
		this.position.x = x;
		this.position.z = z;

		this.do();
	}

	show = () => {
		this.objects.stick.visible = true;
		this.objects.flag.visible = true;
	}

	hide = () => {
		this.objects.stick.visible = false;
		this.objects.flag.visible = false;
	}


	/* --- ANIMATIONS ----------------------------------------- */

	animations = () => {
		this.animation = this.three.animations.add(`flag-${this.id}`, () => {
			let x = 0;

			this.objects.flag.geometry.vertices.forEach((v) => {
				let c = 1;
				let r = x % (this.width * 20 + 1);
				if (r < this.width * 20 / 4) c = r * 0.1 / 4;

				v.z = c * (Math.cos(x * 0.5 * v.x - Date.now() * 0.005) * 0.03);
				x++;
			});

			this.objects.flag.geometry.verticesNeedUpdate = true;
		});
	}
}


export default Flag;