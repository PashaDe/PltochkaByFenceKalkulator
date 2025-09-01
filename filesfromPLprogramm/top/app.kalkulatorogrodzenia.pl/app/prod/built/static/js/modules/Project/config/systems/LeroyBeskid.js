import { ___ } from 'classes/Translation';


export default () => ({
	label: 'LEROY MERLIN - BESKID',
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
			path: '../../castorama-casto/blocks/c',
			options: {},
			colors: {
				kremowy: { label: ___('Kremowy') },
				czarny: { label: ___('Czarny') },
			},
			default: {
				blocksColor: 'kremowy',
				peaksFamily: 'flat',
				peaksColor: 'kremowy',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-bmm20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bmm20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					bmm20: {
						label: 'BMM20',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'dbmm',
						},
						peak2: {
							flat: 'dbmm',
						},
						peak3: {
							flat: 'dbmm',
						},
					},
					bsm40: {
						label: 'BSM40',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.2 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
						},
						peak1: {
							flat: 'dbsm',
						},
						peak2: {
							flat: 'dbsm',
						},
						peak3: {
							flat: 'dbsm',
						},
					},
					bbpm20: {
						label: 'BBPM20',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width25.jpg', x: 0.252, y: 0.2 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.252,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'dbpm',
						},
						peak2: {
							flat: 'dbpm',
						},
						peak3: {
							flat: 'dbpm',
						},
					},
					'c2-bmm20': {
						label: `${___('Narożnik')} BMM20`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								coupler1: { src: 'depth20.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
							coupler: 0.20,
						},
						peak1: {
							flat: 'dbmm',
						},
						peak2: {
							flat: 'dbmm',
						},
						peak3: {
							flat: 'dbmm',
						},
					},
					'c1-bsm40': {
						label: 'BSM40',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-bsm40',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.2 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
						},
						peak1: {
							flat: 'dbsm',
						},
						peak2: {
							flat: 'dbsm',
						},
						peak3: {
							flat: 'dbsm',
						},
					},
					'c2-bsm40': {
						label: `${___('Narożnik')} BSM40`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-bsm40',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								depth1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								coupler1: { src: 'width.jpg', x: 0.403, y: 0.2 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.403,
							depth: 0.403,
							height: 0.20,
							coupler: 0.403,
						},
						peak1: {
							flat: 'dbsm',
						},
						peak2: {
							flat: 'dbsm',
						},
						peak3: {
							flat: 'dbsm',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bmm20',
					depth: 1,
					height: 2,
				},
				materials: {
					bmm20: {
						label: 'BMM20',
						support: ['bmm20', 'bsm40', 'bbpm20', 'c2-bmm20', 'c1-bsm40', 'c2-bsm40'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.403, y: 0.2 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.2 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.20,
							height: 0.20,
						},
						peak2: {
							flat: 'dbmm',
						},
						peak3: {
							flat: 'dbmm',
						},
					},
				},
			},
		},
	},
	peaks: {
		flat: {
			label: ___('Daszki płaskie'),
			path: '../../castorama-casto/peaks/flat',
			colors: {
				kremowy: { label: ___('Kremowy') },
				czarny: { label: ___('Czarny') },
			},
			materials: {
				dbmm: {
					label: `DBMM ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width40.jpg', x: 0.403, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top20.jpg', x: 0.403, y: 0.2 },
					},
					width: 0.403,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
				dbsm: {
					label: `DBSM ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width40.jpg', x: 0.403, y: 0.06 },
						depth1: { src: 'width40.jpg', x: 0.403, y: 0.06 },
						top: { src: 'top40.jpg', x: 0.403, y: 0.403 },
					},
					width: 0.403,
					depth: 0.403,
					height: 0.06,
					protrude: 0,
				},
				dbpm: {
					label: `DBPM ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width25.jpg', x: 0.252, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top25.jpg', x: 0.252, y: 0.2 },
					},
					width: 0.252,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});