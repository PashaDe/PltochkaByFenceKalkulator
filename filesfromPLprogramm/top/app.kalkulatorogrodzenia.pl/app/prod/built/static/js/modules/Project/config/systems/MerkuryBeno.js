import { ___ } from 'classes/Translation';


export default () => ({
	label: 'MERKURY MARKET - BENO',
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
		b: {
			visible: true,
			label: '-',
			path: 'b',
			options: {},
			colors: {
				marengo: { label: ___('Marengo') },
				piryt: { label: ___('Piryt') },
				nero: { label: ___('Nero') },
			},
			default: {
				blocksColor: 'marengo',
				peaksFamily: 'flat',
				peaksColor: 'marengo',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-beno20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'beno20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					beno20: {
						label: 'BENO20',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'dbn20',
						},
						peak2: {
							flat: 'dbn20',
						},
						peak3: {
							flat: 'dbn20',
						},
					},
					beno40: {
						label: 'BENO40',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth40.jpg', x: 0.403, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
						},
						peak1: {
							flat: 'dbn40',
						},
						peak2: {
							flat: 'dbn40',
						},
						peak3: {
							flat: 'dbn40',
						},
					},
					'c2-beno20': {
						label: `${___('Narożnik')} BENO20`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								coupler1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
							coupler: 0.20,
						},
						peak1: {
							flat: 'dbn20',
						},
						peak2: {
							flat: 'dbn20',
						},
						peak3: {
							flat: 'dbn20',
						},
					},
					'c1-beno40': {
						label: 'BENO40',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-beno40',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth40.jpg', x: 0.403, y: 0.6 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
						},
						peak1: {
							flat: 'dbn40',
						},
						peak2: {
							flat: 'dbn40',
						},
						peak3: {
							flat: 'dbn40',
						},
					},
					'c2-beno40': {
						label: `${___('Narożnik')} BENO40`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-beno40',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								coupler1: { src: 'depth40.jpg', x: 0.403, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
							coupler: 0.403,
						},
						peak1: {
							flat: 'dbn40',
						},
						peak2: {
							flat: 'dbn40',
						},
						peak3: {
							flat: 'dbn40',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'beno20',
					depth: 1,
					height: 2,
				},
				materials: {
					beno20: {
						label: 'BENO20',
						support: ['beno20', 'beno40', 'c2-beno20', 'c1-beno40', 'c2-beno40'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.20,
							height: 0.20,
						},
						peak2: {
							flat: 'dbn20',
						},
						peak3: {
							flat: 'dbn20',
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
				marengo: { label: ___('Marengo') },
				piryt: { label: ___('Piryt') },
				nero: { label: ___('Nero') },
			},
			materials: {
				dbn20: {
					label: `DBN20 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.209, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top20.jpg', x: 1.209, y: 0.2 },
					},
					width: 0.403,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
				dbn40: {
					label: `DBN40 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.209, y: 0.06 },
						depth1: { src: 'depth40.jpg', x: 0.403, y: 0.06 },
						top: { src: 'top40.jpg', x: 1.209, y: 0.403 },
					},
					width: 0.403,
					depth: 0.403,
					height: 0.06,
					protrude: 0,
				},
			},
		},
	},
});