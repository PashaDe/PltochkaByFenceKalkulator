import React from 'react';

import container from 'redux/container';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import OptionsList from 'components/ui/OptionsList';


class Migration extends React.Component {
	constructor(props) {
		super(props);

		this.config = container.app.config.migrations[container.app.getSystem().migration];
	}

	list = () => {
		const result = {};

		Objects.keys(this.config.pole[Objects.first(this.config.pole)]).forEach((system) => {
			if (system !== container.app.system) {
				result[system] = container.app.config.systems[system].label;
			}
		});

		return result;
	}

	render() {
		return (
			<>
				<div className="title">
					<h2>{___('Migruj projekt')}</h2>
				</div>

				<OptionsList action={(id) => container.app.actions.migration(id)} title={(<small>{`${___('Obecny projekt można zmigrować do')}:`}</small>)} options={this.list()} />
			</>
		);
	}
}


export default Migration;