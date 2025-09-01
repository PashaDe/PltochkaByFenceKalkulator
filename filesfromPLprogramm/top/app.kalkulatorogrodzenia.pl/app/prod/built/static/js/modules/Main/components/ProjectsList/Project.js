/* eslint-disable react/no-danger */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Html from 'classes/Tools/Html';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';


class Project extends React.Component {
	render() {
		const project = this.props.project;

		return (
			<tr>
				<td className="date">
					<span data-tooltip={project.date_edit.string}>{project.date_edit.digital}</span>
					<div className="small">
						<span data-tooltip={project.date_add.string}>{project.date_add.digital}</span>
					</div>
				</td>

				<td className="project">
					<div className="title">
						{project.title ? project.title : ___('Brak nazwy projektu')}
					</div>

					{(project.description) && (
						<div className="description">
							{Html.nl2br(project.description)}
						</div>
					)}
				</td>

				<td className="system" dangerouslySetInnerHTML={{ __html: project.system }} />

				<td className="options">
					{(!project.locked) && (<><Link to={['/project', project.id].join('/')}>{___('Edycja')}</Link><br /></>)}
					<Link to={['/preview', project.id, project.token].join('/')}>{___('Podgląd')}</Link><br />
					<Link to={['/duplicate', project.id].join('/')}>{___('Duplikuj')}</Link><br />
					{(Objects.in(container.user.type, ['admin', 'employee'])) && (<><Link to={['/follow', project.id].join('/')}>{___('Przekaż')}</Link><br /></>)}
					<Link to={['/delete', project.id].join('/')}>{___('Usuń')}</Link><br />
				</td>
			</tr>
		);
	}
}


Project.defaultProps = {
	project: null,
};

Project.propTypes = {
	project: PropTypes.object,
};


export default Project;