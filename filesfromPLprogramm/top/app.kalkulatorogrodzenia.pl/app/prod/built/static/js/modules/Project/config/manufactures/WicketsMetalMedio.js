import data from './data';


export default () => ({
	label: 'MEDIO',
	colors: data().colors.default,
	default: {
		variant: 'medio20',
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
				size: 0.16,
				depth: 0.02,
				structure: {
					size: 0.16,
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
		medio20: {
			label: 'Medio 20',
			panels: {
				variant: {
					structure: {
						space: 0.02,
					},
				},
			},
		},
		medio30: {
			label: 'Medio 30',
			panels: {
				variant: {
					structure: {
						space: 0.03,
					},
				},
			},
		},
		medio40: {
			label: 'Medio 40',
			panels: {
				variant: {
					structure: {
						space: 0.04,
					},
				},
			},
		},
		medio50: {
			label: 'Medio 50',
			panels: {
				variant: {
					structure: {
						space: 0.05,
					},
				},
			},
		},
		medio60: {
			label: 'Medio 60',
			panels: {
				variant: {
					structure: {
						space: 0.06,
					},
				},
			},
		},
		medio70: {
			label: 'Medio 70',
			panels: {
				variant: {
					structure: {
						space: 0.07,
					},
				},
			},
		},
		medio80: {
			label: 'Medio 80',
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