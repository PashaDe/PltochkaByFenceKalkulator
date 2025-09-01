import Objects from 'classes/Tools/Objects';


class Maths {
	static fmod = (x, y) => x - Math.floor(x / y) * y

	static round = (number, precision = 3) => Number(parseFloat(number).toFixed(precision))

	static degreesToRotation = (degrees) => degrees * (Math.PI * 2 / 360)

	static rotationToDegrees = (rotation) => rotation / (Math.PI * 2 / 360)

	static getCenter = (A, B) => ({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, z: (A.z + B.z) / 2 })

	static getDistance = (A, B) => {
		const x = (B.x || 0) - (A.x || 0);
		const y = (B.y || 0) - (A.y || 0);
		const z = (B.z || 0) - (A.z || 0);

		return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
	}

	static getRotation = (A, B) => -Math.atan2(-(A.y - B.y), -(A.x - B.x))

	static getShapeCenter = (points) => {
		let x = 0;
		let y = 0;
		let z = 0;

		Objects.values(points).forEach((p) => {
			x += (p.x || 0);
			y += (p.y || 0);
			z += (p.z || 0);
		});

		return { x: x / points.length, y: y / points.length, z: z / points.length };
	}

	static pointsInLine = (A, B, C, value = false) => {
		if ((A.x === B.x && A.y === B.y) || (A.x === C.x && A.y === C.y) || (B.x === C.x && B.y === C.y)) {
			return (value) ? 0 : true;
		}

		const AB = ((B.y - A.y) / (B.x - A.x)) || 0;
		const AC = ((C.y - A.y) / (C.x - A.x)) || 0;

		return (value) ? (AC - AB) || 0 : AB === AC;
	}

	static rotatePoint = (A, rotation) => {
		const distance = Maths.getDistance({ x: 0, z: 0 }, { x: A.x, z: A.z });
		const direction = -(Maths.getRotation({ x: 0, y: 0 }, { x: A.x, y: A.z })) + rotation + Math.PI;

		const x = distance * Math.cos(direction) * (-1);
		const y = 0;
		const z = distance * Math.sin(direction) * (1);

		return { x, y, z };
	}

	static rotatePointDegrees = (A, degrees) => {
		const rotation = Maths.degreesToRotation(degrees);

		const distance = Maths.getDistance({ x: 0, z: 0 }, { x: A.x, z: A.z });
		const direction = -(Maths.getRotation({ x: 0, y: 0 }, { x: A.x, y: A.z })) + rotation + Math.PI;

		const x = distance * Math.cos(direction) * (-1);
		const y = 0;
		const z = distance * Math.sin(direction) * (-1);

		return { x, y, z };
	}

	static findAngle = (A, B, C) => {
		const AB = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
		const BC = Math.sqrt((B.x - C.x) ** 2 + (B.y - C.y) ** 2);
		const AC = Math.sqrt((C.x - A.x) ** 2 + (C.y - A.y) ** 2);

		const angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) / Math.PI * 180;

		if (angle) {
			return angle;
		}

		return 0;
	}

	static findAngleBidirectional = (A, B, C) => {
		const AB = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
		const BC = Math.sqrt((B.x - C.x) ** 2 + (B.y - C.y) ** 2);
		const AC = Math.sqrt((C.x - A.x) ** 2 + (C.y - A.y) ** 2);

		const angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) / Math.PI * 180;

		if (angle) {
			const a1 = Math.atan2(-(A.y - B.y), -(A.x - B.x)) * 180 / Math.PI;
			const a2 = Math.atan2(-(B.y - C.y), -(B.x - C.x)) * 180 / Math.PI;
			const r = a1 - a2;

			if ((r >= 0 && r < 180) || (r >= -360 && r < -180)) {
				return angle;
			}

			return -angle;
		}

		return 0;
	}
}


export default Maths;