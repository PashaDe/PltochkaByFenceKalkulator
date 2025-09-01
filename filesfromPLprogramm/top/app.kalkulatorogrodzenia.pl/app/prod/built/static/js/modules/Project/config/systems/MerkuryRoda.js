import { ___ } from 'classes/Translation';


export default () => ({
	label: 'MERKURY MARKET - RODA',
	migration: false,
	technical: false,
	adds: {
		combo: false,
		fencings: false,
		wickets: false,
		gates: false,
		panels: false,
		mailboxes: false,
		lamps: false,
		ledblocks: false,
	},
	blocks: {
		p: {
			visible: true,
			label: '-',
			path: '../../psb-piro/blocks/p',
			options: {},
			colors: {
				cyrkon: { label: ___('Cyrkon') },
				kasyt: { label: ___('Kasyt') },
				onyx: { label: ___('Onyx') },
			},
			default: {
				blocksColor: 'onyx',
				peaksFamily: 'flat',
				peaksColor: 'onyx',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-bp28',
				offsets: false,
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'bp28',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					bp28: {
						label: 'RODA28',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.28,
							height: 0.20,
						},
						peak1: {
							flat: 'cp33',
						},
						peak2: {
							flat: 'cp33',
						},
						peak3: {
							flat: 'cp33',
						},
					},
					bp16: {
						label: 'RODA16',
						modifiable: ['line'],
						supportReplacement: 'bp28',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth16.jpg', x: 0.16, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.16,
							height: 0.20,
						},
						peak1: {
							flat: 'cp20',
						},
						peak2: {
							flat: 'cp20',
						},
						peak3: {
							flat: 'cp20',
						},
					},
					'c2-bp28': {
						label: `${___('Narożnik')} RODA28`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								coupler1: { src: 'depth28.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
							coupler: 0.28,
						},
						peak1: {
							flat: 'cp33',
						},
						peak2: {
							flat: 'cp33',
						},
						peak3: {
							flat: 'cp33',
						},
					},
					'c2-bp16': {
						label: `${___('Narożnik')} RODA16`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								coupler1: { src: 'depth16.jpg', x: 0.16, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
							coupler: 0.16,
						},
						peak1: {
							flat: 'cp20',
						},
						peak2: {
							flat: 'cp20',
						},
						peak3: {
							flat: 'cp20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bp16',
					depth: 1,
					height: 2,
				},
				materials: {
					bp28: {
						label: 'RODA28',
						support: ['bp28', 'c2-bp28'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.28,
							height: 0.20,
						},
						peak2: {
							flat: 'cp33',
						},
						peak3: {
							flat: 'cp33',
						},
					},
					bp16: {
						label: 'RODA16',
						support: ['bp28', 'bp16', 'c2-bp28', 'c2-bp16'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth16.jpg', x: 0.16, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.16,
							height: 0.20,
						},
						peak2: {
							flat: 'cp20',
						},
						peak3: {
							flat: 'cp20',
						},
					},
				},
			},
		},
	},
	peaks: {
		flat: {
			label: ___('Daszki płaskie'),
			path: '../../psb-piro/peaks/flat',
			colors: {
				cyrkon: { label: ___('Cyrkon') },
				kasyt: { label: ___('Kasyt') },
				onyx: { label: ___('Onyx') },
			},
			materials: {
				cp33: {
					label: `DRD33 ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'universal.jpg', x: 0.45, y: 0.05 },
						depth1: { src: 'universal.jpg', x: 0.33, y: 0.05 },
						top: { src: 'universal.jpg', x: 0.45, y: 0.33 },
					},
					width: 0.45,
					depth: 0.33,
					height: 0.05,
					protrude: 0.0235,
				},
				cp20: {
					label: `DRD20 ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'universal.jpg', x: 0.403, y: 0.05 },
						depth1: { src: 'universal.jpg', x: 0.2, y: 0.05 },
						top: { src: 'universal.jpg', x: 0.403, y: 0.2 },
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