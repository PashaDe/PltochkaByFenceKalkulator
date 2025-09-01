import * as THREE from 'three';


class LineGeometry {
	constructor(start, target) {
		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(target.x - start.x, 0, target.z - start.z),
		];

		return geometry;
	}
}


export default LineGeometry;