import { ___ } from 'classes/Translation';


export default () => ({
	label: 'LEROY MERLIN - KIMO',
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
		k: {
			visible: true,
			label: '-',
			path: 'k',
			options: {},
			colors: {
				amber: { label: ___('Amber') },
				nero: { label: ___('Nero') },
			},
			default: {
				blocksColor: 'amber',
				peaksFamily: 'flat',
				peaksColor: 'amber',
			},
			settings: {
				distance: { min: 0.403, default: 5 },
				autocorner: 'c2-bkm15',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bkm15',
					width: 1,
					depth: 1,
					height: 10,
				},
				materials: {
					bkm15: {
						label: 'BKM15',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.465 },
								depth1: { src: 'depth20.jpg', x: 0.20, y: 0.465 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.20,
							height: 0.155,
						},
						peak1: {
							flat: 'dkm20',
						},
						peak2: {
							flat: 'dkm20',
						},
						peak3: {
							flat: 'dkm20',
						},
					},
					'c2-bkm15': {
						label: `${___('Narożnik')} BKM15`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.465 },
								depth1: { src: 'width.jpg', x: 1.209, y: 0.465 },
								coupler1: { src: 'depth20.jpg', x: 0.20, y: 0.465 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.403,
							depth: 0.403,
							height: 0.155,
							coupler: 0.20,
						},
						peak1: {
							flat: 'dkm20',
						},
						peak2: {
							flat: 'dkm20',
						},
						peak3: {
							flat: 'dkm20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bkm15',
					depth: 1,
					height: 2,
				},
				materials: {
					bkm15: {
						label: 'BKM15',
						support: ['bkm15', 'c2-bkm15'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.209, y: 0.465 },
								depth1: { src: 'depth20.jpg', x: 0.20, y: 0.465 },
							},
							resizeable: { depth: false, height: true },
							width: 0.403,
							depth: 0.20,
							height: 0.155,
						},
						peak2: {
							flat: 'dkm20',
						},
						peak3: {
							flat: 'dkm20',
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
				amber: { label: ___('Amber') },
				nero: { label: ___('Nero') },
			},
			materials: {
				dkm20: {
					label: `DKM20 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.209, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.20, y: 0.05 },
						top: { src: 'top20.jpg', x: 1.209, y: 0.20 },
					},
					width: 0.403,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});