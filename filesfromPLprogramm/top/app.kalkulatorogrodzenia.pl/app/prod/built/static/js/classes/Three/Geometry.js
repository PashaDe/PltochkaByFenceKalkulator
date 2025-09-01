import * as THREE from 'three';

import Maths from 'classes/Tools/Maths';


class Geometry {
	constructor(unwrap = {}) {
		this.unwrap = { ...{ type: 'fill', unit: { x: 1, y: 1 } }, ...unwrap };

		this.D = 0.0001;
		this.vi = 0;
		this.fi = 0;

		this.geometry = new THREE.Geometry();
	}

	rect = (w1, w2, h1, h2, d1, d2, options = {}, material = 0, unwrap = {}) => {
		// vertices
		if (!options.rotationX && !options.rotationY) {
			this.geometry.vertices.push(new THREE.Vector3(w1, h1, d1));
			this.geometry.vertices.push(new THREE.Vector3(w1, h1, d2));
			this.geometry.vertices.push(new THREE.Vector3(w2, h1, d2));
			this.geometry.vertices.push(new THREE.Vector3(w2, h1, d1));

			this.geometry.vertices.push(new THREE.Vector3(w1, h2, d1));
			this.geometry.vertices.push(new THREE.Vector3(w1, h2, d2));
			this.geometry.vertices.push(new THREE.Vector3(w2, h2, d2));
			this.geometry.vertices.push(new THREE.Vector3(w2, h2, d1));
		}

		if (options.rotationX) {
			const width = w2 - w1;
			const depth = d2 - d1;

			const diff1 = Maths.rotatePointDegrees({ x: -width / 2, y: 0, z: depth / 2 }, options.rotationX);
			const diff2 = Maths.rotatePointDegrees({ x: -width / 2, y: 0, z: -depth / 2 }, options.rotationX);
			const diff3 = Maths.rotatePointDegrees({ x: width / 2, y: 0, z: -depth / 2 }, options.rotationX);
			const diff4 = Maths.rotatePointDegrees({ x: width / 2, y: 0, z: depth / 2 }, options.rotationX);

			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff1.x, h1, d1 + depth / 2 - diff1.z));
			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff2.x, h1, d1 + depth / 2 - diff2.z));
			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff3.x, h1, d1 + depth / 2 - diff3.z));
			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff4.x, h1, d1 + depth / 2 - diff4.z));

			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff1.x, h2, d1 + depth / 2 - diff1.z));
			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff2.x, h2, d1 + depth / 2 - diff2.z));
			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff3.x, h2, d1 + depth / 2 - diff3.z));
			this.geometry.vertices.push(new THREE.Vector3(w1 + width / 2 + diff4.x, h2, d1 + depth / 2 - diff4.z));
		}

		if (options.rotationY) {
			const height = h2 - h1;
			const depth = d2 - d1;

			const diff1 = Maths.rotatePointDegrees({ x: -height / 2, y: 0, z: depth / 2 }, options.rotationY);
			const diff2 = Maths.rotatePointDegrees({ x: -height / 2, y: 0, z: -depth / 2 }, options.rotationY);
			const diff3 = Maths.rotatePointDegrees({ x: height / 2, y: 0, z: depth / 2 }, options.rotationY);
			const diff4 = Maths.rotatePointDegrees({ x: height / 2, y: 0, z: -depth / 2 }, options.rotationY);

			this.geometry.vertices.push(new THREE.Vector3(w1, h1 + height / 2 + diff1.x, d1 + depth / 2 - diff1.z));
			this.geometry.vertices.push(new THREE.Vector3(w1, h1 + height / 2 + diff2.x, d1 + depth / 2 - diff2.z));
			this.geometry.vertices.push(new THREE.Vector3(w2, h1 + height / 2 + diff2.x, d1 + depth / 2 - diff2.z));
			this.geometry.vertices.push(new THREE.Vector3(w2, h1 + height / 2 + diff1.x, d1 + depth / 2 - diff1.z));

			this.geometry.vertices.push(new THREE.Vector3(w1, h1 + height / 2 + diff3.x, d1 + depth / 2 - diff3.z));
			this.geometry.vertices.push(new THREE.Vector3(w1, h1 + height / 2 + diff4.x, d1 + depth / 2 - diff4.z));
			this.geometry.vertices.push(new THREE.Vector3(w2, h1 + height / 2 + diff4.x, d1 + depth / 2 - diff4.z));
			this.geometry.vertices.push(new THREE.Vector3(w2, h1 + height / 2 + diff3.x, d1 + depth / 2 - diff3.z));
		}

		// faces
		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 2, this.vi + 1));
		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 3, this.vi + 2));

		this.geometry.faces.push(new THREE.Face3(this.vi + 5, this.vi + 7, this.vi + 4));
		this.geometry.faces.push(new THREE.Face3(this.vi + 5, this.vi + 6, this.vi + 7));

		this.geometry.faces.push(new THREE.Face3(this.vi + 3, this.vi + 4, this.vi + 7));
		this.geometry.faces.push(new THREE.Face3(this.vi + 3, this.vi + 0, this.vi + 4));

		this.geometry.faces.push(new THREE.Face3(this.vi + 1, this.vi + 6, this.vi + 5));
		this.geometry.faces.push(new THREE.Face3(this.vi + 1, this.vi + 2, this.vi + 6));

		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 5, this.vi + 4));
		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 1, this.vi + 5));

		this.geometry.faces.push(new THREE.Face3(this.vi + 2, this.vi + 7, this.vi + 6));
		this.geometry.faces.push(new THREE.Face3(this.vi + 2, this.vi + 3, this.vi + 7));

		this.vi += 8;

		// faces material index
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 1;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 1;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 0;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 0;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 3;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 3;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 2;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 2;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 4;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 4;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 5;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 5;

		// faces vertex
		switch (unwrap.type || this.unwrap.type) {
			case 'fill':
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));
				break;

			case 'wrap':
				this.vertices = [w1, w2, h1, h2, d1, d2];
				this.unit = unwrap.unit || this.unwrap.unit;

				this.geometry.faceVertexUvs[0].push(this.wrap(1));
				this.geometry.faceVertexUvs[0].push(this.wrap(2));

				this.geometry.faceVertexUvs[0].push(this.wrap(3));
				this.geometry.faceVertexUvs[0].push(this.wrap(4));

				this.geometry.faceVertexUvs[0].push(this.wrap(5));
				this.geometry.faceVertexUvs[0].push(this.wrap(6));

				this.geometry.faceVertexUvs[0].push(this.wrap(7));
				this.geometry.faceVertexUvs[0].push(this.wrap(8));

				this.geometry.faceVertexUvs[0].push(this.wrap(9));
				this.geometry.faceVertexUvs[0].push(this.wrap(10));

				this.geometry.faceVertexUvs[0].push(this.wrap(11));
				this.geometry.faceVertexUvs[0].push(this.wrap(12));
				break;

			default:
		}
	}

	quad = (vertices, options = {}, material = 0, unwrap = {}) => {
		// vertices
		this.geometry.vertices.push(new THREE.Vector3(vertices[0][0], vertices[0][1], vertices[0][2]));
		this.geometry.vertices.push(new THREE.Vector3(vertices[1][0], vertices[1][1], vertices[1][2]));
		this.geometry.vertices.push(new THREE.Vector3(vertices[2][0], vertices[2][1], vertices[2][2]));
		this.geometry.vertices.push(new THREE.Vector3(vertices[3][0], vertices[3][1], vertices[3][2]));

		this.geometry.vertices.push(new THREE.Vector3(vertices[4][0], vertices[4][1], vertices[4][2]));
		this.geometry.vertices.push(new THREE.Vector3(vertices[5][0], vertices[5][1], vertices[5][2]));
		this.geometry.vertices.push(new THREE.Vector3(vertices[6][0], vertices[6][1], vertices[6][2]));
		this.geometry.vertices.push(new THREE.Vector3(vertices[7][0], vertices[7][1], vertices[7][2]));

		// faces
		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 2, this.vi + 1));
		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 3, this.vi + 2));

		this.geometry.faces.push(new THREE.Face3(this.vi + 5, this.vi + 7, this.vi + 4));
		this.geometry.faces.push(new THREE.Face3(this.vi + 5, this.vi + 6, this.vi + 7));

		this.geometry.faces.push(new THREE.Face3(this.vi + 3, this.vi + 4, this.vi + 7));
		this.geometry.faces.push(new THREE.Face3(this.vi + 3, this.vi + 0, this.vi + 4));

		this.geometry.faces.push(new THREE.Face3(this.vi + 1, this.vi + 6, this.vi + 5));
		this.geometry.faces.push(new THREE.Face3(this.vi + 1, this.vi + 2, this.vi + 6));

		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 5, this.vi + 4));
		this.geometry.faces.push(new THREE.Face3(this.vi + 0, this.vi + 1, this.vi + 5));

		this.geometry.faces.push(new THREE.Face3(this.vi + 2, this.vi + 7, this.vi + 6));
		this.geometry.faces.push(new THREE.Face3(this.vi + 2, this.vi + 3, this.vi + 7));

		this.vi += 8;

		// faces material index
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 1;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 1;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 0;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 0;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 3;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 3;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 2;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 2;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 4;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 4;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 5;
		this.geometry.faces[this.fi++].materialIndex = (material * 6) + 5;

		// faces vertex
		switch (unwrap.type || this.unwrap.type) {
			case 'fill':
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));

				this.geometry.faceVertexUvs[0].push(this.fill('lb', 1));
				this.geometry.faceVertexUvs[0].push(this.fill('lb', 2));
				break;

			default:
		}
	}

	fill = (type, f) => {
		switch (type) {
			case 'lb':
				switch (f) {
					case 1:
						return [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];

					case 2:
						return [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];

					default:
				}
				break;

			default:
		}

		return [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)];
	}

	wrap = (f) => {
		if (f >= 1 && f <= 12) {
			return [new THREE.Vector2(this.vector(f, 1), this.vector(f, 2)), new THREE.Vector2(this.vector(f, 3), this.vector(f, 4)), new THREE.Vector2(this.vector(f, 5), this.vector(f, 6))];
		}

		return [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)];
	}

	vector = (f, v) => {
		const vector = `${f}_${v}`;

		const difference = {
			x: this.args.open || 0,
			y: 0,
			z: 0,
		};

		const w = this.vertices[1] - this.vertices[0];
		const h = this.vertices[3] - this.vertices[2];
		const d = this.vertices[5] - this.vertices[4];

		let offset = 0;
		let length = 0;

		switch (vector) {
			case '1_1':
				offset = this.vertices[0] - difference.x;
				break;

			case '1_2':
				offset = this.vertices[2] - difference.y + d;
				break;

			case '1_3':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '1_4':
				offset = this.vertices[2] - difference.y + d;
				length = -d;
				break;

			case '1_5':
				offset = this.vertices[0] - difference.x;
				break;

			case '1_6':
				offset = this.vertices[2] - difference.y + d;
				length = -d;
				break;

			case '2_1':
				offset = this.vertices[0] - difference.x;
				break;

			case '2_2':
				offset = this.vertices[2] - difference.y + d;
				break;

			case '2_3':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '2_4':
				offset = this.vertices[2] - difference.y + d;
				break;

			case '2_5':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '2_6':
				offset = this.vertices[2] - difference.y + d;
				length = -d;
				break;

			case '3_1':
				offset = this.vertices[0] - difference.x;
				break;

			case '3_2':
				offset = this.vertices[2] - difference.y + h;
				break;

			case '3_3':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '3_4':
				offset = this.vertices[2] - difference.y + h;
				length = d;
				break;

			case '3_5':
				offset = this.vertices[0] - difference.x;
				break;

			case '3_6':
				offset = this.vertices[2] - difference.y + h;
				length = d;
				break;

			case '4_1':
				offset = this.vertices[0] - difference.x;
				break;

			case '4_2':
				offset = this.vertices[2] - difference.y + h;
				break;

			case '4_3':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '4_4':
				offset = this.vertices[2] - difference.y + h;
				break;

			case '4_5':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '4_6':
				offset = this.vertices[2] - difference.y + h;
				length = d;
				break;

			case '5_1':
				offset = this.vertices[1] - difference.x;
				break;

			case '5_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '5_3':
				offset = this.vertices[1] - difference.x;
				length = -w;
				break;

			case '5_4':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '5_5':
				offset = this.vertices[1] - difference.x;
				break;

			case '5_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '6_1':
				offset = this.vertices[1] - difference.x;
				break;

			case '6_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '6_3':
				offset = this.vertices[1] - difference.x;
				length = -w;
				break;

			case '6_4':
				offset = this.vertices[2] - difference.y;
				break;

			case '6_5':
				offset = this.vertices[1] - difference.x;
				length = -w;
				break;

			case '6_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '7_1':
				offset = this.vertices[0] - difference.x;
				break;

			case '7_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '7_3':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '7_4':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '7_5':
				offset = this.vertices[0] - difference.x;
				break;

			case '7_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '8_1':
				offset = this.vertices[0] - difference.x;
				break;

			case '8_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '8_3':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '8_4':
				offset = this.vertices[2] - difference.y;
				break;

			case '8_5':
				offset = this.vertices[0] - difference.x;
				length = w;
				break;

			case '8_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '9_1':
				offset = this.vertices[4] - difference.z;
				break;

			case '9_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '9_3':
				offset = this.vertices[4] - difference.z;
				length = -d;
				break;

			case '9_4':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '9_5':
				offset = this.vertices[4] - difference.z;
				break;

			case '9_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '10_1':
				offset = this.vertices[4] - difference.z;
				break;

			case '10_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '10_3':
				offset = this.vertices[4] - difference.z;
				length = -d;
				break;

			case '10_4':
				offset = this.vertices[2] - difference.y;
				break;

			case '10_5':
				offset = this.vertices[4] - difference.z;
				length = -d;
				break;

			case '10_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '11_1':
				offset = this.vertices[0] - difference.x + w;
				break;

			case '11_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '11_3':
				offset = this.vertices[0] - difference.x + w;
				length = d;
				break;

			case '11_4':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '11_5':
				offset = this.vertices[0] - difference.x + w;
				break;

			case '11_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			case '12_1':
				offset = this.vertices[0] - difference.x + w;
				break;

			case '12_2':
				offset = this.vertices[2] - difference.y;
				break;

			case '12_3':
				offset = this.vertices[0] - difference.x + w;
				length = d;
				break;

			case '12_4':
				offset = this.vertices[2] - difference.y;
				break;

			case '12_5':
				offset = this.vertices[0] - difference.x + w;
				length = d;
				break;

			case '12_6':
				offset = this.vertices[2] - difference.y;
				length = h;
				break;

			default:
		}

		const unit = (v % 2 === 1) ? this.unit.x : this.unit.y;

		return offset / unit + length / unit;
	}
}


export default Geometry;