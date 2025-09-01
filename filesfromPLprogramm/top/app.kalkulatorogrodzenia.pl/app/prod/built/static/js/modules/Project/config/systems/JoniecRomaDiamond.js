import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Diamond',
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
		rd: {
			visible: true,
			label: '-',
			path: 'rd',
			options: {},
			colors: {
				halit: { label: ___('Halit') },
			},
			default: {
				blocksColor: 'halit',
				peaksFamily: 'flat',
				peaksColor: 'halit',
			},
			settings: {
				distance: { min: 0.504, default: 5 },
				autocorner: 'c2-rd20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rd20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					rd20: {
						label: 'RD20',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								width2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth20_1.jpg', x: 0.2, y: 0.6 },
								depth2: { src: 'depth20_2.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'crd20',
						},
						peak2: {
							flat: 'crd20',
						},
						peak3: {
							flat: 'crd20',
						},
					},
					'c2-rd20': {
						label: `${___('Narożnik')} RD20`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								width2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								depth2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								coupler1: { src: 'depth20_1.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.504,
							height: 0.20,
							coupler: 0.20,
						},
						peak1: {
							flat: 'crd20',
						},
						peak2: {
							flat: 'crd20',
						},
						peak3: {
							flat: 'crd20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rd20',
					depth: 1,
					height: 2,
				},
				materials: {
					rd20: {
						label: 'RD20',
						support: ['rd20', 'c2-rd20'],
						block: {
							texture: {
								width1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								width2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth20_1.jpg', x: 0.2, y: 0.6 },
								depth2: { src: 'depth20_2.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.504,
							depth: 0.20,
							height: 0.20,
						},
						peak2: {
							flat: 'crd20',
						},
						peak3: {
							flat: 'crd20',
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
				halit: { label: ___('Halit') },
			},
			materials: {
				crd20: {
					label: `CRD20 ${___('daszek scratch czterostronnie')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width_1.jpg', x: 1.512, y: 0.05 },
						width2: { src: 'width_2.jpg', x: 1.512, y: 0.05 },
						depth1: { src: 'depth20_1.jpg', x: 0.2, y: 0.05 },
						depth2: { src: 'depth20_2.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top20.jpg', x: 1.512, y: 0.2 },
					},
					width: 0.504,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});