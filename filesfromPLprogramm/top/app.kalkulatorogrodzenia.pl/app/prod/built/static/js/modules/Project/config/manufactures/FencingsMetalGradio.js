import data from './data';


export default () => ({
	label: 'GRADIO',
	colors: data().colors.default,
	default: {
		variant: 'gradio20',
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
			mode: 'last',
			count: 3,
			variant: {
				0: {
					size: 0.08,
					depth: 0.02,
					structure: {
						size: 0.08,
						space: null,
						angle: 0,
					},
				},
				1: {
					size: 0.16,
					depth: 0.02,
					structure: {
						size: 0.16,
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
		gradio20: {
			label: 'Gradio 20',
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
		gradio30: {
			label: 'Gradio 30',
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
		gradio40: {
			label: 'Gradio 40',
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
		gradio50: {
			label: 'Gradio 50',
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
		gradio60: {
			label: 'Gradio 60',
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
		gradio70: {
			label: 'Gradio 70',
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
		gradio80: {
			label: 'Gradio 80',
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