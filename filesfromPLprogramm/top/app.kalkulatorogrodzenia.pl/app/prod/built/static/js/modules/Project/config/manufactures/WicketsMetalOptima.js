import data from './data';


export default () => ({
	label: 'OPTIMA',
	colors: data().colors.default,
	default: {
		variant: 'optima20',
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
		},
		panels: {
			mode: 'simple',
			variant: {
				size: 0.08,
				depth: 0.02,
				structure: {
					size: 0.08,
					space: null,
					angle: 0,
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
		optima20: {
			label: 'Optima 20',
			panels: {
				variant: {
					structure: {
						space: 0.02,
					},
				},
			},
		},
		optima30: {
			label: 'Optima 30',
			panels: {
				variant: {
					structure: {
						space: 0.03,
					},
				},
			},
		},
		optima40: {
			label: 'Optima 40',
			panels: {
				variant: {
					structure: {
						space: 0.04,
					},
				},
			},
		},
		optima50: {
			label: 'Optima 50',
			panels: {
				variant: {
					structure: {
						space: 0.05,
					},
				},
			},
		},
		optima60: {
			label: 'Optima 60',
			panels: {
				variant: {
					structure: {
						space: 0.06,
					},
				},
			},
		},
		optima70: {
			label: 'Optima 70',
			panels: {
				variant: {
					structure: {
						space: 0.07,
					},
				},
			},
		},
		optima80: {
			label: 'Optima 80',
			panels: {
				variant: {
					structure: {
						space: 0.08,
					},
				},
			},
		},
	},
});