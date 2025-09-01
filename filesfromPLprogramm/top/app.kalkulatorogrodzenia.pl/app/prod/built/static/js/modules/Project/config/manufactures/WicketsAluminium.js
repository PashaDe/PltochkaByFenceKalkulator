import { ___ } from 'classes/Translation';

import WicketsAluminiumVertical from './WicketsAluminiumVertical';
import WicketsAluminiumHorizontal from './WicketsAluminiumHorizontal';
import WicketsAluminiumSecret from './WicketsAluminiumSecret';
import WicketsAluminiumPalisade from './WicketsAluminiumPalisade';
// import WicketsAluminiumPerforated from './WicketsAluminiumPerforated';


export default () => ({
	label: ___('Aluminiowe'),
	systems: {
		vertical: WicketsAluminiumVertical(),
		horizontal: WicketsAluminiumHorizontal(),
		secret: WicketsAluminiumSecret(),
		palisade: WicketsAluminiumPalisade(),
		// perforated: WicketsAluminiumPerforated(),
	},
});