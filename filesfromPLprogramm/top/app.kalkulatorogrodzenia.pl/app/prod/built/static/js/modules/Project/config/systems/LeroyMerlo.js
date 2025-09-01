import { ___ } from 'classes/Translation';


export default () => ({
	label: 'LEROY MERLIN - MERLO',
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
		m: {
			visible: true,
			label: '-',
			path: 'm',
			options: {},
			colors: {
				peryd: { label: ___('Peryd') },
				selen: { label: ___('Selen') },
				grafit: { label: ___('Czarny') },
			},
			default: {
				blocksColor: 'peryd',
				peaksFamily: 'flat',
				peaksColor: 'peryd',
			},
			settings: {
				distance: { min: 0.504, default: 4 },
				autocorner: 'c2-bml20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bml20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					bml20: {
						label: 'BML20',
						modifiable: ['line'],
						supportReplacement: 'bml28',
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
							flat: 'dml20',
						},
						peak2: {
							flat: 'dml20',
						},
						peak3: {
							flat: 'dml20',
						},
					},
					bml28: {
						disabled: {
							colors: ['peryd', 'selen'],
							material: 'bml20',
							peaks: true,
						},
						label: 'BML28',
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
							flat: 'dml28',
						},
						peak2: {
							flat: 'dml28',
						},
						peak3: {
							flat: 'dml28',
						},
					},
					'c2-bml20': {
						label: `${___('Narożnik')} BML20`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-bml28',
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
							flat: 'dml20',
						},
						peak2: {
							flat: 'dml20',
						},
						peak3: {
							flat: 'dml20',
						},
					},
					'c2-bml28': {
						disabled: {
							colors: ['peryd', 'selen'],
							material: 'c2-bml20',
							peaks: true,
						},
						label: `${___('Narożnik')} BML28`,
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
							flat: 'dml28',
						},
						peak2: {
							flat: 'dml28',
						},
						peak3: {
							flat: 'dml28',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bml20',
					depth: 1,
					height: 2,
				},
				materials: {
					bml20: {
						label: 'BML20',
						support: ['bml20', 'bml28', 'c2-bml20', 'c2-bml28'],
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
							flat: 'dml20',
						},
						peak3: {
							flat: 'dml20',
						},
					},
					bml28: {
						disabled: {
							colors: ['peryd', 'selen'],
							material: 'bml20',
							peaks: true,
						},
						label: 'BML28',
						support: ['bml28', 'c2-bml28'],
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
							flat: 'dml28',
						},
						peak3: {
							flat: 'dml28',
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
				peryd: { label: ___('Peryd') },
				selen: { label: ___('Selen') },
				grafit: { label: ___('Czarny') },
			},
			materials: {
				dml20: {
					label: `DML20 ${___('daszek gładki')}`,
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
				dml28: {
					disabled: {
						colors: ['peryd', 'selen'],
						material: 'dml20',
						target: true,
					},
					label: `DML28 ${___('daszek gładki')}`,
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