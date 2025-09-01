import { ___ } from 'classes/Translation';


export default () => ({
	label: 'MODYŃ',
	migration: false,
	technical: false,
	adds: {
		combo: false,
		fencings: { space: { top: 0.02, bottom: 0.03 } },
		wickets: { space: { top: 0.02 } },
		gates: { space: { top: 0.02 } },
		panels: true,
		mailboxes: true,
		lamps: true,
		ledblocks: false,
	},
	blocks: {
		m: {
			visible: true,
			label: '-',
			path: 'm',
			options: {},
			colors: {
				czarny: { label: ___('Czarny') },
			},
			default: {
				blocksColor: 'czarny',
				peaksFamily: 'peak',
				peaksColor: 'czarny',
			},
			settings: {
				distance: { min: 0.36, default: 5 },
				autocorner: 'c2-bl',
				offsets: false,
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'bl',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					bl: {
						label: 'BŁ',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.2 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							peak: 'cpb',
						},
						peak2: {
							peak: 'cpb',
						},
						peak3: {
							peak: 'cpb',
						},
					},
					'c2-bl': {
						label: `${___('Narożnik')} BŁ`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.2 },
								depth1: { src: 'width.jpg', x: 0.36, y: 0.2 },
								coupler1: { src: 'depth.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.36,
							height: 0.20,
							coupler: 0.20,
						},
						peak1: {
							peak: 'cpb',
						},
						peak2: {
							peak: 'cpb',
						},
						peak3: {
							peak: 'cpb',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bl',
					depth: 1,
					height: 2,
				},
				materials: {
					bl: {
						label: 'BŁ',
						support: ['bl', 'c2-bl'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.2 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { depth: false, height: true },
							width: 0.36,
							depth: 0.20,
							height: 0.20,
						},
						peak2: {
							peak: 'cpb',
						},
						peak3: {
							peak: 'cpb',
						},
					},
				},
			},
		},
	},
	peaks: {
		peak: {
			label: ___('Daszki spadowe'),
			path: 'peak',
			colors: {
				czarny: { label: ___('Czarny') },
			},
			materials: {
				cpb: {
					label: `CPB ${___('daszek dwuspadowy gładki')}`,
					type: 'peak2',
					texture: {
						universal: { src: 'universal.jpg', x: 0.2, y: 0.2 },
					},
					width: 0.417,
					depth: 0.25,
					height: 0.04,
					tip: {
						depth: 0.00,
						height: 0.01,
					},
					protrude: 0.025,
				},
			},
		},
	},
});