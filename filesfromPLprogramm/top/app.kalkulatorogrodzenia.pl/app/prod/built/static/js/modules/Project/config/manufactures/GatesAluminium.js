import { ___ } from 'classes/Translation';

import GatesAluminiumVertical from './GatesAluminiumVertical';
import GatesAluminiumHorizontal from './GatesAluminiumHorizontal';
import GatesAluminiumSecret from './GatesAluminiumSecret';
import GatesAluminiumPalisade from './GatesAluminiumPalisade';
// import GatesAluminiumPerforated from './GatesAluminiumPerforated';


export default () => ({
	label: ___('Aluminiowe'),
	systems: {
		vertical: GatesAluminiumVertical(),
		horizontal: GatesAluminiumHorizontal(),
		secret: GatesAluminiumSecret(),
		palisade: GatesAluminiumPalisade(),
		// perforated: GatesAluminiumPerforated(),
	},
});