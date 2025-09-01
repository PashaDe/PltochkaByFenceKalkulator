import React from 'react';


class Html {
	static nl2br = (string) => string.split(/(?:\r\n|\r|\n)/g).map((line, i) => (
		<React.Fragment key={i}>
			{i > 0 && (<br />)}
			{line}
		</React.Fragment>
	));
}


export default Html;