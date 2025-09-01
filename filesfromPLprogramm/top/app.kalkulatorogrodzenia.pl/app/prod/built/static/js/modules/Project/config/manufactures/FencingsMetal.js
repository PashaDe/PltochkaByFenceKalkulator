import { ___ } from 'classes/Translation';

import FencingsMetalVero from './FencingsMetalVero';
// import FencingsMetalComo from './FencingsMetalComo';
import FencingsMetalOptima from './FencingsMetalOptima';
import FencingsMetalMedio from './FencingsMetalMedio';
import FencingsMetalLargo from './FencingsMetalLargo';
import FencingsMetalGradio from './FencingsMetalGradio';
import FencingsMetalTesso from './FencingsMetalTesso';
import FencingsMetalPalisade from './FencingsMetalPalisade';


export default () => ({
	label: ___('Stalowe'),
	systems: {
		vero: FencingsMetalVero(),
		// como: FencingsMetalComo(),
		optima: FencingsMetalOptima(),
		medio: FencingsMetalMedio(),
		largo: FencingsMetalLargo(),
		gradio: FencingsMetalGradio(),
		tesso: FencingsMetalTesso(),
		palisade: FencingsMetalPalisade(),
	},
});