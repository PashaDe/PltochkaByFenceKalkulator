import { ___ } from 'classes/Translation';

import WicketsMetalVero from './WicketsMetalVero';
// import WicketsMetalComo from './WicketsMetalComo';
import WicketsMetalOptima from './WicketsMetalOptima';
import WicketsMetalMedio from './WicketsMetalMedio';
import WicketsMetalLargo from './WicketsMetalLargo';
import WicketsMetalGradio from './WicketsMetalGradio';
import WicketsMetalTesso from './WicketsMetalTesso';
import WicketsMetalPalisade from './WicketsMetalPalisade';


export default () => ({
	label: ___('Stalowe'),
	systems: {
		vero: WicketsMetalVero(),
		// como: WicketsMetalComo(),
		optima: WicketsMetalOptima(),
		medio: WicketsMetalMedio(),
		largo: WicketsMetalLargo(),
		gradio: WicketsMetalGradio(),
		tesso: WicketsMetalTesso(),
		palisade: WicketsMetalPalisade(),
	},
});