import * as THREE from 'three';


class PolesGeometry {
	constructor(width, poleWidth, poleHeight, poleDepth, left = true, right = true, cut) {
		let w1;
		let w2;

		let fi = 0;
		let vi = 0;

		let geometry = new THREE.Geometry();

		let uvs = [];
		uvs.push(new THREE.Vector2(0, 0));
		uvs.push(new THREE.Vector2(1, 0));
		uvs.push(new THREE.Vector2(1, 1));
		uvs.push(new THREE.Vector2(0, 1));


		/* --- SLATS ---------------------------------------------- */

		for (let i = 1; i <= 2; i++) {
			if ((i === 1 && left) || (i === 2 && right)) {
				switch (i) {
					case 1:
						w1 = -width / 2 + cut.left;
						w2 = w1 + poleWidth;
						break;

					case 2:
						w2 = width / 2 - cut.right;
						w1 = w2 - poleWidth;
						break;

					default:
				}

				// vertices
				geometry.vertices.push(new THREE.Vector3(w1, 0, -poleDepth / 2)); // a1
				geometry.vertices.push(new THREE.Vector3(w1, 0, poleDepth / 2)); // b1
				geometry.vertices.push(new THREE.Vector3(w2, 0, poleDepth / 2)); // c1
				geometry.vertices.push(new THREE.Vector3(w2, 0, -poleDepth / 2)); // d1

				geometry.vertices.push(new THREE.Vector3(w1, poleHeight, -poleDepth / 2)); // a2
				geometry.vertices.push(new THREE.Vector3(w1, poleHeight, poleDepth / 2)); // b2
				geometry.vertices.push(new THREE.Vector3(w2, poleHeight, poleDepth / 2)); // c2
				geometry.vertices.push(new THREE.Vector3(w2, poleHeight, -poleDepth / 2)); // d2

				// faces
				geometry.faces.push(new THREE.Face3(vi + 0, vi + 2, vi + 1));
				geometry.faces.push(new THREE.Face3(vi + 0, vi + 3, vi + 2));

				geometry.faces.push(new THREE.Face3(vi + 5, vi + 7, vi + 4));
				geometry.faces.push(new THREE.Face3(vi + 5, vi + 6, vi + 7));

				geometry.faces.push(new THREE.Face3(vi + 3, vi + 4, vi + 7));
				geometry.faces.push(new THREE.Face3(vi + 3, vi + 0, vi + 4));

				geometry.faces.push(new THREE.Face3(vi + 1, vi + 6, vi + 5));
				geometry.faces.push(new THREE.Face3(vi + 1, vi + 2, vi + 6));

				geometry.faces.push(new THREE.Face3(vi + 0, vi + 5, vi + 4));
				geometry.faces.push(new THREE.Face3(vi + 0, vi + 1, vi + 5));

				geometry.faces.push(new THREE.Face3(vi + 2, vi + 7, vi + 6));
				geometry.faces.push(new THREE.Face3(vi + 2, vi + 3, vi + 7));

				vi += 8;

				// faces materials index
				geometry.faces[fi++].materialIndex = 4;
				geometry.faces[fi++].materialIndex = 4;
				geometry.faces[fi++].materialIndex = 5;
				geometry.faces[fi++].materialIndex = 5;
				geometry.faces[fi++].materialIndex = 0;
				geometry.faces[fi++].materialIndex = 0;
				geometry.faces[fi++].materialIndex = 1;
				geometry.faces[fi++].materialIndex = 1;
				geometry.faces[fi++].materialIndex = 4;
				geometry.faces[fi++].materialIndex = 4;
				geometry.faces[fi++].materialIndex = 5;
				geometry.faces[fi++].materialIndex = 5;

				// faces vertex
				geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
				geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);

				geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
				geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);

				geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
				geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);

				geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
				geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);

				geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
				geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);

				geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
				geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);
			}
		}

		geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default PolesGeometry;