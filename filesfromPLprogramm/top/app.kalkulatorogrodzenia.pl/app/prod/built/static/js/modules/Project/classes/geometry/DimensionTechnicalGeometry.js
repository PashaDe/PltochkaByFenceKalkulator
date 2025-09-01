import * as THREE from 'three';


class DimensionTechnicalGeometry {
	constructor(width, depth, arrow) {
		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(-width / 2 + arrow / 2, -depth / 2, 0), // a0
			new THREE.Vector3(-width / 2 + arrow / 2, depth / 2, 0), // b1
			new THREE.Vector3(width / 2 - arrow / 2, depth / 2, 0), // c2
			new THREE.Vector3(width / 2 - arrow / 2, -depth / 2, 0), // d3

			new THREE.Vector3(-width / 2 + arrow / 2, -arrow / 2, 0), // a4
			new THREE.Vector3(-width / 2 + arrow / 2, arrow / 2, 0), // b5
			new THREE.Vector3(width / 2 - arrow / 2, arrow / 2, 0), // c6
			new THREE.Vector3(width / 2 - arrow / 2, -arrow / 2, 0), // d7

			new THREE.Vector3(-width / 2, 0, 0), // e8
			new THREE.Vector3(width / 2, 0, 0), // f9
		];

		geometry.faces = [
			new THREE.Face3(1, 0, 3),
			new THREE.Face3(1, 3, 2),

			new THREE.Face3(8, 4, 5),
			new THREE.Face3(6, 7, 9),
		];

		geometry.faces[0].materialIndex = 0;
		geometry.faces[1].materialIndex = 0;

		// geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default DimensionTechnicalGeometry;