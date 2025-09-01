import { ___ } from 'classes/Translation';


export default () => ({
	label: 'PSB - DRAGO',
	migration: false,
	technical: false,
	adds: {
		combo: { bone: 'roma' },
		fencings: false,
		wickets: false,
		gates: false,
		panels: false,
		mailboxes: false,
		lamps: false,
		ledblocks: false,
	},
	blocks: {
		d15: {
			visible: true,
			label: 'BDR15',
			path: 'd15',
			options: {},
			colors: {
				nero: { label: ___('Nero') },
				amber: { label: ___('Amber') },
				galena: { label: ___('Galena') },
			},
			default: {
				blocksColor: 'galena',
				peaksFamily: 'flat',
				peaksColor: 'galena',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-bdr15',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bdr15',
					width: 1,
					depth: 1,
					height: 10,
				},
				materials: {
					bdr15: {
						label: 'BDR15',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.155 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.155 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.20,
							height: 0.155,
						},
						peak1: {
							flat: 'cdr20',
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
					'c2-bdr15': {
						label: 'BDR15',
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.155 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.155 },
								coupler1: { src: 'depth.jpg', x: 0.2, y: 0.155 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.155,
							coupler: 0.20,
						},
						peak1: {
							flat: 'cdr20',
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bdr15',
					depth: 1,
					height: 2,
				},
				materials: {
					bdr15: {
						label: 'BDR15',
						support: ['bdr15', 'c2-bdr15'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.155 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.155 },
								depth3: { src: 'depth.jpg', x: 0.2, y: 0.155 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.20,
							height: 0.155,
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
				},
			},
		},
		d31: {
			visible: true,
			label: 'BDR31',
			path: 'd31',
			options: {},
			colors: {
				nero: { label: ___('Nero') },
				amber: { label: ___('Amber') },
				galena: { label: ___('Galena') },
			},
			default: {
				blocksColor: 'galena',
				peaksFamily: 'flat',
				peaksColor: 'galena',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-bdr31',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bdr31',
					width: 1,
					depth: 1,
					height: 5,
				},
				materials: {
					bdr31: {
						label: 'BDR31',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.31 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.31 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.20,
							height: 0.31,
						},
						peak1: {
							flat: 'cdr20',
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
					'c2-bdr31': {
						label: 'BDR31',
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.31 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.31 },
								coupler1: { src: 'depth.jpg', x: 0.2, y: 0.31 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.31,
							coupler: 0.20,
						},
						peak1: {
							flat: 'cdr20',
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bdr31',
					depth: 1,
					height: 1,
				},
				materials: {
					bdr31: {
						label: 'BDR31',
						support: ['bdr31', 'c2-bdr31'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.31 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.31 },
								depth3: { src: 'depth.jpg', x: 0.2, y: 0.31 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.20,
							height: 0.31,
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
				},
			},
		},
		d15_31: {
			visible: true,
			label: 'BDR15/31',
			path: 'd15_31',
			options: {},
			colors: {
				nero: { label: ___('Nero') },
				amber: { label: ___('Amber') },
				galena: { label: ___('Galena') },
			},
			default: {
				blocksColor: 'galena',
				peaksFamily: 'flat',
				peaksColor: 'galena',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-bdr15',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bdr15',
					width: 1,
					depth: 1,
					height: 7,
				},
				materials: {
					bdr15: {
						label: 'BDR15/31',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.465 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.465 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.20,
							height: [0.155, 0.31],
						},
						peak1: {
							flat: 'cdr20',
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
					'c2-bdr15': {
						label: 'BDR15/31',
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.465 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.465 },
								coupler1: { src: 'depth.jpg', x: 0.2, y: 0.465 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: [0.155, 0.31],
							coupler: 0.20,
						},
						peak1: {
							flat: 'cdr20',
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bdr15',
					depth: 1,
					height: 1,
				},
				materials: {
					bdr15: {
						label: 'BDR15/31',
						support: ['bdr15', 'c2-bdr15'],
						block: {
							schedule: [0.403],
							texture: {
								width1: { src: 'wall_width.jpg', x: 0.806, y: 0.31 },
								depth1: { src: 'wall_depth1.jpg', x: 0.2, y: 0.31 },
								depth3: { src: 'wall_depth3.jpg', x: 0.2, y: 0.31 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.20,
							height: 0.31,
						},
						peak2: {
							flat: 'cdr20',
						},
						peak3: {
							flat: 'cdr20',
						},
					},
				},
			},
		},
	},
	peaks: {
		flat: {
			label: ___('Daszki płaskie'),
			path: 'flat',
			colors: {
				nero: { label: ___('Nero') },
				amber: { label: ___('Amber') },
				galena: { label: ___('Galena') },
			},
			materials: {
				cdr20: {
					label: `CDR20 ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 0.403, y: 0.05 },
						depth1: { src: 'depth.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top.jpg', x: 0.403, y: 0.2 },
					},
					width: 0.403,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});