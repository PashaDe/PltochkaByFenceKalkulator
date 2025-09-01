import { ___ } from 'classes/Translation';

import FencingsAluminiumVertical from './FencingsAluminiumVertical';
import FencingsAluminiumHorizontal from './FencingsAluminiumHorizontal';
import FencingsAluminiumSecret from './FencingsAluminiumSecret';
import FencingsAluminiumPalisade from './FencingsAluminiumPalisade';
// import FencingsAluminiumPerforated from './FencingsAluminiumPerforated';


export default () => ({
	label: ___('Aluminiowe'),
	systems: {
		vertical: FencingsAluminiumVertical(),
		horizontal: FencingsAluminiumHorizontal(),
		secret: FencingsAluminiumSecret(),
		palisade: FencingsAluminiumPalisade(),
		// perforated: FencingsAluminiumPerforated(),
	},
});