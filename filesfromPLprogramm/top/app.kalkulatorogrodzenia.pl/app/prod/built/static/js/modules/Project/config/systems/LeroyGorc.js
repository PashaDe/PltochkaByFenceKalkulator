import { ___ } from 'classes/Translation';


export default () => ({
	label: 'LEROY MERLIN - GORC GLL',
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
		gll: {
			visible: true,
			label: '-',
			path: 'gll',
			options: {},
			colors: {
				bronzyt: { label: ___('Bronzyt') },
				piryt: { label: ___('Piryt') },
			},
			default: {
				blocksColor: 'piryt',
				peaksFamily: 'flat',
				peaksColor: 'piryt-lupany',
			},
			settings: {
				distance: { min: 0.36, default: 6 },
				autocorner: 'c2-gll20',
				offsets: 'continuous',
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'gll20',
					width: 1,
					depth: 1,
					height: 9,
				},
				materials: {
					gll20: {
						label: 'GLL20',
						modifiable: ['line'],
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.288 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.144 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.20,
							height: 0.144,
						},
						peak1: {
							flat: 'cpgc',
						},
						peak2: {
							flat: 'cpgc',
						},
						peak3: {
							flat: 'cpgc',
						},
					},
					gld36: {
						label: 'GLD36',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.288 },
								depth1: { src: 'block.jpg', x: 0.36, y: 0.144 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.36,
							height: 0.144,
						},
						peak1: {
							flat: 'cpgcd',
						},
						peak2: {
							flat: 'cpgcd',
						},
						peak3: {
							flat: 'cpgcd',
						},
					},
					'c2-gll20': {
						label: `${___('Narożnik')} GLL20`,
						modifiable: ['corner1', 'corner2'],
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.288 },
								depth1: { src: 'width.jpg', x: 0.36, y: 0.288 },
								coupler1: { src: 'depth.jpg', x: 0.2, y: 0.144 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.36,
							height: 0.144,
							coupler: 0.20,
						},
						peak1: {
							flat: 'cpgc',
						},
						peak2: {
							flat: 'cpgc',
						},
						peak3: {
							flat: 'cpgc',
						},
					},
					'c1-gld36': {
						label: 'GLD36',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gll20',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.288 },
								depth1: { src: 'block.jpg', x: 0.36, y: 0.144 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.36,
							height: 0.144,
						},
						peak1: {
							flat: 'cpgcd',
						},
						peak2: {
							flat: 'cpgcd',
						},
						peak3: {
							flat: 'cpgcd',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'gml20',
					depth: 1,
					height: 2,
				},
				materials: {
					gml20: {
						label: 'GML20',
						support: ['gll20', 'gld36', 'c2-gll20', 'c1-gld36'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.36, y: 0.288 },
								depth1: { src: 'depth.jpg', x: 0.2, y: 0.144 },
							},
							resizeable: { depth: false, height: true },
							width: 0.36,
							depth: 0.20,
							height: 0.144,
						},
						peak2: {
							flat: 'cpgc',
						},
						peak3: {
							flat: 'cpgc',
						},
					},
				},
			},
		},
	},
	peaks: {
		flat: {
			label: ___('Daszki płaskie'),
			path: '../../joniec-gorc/peaks/flat',
			colors: {
				'bronzyt-lupany': { label: `${___('Bronzyt')} ${___('łupany')}` },
				'piryt-lupany': { label: `${___('Piryt')} ${___('łupany')}` },
			},
			materials: {
				cpgc: {
					label: `CPGC ${___('daszek płaski dwustronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'top.jpg', x: 0.6, y: 0.6 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.42,
					depth: 0.27,
					height: 0.06,
					protrude: 0.03,
				},
				cpgcd: {
					label: `CPGCD ${___('daszek płaski dwustronnie łupany')}`,
					type: 'flat4',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'top.jpg', x: 0.6, y: 0.6 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.42,
					depth: 0.42,
					height: 0.06,
					protrude: 0.03,
				},
			},
		},
	},
});