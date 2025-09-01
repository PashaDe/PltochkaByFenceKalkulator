import { ___ } from 'classes/Translation';

import data from './data';


export default () => ({
	label: 'MEDIO',
	colors: data().colors.default,
	default: {
		type: 'sliding',
		variant: 'medio20',
		color: 'ral7016',
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
				type: 'horizontal',
				basement: {
					top: { width: 0, height: 0.04, depth: 0.08 },
					bottom: { width: false, height: 0.06, depth: 0.04 },
					base: { width: false, height: 0.08, depth: 0.08 },
				},
				frame: {
					left: { size: 0.04, depth: 0.08 },
					center: { size: 0.04, depth: 0.08 },
					right: { size: 0.04, depth: 0.08 },
				},
				slats: {
					top: { space: null },
					bottom: { space: null },
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
				extra: {
					type: 'square',
					width: 1.50,
					size: 0.04,
					depth: 0.04,
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
				medio20: {
					label: 'Medio 20',
					slats: {
						top: { space: 0.01 },
						bottom: { space: 0.01 },
					},
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
					slats: {
						top: { space: 0.015 },
						bottom: { space: 0.015 },
					},
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
					slats: {
						top: { space: 0.02 },
						bottom: { space: 0.02 },
					},
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
					slats: {
						top: { space: 0.025 },
						bottom: { space: 0.025 },
					},
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
					slats: {
						top: { space: 0.03 },
						bottom: { space: 0.03 },
					},
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
					slats: {
						top: { space: 0.035 },
						bottom: { space: 0.035 },
					},
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
					slats: {
						top: { space: 0.04 },
						bottom: { space: 0.04 },
					},
					panels: {
						variant: {
							structure: {
								space: 0.08,
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
					width: 0.015,
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
		},
	},
});