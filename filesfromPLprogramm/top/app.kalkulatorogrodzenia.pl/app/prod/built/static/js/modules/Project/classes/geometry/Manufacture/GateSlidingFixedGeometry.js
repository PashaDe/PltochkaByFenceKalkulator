import * as THREE from 'three';


class GateSlidingFixedGeometry {
	constructor(width, height, data, outRotation, direction) {
		this.geometry = new THREE.Geometry();

		this.D = 0.0001;
		this.vi = 0;
		this.fi = 0;
		this.uvs = [
			new THREE.Vector2(0, 0),
			new THREE.Vector2(0, 1),
			new THREE.Vector2(1, 0),
			new THREE.Vector2(1, 1),
		];

		let w1 = -width / 2 - 0.005;
		let w2 = width / 2 + 0.005;

		let h = height + data.support.space + data.support.top.height;
		let d = (data.inside + data.support.depth / 2) * outRotation * direction;

		let wx1;
		let wx2;
		let hx1;
		let hx2;
		let dx1;
		let dx2;


		/* --- POLE ----------------------------------------------- */

		wx1 = w2;
		wx2 = w2 + data.support.pole.width;

		hx1 = 0;
		hx2 = height;

		dx1 = d - data.support.pole.depth / 2;
		dx2 = d + data.support.pole.depth / 2;

		this.rect(wx1, wx2, hx1, hx2, dx1, dx2);


		/* --- SUPPORT -------------------------------------------- */

		wx1 = w1 - data.support.pole.width;
		wx2 = w1;

		// poles
		hx1 = 0;
		hx2 = h - data.support.top.height;

		for (let x = 1; x <= 2; x++) {
			switch (x) {
				case 1:
					dx1 = d - data.support.depth / 2;
					break;

				case 2:
					dx1 = d + data.support.depth / 2 - data.support.pole.depth;
					break;

				default:
			}

			dx2 = dx1 + data.support.pole.depth;

			this.rect(wx1, wx2, hx1, hx2, dx1, dx2);
		}

		// top
		hx1 = h - data.support.top.height;
		hx2 = h;

		dx1 = d - data.support.depth / 2;
		dx2 = d + data.support.depth / 2;

		this.rect(wx1, wx2, hx1, hx2, dx1, dx2);

		// bottom
		wx1 = w1 + data.support.pole.width - data.support.bottom.width;
		wx2 = wx1 + data.support.bottom.width;

		hx1 = 0;
		hx2 = data.support.bottom.height;

		dx1 = d - data.support.depth / 2;
		dx2 = d + data.support.depth / 2;

		this.rect(wx1, wx2, hx1, hx2, dx1, dx2);


		/* --- ROLL ----------------------------------------------- */

		const size = { x: 0.04, y: 0.01, z: 0.20, roll: 0.02 };

		// bottom
		wx1 = w1 - data.extra;
		wx2 = wx1 + size.x;

		dx1 = d - size.z / 2;
		dx2 = d + size.z / 2;

		this.rect(wx1, wx2, 0, size.y, dx1, dx2);

		// roll
		wx1 = w1 - data.extra + 0.005;
		wx2 = wx1 + size.x - 0.005 * 2;

		dx1 = d - size.roll / 2;
		dx2 = d + size.roll / 2;

		this.rect(wx1, wx2, size.y, data.space, dx1, dx2, 1);

		this.geometry.computeFaceNormals();
		// this.geometry.computeVertexNormals();

		return this.geometry;
	}

	rect = (w1, w2, h1, h2, d1, d2, material = 0) => {
		this.geometry.vertices.push(new THREE.Vector3(w1, h1, d1));
		this.geometry.vertices.push(new THREE.Vector3(w1, h1, d2));
		this.geometry.vertices.push(new THREE.Vector3(w2, h1, d2));
		this.geometry.vertices.push(new THREE.Vector3(w2, h1, d1));

		this.geometry.vertices.push(new THREE.Vector3(w1, h2, d1));
		this.geometry.vertices.push(new THREE.Vector3(w1, h2, d2));
		this.geometry.vertices.push(new THREE.Vector3(w2, h2, d2));
		this.geometry.vertices.push(new THREE.Vector3(w2, h2, d1));

		this.fv(material);
	}

	fv = (material = 0) => {
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

		// faces materials index
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
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[3], this.uvs[1]]);
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[2], this.uvs[3]]);

		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[3], this.uvs[1]]);
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[2], this.uvs[3]]);

		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[3], this.uvs[1]]);
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[2], this.uvs[3]]);

		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[3], this.uvs[1]]);
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[2], this.uvs[3]]);

		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[3], this.uvs[1]]);
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[2], this.uvs[3]]);

		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[3], this.uvs[1]]);
		this.geometry.faceVertexUvs[0].push([this.uvs[0], this.uvs[2], this.uvs[3]]);
	}
}


export default GateSlidingFixedGeometry;