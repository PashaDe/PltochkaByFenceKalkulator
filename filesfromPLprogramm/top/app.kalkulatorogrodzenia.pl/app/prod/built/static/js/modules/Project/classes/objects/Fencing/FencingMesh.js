import * as THREE from 'three';

import PolesGeometry from '../../geometry/Manufacture/PolesGeometry';
import SpanGeometry from '../../geometry/Span/SpanGeometry';
import FencingKit from '../../geometry/UniKit/FencingKit';


class Fencing {
	/* --- MESH ----------------------------------------------- */

	doGhost = () => {
		if (this.status && this.data.maxHeight && !this.material) {
			const color = 0x373737;

			let material = [
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
			];

			let geometry = new SpanGeometry('center', { width: this.wall.width, height: this.data.maxHeight }, { width: 0.02, depth: 0.04, space: 0 }, { height: 0.08, depth: 0.02, space: 0.02, angle: 0 });

			if (!this.objects.ghost) {
				this.objects.ghost = new THREE.Mesh(geometry, material);
				this.objects.ghost.castShadow = this.instance.details.shadowsPrecision >= 100;
				this.three.scenes['3d'].add(this.objects.ghost);

				this.events(this.objects.ghost);
			} else {
				this.objects.ghost.geometry = geometry;
				this.objects.ghost.material = material;
			}

			this.objects.ghost.position.set(this.position.x, this.position.y, this.position.z);
			this.objects.ghost.rotation.y = this.wall.rotation.normal;
			this.objects.ghost.visible = true;
		} else if (this.objects.ghost) {
			this.objects.ghost.visible = false;
		}
	}

	doSpan = () => {
		if (this.status && this.data.height) {
			const materialMetal = this.instance.materials.metal(this.getColor());
			const materialSheet = this.instance.materials.sheet(this.getColor());
			const materialPerfor = new THREE.MeshStandardMaterial({ ...this.instance.params.perfor, map: this.instance.textures.perfor[this.instance.fencings.variant], aoMap: this.instance.textures.perfor[this.instance.fencings.variant] });
			const materialWood = new THREE.MeshStandardMaterial({ ...this.instance.params.wood, map: this.instance.textures.wood, aoMap: this.instance.textures.wood });

			let material = [
				materialMetal,
				materialMetal,
				materialMetal,
				materialMetal,
				materialMetal,
				materialMetal,

				materialSheet,
				materialSheet,
				materialSheet,
				materialSheet,
				materialSheet,
				materialSheet,

				materialPerfor,
				materialPerfor,
				materialPerfor,
				materialPerfor,
				materialPerfor,
				materialPerfor,

				materialWood,
				materialWood,
				materialWood,
				materialWood,
				materialWood,
				materialWood,
			];

			let geometry = FencingKit.geometry(
				this.data.params.args,
				this.material,
				this.data.params.data,
			);

			if (!this.objects.span) {
				this.objects.span = new THREE.Mesh(geometry, material);
				this.objects.span.castShadow = this.instance.details.shadowsPrecision >= 100;
				this.three.scenes['3d'].add(this.objects.span);

				this.events(this.objects.span);
			} else {
				this.objects.span.geometry = geometry;
				this.objects.span.material = material;
			}

			this.objects.span.position.set(this.position.x, this.position.y - this.data.dig, this.position.z);
			this.objects.span.rotation.y = this.wall.rotation.normal;
			this.objects.span.visible = true;
		} else if (this.objects.span) {
			this.objects.span.visible = false;
		}
	}

	doPoles = () => {
		const D = 0.001;

		if (this.status && this.data.height) {
			const materialMetal = this.instance.materials.metal(this.getColor());

			let material = [
				materialMetal,
				materialMetal,
				materialMetal,
				materialMetal,
				materialMetal,
				materialMetal,
			];

			let geometry = new PolesGeometry(this.wall.width - D, this.material.joiners.width, this.data.height + this.data.params.args.space + this.data.dig, this.material.joiners.depth, this.data.poles.left, this.data.poles.right, { left: this.data.cutPole.left, right: this.data.cutPole.right });

			if (!this.objects.poles) {
				this.objects.poles = new THREE.Mesh(geometry, material);
				this.objects.poles.castShadow = true;
				this.three.scenes['3d'].add(this.objects.poles);

				this.events(this.objects.poles);
			} else {
				this.objects.poles.geometry = geometry;
				this.objects.poles.material = material;
			}

			this.objects.poles.position.set(this.position.x, this.position.y - this.data.dig, this.position.z);
			this.objects.poles.rotation.y = this.wall.rotation.normal;
			this.objects.poles.visible = true;
		} else if (this.objects.poles) {
			this.objects.poles.visible = false;
		}
	}

	events = (o) => {
		if (this.instance.editMode()) {
			this.instance.onClick(o, () => {
				this.displayOptions();
			});
		}
	}
}


export default Fencing;