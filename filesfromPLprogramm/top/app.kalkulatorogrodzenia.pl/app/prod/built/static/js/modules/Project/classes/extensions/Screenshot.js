import React from 'react';
import download from 'downloadjs';

import * as workspaceActions from '../../redux/workspace/actions';

import { ___ } from 'classes/Translation';

import ButtonImage from 'components/ui/ButtonImage';


class Screenshot {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;

		this.settings = {
			maxSize: 3840,
			width: 2560,
			height: 1440,
		};

		workspaceActions.add('top-right', 'screenshot', (<div><ButtonImage action={() => this.execute()} type="screenshot" description={___('Zrób print-screen')} /></div>));
	}

	execute = () => {
		document.documentElement.classList.add('loading');
		this.three.render.domElement.style.opacity = 0;

		let width = this.settings.width;
		let height = this.settings.height;

		switch (this.three.view.get()) {
			case '2d':
				if (this.instance.extensions.dimensions.boundary.left.x < Infinity && this.instance.extensions.dimensions.boundary.right.x > -Infinity && this.instance.extensions.dimensions.boundary.top.z < Infinity && this.instance.extensions.dimensions.boundary.bottom.z > -Infinity) {
					let size = {
						x: this.instance.extensions.dimensions.boundary.right.x - this.instance.extensions.dimensions.boundary.left.x,
						z: this.instance.extensions.dimensions.boundary.bottom.z - this.instance.extensions.dimensions.boundary.top.z,
					};

					let sizeWidth = Math.ceil(size.x * 120);
					let sizeHeight = Math.ceil(size.z * 120);

					if (sizeWidth > this.settings.width) {
						width = (sizeWidth <= this.settings.maxSize) ? sizeWidth : this.settings.maxSize;
					}

					if (sizeHeight > this.settings.height) {
						height = (sizeHeight <= this.settings.maxSize) ? sizeHeight : this.settings.maxSize;
					}
				}
				break;

			default:
		}

		this.three.camera.aspect = width / height;
		this.three.camera.updateProjectionMatrix();
		this.three.render.setSize(width, height);

		setTimeout(() => {
			this.three.render.render(this.three.scene, this.three.camera);

			download(this.three.render.domElement.toDataURL('image/jpeg', 0.85), 'screen.jpg', 'image/jpeg');

			// restore default view
			this.three.camera.aspect = this.three.aspect;
			this.three.camera.updateProjectionMatrix();
			this.three.render.setSize(this.three.width, this.three.height);

			this.three.render.domElement.style.opacity = 1;
			document.documentElement.classList.remove('loading');
		}, 1000);
	}
}


export default Screenshot;