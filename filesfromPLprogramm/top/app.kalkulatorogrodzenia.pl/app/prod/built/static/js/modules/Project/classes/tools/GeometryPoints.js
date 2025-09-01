import Maths from 'classes/Tools/Maths';


class GeometryPoints {
	static Corner(width, widthCoup, depth, depthCoup, angle) {
		angle %= 360;
		if (angle <= 0) angle += 360;

		let a = { x: -width, y: -widthCoup / 2 };
		let b = { x: -width, y: widthCoup / 2 };
		let c = { x: 0, y: -widthCoup / 2 };
		let d = { x: 0, y: widthCoup / 2 };
		let e = { x: depth, y: -depthCoup / 2 };
		let f = { x: depth, y: depthCoup / 2 };

		let pointVertex = null;
		let point = null;
		let ee = null;
		let ff = null;

		if (angle > 0 && angle <= 180) {
			pointVertex = 'd';
			point = d;

			c = { x: -widthCoup * (1 / Math.tan(angle / 2 * Math.PI / 180)), y: -widthCoup / 2 };
		}

		if (angle > 180 && angle <= 360) {
			pointVertex = 'c';
			point = c;

			d = { x: widthCoup * (1 / Math.tan(angle / 2 * Math.PI / 180)), y: widthCoup / 2 };
		}

		ee = { x: e.x - point.x, y: 0, z: e.y - point.y };
		ee = Maths.rotatePointDegrees({ x: ee.x, y: ee.y, z: ee.z }, angle);
		e = { x: point.x - ee.x, y: point.y - ee.z };

		ff = { x: f.x - point.x, y: 0, z: f.y - point.y };
		ff = Maths.rotatePointDegrees({ x: ff.x, y: ff.y, z: ff.z }, angle);
		f = { x: point.x - ff.x, y: point.y - ff.z };

		let r = Maths.getCenter({ x: c.x, y: 0, z: c.y }, { x: d.x, y: 0, z: d.y });

		a.x -= r.x;
		b.x -= r.x;
		c.x -= r.x;
		d.x -= r.x;
		e.x -= r.x;
		f.x -= r.x;

		let mr = Maths.rotatePointDegrees({ x: -depth, y: 0, z: 0 }, angle);
		let m1 = (pointVertex === 'c') ? { x: c.x, y: c.y + widthCoup } : { x: d.x, y: d.y - widthCoup };
		let m2 = (pointVertex === 'c') ? { x: f.x - mr.x, y: f.y - mr.z } : { x: e.x - mr.x, y: e.y - mr.z };

		return {
			a,
			b,
			c,
			d,
			e,
			f,

			m1,
			m2,

			pointVertex,
			point: (pointVertex === 'c') ? { x: c.x, y: c.y } : { x: d.x, y: d.y },

			r: { x: r.x, y: r.z },

			status: Maths.getDistance(c, d) <= 1,
		};
	}

	static Peak2Corner(width, widthCoup, depth, depthCoup, peakWidthCoup, peakDepthCoup, angle) {
		angle %= 360;
		if (angle <= 0) angle += 360;

		let a = { x: -width, y: -widthCoup / 2 };
		let b = { x: -width, y: widthCoup / 2 };
		let c = { x: 0, y: -widthCoup / 2 };
		let d = { x: 0, y: widthCoup / 2 };
		let e = { x: depth, y: -depthCoup / 2 };
		let f = { x: depth, y: depthCoup / 2 };

		let pointVertex = null;
		let point = null;
		let ee = null;
		let ff = null;

		if (angle > 0 && angle <= 180) {
			pointVertex = 'd';
			point = d;

			c = { x: -widthCoup * (1 / Math.tan(angle / 2 * Math.PI / 180)), y: -widthCoup / 2 };
		}

		if (angle > 180 && angle <= 360) {
			pointVertex = 'c';
			point = c;

			d = { x: widthCoup * (1 / Math.tan(angle / 2 * Math.PI / 180)), y: widthCoup / 2 };
		}

		ee = { x: e.x - point.x, y: 0, z: e.y - point.y };
		ee = Maths.rotatePointDegrees({ x: ee.x, y: ee.y, z: ee.z }, angle);
		e = { x: point.x - ee.x, y: point.y - ee.z };

		ff = { x: f.x - point.x, y: 0, z: f.y - point.y };
		ff = Maths.rotatePointDegrees({ x: ff.x, y: ff.y, z: ff.z }, angle);
		f = { x: point.x - ff.x, y: point.y - ff.z };

		let a1 = { x: -width, y: -peakWidthCoup / 2 };
		let b1 = { x: -width, y: peakWidthCoup / 2 };
		let c1 = { x: ((depthCoup - peakDepthCoup) / 2 * (1 / Math.tan(angle / 2 * Math.PI / 180))), y: -peakWidthCoup / 2 };
		let d1 = { x: -((depthCoup - peakDepthCoup) / 2 * (1 / Math.tan(angle / 2 * Math.PI / 180))), y: peakWidthCoup / 2 };
		let e1 = { x: depth, y: -peakDepthCoup / 2 };
		let f1 = { x: depth, y: peakDepthCoup / 2 };

		if (angle > 0 && angle <= 180) {
			c1 = { x: -(widthCoup - (widthCoup - peakWidthCoup) / 2) * (1 / Math.tan(angle / 2 * Math.PI / 180)), y: -peakWidthCoup / 2 };
		}

		if (angle > 180 && angle <= 360) {
			d1 = { x: (widthCoup - (widthCoup - peakWidthCoup) / 2) * (1 / Math.tan(angle / 2 * Math.PI / 180)), y: peakWidthCoup / 2 };
		}

		ee = { x: e1.x - point.x, y: 0, z: e1.y - point.y };
		ee = Maths.rotatePointDegrees({ x: ee.x, y: ee.y, z: ee.z }, angle);
		e1 = { x: point.x - ee.x, y: point.y - ee.z };

		ff = { x: f1.x - point.x, y: 0, z: f1.y - point.y };
		ff = Maths.rotatePointDegrees({ x: ff.x, y: ff.y, z: ff.z }, angle);
		f1 = { x: point.x - ff.x, y: point.y - ff.z };

		let r = Maths.getCenter({ x: c.x, y: 0, z: c.y }, { x: d.x, y: 0, z: d.y });

		a.x -= r.x;
		b.x -= r.x;
		c.x -= r.x;
		d.x -= r.x;
		e.x -= r.x;
		f.x -= r.x;

		a1.x -= r.x;
		b1.x -= r.x;
		c1.x -= r.x;
		d1.x -= r.x;
		e1.x -= r.x;
		f1.x -= r.x;

		return {
			a,
			b,
			c,
			d,
			e,
			f,

			a1,
			b1,
			c1,
			d1,
			e1,
			f1,

			pointVertex,
			point: (pointVertex === 'c') ? { x: c.x, y: c.y } : { x: d.x, y: d.y },
			point1: (pointVertex === 'c') ? { x: c1.x, y: c1.y } : { x: d1.x, y: d1.y },

			r: { x: r.x, y: r.z },

			status: Maths.getDistance(c, d) <= 1,
		};
	}

