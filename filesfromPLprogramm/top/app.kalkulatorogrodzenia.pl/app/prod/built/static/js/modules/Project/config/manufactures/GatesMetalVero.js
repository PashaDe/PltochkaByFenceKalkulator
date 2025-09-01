import { ___ } from 'classes/Translation';

import data from './data';


export default () => ({
	label: 'VERO',
	colors: data().colors.default,
	default: {
		type: 'sliding',
		variant: 'translucent',
		color: 'ral7016',
	},
	types: {
		sliding: {
			label: ___('Przesuwne'),
			pattern: {
				size: {
					minWidth: 2.60,
					maxWidth: 6.00,
					minHeight: 1.00,
					maxHeight: 2.20,
					bottomSpace: 0.09,
				},
				customizable: false,
				opentime: 20,
				type: 'horizontal',
				basement: {
					top: { width: 0, height: 0.04, depth: 0.08 },
					bottom: { width: false, height: 0.06, depth: 0.04 },
					base: { width: false, height: 0.08, depth: 0.08 },
				},
				frame: {
					left: { size: 0.04, depth: 0.08 },
					center: { size: 0.04, depth: 0.08 },
					right: { size: 0.04, depth: 0.08 },
				},
				slats: {
					top: { space: null },
					bottom: { space: null },
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
				extra: {
					type: 'square',
					width: 1.50,
					size: 0.04,
					depth: 0.04,
				},
				support: {
					depth: 0.30,
					space: 0.05,
					top: {
						height: 0.05,
					},
					pole: {
						width: 0.10,
						depth: 0.10,
					},
					bottom: {
						width: 0.30,
						height: 0.01,
					},
				},
			},
			variants: {
				translucent: {
					label: ___('Przezierny'),
					slats: {
						top: { space: 0.03 },
						bottom: { space: 0.03 },
					},
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
					slats: {
						top: { space: 0 },
						bottom: { space: 0 },
					},
					panels: {
						variant: {
							structure: {
								space: -0.0098,
							},
						},
					},
				},
			},
		},
		swing: {
			label: ___('Dwuskrzydłowe'),
			pattern: {
				size: {
					minWidth: 2.60,
					maxWidth: 6.00,
					minHeight: 1.00,
					maxHeight: 2.20,
				},
				customizable: false,
				opentime: 10,
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
					width: 0.015,
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
		},
	},
});