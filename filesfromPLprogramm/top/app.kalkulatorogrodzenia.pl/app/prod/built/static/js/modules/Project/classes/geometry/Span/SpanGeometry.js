import * as THREE from 'three';

import Helper from 'classes/Tools/Helper';
import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';


class SpanGeometry {
	constructor(direction, sizes, slats, panels, queue = null, cut1 = 0, cut2 = 0, data = null) {
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

		let wx1;
		let wx2;
		let hx1;
		let hx2;
		let dx1;
		let dx2;


		/* --- SLATS ---------------------------------------------- */

		hx1 = 0;
		hx2 = sizes.height;

		dx1 = -slats.depth / 2;
		dx2 = slats.depth / 2;

		for (let x = 1; x <= 2; x++) {
			switch (direction) {
				case 'left':
					switch (x) {
						case 1:
							wx1 = 0 + cut1;
							wx2 = wx1 + slats.width;
							break;

						case 2:
							wx2 = sizes.width - cut2;
							wx1 = wx2 - slats.width;
							break;

						default:
					}
					break;

				case 'center':
					switch (x) {
						case 1:
							wx1 = -sizes.width / 2 + cut1;
							wx2 = wx1 + slats.width;
							break;

						case 2:
							wx2 = sizes.width / 2 - cut2;
							wx1 = wx2 - slats.width;
							break;

						default:
					}
					break;

				case 'right':
					switch (x) {
						case 1:
							wx1 = -sizes.width + cut1;
							wx2 = wx1 + slats.width;
							break;

						case 2:
							wx2 = 0 - cut2;
							wx1 = wx2 - slats.width;
							break;

						default:
					}
					break;

				default:
			}

			this.rect(wx1, wx2, hx1, hx2, dx1, dx2);
		}


		/* --- FRAME ---------------------------------------------- */

		switch (direction) {
			case 'left':
				wx1 = 0 + cut1 + slats.width;
				wx2 = sizes.width - cut2 - slats.width;
				break;

			case 'center':
				wx1 = -sizes.width / 2 + cut1 + slats.width;
				wx2 = sizes.width / 2 - cut2 - slats.width;
				break;

			case 'right':
				wx1 = -sizes.width + cut1 + slats.width;
				wx2 = 0 - cut2 - slats.width;
				break;

			default:
		}

		if (slats.height) {
			for (let x = 1; x <= 2; x++) {
				switch (x) {
					// top
					case 1:
						hx2 = sizes.height;
						hx1 = hx2 - slats.height;
						break;

					// bottom
					case 2:
						hx1 = 0;
						hx2 = hx1 + slats.height;
						break;

					default:
				}

				this.rect(wx1, wx2, hx1, hx2, dx1, dx2);
			}
		}


		/* --- PANELS --------------------------------------------- */

		let spaceCalcByAngle;
		let panelsCount;

		if (data) {
			spaceCalcByAngle = data.structure;
			panelsCount = data.panels;
		} else {
			spaceCalcByAngle = panels.space - (Math.sin(panels.angle * Math.PI / 180) * 0.0012);
			const panelsInfo = this.getPanelsInfo(panels);
			panelsCount = Math.floor((this.D + sizes.height - Helper.aN(slats.height) * 2 - slats.space + spaceCalcByAngle) / (panelsInfo.height + spaceCalcByAngle)) * panelsInfo.multiplier;
		}

		let r1;
		let r2;
		let r3;
		let r4;

		hx1 = Helper.aN(slats.height) + slats.space;
		dx1 = 0;

		for (let i = 0; i < panelsCount; i++) {
			const k = i % panels.height.length;
			const h = Objects.isArray(panels.height) ? panels.height[k] : panels.height;
			const height = this.getHeightPosition(i, k, slats, panels, spaceCalcByAngle, this.D);

			r1 = Maths.rotatePointDegrees({ x: -h / 2, y: 0, z: panels.depth / 2 }, panels.angle);
			r2 = Maths.rotatePointDegrees({ x: -h / 2, y: 0, z: -panels.depth / 2 }, panels.angle);
			r3 = Maths.rotatePointDegrees({ x: h / 2, y: 0, z: panels.depth / 2 }, panels.angle);
			r4 = Maths.rotatePointDegrees({ x: h / 2, y: 0, z: -panels.depth / 2 }, panels.angle);

			const q = (queue) ? queue[i % queue.length] : 0;

			hx2 = hx1 + height;

			// vertices
			this.geometry.vertices.push(new THREE.Vector3(wx1, hx2 + r1.x, dx1 - r1.z + q));
			this.geometry.vertices.push(new THREE.Vector3(wx1, hx2 + r2.x, dx1 - r2.z + q));
			this.geometry.vertices.push(new THREE.Vector3(wx2, hx2 + r2.x, dx1 - r2.z + q));
			this.geometry.vertices.push(new THREE.Vector3(wx2, hx2 + r1.x, dx1 - r1.z + q));

			this.geometry.vertices.push(new THREE.Vector3(wx1, hx2 + r3.x, dx1 - r3.z + q));
			this.geometry.vertices.push(new THREE.Vector3(wx1, hx2 + r4.x, dx1 - r4.z + q));
			this.geometry.vertices.push(new THREE.Vector3(wx2, hx2 + r4.x, dx1 - r4.z + q));
			this.geometry.vertices.push(new THREE.Vector3(wx2, hx2 + r3.x, dx1 - r3.z + q));

			this.fv();
		}

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

	getPanelsInfo = (panels) => {
		if (Objects.isArray(panels.height)) {
			let height = 0;

			for (let i = 0; i < panels.height.length; i++) {
				height += panels.height[i];
			}

			return { height: height + (panels.height.length - 1) * panels.space, multiplier: panels.height.length };
		}

		return { height: panels.height, multiplier: 1 };
	}

	getHeightPosition = (i, k, slats, panels, spaceCalcByAngle, D) => {
		let result = 0;

		// start
		result += slats.space + D;

		if (Objects.isArray(panels.height)) {
			for (let n = 1; n <= i; n++) {
				const pk = (n - 1) % panels.height.length;
				const ph = panels.height[pk];

				result += ph + spaceCalcByAngle;
			}

			result += panels.height[k] / 2;
		} else {
			result += i * (panels.height + spaceCalcByAngle) + panels.height / 2;
		}

		return result;
	}
}


export default SpanGeometry;