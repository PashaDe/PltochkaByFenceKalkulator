import data from './data';


export default () => ({
	label: 'HORIZONTAL',
	colors: data().colors.default,
	default: {
		variant: 'horizontal150d',
		color: 'ral9005',
	},
	pattern: {
		size: {
			maxHeight: 2.20,
		},
		customizable: data().customizables.default,
		type: 'horizontal',
		slats: {
			size: 0.04,
			depth: 0.024,
			space: [0, 0],
		},
		joiners: {
			interval: 2.80,
			width: 0.08,
			depth: 0.08,
		},
	},
	variants: {
		horizontal80: {
			label: 'Horizontal 80',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.08,
					depth: 0.02,
					structure: {
						size: 0.08,
						space: 0.08,
						angle: 0,
					},
				},
			},
		},
		horizontal100: {
			label: 'Horizontal 100',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.10,
					depth: 0.02,
					structure: {
						size: 0.10,
						space: 0.04,
						angle: 0,
					},
				},
			},
		},
		horizontal120: {
			label: 'Horizontal 120',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.12,
					depth: 0.02,
					structure: {
						size: 0.12,
						space: 0.06,
						angle: 0,
					},
				},
			},
		},
		horizontal150: {
			label: 'Horizontal 150',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.15,
					depth: 0.02,
					structure: {
						size: 0.15,
						space: 0.02,
						angle: 0,
					},
				},
			},
		},
		horizontal150d: {
			label: 'Horizontal 150D',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.15,
					depth: 0.02,
					structure: {
						size: 0.15,
						space: 0.02,
						angle: 0,
					},
				},
				material: data().materials.second,
			},
		},
		horizontal200: {
			label: 'Horizontal 200',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.20,
					depth: 0.02,
					structure: {
						size: 0.20,
						space: 0.04,
						angle: 0,
					},
				},
			},
		},
		horizontal200d: {
			label: 'Horizontal 200D',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.20,
					depth: 0.02,
					structure: {
						size: 0.20,
						space: 0.04,
						angle: 0,
					},
				},
				material: data().materials.second,
			},
		},
		horizontal200_20: {
			label: 'Horizontal 200/20',
			panels: {
				mode: 'continuous',
				end: 0,
				variant: {
					0: {
						size: 0.20,
						depth: 0.02,
						structure: {
							size: 0.20,
							space: 0.04,
							angle: 0,
						},
					},
					1: {
						size: 0.02,
						depth: 0.02,
						structure: {
							size: 0.02,
							space: 0.04,
							angle: 0,
						},
					},
				},
			},
		},
		horizontal150_40: {
			label: 'Horizontal 150/40',
			panels: {
				mode: 'continuous',
				end: 0,
				variant: {
					0: {
						size: 0.15,
						depth: 0.02,
						structure: {
							size: 0.15,
							space: 0.04,
							angle: 0,
						},
					},
					1: {
						size: 0.04,
						depth: 0.02,
						structure: {
							size: 0.04,
							space: 0.04,
							angle: 0,
						},
					},
				},
			},
		},
		horizontal100_40_20: {
			label: 'Horizontal 100/40/20',
			panels: {
				mode: 'continuous',
				end: 0,
				variant: {
					0: {
						size: 0.10,
						depth: 0.02,
						structure: {
							size: 0.10,
							space: 0.04,
							angle: 0,
						},
					},
					1: {
						size: 0.02,
						depth: 0.02,
						structure: {
							size: 0.02,
							space: 0.04,
							angle: 0,
						},
					},
					2: {
						size: 0.04,
						depth: 0.02,
						structure: {
							size: 0.04,
							space: 0.04,
							angle: 0,
						},
					},
				},
			},
		},
	},
});