import { ___ } from 'classes/Translation';

import data from './data';


export default () => ({
	label: 'VERO',
	colors: data().colors.default,
	default: {
		variant: 'translucent',
		color: 'ral7016',
	},
	pattern: {
		size: {
			maxHeight: 2.20,
		},
		customizable: false,
		type: 'horizontal',
		slats: {
			size: 0.02,
			depth: 0.075,
			space: [0.0148, 0.0329], // [0.0148, 0.033]
		},
		panels: {
			mode: 'simple',
			variant: {
				size: 0.08,
				depth: 0.02,
				structure: {
					size: 0.0793,
					space: null,
					angle: 30,
				},
			},
		},
		joiners: {
			interval: 2.80,
			width: 0.08,
			depth: 0.08,
		},
	},
	variants: {
		translucent: {
			label: ___('Przezierny'),
			panels: {
				variant: {
					structure: {
						space: 0.0597,
					},
				},
			},
		},
		opaque: {
			label: ___('Nieprzezierny'),
			panels: {
				variant: {
					structure: {
						space: -0.0098,
					},
				},
			},
		},
	},
});