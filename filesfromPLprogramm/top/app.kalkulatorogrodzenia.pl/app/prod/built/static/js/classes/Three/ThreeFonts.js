import * as THREE from 'three';

import ThreeBuffer from 'classes/Three/ThreeBuffer';
import Objects from 'classes/Tools/Objects';


class ThreeFonts {
	constructor(fonts, callback) {
		this.fonts = fonts;
		this.callback = callback;

		this.buffer = new ThreeBuffer(null, () => {
			this.callback();
		});

		this.load();
	}

	load = () => {
		let FontLoader = new THREE.FontLoader();

		Objects.entries(this.fonts).forEach(([id, source]) => {
			this.buffer.add();

			FontLoader.load(source, (font) => {
				this[id] = font;

				this.buffer.remove();
			});
		});
	}
}


export default ThreeFonts;