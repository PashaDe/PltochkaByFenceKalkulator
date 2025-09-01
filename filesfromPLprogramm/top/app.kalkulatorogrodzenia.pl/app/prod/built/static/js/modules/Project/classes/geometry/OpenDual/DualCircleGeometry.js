import * as THREE from 'three';


class DualCircleGeometry {
	constructor(width, directionVertical) {
		const segments = 25;

		let t1; // theta
		let p1; // point

		let t2; // theta
		let p2; // point

		if (directionVertical === 'in') {
			t1 = 1.5 * Math.PI;
			p1 = -width / 2;

			t2 = 1 * Math.PI;
			p2 = width / 2;
		}

		if (directionVertical === 'out') {
			t1 = 0.5 * Math.PI;
			p1 = width / 2;

			t2 = 0;
			p2 = -width / 2;
		}

		let geometry = new THREE.Geometry();

		for (let i = 0; i <= segments; i++) {
			let theta = (i / segments) * Math.PI / 2 + t1;

			geometry.vertices.push(
				new THREE.Vector3(
					p1 + Math.cos(theta) * width / 2,
					0,
					Math.sin(theta) * width / 2,
				),
			);
		}

		for (let i = 0; i <= segments; i++) {
			let theta = (i / segments) * Math.PI / 2 + t2;

			geometry.vertices.push(
				new THREE.Vector3(
					p2 + Math.cos(theta) * width / 2,
					0,
					Math.sin(theta) * width / 2,
				),
			);
		}

		return geometry;
	}
}


export default DualCircleGeometry;