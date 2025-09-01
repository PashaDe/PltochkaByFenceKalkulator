import React from 'react';
import * as THREE from 'three';

import * as workspaceActions from '../../redux/workspace/actions';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonSwitch from 'components/ui/ButtonSwitch';


class DayNight {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;

		this.status = 'day';

		workspaceActions.add('top-right', 'day-night', this.content, ['3d'], false);
	}

	content = () => {
		return (
			<div className="day-night p-1">
				<ButtonSwitch action={this.switch} description={___('Dzień / noc')} options={['day', 'night']} value={this.status} />
			</div>
		);
	}

	switch = (option) => {
		switch (option) {
			case 'day':
				this.status = option;

				// this.instance.envMap = this.instance.envMapDay;

				this.three.scenes['3d'].background = new THREE.Color(0xffffff);
				this.three.scenes['3d'].AmbientLight.intensity = 2.50;
				this.three.environment.lights.sun.light.intensity = 0.65;
				this.three.environment.lights.sun2.light.intensity = 0.50;
				this.three.environment.lights.sun3.light.intensity = 0.10;
				this.three.environment.lights.sun4.light.intensity = 0.10;

				if (this.three.environment.objects.sky) {
					this.three.environment.objects.sky.visible = true;
				}

				if (this.three.environment.objects.stars) {
					this.three.environment.objects.stars.visible = false;
				}

				Objects.values(this.instance.poles).forEach((entry) => {
					if (entry.additionals.mailbox.config.group && entry.additionals.mailbox.config.model && entry.additionals.mailbox.config.color) {
						entry.additionals.mailbox.do();
					}

					if (entry.additionals.lamp.config.group && entry.additionals.lamp.config.model) {
						entry.additionals.lamp.do();
					}

					if (entry.additionals.ledblock.config.group && entry.additionals.ledblock.config.model) {
						entry.additionals.ledblock.do();
					}
				});

				break;

			case 'night':
				this.status = option;

				// this.instance.envMap = this.instance.envMapNight;

				this.three.scenes['3d'].background = new THREE.Color(0x101015);
				this.three.scenes['3d'].AmbientLight.intensity = 1;
				this.three.environment.lights.sun.light.intensity = 0;
				this.three.environment.lights.sun2.light.intensity = 0;
				this.three.environment.lights.sun3.light.intensity = 0;
				this.three.environment.lights.sun4.light.intensity = 0;

				if (this.three.environment.objects.sky) {
					this.three.environment.objects.sky.visible = false;
				}

				if (this.three.environment.objects.stars) {
					this.three.environment.objects.stars.visible = true;
				} else {
					this.three.environment.addSky('3d', 'stars', { source: '/assets/img/environment/stars.jpg', repeatX: 8, repeatY: 16, resetClick: true });
				}

				Objects.values(this.instance.poles).forEach((entry) => {
					if (entry.additionals.mailbox.config.group && entry.additionals.mailbox.config.model && entry.additionals.mailbox.config.color) {
						entry.additionals.mailbox.do();
					}

					if (entry.additionals.lamp.config.group && entry.additionals.lamp.config.model) {
						entry.additionals.lamp.do();
					}

					if (entry.additionals.ledblock.config.group && entry.additionals.ledblock.config.model) {
						entry.additionals.ledblock.do();
					}
				});

				break;

			default:
		}
	}
}


export default DayNight;