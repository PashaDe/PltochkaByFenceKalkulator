import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import Button from './Button';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.instance = this.props.instance;

		this.systems = this.getSystemsList();
		this.families = null;
	}

	getSystemsList = () => {
		let output = [];

		Objects.entries(this.instance.config.systems).forEach(([id, entry]) => {
			if (Objects.in(id, container.permissions)) {
				output[id] = entry;
			}
		});

		return output;
	}

	selectSystem = (id) => {
		this.families = this.systems[id]?.blocks;

		if (!Objects.count(this.families)) return;

		if (Objects.count(this.families) === 1) {
			this.instance.state.project = {
				data: {
					system: id,
					blocksFamily: Objects.first(this.systems[id]?.blocks),
				},

			};

			this.run();
		} else {
			this.instance.state.project = {
				data: {
					system: id,
				},
			};

			this.forceUpdate();
		}
	}

	selectFamily = (id) => {
		this.instance.state.project.data.blocksFamily = id;

		this.run();
	}

	run = () => {
		if (!container.app) {
			this.instance.forceUpdate();
		} else {
			container.app.project = this.instance.state.project;
			container.app.reset();

			this.forceUpdate();
		}
	}

	render() {
		if (!this.instance.state.project?.data.system) {
			return (
				<div className="wrapper">
					<h1>{___('Wybierz system')}</h1>

					<section className="systems-list">
						{Objects.entries(this.systems).map(([key, entry]) => (
							<div className="col col-4" key={key}>
								<Button action={() => this.selectSystem(key)} background={[this.instance.config.systemsDir, key, '.jpg'].join('')} label={entry.label} />
							</div>
						))}
					</section>
				</div>
			);
		}

		if (!this.instance.state.project?.data.blocksFamily) {
			return (
				<div className="wrapper">
					<h1>{___('Wybierz konfigurację')}</h1>

					<section className="systems-list">
						{Objects.entries(this.families).map(([key, entry]) => (entry.visible || (key === 'gl8' && Objects.in(container.user.login, ['dark24labs@op.pl', 'dariusz.dziadon@gmail.com']))) && (
							<div className="col col-4" key={key}>
								<Button action={() => this.selectFamily(key)} background={[this.instance.config.systemsDir, this.instance.state.project.data.system, '/blocks/', key, '.jpg'].join('')} label={entry.label} />
							</div>
						))}
					</section>
				</div>
			);
		}

		return <></>;
	}
}


View.propTypes = {
	instance: PropTypes.object.isRequired,
};


export default View;