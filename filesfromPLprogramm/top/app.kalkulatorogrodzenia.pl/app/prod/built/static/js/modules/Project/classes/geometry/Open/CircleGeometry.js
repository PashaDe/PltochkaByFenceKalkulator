import * as THREE from 'three';


class CircleGeometry {
	constructor(width, directionVertical, directionHorizontal) {
		const segments = 25;

		let t; // theta
		let p; // point

		if (directionVertical === 'in') {
			if (directionHorizontal === 'left') {
				t = 1 * Math.PI;
				p = width / 2;
			}

			if (directionHorizontal === 'right') {
				t = 1.5 * Math.PI;
				p = -width / 2;
			}
		}

		if (directionVertical === 'out') {
			if (directionHorizontal === 'left') {
				t = 0;
				p = -width / 2;
			}

			if (directionHorizontal === 'right') {
				t = 0.5 * Math.PI;
				p = width / 2;
			}
		}

		let geometry = new THREE.Geometry();

		for (let i = 0; i <= segments; i++) {
			let theta = (i / segments) * Math.PI / 2 + t;

			geometry.vertices.push(
				new THREE.Vector3(
					p + Math.cos(theta) * width,
					0,
					Math.sin(theta) * width,
				),
			);
		}

		return geometry;
	}
}


export default CircleGeometry;