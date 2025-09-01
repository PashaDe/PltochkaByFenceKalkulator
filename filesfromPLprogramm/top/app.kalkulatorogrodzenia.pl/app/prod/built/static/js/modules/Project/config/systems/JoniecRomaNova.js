import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Nova',
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
		rn: {
			visible: true,
			label: '-',
			path: 'rn',
			options: {},
			colors: {
				szerlit: { label: ___('Szerlit') },
				uran: { label: ___('Uran') },
			},
			default: {
				blocksColor: 'szerlit',
				peaksFamily: 'flat',
				peaksColor: 'szerlit',
			},
			settings: {
				distance: { min: 0.756, default: 4 },
				autocorner: 'c2-rn19',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rn19',
					width: 1,
					depth: 1,
					height: 12,
				},
				materials: {
					rn19: {
						label: 'RN19',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width_1.jpg', x: 2.268, y: 0.432 },
								width2: { src: 'width_2.jpg', x: 2.268, y: 0.432 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.432 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.195,
							height: 0.144,
						},
						peak1: {
							flat: 'crn19',
						},
						peak2: {
							flat: 'crn19',
						},
						peak3: {
							flat: 'crn19',
						},
					},
					'c2-rn19': {
						label: `${___('Narożnik')} RN19`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width_1.jpg', x: 2.268, y: 0.432 },
								width2: { src: 'width_2.jpg', x: 2.268, y: 0.432 },
								depth1: { src: 'width_1.jpg', x: 2.268, y: 0.432 },
								depth2: { src: 'width_2.jpg', x: 2.268, y: 0.432 },
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
							flat: 'crn19',
						},
						peak2: {
							flat: 'crn19',
						},
						peak3: {
							flat: 'crn19',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rn19',
					depth: 1,
					height: 4,
				},
				materials: {
					rn19: {
						label: 'RN19',
						support: ['rn19', 'c2-rn19'],
						block: {
							texture: {
								width1: { src: 'width_1.jpg', x: 2.268, y: 0.432 },
								width2: { src: 'width_2.jpg', x: 2.268, y: 0.432 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.432 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.195,
							height: 0.144,
						},
						peak2: {
							flat: 'crn19',
						},
						peak3: {
							flat: 'crn19',
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
				szerlit: { label: ___('Szerlit') },
				uran: { label: ___('Uran') },
			},
			materials: {
				crn19: {
					label: `CRN19 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width_1.jpg', x: 2.268, y: 0.072 },
						width2: { src: 'width_2.jpg', x: 2.268, y: 0.072 },
						depth1: { src: 'depth19_1.jpg', x: 0.195, y: 0.072 },
						depth2: { src: 'depth19_2.jpg', x: 0.195, y: 0.072 },
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