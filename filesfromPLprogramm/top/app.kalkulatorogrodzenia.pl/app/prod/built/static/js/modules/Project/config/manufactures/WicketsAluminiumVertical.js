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
			minWidth: 0.60,
			maxWidth: 2.00,
			minHeight: 1.00,
			maxHeight: 2.20,
		},
		customizable: false,
		type: 'vertical',
		frame: {
			left: { size: 0.075, depth: 0.075 },
			right: { size: 0.075, depth: 0.075 },
			top: { size: 0.075, depth: 0.075 },
			bottom: { size: 0.075, depth: 0.075 },
		},
		slats: {
			top: { size: 0.02, depth: 0.02 },
			bottom: { size: 0.02, depth: 0.02 },
		},
		handle: 'alu',
		thread: {
			width: 0.035,
			height: false,
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