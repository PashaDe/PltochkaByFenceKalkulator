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
				size: 0.20,
				depth: 0.02,
				structure: {
					size: 0.20,
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