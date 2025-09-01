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
			minWidth: 0.60,
			maxWidth: 2.00,
			minHeight: 1.00,
			maxHeight: 2.20,
		},
		customizable: false,
		type: 'horizontal',
		frame: {
			left: { size: 0.06, depth: 0.06 },
			right: { size: 0.06, depth: 0.06 },
			top: { space: 0.005 },
			bottom: { space: 0.005 },
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
		handle: 'standard',
		thread: {
			width: 0.035,
			height: 0.285,
			depth: 0.035,
		},
		hinge: {
			width: 0.035,
			space: 0.10,
		},
		poles: {
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