import data from './data';


export default () => ({
	label: 'PALISADA',
	colors: data().colors.default,
	default: {
		variant: 'straight',
		color: 'ral9005',
	},
	pattern: {
		size: {
			maxHeight: 2.20,
		},
		spaceable: false,
		customizable: false,
		type: 'vertical',
		bracket1: {
			size: 0.04,
			depth: 0.08,
		},
		joiners: {
			width: 0.08,
			depth: 0.08,
		},
	},
	variants: {
		straight: {
			label: 'Prosta',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.06,
					depth: 0.06,
					structure: {
						size: 0.06,
						space: 0.06,
						angle: 0,
					},
				},
			},
		},
		slant: {
			label: 'Skośna',
			panels: {
				mode: 'simple',
				variant: {
					size: 0.08,
					depth: 0.03,
					structure: {
						size: 0.08,
						space: 0.06,
						angle: 45,
					},
				},
			},
		},
	},
});