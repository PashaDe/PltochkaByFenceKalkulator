import React from 'react';
import PropTypes from 'prop-types';

import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import Project from './Project';


class ProjectsList extends React.Component {
	render() {
		return (
			<>
				{(Objects.count(this.props.projects)) ? (
					<table className="projects">
						<thead>
							<tr>
								<th className="date">{___('Data')}</th>
								<th className="project">{___('Projekt')}</th>
								<th className="system">{___('System')}</th>
								<th className="options">&nbsp;</th>
							</tr>
						</thead>

						<tbody>
							{Objects.values(this.props.projects).map((project) => (
								<Project project={project} key={project.id} />
							))}
						</tbody>
					</table>
				) : (
					<></>
				)}
			</>
		);
	}
}


ProjectsList.defaultProps = {
	projects: null,
};

ProjectsList.propTypes = {
	projects: PropTypes.array,
};


export default ProjectsList;