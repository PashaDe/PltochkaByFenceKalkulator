import * as THREE from 'three';


class DualLineGeometry {
	constructor(width, directionVertical) {
		let start1 = { x: 0, z: 0 };
		let end1 = { x: 0, z: 0 };

		let start2 = { x: 0, z: 0 };
		let end2 = { x: 0, z: 0 };

		if (directionVertical === 'in') {
			start1.x = -width / 2;
			end1.x = -width / 2;
			end1.z = -width / 2;

			start2.x = width / 2;
			end2.x = width / 2;
			end2.z = -width / 2;
		}

		if (directionVertical === 'out') {
			start1.x = width / 2;
			end1.x = width / 2;
			end1.z = width / 2;

			start2.x = -width / 2;
			end2.x = -width / 2;
			end2.z = width / 2;
		}

		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(start1.x, 0, start1.z),
			new THREE.Vector3(end1.x, 0, end1.z),

			new THREE.Vector3(start1.x, 0, start1.z),

			new THREE.Vector3(start2.x, 0, start2.z),
			new THREE.Vector3(end2.x, 0, end2.z),
		];

		return geometry;
	}
}


export default DualLineGeometry;