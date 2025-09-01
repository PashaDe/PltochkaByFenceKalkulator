import React from 'react';

import container from 'redux/container';

import { ___ } from 'classes/Translation';

import ColorsList from 'components/ui/ColorsList';


class ColorsBlocks extends React.Component {
	render() {
		return (
			<>
				<div className="title">
					<h2>{___('Kolor bloczków')}</h2>
				</div>

				<ColorsList
					action={(key, color) => container.app.actions.setBlocksColor(key, color)}
					options={container.app.getCurrentBlocksColorsList()}
					value={container.app.blocksColor}
				/>
			</>
		);
	}
}


export default ColorsBlocks;