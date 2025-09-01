import { ___ } from 'classes/Translation';

import data from './data';


export default () => ({
	label: 'HORIZONTAL',
	colors: data().colors.default,
	default: {
		type: 'sliding',
		variant: 'horizontal150d',
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
				customizable: data().customizables.default,
				opentime: 20,
				type: 'horizontal',
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
				customizable: data().customizables.default,
				opentime: 10,
				type: 'horizontal',
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
		},
	},
});