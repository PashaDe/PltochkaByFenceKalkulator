import { ___ } from 'classes/Translation';


export default () => ({
	label: 'CASTORAMA - GORC',
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
		gl: {
			visible: true,
			label: '-',
			path: '../../joniec-gorc/blocks/gl',
			options: {},
			colors: {
				// czarny: { label: ___('Czarny') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
			},
			default: {
				blocksColor: 'piryt',
				peaksFamily: 'flat',
				peaksColor: 'piryt-lupany',
			},
			settings: {
				distance: { min: 0.38, default: 5 },
				autocorner: 'c2-gl22',
				offsets: 'continuous',
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'gl22',
					width: 1,
					depth: 1,
					height: 9,
				},
				materials: {
					gl22: {
						label: 'GL22',
						modifiable: ['line'],
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'depth.jpg', x: 0.22, y: 0.16 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.22,
							height: 0.16,
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
					gl38: {
						label: 'GL38',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.16 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
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
					'c2-gl22': {
						label: `${___('Narożnik')} GL22`,
						modifiable: ['corner1', 'corner2'],
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								coupler1: { src: 'depth.jpg', x: 0.22, y: 0.16 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
							coupler: 0.22,
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
					'c1-gl38': {
						label: 'GL38',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gl22',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.16 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
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
					material: 'gm',
					depth: 1,
					height: 2,
				},
				materials: {
					gm: {
						label: 'GP',
						support: ['gl22', 'gl38', 'c2-gl22', 'c1-gl38'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'depth.jpg', x: 0.22, y: 0.16 },
							},
							resizeable: { depth: false, height: true },
							width: 0.38,
							depth: 0.22,
							height: 0.16,
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
				// 'czarny-lupany': { label: `${___('Czarny')} ${___('łupany')}` },
				'onyx-lupany': { label: `${___('Onyx')} ${___('łupany')}` },
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
					protrude: 0.02,
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
					protrude: 0.02,
				},
			},
		},
	},
});