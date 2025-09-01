import data from './data';


export default () => ({
	label: 'TESSO',
	colors: data().colors.default,
	default: {
		variant: 'tesso20',
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
			mode: 'continuous',
			end: false,
			variant: {
				0: {
					size: 0.16,
					depth: 0.02,
					structure: {
						size: 0.16,
						space: null,
						angle: 0,
					},
				},
				1: {
					size: 0.08,
					depth: 0.02,
					structure: {
						size: 0.08,
						space: null,
						angle: 0,
					},
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
		tesso20: {
			label: 'Tesso 20',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.02,
						},
					},
					1: {
						structure: {
							space: 0.02,
						},
					},
				},
			},
		},
		tesso30: {
			label: 'Tesso 30',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.03,
						},
					},
					1: {
						structure: {
							space: 0.03,
						},
					},
				},
			},
		},
		tesso40: {
			label: 'Tesso 40',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.04,
						},
					},
					1: {
						structure: {
							space: 0.04,
						},
					},
				},
			},
		},
		tesso50: {
			label: 'Tesso 50',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.05,
						},
					},
					1: {
						structure: {
							space: 0.05,
						},
					},
				},
			},
		},
		tesso60: {
			label: 'Tesso 60',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.06,
						},
					},
					1: {
						structure: {
							space: 0.06,
						},
					},
				},
			},
		},
		tesso70: {
			label: 'Tesso 70',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.07,
						},
					},
					1: {
						structure: {
							space: 0.07,
						},
					},
				},
			},
		},
		tesso80: {
			label: 'Tesso 80',
			panels: {
				variant: {
					0: {
						structure: {
							space: 0.08,
						},
					},
					1: {
						structure: {
							space: 0.08,
						},
					},
				},
			},
		},
	},
});