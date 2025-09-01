import React, { Fragment } from 'react';

import container from 'redux/container';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ColorsList from 'components/ui/ColorsList';


class ColorsPeaks extends React.Component {
	render() {
		return (
			<>
				<div className="title">
					<h2>{___('Kolor daszków')}</h2>
				</div>

				{Objects.entries(container.app.getCurrentPeaksColorsList()).map(([id, peaksFamily]) => (
					<Fragment key={id}>
						{(Objects.keys(container.app.getCurrentPeaksColorsList()).length > 1) && (
							<h3>{peaksFamily.label}</h3>
						)}

						<ColorsList
							action={(key, color) => container.app.actions.setPeaksColor(key, color)}
							options={peaksFamily.colors}
							value={container.app.peaksColor}
						/>
					</Fragment>
				))}
			</>
		);
	}
}


export default ColorsPeaks;