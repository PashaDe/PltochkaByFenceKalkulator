import { ___ } from 'classes/Translation';

import data from './data';


export default () => ({
	label: 'VERTICAL',
	colors: data().colors.default,
	default: {
		type: 'sliding',
		variant: 'vertical',
		color: 'ral9005',
	},
	types: {
		sliding: {
			label: ___('Przesuwne'),
			pattern: {
				size: {
					minWidth: 2.60,
					maxWidth: 6.00,
					minHeight: 1.00,
					maxHeight: 2.20,
					bottomSpace: 0.09,
				},
				customizable: false,
				opentime: 20,
				type: 'vertical',
				basement: {
					top: { width: 0.50, height: 0.04, depth: 0.08, inside: 0.04 },
					bottom: { width: false, height: 0.06, depth: 0.04 },
					base: { width: false, height: 0.08, depth: 0.08 },
				},
				frame: {
					left: { size: 0.04, depth: 0.08 },
					right: { size: 0.04, depth: 0.08 },
				},
				extra: {
					type: 'triangle',
					width: 2.00,
					size: 0.08,
					depth: 0.08,
				},
				support: {
					depth: 0.30,
					space: 0.05,
					top: {
						height: 0.05,
					},
					pole: {
						width: 0.10,
						depth: 0.10,
					},
					bottom: {
						width: 0.30,
						height: 0.01,
					},
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
		},
		swing: {
			label: ___('Dwuskrzydłowe'),
			pattern: {
				size: {
					minWidth: 2.60,
					maxWidth: 6.00,
					minHeight: 1.00,
					maxHeight: 2.20,
				},
				customizable: false,
				opentime: 10,
				type: 'vertical',
				frame: {
					left: { size: 0.075, depth: 0.075 },
					right: { size: 0.075, depth: 0.075 },
					top: { size: 0.075, depth: 0.075 },
					bottom: { size: 0.075, depth: 0.075 },
				},
				handle: 'alu',
				thread: {
					width: 0.015,
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
		},
	},
});