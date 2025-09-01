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
		},
		bracket1: {
			size: 0.04,
			depth: 0.02,
			position: { x: 0, y: 0, z: 0.02 },
		},
		bracket2: {
			size: 0.04,
			depth: 0.02,
			position: { x: 0, y: 0.20, z: 0.02 },
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