import { ___ } from 'classes/Translation';


export default () => ({
	label: 'PSB - ATOL',
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
		a: {
			visible: true,
			label: '-',
			path: '../../joniec-gorc_top/blocks/gt',
			options: {},
			colors: {
				bronzyt: { label: ___('Bronzyt') },
				czarny: { label: ___('Czarny') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
			},
			default: {
				blocksColor: 'piryt',
				peaksFamily: 'flat',
				peaksColor: 'piryt',
			},
			settings: {
				distance: { min: 0.38, default: 5 },
				autocorner: 'c2-gts38',
				offsets: false,
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'gts38',
					width: 1,
					depth: 1,
					height: 9,
				},
				materials: {
					gts38: {
						label: 'GAS38',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'depth.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
						},
						peak1: {
							flat: 'cpgts43',
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
					'c1-gts38': {
						label: 'GAS38',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gts38',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'depth.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
						},
						peak1: {
							flat: 'cpgts43',
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
					'c2-gts38': {
						label: `${___('Narożnik')} GAS38`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-gts38',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								coupler1: { src: 'depth.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
							coupler: 0.38,
						},
						peak1: {
							flat: 'cpgts43',
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
					gtm38: {
						label: 'GAM38',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'depth_m.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
						},
						peak1: {
							flat: 'cpgts43',
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
					'c1-gtm38': {
						label: 'GAM38',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-gtm38',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'depth_m.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
						},
						peak1: {
							flat: 'cpgts43',
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
					'c2-gtm38': {
						label: `${___('Narożnik')} GAM38`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-gtm38',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								coupler1: { src: 'depth_m.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
							coupler: 0.38,
						},
						peak1: {
							flat: 'cpgts43',
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'gtp',
					depth: 1,
					height: 2,
				},
				materials: {
					gtp: {
						label: 'GAP',
						support: ['gts38', 'c1-gts38', 'c2-gts38', 'gtm38', 'c1-gtm38', 'c2-gtm38'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'depth.jpg', x: 0.22, y: 0.159 },
							},
							resizeable: { depth: false, height: true },
							width: 0.38,
							depth: 0.22,
							height: 0.159,
						},
						peak2: {
							flat: 'cpgtm27',
						},
						peak3: {
							flat: 'cpgtm27',
						},
					},
					gtm: {
						label: 'GAM38',
						support: ['gts38', 'c1-gts38', 'c2-gts38'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.38, y: 0.159 },
								depth1: { src: 'depth_m.jpg', x: 0.38, y: 0.159 },
							},
							resizeable: { depth: false, height: true },
							width: 0.38,
							depth: 0.38,
							height: 0.159,
						},
						peak2: {
							flat: 'cpgts43',
						},
						peak3: {
							flat: 'cpgtm43',
						},
					},
				},
			},
		},
	},
	peaks: {
		flat: {
			label: ___('Daszki płaskie'),
			path: '../../joniec-gorc_top/peaks/flat',
			colors: {
				bronzyt: { label: ___('Bronzyt') },
				czarny: { label: ___('Czarny') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
			},
			materials: {
				cpgts43: {
					label: `CPGAS43 ${___('daszek czterostronnie łupany')}`,
					type: 'flat4',
					texture: {
						width1: { src: 'side.jpg', x: 1, y: 0.18 },
						depth1: { src: 'side.jpg', x: 1, y: 0.18 },
						top: { src: 'top.jpg', x: 0.4, y: 0.4 },
					},
					width: 0.43,
					depth: 0.43,
					height: 0.06,
					protrude: 0.025,
				},
				cpgtm43: {
					label: `CPGAM43 ${___('daszek dwustronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 1, y: 0.18 },
						depth1: { src: 'side.jpg', x: 1, y: 0.18 },
						top: { src: 'top.jpg', x: 0.4, y: 0.4 },
					},
					width: 0.50,
					depth: 0.43,
					height: 0.06,
					protrude: 0.025,
				},
				cpgtm27: {
					label: `CPGAM27 ${___('daszek dwustronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 1, y: 0.18 },
						depth1: { src: 'side.jpg', x: 1, y: 0.18 },
						top: { src: 'top.jpg', x: 0.4, y: 0.4 },
					},
					width: 0.50,
					depth: 0.27,
					height: 0.06,
					protrude: 0.025,
				},
			},
		},
	},
});