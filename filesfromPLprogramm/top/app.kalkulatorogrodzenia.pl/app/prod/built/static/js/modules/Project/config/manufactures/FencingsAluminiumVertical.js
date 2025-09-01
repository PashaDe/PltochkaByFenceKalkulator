import data from './data';


export default () => ({
	label: 'VERTICAL',
	colors: data().colors.default,
	default: {
		variant: 'vertical',
		color: 'ral9005',
	},
	pattern: {
		size: {
			maxHeight: 2.20,
		},
		customizable: false,
		type: 'vertical',
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
		vertical: {
			label: 'Vertical',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.08,
					depth: 0.02,
					structure: {
						size: 0.08,
						space: 0.04,
						angle: 0,
					},
				},
			},
		},
	},
});