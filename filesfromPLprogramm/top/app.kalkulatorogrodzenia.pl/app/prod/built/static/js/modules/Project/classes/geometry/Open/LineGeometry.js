import * as THREE from 'three';


class LineGeometry {
	constructor(width, directionVertical, directionHorizontal) {
		let start = { x: 0, z: 0 };
		let end = { x: 0, z: 0 };

		if (directionVertical === 'in') {
			if (directionHorizontal === 'left') {
				start.x = width / 2;
				end.x = width / 2;
				end.z = -width;
			}

			if (directionHorizontal === 'right') {
				start.x = -width / 2;
				end.x = -width / 2;
				end.z = -width;
			}
		}

		if (directionVertical === 'out') {
			if (directionHorizontal === 'left') {
				start.x = -width / 2;
				end.x = -width / 2;
				end.z = width;
			}

			if (directionHorizontal === 'right') {
				start.x = width / 2;
				end.x = width / 2;
				end.z = width;
			}
		}

		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(start.x, 0, start.z),
			new THREE.Vector3(end.x, 0, end.z),
		];

		return geometry;
	}
}


export default LineGeometry;