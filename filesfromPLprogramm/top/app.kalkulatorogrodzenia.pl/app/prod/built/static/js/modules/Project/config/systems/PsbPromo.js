import { ___ } from 'classes/Translation';


export default () => ({
	label: 'PSB - PROMO',
	migration: false,
	technical: false,
	adds: {
		combo: { bone: 'roma_mega' },
		fencings: false,
		wickets: false,
		gates: false,
		panels: false,
		mailboxes: false,
		lamps: false,
		ledblocks: false,
	},
	blocks: {
		p: {
			visible: true,
			label: '-',
			path: 'p',
			options: {},
			colors: {
				black: { label: ___('Black') },
				grey: { label: ___('Grey') },
			},
			default: {
				blocksColor: 'grey',
				peaksFamily: 'flat',
				peaksColor: 'grey',
			},
			settings: {
				distance: { min: 0.756, default: 4 },
				autocorner: 'c2-bpr19',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bpr19',
					width: 1,
					depth: 1,
					height: 12,
				},
				materials: {
					bpr19: {
						label: 'BPR19',
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
							flat: 'cpr19',
						},
						peak2: {
							flat: 'cpr19',
						},
						peak3: {
							flat: 'cpr19',
						},
					},
					'c2-bpr19': {
						label: `${___('Narożnik')} BPR19`,
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
							flat: 'cpr19',
						},
						peak2: {
							flat: 'cpr19',
						},
						peak3: {
							flat: 'cpr19',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bpr19',
					depth: 1,
					height: 4,
				},
				materials: {
					bpr19: {
						label: 'BPR19',
						support: ['bpr19', 'c2-bpr19'],
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
							flat: 'cpr19',
						},
						peak3: {
							flat: 'cpr19',
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
				black: { label: ___('Black') },
				grey: { label: ___('Grey') },
			},
			materials: {
				cpr19: {
					label: `CPR19 ${___('daszek gładki')}`,
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