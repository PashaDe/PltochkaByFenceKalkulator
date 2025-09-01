import data from './data';


export default () => ({
	label: 'SECRET',
	colors: data().colors.default,
	default: {
		variant: 'secret',
		color: 'ral9005',
	},
	pattern: {
		size: {
			maxHeight: 2.20,
		},
		customizable: false,
		type: 'horizontal',
		slats: {
			size: 0.04,
			depth: 0.04,
			space: [0, 0],
		},
		joiners: {
			interval: 2.80,
			width: 0.08,
			depth: 0.08,
		},
	},
	variants: {
		secret: {
			label: 'Secret',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.10,
					depth: 0.02,
					structure: {
						size: 0.09,
						space: -0.01,
						angle: 10,
					},
				},
			},
		},
	},
});