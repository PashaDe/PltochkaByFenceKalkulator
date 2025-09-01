import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Horizon',
	migration: 'roma',
	technical: false,
	adds: {
		combo: { sea_tide: 'roma' },
		fencings: { space: { top: 0, bottom: 0.03 } },
		wickets: { space: { top: 0 } },
		gates: { space: { top: 0 } },
		panels: true,
		mailboxes: true,
		lamps: true,
		ledblocks: true,
	},
	blocks: {
		rh: {
			visible: true,
			label: '-',
			path: 'rh',
			options: {},
			colors: {
				grafit: { label: ___('Grafit') },
				marengo: { label: ___('Marengo') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
				bialy: { label: ___('Biały') },
				// platinum: { label: ___('Platinum') },
				amber: { label: ___('Amber') },
				nero: { label: ___('Nero') },
				magnetyt: { label: ___('Magnetyt') },
			},
			default: {
				blocksColor: 'onyx',
				peaksFamily: 'flat',
				peaksColor: 'onyx',
			},
			settings: {
				distance: { min: 0.504, default: 5 },
				autocorner: 'c2-bh20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bh20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					bh20: {
						label: 'BH20',
						modifiable: ['line'],
						supportReplacement: 'bh28',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'ch20',
						},
						peak2: {
							flat: 'ch20',
						},
						peak3: {
							flat: 'ch20',
						},
					},
					bh28: {
						label: 'BH28',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.28,
							height: 0.20,
						},
						peak1: {
							flat: 'ch28',
						},
						peak2: {
							flat: 'ch28',
						},
						peak3: {
							flat: 'ch28',
						},
					},
					'c2-bh20': {
						label: `${___('Narożnik')} BH20`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-bh28',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								coupler1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.504,
							height: 0.20,
							coupler: 0.20,
						},
						peak1: {
							flat: 'ch20',
						},
						peak2: {
							flat: 'ch20',
						},
						peak3: {
							flat: 'ch20',
						},
					},
					'c2-bh28': {
						label: `${___('Narożnik')} BH28`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								coupler1: { src: 'depth28.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.504,
							height: 0.20,
							coupler: 0.28,
						},
						peak1: {
							flat: 'ch28',
						},
						peak2: {
							flat: 'ch28',
						},
						peak3: {
							flat: 'ch28',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bh20',
					depth: 1,
					height: 2,
				},
				materials: {
					bh20: {
						label: 'BH20',
						support: ['bh20', 'bh28', 'c2-bh20', 'c2-bh28'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.504,
							depth: 0.20,
							height: 0.20,
						},
						peak2: {
							flat: 'ch20',
						},
						peak3: {
							flat: 'ch20',
						},
					},
					bh28: {
						label: 'BH28',
						support: ['bh28', 'c2-bh28'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.504,
							depth: 0.28,
							height: 0.20,
						},
						peak2: {
							flat: 'ch28',
						},
						peak3: {
							flat: 'ch28',
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
				grafit: { label: ___('Grafit') },
				marengo: { label: ___('Marengo') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
				bialy: { label: ___('Biały') },
				// platinum: { label: ___('Platinum') },
				amber: { label: ___('Amber') },
				nero: { label: ___('Nero') },
				magnetyt: { label: ___('Magnetyt') },
			},
			materials: {
				ch20: {
					label: `CH20 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.512, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top20.jpg', x: 1.512, y: 0.2 },
					},
					width: 0.504,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
				ch28: {
					label: `CH28 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.512, y: 0.05 },
						depth1: { src: 'depth28.jpg', x: 0.28, y: 0.05 },
						top: { src: 'top28.jpg', x: 1.512, y: 0.28 },
					},
					width: 0.504,
					depth: 0.28,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});