	static ParallelogramCut(width, depth, indent1, indent2, cut1, cut2, fix) {
		let ia = (indent1 >= 0) ? 0 : -indent1;
		let ib = (indent1 > 0) ? indent1 : 0;
		let ic = (indent2 >= 0) ? 0 : -indent2;
		let id = (indent2 > 0) ? indent2 : 0;

		let a = { x: -width / 2 + ia + cut1 + fix.a, y: -depth / 2 };
		let b = { x: -width / 2 + ib + cut1 + fix.b, y: depth / 2 };
		let c = { x: width / 2 - ic - cut2 - fix.c, y: depth / 2 };
		let d = { x: width / 2 - id - cut2 - fix.d, y: -depth / 2 };

		let r = Math.abs(indent1 / 4) - Math.abs(indent2 / 4);

		a.x -= r;
		b.x -= r;
		c.x -= r;
		d.x -= r;

		return {
			a: { x: a.x, y: a.y },
			b: { x: b.x, y: b.y },
			c: { x: c.x, y: c.y },
			d: { x: d.x, y: d.y },

			ia: ia + cut1,
			ib: ib + cut1,
			ic: ic + cut2,
			id: id + cut2,
		};
	}

	static PeakParallelogram(width, depth, peakDepth, indent1, indent2) {
		let x1 = (depth - peakDepth) / 2 / depth;
		let x2 = 1 - (depth - peakDepth) / 2 / depth;

		let ia = (indent1 >= 0) ? 0 : -indent1;
		let ib = (indent1 > 0) ? indent1 : 0;
		let ic = (indent2 >= 0) ? 0 : -indent2;
		let id = (indent2 > 0) ? indent2 : 0;

		let ia1 = ia * x2 + ib * x1;
		let ib1 = ia * x1 + ib * x2;
		let ic1 = ic * x2 + id * x1;
		let id1 = ic * x1 + id * x2;

		let a = { x: -width / 2 + ia, y: -depth / 2 };
		let b = { x: -width / 2 + ib, y: depth / 2 };
		let c = { x: width / 2 - ic, y: depth / 2 };
		let d = { x: width / 2 - id, y: -depth / 2 };

		let a1 = { x: -width / 2 + ia1, y: -peakDepth / 2 };
		let b1 = { x: -width / 2 + ib1, y: peakDepth / 2 };
		let c1 = { x: width / 2 - ic1, y: peakDepth / 2 };
		let d1 = { x: width / 2 - id1, y: -peakDepth / 2 };

		let r = Math.abs(indent1 / 4) - Math.abs(indent2 / 4);

		a.x -= r;
		b.x -= r;
		c.x -= r;
		d.x -= r;

		a1.x -= r;
		b1.x -= r;
		c1.x -= r;
		d1.x -= r;

		return {
			a: { x: a.x, y: a.y },
			b: { x: b.x, y: b.y },
			c: { x: c.x, y: c.y },
			d: { x: d.x, y: d.y },

			a1: { x: a1.x, y: a1.y },
			b1: { x: b1.x, y: b1.y },
			c1: { x: c1.x, y: c1.y },
			d1: { x: d1.x, y: d1.y },

			ia,
			ib,
			ic,
			id,

			ia1,
			ib1,
			ic1,
			id1,
		};
	}
}


export default GeometryPoints;