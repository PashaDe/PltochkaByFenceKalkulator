import * as THREE from 'three';


class Peak2Geometry {
	constructor(bottomWidth, bottomHeight, topHeight, heightTop, heightBottom) {
		let geometry = new THREE.Geometry();

		geometry.vertices = [
			new THREE.Vector3(-bottomWidth / 2, 0, -bottomHeight / 2), // a0
			new THREE.Vector3(-bottomWidth / 2, 0, bottomHeight / 2), // b1
			new THREE.Vector3(bottomWidth / 2, 0, bottomHeight / 2), // c2
			new THREE.Vector3(bottomWidth / 2, 0, -bottomHeight / 2), // d3

			new THREE.Vector3(-bottomWidth / 2, heightBottom, -bottomHeight / 2), // a4
			new THREE.Vector3(-bottomWidth / 2, heightBottom, bottomHeight / 2), // b5
			new THREE.Vector3(bottomWidth / 2, heightBottom, bottomHeight / 2), // c6
			new THREE.Vector3(bottomWidth / 2, heightBottom, -bottomHeight / 2), // d7

			new THREE.Vector3(-bottomWidth / 2, heightTop + heightBottom, -topHeight / 2), // a8
			new THREE.Vector3(-bottomWidth / 2, heightTop + heightBottom, topHeight / 2), // b9
			new THREE.Vector3(bottomWidth / 2, heightTop + heightBottom, topHeight / 2), // c10
			new THREE.Vector3(bottomWidth / 2, heightTop + heightBottom, -topHeight / 2), // d11
		];

		geometry.faces = [
			new THREE.Face3(5, 8, 4),
			new THREE.Face3(0, 0, 0),

			new THREE.Face3(6, 7, 11),
			new THREE.Face3(0, 0, 0),

			new THREE.Face3(4, 8, 11),
			new THREE.Face3(4, 11, 7),

			new THREE.Face3(5, 10, 9),
			new THREE.Face3(5, 6, 10),

			new THREE.Face3(1, 5, 4),
			new THREE.Face3(1, 4, 0),

			new THREE.Face3(2, 7, 6),
			new THREE.Face3(2, 3, 7),

			new THREE.Face3(0, 4, 7),
			new THREE.Face3(0, 7, 3),

			new THREE.Face3(1, 6, 5),
			new THREE.Face3(1, 2, 6),

			new THREE.Face3(0, 2, 1),
			new THREE.Face3(0, 3, 2),
		];

		geometry.faces[0].materialIndex = 7;
		// geometry.faces[1].materialIndex = 7;
		geometry.faces[2].materialIndex = 6;
		// geometry.faces[3].materialIndex = 6;
		geometry.faces[4].materialIndex = 5;
		geometry.faces[5].materialIndex = 5;
		geometry.faces[6].materialIndex = 4;
		geometry.faces[7].materialIndex = 4;
		geometry.faces[8].materialIndex = 3;
		geometry.faces[9].materialIndex = 3;
		geometry.faces[10].materialIndex = 2;
		geometry.faces[11].materialIndex = 2;
		geometry.faces[12].materialIndex = 1;
		geometry.faces[13].materialIndex = 1;
		geometry.faces[14].materialIndex = 0;
		geometry.faces[15].materialIndex = 0;
		geometry.faces[16].materialIndex = 9;
		geometry.faces[17].materialIndex = 9;

		let uvs = [];
		uvs.push(new THREE.Vector2(0, 0));
		uvs.push(new THREE.Vector2(1, 0));
		uvs.push(new THREE.Vector2(1, 1));
		uvs.push(new THREE.Vector2(0, 1));

		geometry.faceVertexUvs[0] = [
			[uvs[0], new THREE.Vector2(0.5, 1), new THREE.Vector2(1, 0)],
			[uvs[0], uvs[0], uvs[0]],

			[uvs[0], new THREE.Vector2(1, 0), new THREE.Vector2(0.5, 1)],
			[uvs[0], uvs[0], uvs[0]],

			[uvs[0], uvs[3], uvs[2]],
			[uvs[0], uvs[2], uvs[1]],

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

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],
		];

		geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default Peak2Geometry;