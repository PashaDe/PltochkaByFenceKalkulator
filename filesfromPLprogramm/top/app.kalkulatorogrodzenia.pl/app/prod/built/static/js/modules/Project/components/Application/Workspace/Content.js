import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Objects from 'classes/Tools/Objects';


class Content extends React.Component {
	display = (position, object) => {
		if (object.status && object.position === position) {
			if (!object.views || Objects.in(this.props.view, object.views)) {
				return (
					<React.Fragment key={object.id}>
						{(typeof object.node === 'function') ? object.node() : object.node}
					</React.Fragment>
				);
			}
		}

		return <></>;
	}

	render() {
		return (
			<>
				<div className="top-left">
					{Objects.values(this.props.objects).map((object) => (
						<React.Fragment key={object.id}>
							{this.display('top-left', object)}
						</React.Fragment>
					))}
				</div>

				<div className="top-right">
					{Objects.valuesReverse(this.props.objects).map((object) => (
						<React.Fragment key={object.id}>
							{this.display('top-right', object)}
						</React.Fragment>
					))}
				</div>

				<div className="bottom-left">
					{Objects.values(this.props.objects).map((object) => (
						<React.Fragment key={object.id}>
							{this.display('bottom-left', object)}
						</React.Fragment>
					))}
				</div>

				<div className="bottom-right">
					{Objects.valuesReverse(this.props.objects).map((object) => (
						<React.Fragment key={object.id}>
							{this.display('bottom-right', object)}
						</React.Fragment>
					))}
				</div>

				{Objects.values(this.props.objects).map((object) => (
					<React.Fragment key={object.id}>
						{this.display('main', object)}
					</React.Fragment>
				))}
			</>
		);
	}
}


Content.defaultProps = {
	view: null,
	objects: null,
};

Content.propTypes = {
	view: PropTypes.string,
	objects: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


const mapStateToProps = (state) => ({
	update: state.workspace.update,
	view: state.workspace.view,
	objects: state.workspace.objects,
});

export default connect(mapStateToProps, null)(Content);