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
			maxHeight: 2.20,
		},
		customizable: false,
		type: 'horizontal',
		slats: {
			size: 0.02,
			depth: 0.024,
			space: [0, 0],
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
		joiners: {
			interval: 2.80,
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