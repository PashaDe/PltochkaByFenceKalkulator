import * as THREE from 'three';

import Maths from 'classes/Tools/Maths';
import GeometryPoints from '../../tools/GeometryPoints';


class CornerGeometry {
	constructor(width, widthCoup, depth, depthCoup, height, angle) {
		let geometry = new THREE.Geometry();

		geometry.points = GeometryPoints.Corner(width, widthCoup, depth, depthCoup, angle);

		geometry.vertices = [
			new THREE.Vector3(geometry.points.a.x, 0, geometry.points.a.y), // a0
			new THREE.Vector3(geometry.points.b.x, 0, geometry.points.b.y), // b1
			new THREE.Vector3(geometry.points.c.x, 0, geometry.points.c.y), // c2
			new THREE.Vector3(geometry.points.d.x, 0, geometry.points.d.y), // d3
			new THREE.Vector3(geometry.points.e.x, 0, geometry.points.e.y), // e4
			new THREE.Vector3(geometry.points.f.x, 0, geometry.points.f.y), // f5

			new THREE.Vector3(geometry.points.a.x, height, geometry.points.a.y), // a6
			new THREE.Vector3(geometry.points.b.x, height, geometry.points.b.y), // b7
			new THREE.Vector3(geometry.points.c.x, height, geometry.points.c.y), // c8
			new THREE.Vector3(geometry.points.d.x, height, geometry.points.d.y), // d9
			new THREE.Vector3(geometry.points.e.x, height, geometry.points.e.y), // e10
			new THREE.Vector3(geometry.points.f.x, height, geometry.points.f.y), // f11
		];

		geometry.faces = [
			new THREE.Face3(1, 2, 3),
			new THREE.Face3(1, 0, 2),
			new THREE.Face3(3, 4, 5),
			new THREE.Face3(3, 2, 4),

			new THREE.Face3(1, 9, 7),
			new THREE.Face3(1, 3, 9),

			new THREE.Face3(0, 6, 8),
			new THREE.Face3(0, 8, 2),

			new THREE.Face3(3, 11, 9),
			new THREE.Face3(3, 5, 11),

			new THREE.Face3(2, 8, 10),
			new THREE.Face3(2, 10, 4),

			new THREE.Face3(0, 7, 6),
			new THREE.Face3(0, 1, 7),

			new THREE.Face3(5, 10, 11),
			new THREE.Face3(5, 4, 10),

			new THREE.Face3(7, 9, 8),
			new THREE.Face3(7, 8, 6),
			new THREE.Face3(9, 11, 10),
			new THREE.Face3(9, 10, 8),
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
		geometry.faces[12].materialIndex = 6;
		geometry.faces[13].materialIndex = 6;
		geometry.faces[14].materialIndex = 7;
		geometry.faces[15].materialIndex = 7;
		geometry.faces[16].materialIndex = 8;
		geometry.faces[17].materialIndex = 8;
		geometry.faces[18].materialIndex = 9;
		geometry.faces[19].materialIndex = 9;

		let uvs = [];
		uvs.push(new THREE.Vector2(0, 0));
		uvs.push(new THREE.Vector2(1, 0));
		uvs.push(new THREE.Vector2(1, 1));
		uvs.push(new THREE.Vector2(0, 1));

		let ac = Maths.getDistance(geometry.points.a, geometry.points.c);
		let bd = Maths.getDistance(geometry.points.b, geometry.points.d);
		let ce = Maths.getDistance(geometry.points.c, geometry.points.e);
		let df = Maths.getDistance(geometry.points.d, geometry.points.f);

		geometry.faceVertexUvs[0] = [
			[uvs[0], uvs[2], uvs[1]],
			[uvs[0], uvs[3], uvs[2]],
			[uvs[0], uvs[2], uvs[1]],
			[uvs[0], uvs[3], uvs[2]],

			[new THREE.Vector2(0, 0), new THREE.Vector2(bd / width, 1), new THREE.Vector2(0, 1)],
			[new THREE.Vector2(0, 0), new THREE.Vector2(bd / width, 0), new THREE.Vector2(bd / width, 1)],

			[new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(ac / width, 1)],
			[new THREE.Vector2(0, 0), new THREE.Vector2(ac / width, 1), new THREE.Vector2(ac / width, 0)],

			[new THREE.Vector2(1 - df / depth, 0), new THREE.Vector2(1, 1), new THREE.Vector2(1 - df / depth, 1)],
			[new THREE.Vector2(1 - df / depth, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],

			[new THREE.Vector2(1 - ce / depth, 0), new THREE.Vector2(1 - ce / depth, 1), new THREE.Vector2(1, 1)],
			[new THREE.Vector2(1 - ce / depth, 0), new THREE.Vector2(1, 1), new THREE.Vector2(1, 0)],

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],

			[uvs[0], uvs[2], uvs[3]],
			[uvs[0], uvs[1], uvs[2]],

			[new THREE.Vector2(0, 0), new THREE.Vector2(bd / width, 0), new THREE.Vector2(ac / width, 1)],
			[new THREE.Vector2(0, 0), new THREE.Vector2(ac / width, 1), new THREE.Vector2(0, 1)],
			[new THREE.Vector2(1 - df / depth, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
			[new THREE.Vector2(1 - df / depth, 0), new THREE.Vector2(1, 1), new THREE.Vector2(1 - ce / depth, 1)],
		];

		geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;
	}
}


export default CornerGeometry;