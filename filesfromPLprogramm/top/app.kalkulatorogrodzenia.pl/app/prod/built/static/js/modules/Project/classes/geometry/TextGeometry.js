import * as THREE from 'three';


class TextGeometry {
	constructor(font, text, size = 0.20, centerX = 0.5, centerY = 0.5, centerZ = 0.5) {
		let geometry = new THREE.ShapeBufferGeometry(font.generateShapes(text, size));

		geometry.computeBoundingBox();
		const x = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) * (-centerX);
		const y = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) * (-centerY);
		const z = (geometry.boundingBox.max.z - geometry.boundingBox.min.z) * (-centerZ);
		geometry.translate(x, y, z);

		return geometry;
	}
}


export default TextGeometry;