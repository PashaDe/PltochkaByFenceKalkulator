import * as THREE from 'three';


class DimensionGeometry {
	constructor(width, depth, arrow) {
		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(-width / 2 + arrow / 2, 0, -depth / 2), // a0
			new THREE.Vector3(-width / 2 + arrow / 2, 0, depth / 2), // b1
			new THREE.Vector3(width / 2 - arrow / 2, 0, depth / 2), // c2
			new THREE.Vector3(width / 2 - arrow / 2, 0, -depth / 2), // d3

			new THREE.Vector3(-width / 2 + arrow / 2, 0, -arrow / 2), // a4
			new THREE.Vector3(-width / 2 + arrow / 2, 0, arrow / 2), // b5
			new THREE.Vector3(width / 2 - arrow / 2, 0, arrow / 2), // c6
			new THREE.Vector3(width / 2 - arrow / 2, 0, -arrow / 2), // d7

			new THREE.Vector3(-width / 2, 0, 0), // e8
			new THREE.Vector3(width / 2, 0, 0), // f9
		];

		geometry.faces = [
			new THREE.Face3(1, 3, 0),
			new THREE.Face3(1, 2, 3),

			new THREE.Face3(8, 5, 4),
			new THREE.Face3(6, 9, 7),
		];

		geometry.faces[0].materialIndex = 0;
		geometry.faces[1].materialIndex = 0;

		let a = arrow / width / 2;
		let x1 = arrow / width / 2;
		let y1 = (arrow > depth) ? (arrow - depth) / 2 / arrow : 0;
		let y2 = (depth > arrow) ? (depth - arrow) / 2 / depth : 0;

		geometry.faceVertexUvs[0] = [
			[new THREE.Vector2(x1, y1), new THREE.Vector2(1 - x1, 1 - y1), new THREE.Vector2(x1, 1 - y1)],
			[new THREE.Vector2(x1, y1), new THREE.Vector2(1 - x1, y1), new THREE.Vector2(1 - x1, 1 - y1)],

			[new THREE.Vector2(0, 0.5), new THREE.Vector2(a, y2), new THREE.Vector2(a, 1 - y2)],
			[new THREE.Vector2(1 - a, y2), new THREE.Vector2(1, 0.5), new THREE.Vector2(1 - a, 1 - y2)],
		];

		// geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default DimensionGeometry;