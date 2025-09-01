import { ___ } from 'classes/Translation';


export default () => ({
	label: 'BRICO MARCHE - GORC<sup>&reg;</sup>',
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
			label: 'GORC<sup>&reg;</sup> <br /> GL22 / GL22+GL38',
			path: '../../joniec-gorc/blocks/gl',
			options: {},
			colors: {
				alaska: { label: ___('Alaska') },
				bronzyt: { label: ___('Bronzyt') },
				// cytryn: { label: ___('Cytryn') },
				czarny: { label: ___('Czarny') },
				getyt: { label: ___('Getyt') },
				// golden: { label: ___('Golden') },
				// kremowy: { label: ___('Kremowy') },
				// lava: { label: ___('Lava') },
				onyx: { label: ___('Onyx') },
				piaskowy: { label: ___('Piaskowy') },
				piryt: { label: ___('Piryt') },
				silver: { label: ___('Silver') },
				// stalowy: { label: ___('Stalowy') },
				vera: { label: ___('Vera') },
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
							flat: 'cpgs',
						},
						peak2: {
							flat: 'cpgs',
						},
						peak3: {
							flat: 'cpgm',
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
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
						},
						peak1: {
							flat: 'cpgsd',
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
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
							flat: 'cpgs',
						},
						peak2: {
							flat: 'cpgs',
						},
						peak3: {
							flat: 'cpgm',
						},
					},
					'c1-gl38': {
						label: 'GL38',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gl38',
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
							flat: 'cpgsd',
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
						},
					},
					'c2-gl38': {
						label: `${___('Narożnik')} GL38`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-gl38',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								coupler1: { src: 'depth.jpg', x: 0.38, y: 0.16 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
							coupler: 0.38,
						},
						peak1: {
							flat: 'cpgsd',
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
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
						label: 'GM',
						support: ['gl22', 'gl38', 'c2-gl22', 'c1-gl38', 'c2-gl38'],
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
							flat: 'cpgs',
						},
						peak3: {
							flat: 'cpgm',
						},
					},
				},
			},
		},
		gl38: {
			visible: true,
			label: 'GORC<sup>&reg;</sup> <br /> GL38',
			path: '../../joniec-gorc/blocks/gl',
			options: {},
			colors: {
				alaska: { label: ___('Alaska') },
				bronzyt: { label: ___('Bronzyt') },
				// cytryn: { label: ___('Cytryn') },
				czarny: { label: ___('Czarny') },
				getyt: { label: ___('Getyt') },
				// golden: { label: ___('Golden') },
				// kremowy: { label: ___('Kremowy') },
				// lava: { label: ___('Lava') },
				onyx: { label: ___('Onyx') },
				piaskowy: { label: ___('Piaskowy') },
				piryt: { label: ___('Piryt') },
				silver: { label: ___('Silver') },
				// stalowy: { label: ___('Stalowy') },
				vera: { label: ___('Vera') },
			},
			default: {
				blocksColor: 'piryt',
				peaksFamily: 'flat',
				peaksColor: 'piryt-lupany',
			},
			settings: {
				distance: { min: 0.38, default: 5 },
				autocorner: 'c2-gl38',
				offsets: 'continuous',
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'gl38',
					width: 1,
					depth: 1,
					height: 9,
				},
				materials: {
					gl38: {
						label: 'GL38',
						modifiable: ['line'],
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.16 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
						},
						peak1: {
							flat: 'cpgsd',
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
						},
					},
					'c1-gl38': {
						label: 'GL38',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gl38',
						seating: 1,
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
							flat: 'cpgsd',
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
						},
					},
					'c2-gl38': {
						label: `${___('Narożnik')} GL38`,
						modifiable: ['corner1', 'corner2'],
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								coupler1: { src: 'depth.jpg', x: 0.38, y: 0.16 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
							coupler: 0.38,
						},
						peak1: {
							flat: 'cpgsd',
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'gmd',
					depth: 1,
					height: 2,
				},
				materials: {
					gmd: {
						label: 'GMD',
						support: ['gl38', 'c1-gl38', 'c2-gl38'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.32 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.16 },
							},
							resizeable: { depth: false, height: true },
							width: 0.38,
							depth: 0.38,
							height: 0.16,
						},
						peak2: {
							flat: 'cpgsd',
						},
						peak3: {
							flat: 'cpgmd',
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
				'czarny-lupany': { label: `${___('Czarny')} ${___('łupany')}` },
				'getyt-lupany': { label: `${___('Getyt')} ${___('łupany')}` },
				'onyx-lupany': { label: `${___('Onyx')} ${___('łupany')}` },
				'piryt-lupany': { label: `${___('Piryt')} ${___('łupany')}` },
				'silver-lupany': { label: `${___('Silver')} ${___('łupany')}` },
				'vera-lupany': { label: `${___('Vera')} ${___('łupany')}` },
			},
			materials: {
				cpgs: {
					label: `CPGS ${___('daszek płaski czterostronnie łupany')}`,
					type: 'flat4',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.43,
					depth: 0.27,
					height: 0.06,
					protrude: 0.025,
				},
				cpgm: {
					label: `CPGM ${___('daszek płaski dwustronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.50,
					depth: 0.27,
					height: 0.06,
					protrude: 0.025,
				},
				cpgsd: {
					label: `CPGSD ${___('daszek płaski czterostronnie łupany')}`,
					type: 'flat4',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.43,
					depth: 0.43,
					height: 0.06,
					protrude: 0.025,
				},
				cpgmd: {
					label: `CPGMD ${___('daszek płaski dwustronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.50,
					depth: 0.43,
					height: 0.06,
					protrude: 0.025,
				},
			},
		},
	},
});