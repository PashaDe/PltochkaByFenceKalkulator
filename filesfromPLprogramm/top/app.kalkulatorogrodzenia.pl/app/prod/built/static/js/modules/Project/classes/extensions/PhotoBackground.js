import React from 'react';
import * as THREE from 'three';

import * as workspaceActions from '../../redux/workspace/actions';

import { ___ } from 'classes/Translation';

import ButtonImage from 'components/ui/ButtonImage';


class PhotoBackground {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;

		workspaceActions.add('top-right', 'photo-background', (
			<div className="photo-background">
				<ButtonImage action={() => this.file.click()} type="environment" description={___('Przymierz wizualizację na zdjęciu działki')} />
				<div className="content">
					<input
						type="file"
						onChange={this.execute}
						ref={(element) => {
							this.file = element;
						}}
					/>
				</div>
			</div>
		), ['3d']);
	}

	execute = () => {
		let image = URL.createObjectURL(this.file.files[0]);

		let texture = this.three.loader.load(image);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		// texture.offset.x = 0.3;
		// texture.repeat.set(0.6, 1);

		this.three.environment.objects.sky.visible = false;
		this.three.environment.objects.ground.visible = false;

		this.three.cameras['3d'].controls.maxPolarAngle = Math.PI / 2;
		this.three.scenes['3d'].background = texture;

		this.instance.hideFlags();
	}
}


export default PhotoBackground;