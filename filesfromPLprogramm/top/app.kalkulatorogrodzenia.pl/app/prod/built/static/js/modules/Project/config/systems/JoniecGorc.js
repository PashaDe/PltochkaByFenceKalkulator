import { ___ } from 'classes/Translation';


export default () => ({
	label: 'GORC<sup>&reg;</sup> de Luxe',
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
		ledblocks: true,
	},
	blocks: {
		uni: {
			visible: true,
			label: 'GORC<sup>&reg;</sup> de Luxe <br /> GL22 / GL38',
			path: 'gl',
			options: {
				// nopeak1: { type: 'checkbox', label: ___('Zamień daszki czterospadowe na dwuspadowe'), default: false, reload: true, conditions: { peaksFamily: 'peak' } },
				gm: { type: 'checkbox', label: ___('Zamień płytki GP na bloczki GM'), default: false, reload: false },
			},
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
						supportReplacement: 'gl38',
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
							peak: 'csbnr',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
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
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
					'c2-gl22': {
						label: `${___('Narożnik')} GL22`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-gl38',
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
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
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
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
					'c2-gl38': {
						label: `${___('Narożnik')} GL38`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-gl38',
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
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
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
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
				},
			},
		},
		uni8: {
			visible: true,
			label: `GORC<sup>&reg;</sup> de Luxe <br /> GL22/8 / GL38/8 <br /> <small>(${___('Na indywidualne zapytania')})</small>`,
			path: 'gl8',
			options: {
				// nopeak1: { type: 'checkbox', label: ___('Zamień daszki czterospadowe na dwuspadowe'), default: false, reload: true, conditions: { peaksFamily: 'peak' } },
			},
			colors: {
				czarny: { label: ___('Czarny') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
				silver: { label: ___('Silver') },
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
					height: 18,
				},
				materials: {
					gl22: {
						label: 'GL22/8',
						modifiable: ['line'],
						supportReplacement: 'gl38',
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'depth.jpg', x: 0.22, y: 0.08 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.22,
							height: 0.08,
						},
						peak1: {
							peak: 'csbnr',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
					gl38: {
						label: 'GL38/8',
						modifiable: ['line'],
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.08 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.08,
						},
						peak1: {
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
					'c2-gl22': {
						label: `${___('Narożnik')} GL22/8`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-gl38',
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								coupler1: { src: 'depth.jpg', x: 0.22, y: 0.08 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.08,
							coupler: 0.22,
						},
						peak1: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
					'c1-gl38': {
						label: 'GL38/8',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gl38',
						seating: 1,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.08 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.08,
						},
						peak1: {
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
					'c2-gl38': {
						label: `${___('Narożnik')} GL38/8`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-gl38',
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								coupler1: { src: 'depth.jpg', x: 0.38, y: 0.08 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.38,
							depth: 0.38,
							height: 0.08,
							coupler: 0.38,
						},
						peak1: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'gm',
					depth: 1,
					height: 4,
				},
				materials: {
					gm: {
						label: 'GMM',
						support: ['gl22', 'gl38', 'c2-gl22', 'c1-gl38', 'c2-gl38'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'depth.jpg', x: 0.22, y: 0.08 },
							},
							resizeable: { depth: false, height: true },
							width: 0.38,
							depth: 0.22,
							height: 0.08,
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
					gmd: {
						label: 'GMDM',
						support: ['gl38', 'c1-gl38', 'c2-gl38'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.16 },
								depth1: { src: 'block.jpg', x: 0.38, y: 0.08 },
							},
							resizeable: { depth: false, height: true },
							width: 0.38,
							depth: 0.38,
							height: 0.08,
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
				},
			},
		},
		gl: {
			visible: false,
			label: 'GORC<sup>&reg;</sup> de Luxe <br /> GL22 / GL22+GL38',
			path: 'gl',
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
							peak: 'csbnr',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
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
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
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
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
				},
			},
		},
		gl38: {
			visible: false,
			label: 'GORC<sup>&reg;</sup> de Luxe <br /> GL38',
			path: 'gl',
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
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
				},
			},
		},
		gl8: {
			visible: false,
			label: `GORC<sup>&reg;</sup> de Luxe <br /> GL22/8 / GL22/8+GL38/8 <br /> <small>(${___('Na indywidualne zapytania')})</small>`,
			path: 'gl8-mix',
			options: {},
			colors: {
				czarny: { label: ___('Czarny') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
				silver: { label: ___('Silver') },
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
					height: 7,
				},
				materials: {
					gl22: {
						label: 'GL22/8',
						modifiable: ['line'],
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								depth1: { src: 'depth1.jpg', x: 0.22, y: 0.48 },
								depth3: { src: 'depth3.jpg', x: 0.22, y: 0.48 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.22,
							height: 0.24,
						},
						peak1: {
							peak: 'csbnr',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
					gl38: {
						label: 'GL38/8',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								depth1: { src: 'block1.jpg', x: 0.38, y: 0.48 },
								depth3: { src: 'block3.jpg', x: 0.38, y: 0.48 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.24,
						},
						peak1: {
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
					'c2-gl22': {
						label: `${___('Narożnik')} GL22/8`,
						modifiable: ['corner1', 'corner2'],
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								depth1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								coupler1: { src: 'depth1.jpg', x: 0.22, y: 0.48 },
								coupler3: { src: 'depth3.jpg', x: 0.22, y: 0.48 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.24,
							coupler: 0.22,
						},
						peak1: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
					'c1-gl38': {
						label: 'GL38/8',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gl38',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								depth1: { src: 'block1.jpg', x: 0.38, y: 0.48 },
								depth3: { src: 'block3.jpg', x: 0.38, y: 0.48 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.24,
						},
						peak1: {
							peak: 'csdr',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
							flat: 'cpgmd',
						},
					},
					'c2-gl38': {
						label: `${___('Narożnik')} GL38/8`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-gl38',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								depth1: { src: 'width.jpg', x: 0.76, y: 0.48 },
								coupler1: { src: 'block1.jpg', x: 0.38, y: 0.48 },
								coupler3: { src: 'block3.jpg', x: 0.38, y: 0.48 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.38,
							depth: 0.38,
							height: 0.24,
							coupler: 0.38,
						},
						peak1: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak2: {
							peak: 'cpdd',
							flat: 'cpgsd',
						},
						peak3: {
							peak: 'cpdd',
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
						label: 'GM/GMM',
						support: ['gl22', 'gl38', 'c2-gl22', 'c1-gl38', 'c2-gl38'],
						block: {
							schedule: [0.12, 0.26, 0.5, 0.64],
							texture: {
								width1: { src: 'wall_width.jpg', x: 0.76, y: 0.32 },
								depth1: { src: 'wall_depth1.jpg', x: 0.22, y: 0.32 },
								depth3: { src: 'wall_depth3.jpg', x: 0.22, y: 0.32 },
								depth5: { src: 'wall_depth5.jpg', x: 0.22, y: 0.32 },
								depth7: { src: 'wall_depth7.jpg', x: 0.22, y: 0.32 },
							},
							resizeable: { depth: false, height: false },
							width: 0.38,
							depth: 0.22,
							height: 0.16,
						},
						peak2: {
							peak: 'cbg',
							flat: 'cpgs',
						},
						peak3: {
							peak: 'cbg',
							flat: 'cpgm',
						},
					},
				},
			},
		},
	},
	peaks: {
		/* peak: {
			label: ___('Daszki spadowe'),
			path: 'peak',
			colors: {
				'braz-ciemny': { label: ___('Brąz Ciemny') },
				'braz-jasny': { label: ___('Brąz Jasny') },
				czarny: { label: ___('Czarny') },
				kremowy: { label: ___('Kremowy') },
				// piaskowy: { label: ___('Piaskowy') },
				// stalowy: { label: ___('Stalowy') },
				// zolty: { label: ___('Żółty') },
			},
			materials: {
				csbnr: {
					label: `CSBNR ${___('daszek czterospadowy gładki')}`,
					type: 'peak4',
					texture: {
						universal: { src: 'universal.jpg', x: 0.2, y: 0.2 },
					},
					width: 0.45,
					depth: 0.28,
					height: 0.04,
					tip: {
						width: 0.21,
						depth: 0.00,
						height: 0.02,
					},
					protrude: 0.035,
				},
				cbg: {
					label: `CBG ${___('daszek dwuspadowy gładki')}`,
					type: 'peak2',
					texture: {
						universal: { src: 'universal.jpg', x: 0.2, y: 0.2 },
					},
					width: 0.24,
					depth: 0.28,
					height: 0.04,
					tip: {
						depth: 0.00,
						height: 0.02,
					},
					protrude: 0.035,
				},
				csdr: {
					disabled: {
						colors: ['zolty'],
						material: 'cpdd',
					},
					label: `CSDR ${___('daszek czterospadowy gładki')}`,
					type: 'peak4',
					texture: {
						universal: { src: 'universal.jpg', x: 0.2, y: 0.2 },
					},
					width: 0.47,
					depth: 0.47,
					height: 0.04,
					tip: {
						width: 0.21,
						depth: 0.00,
						height: 0.03,
					},
					protrude: 0.045,
				},
				cpdd: {
					label: `CPDD ${___('daszek dwuspadowy gładki')}`,
					type: 'peak2',
					texture: {
						universal: { src: 'universal.jpg', x: 0.2, y: 0.2 },
					},
					width: 0.47,
					depth: 0.47,
					height: 0.04,
					tip: {
						depth: 0.00,
						height: 0.03,
					},
					protrude: 0.045,
				},
			},
		}, */
		flat: {
			label: ___('Daszki płaskie'),
			path: 'flat',
			colors: {
				'alaska-lupany': { label: `${___('Alaska')} ${___('łupany')}` },
				'bronzyt-lupany': { label: `${___('Bronzyt')} ${___('łupany')}` },
				'czarny-lupany': { label: `${___('Czarny')} ${___('łupany')}` },
				'getyt-lupany': { label: `${___('Getyt')} ${___('łupany')}` },
				'onyx-lupany': { label: `${___('Onyx')} ${___('łupany')}` },
				'piaskowy-lupany': { label: `${___('Piaskowy')} ${___('łupany')}` },
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