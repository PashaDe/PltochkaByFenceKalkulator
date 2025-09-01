import data from './data';


export default () => ({
	label: 'LARGO',
	colors: data().colors.default,
	default: {
		variant: 'largo20',
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
				size: 0.20,
				depth: 0.02,
				structure: {
					size: 0.20,
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
		largo20: {
			label: 'Largo 20',
			panels: {
				variant: {
					structure: {
						space: 0.02,
					},
				},
			},
		},
		largo30: {
			label: 'Largo 30',
			panels: {
				variant: {
					structure: {
						space: 0.03,
					},
				},
			},
		},
		largo40: {
			label: 'Largo 40',
			panels: {
				variant: {
					structure: {
						space: 0.04,
					},
				},
			},
		},
		largo50: {
			label: 'Largo 50',
			panels: {
				variant: {
					structure: {
						space: 0.05,
					},
				},
			},
		},
		largo60: {
			label: 'Largo 60',
			panels: {
				variant: {
					structure: {
						space: 0.06,
					},
				},
			},
		},
		largo70: {
			label: 'Largo 70',
			panels: {
				variant: {
					structure: {
						space: 0.07,
					},
				},
			},
		},
		largo80: {
			label: 'Largo 80',
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