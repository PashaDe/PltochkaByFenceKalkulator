import * as THREE from 'three';

import GeometryPoints from '../../tools/GeometryPoints';


class ParallelogramCutGeometry {
	constructor(width, height, depth, indent1, indent2, cut1, cut2, fix = { a: 0, b: 0, c: 0, d: 0 }) {
		let geometry = new THREE.Geometry();

		geometry.points = GeometryPoints.ParallelogramCut(width, depth, indent1, indent2, cut1, cut2, fix);

		geometry.vertices = [
			new THREE.Vector3(geometry.points.a.x, 0, geometry.points.a.y), // a0
			new THREE.Vector3(geometry.points.b.x, 0, geometry.points.b.y), // b1
			new THREE.Vector3(geometry.points.c.x, 0, geometry.points.c.y), // c2
			new THREE.Vector3(geometry.points.d.x, 0, geometry.points.d.y), // d3

			new THREE.Vector3(geometry.points.a.x, height, geometry.points.a.y), // a4
			new THREE.Vector3(geometry.points.b.x, height, geometry.points.b.y), // b5
			new THREE.Vector3(geometry.points.c.x, height, geometry.points.c.y), // c6
			new THREE.Vector3(geometry.points.d.x, height, geometry.points.d.y), // d7
		];

		geometry.faces = [
			new THREE.Face3(1, 0, 3),
			new THREE.Face3(1, 3, 2),

			new THREE.Face3(1, 6, 5),
			new THREE.Face3(1, 2, 6),

			new THREE.Face3(0, 4, 7),
			new THREE.Face3(0, 7, 3),

			new THREE.Face3(0, 5, 4),
			new THREE.Face3(0, 1, 5),

			new THREE.Face3(3, 7, 6),
			new THREE.Face3(3, 6, 2),

			new THREE.Face3(5, 7, 4),
			new THREE.Face3(5, 6, 7),
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
			[new THREE.Vector2(geometry.points.ib / width, 0), new THREE.Vector2(geometry.points.ia / width, 1), new THREE.Vector2(1 - geometry.points.id / width, 1)],
			[new THREE.Vector2(geometry.points.ib / width, 0), new THREE.Vector2(1 - geometry.points.id / width, 1), new THREE.Vector2(1 - geometry.points.ic / width, 0)],

			[new THREE.Vector2(geometry.points.ib / width, 0), new THREE.Vector2(1 - geometry.points.ic / width, 1), new THREE.Vector2(geometry.points.ib / width, 1)],
			[new THREE.Vector2(geometry.points.ib / width, 0), new THREE.Vector2(1 - geometry.points.ic / width, 0), new THREE.Vector2(1 - geometry.points.ic / width, 1)],

			[new THREE.Vector2(geometry.points.ia / width, 0), new THREE.Vector2(geometry.points.ia / width, 1), new THREE.Vector2(1 - geometry.points.id / width, 1)],
			[new THREE.Vector2(geometry.points.ia / width, 0), new THREE.Vector2(1 - geometry.points.id / width, 1), new THREE.Vector2(1 - geometry.points.id / width, 0)],

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],

			[uvs[0], uvs[3], uvs[2]],
			[uvs[0], uvs[2], uvs[1]],

			[new THREE.Vector2(geometry.points.ib / width, 0), new THREE.Vector2(1 - geometry.points.id / width, 1), new THREE.Vector2(geometry.points.ia / width, 1)],
			[new THREE.Vector2(geometry.points.ib / width, 0), new THREE.Vector2(1 - geometry.points.ic / width, 0), new THREE.Vector2(1 - geometry.points.id / width, 1)],
		];

		geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default ParallelogramCutGeometry;