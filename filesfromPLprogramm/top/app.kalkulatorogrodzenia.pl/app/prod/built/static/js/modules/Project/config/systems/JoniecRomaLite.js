import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Lite',
	migration: false,
	technical: false,
	adds: {
		combo: { sea_tide: 'roma_mega' },
		fencings: { space: { top: 0, bottom: 0.03 } },
		wickets: { space: { top: 0 } },
		gates: { space: { top: 0 } },
		panels: true,
		mailboxes: true,
		lamps: true,
		ledblocks: true,
	},
	blocks: {
		rl: {
			visible: true,
			label: '-',
			path: 'rl',
			options: {},
			colors: {
				bialy: { label: ___('Biały') },
				grafit: { label: ___('Grafit') },
				popiel: { label: ___('Popiel') },
			},
			default: {
				blocksColor: 'popiel',
				peaksFamily: 'flat',
				peaksColor: 'popiel',
			},
			settings: {
				distance: { min: 0.756, default: 4 },
				autocorner: 'c2-rl19',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rl19',
					width: 1,
					depth: 1,
					height: 12,
				},
				materials: {
					rl19: {
						label: 'RL19',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.432 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.432 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.195,
							height: 0.144,
						},
						peak1: {
							flat: 'crl19',
						},
						peak2: {
							flat: 'crl19',
						},
						peak3: {
							flat: 'crl19',
						},
					},
					'c2-rl19': {
						label: `${___('Narożnik')} RL19`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.432 },
								depth1: { src: 'width.jpg', x: 2.268, y: 0.432 },
								coupler1: { src: 'depth19.jpg', x: 0.195, y: 0.432 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.756,
							height: 0.144,
							coupler: 0.195,
						},
						peak1: {
							flat: 'crl19',
						},
						peak2: {
							flat: 'crl19',
						},
						peak3: {
							flat: 'crl19',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rl19',
					depth: 1,
					height: 4,
				},
				materials: {
					rl19: {
						label: 'RL19',
						support: ['rl19', 'c2-rl19'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.432 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.432 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.195,
							height: 0.144,
						},
						peak2: {
							flat: 'crl19',
						},
						peak3: {
							flat: 'crl19',
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
				bialy: { label: ___('Biały') },
				grafit: { label: ___('Grafit') },
				popiel: { label: ___('Popiel') },
			},
			materials: {
				crl19: {
					label: `CRL19 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 2.268, y: 0.072 },
						depth1: { src: 'depth19.jpg', x: 0.195, y: 0.072 },
						top: { src: 'top19.jpg', x: 2.268, y: 0.195 },
					},
					width: 0.756,
					depth: 0.195,
					height: 0.072,
					protrude: 0,
				},
			},
		},
	},
});