import { ___ } from 'classes/Translation';

import GatesMetalVero from './GatesMetalVero';
// import GatesMetalComo from './GatesMetalComo';
import GatesMetalOptima from './GatesMetalOptima';
import GatesMetalMedio from './GatesMetalMedio';
import GatesMetalLargo from './GatesMetalLargo';
import GatesMetalGradio from './GatesMetalGradio';
import GatesMetalTesso from './GatesMetalTesso';
import GatesMetalPalisade from './GatesMetalPalisade';


export default () => ({
	label: ___('Stalowe'),
	systems: {
		vero: GatesMetalVero(),
		// como: GatesMetalComo(),
		optima: GatesMetalOptima(),
		medio: GatesMetalMedio(),
		largo: GatesMetalLargo(),
		gradio: GatesMetalGradio(),
		tesso: GatesMetalTesso(),
		palisade: GatesMetalPalisade(),
	},
});