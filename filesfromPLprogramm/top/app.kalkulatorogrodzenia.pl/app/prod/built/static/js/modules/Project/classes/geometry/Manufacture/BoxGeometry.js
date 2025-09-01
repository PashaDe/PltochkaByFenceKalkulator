import * as THREE from 'three';


class BoxGeometry {
	constructor(width, height, depth) {
		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(-width / 2, -height / 2, -depth / 2), // a0
			new THREE.Vector3(-width / 2, -height / 2, depth / 2), // b1
			new THREE.Vector3(width / 2, -height / 2, depth / 2), // c2
			new THREE.Vector3(width / 2, -height / 2, -depth / 2), // d3

			new THREE.Vector3(-width / 2, height / 2, -depth / 2), // a4
			new THREE.Vector3(-width / 2, height / 2, depth / 2), // b5
			new THREE.Vector3(width / 2, height / 2, depth / 2), // c6
			new THREE.Vector3(width / 2, height / 2, -depth / 2), // d7
		];

		geometry.faces = [
			new THREE.Face3(0, 2, 1),
			new THREE.Face3(0, 3, 2),

			new THREE.Face3(5, 7, 4),
			new THREE.Face3(5, 6, 7),

			new THREE.Face3(0, 4, 7),
			new THREE.Face3(0, 7, 3),

			new THREE.Face3(1, 6, 5),
			new THREE.Face3(1, 2, 6),

			new THREE.Face3(1, 5, 4),
			new THREE.Face3(1, 4, 0),

			new THREE.Face3(2, 7, 6),
			new THREE.Face3(2, 3, 7),
		];

		geometry.faces[0].materialIndex = 0;
		geometry.faces[1].materialIndex = 0;
		geometry.faces[2].materialIndex = 1;
		geometry.faces[3].materialIndex = 1;
		geometry.faces[4].materialIndex = 2;
		geometry.faces[5].materialIndex = 2;
		geometry.faces[6].materialIndex = 3;
		geometry.faces[7].materialIndex = 3;
		geometry.faces[8].materialIndex = 4;
		geometry.faces[9].materialIndex = 4;
		geometry.faces[10].materialIndex = 5;
		geometry.faces[11].materialIndex = 5;

		let uvs = [];
		uvs.push(new THREE.Vector2(0, 0));
		uvs.push(new THREE.Vector2(1, 0));
		uvs.push(new THREE.Vector2(1, 1));
		uvs.push(new THREE.Vector2(0, 1));

		geometry.faceVertexUvs[0] = [
			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],

			[uvs[0], uvs[3], uvs[2]],
			[uvs[0], uvs[2], uvs[1]],

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],

			[uvs[0], uvs[3], uvs[2]],
			[uvs[0], uvs[2], uvs[1]],

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],
		];

		geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default BoxGeometry;