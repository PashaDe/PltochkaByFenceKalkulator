import { ___ } from 'classes/Translation';


export default () => ({
	label: 'PSB - PASO',
	migration: false,
	technical: false,
	adds: {
		combo: { bone: 'roma' },
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
				czarny: { label: ___('Czarny') },
			},
			default: {
				blocksColor: 'czarny',
				peaksFamily: 'flat',
				peaksColor: 'czarny',
			},
			settings: {
				distance: { min: 0.504, default: 4 },
				autocorner: 'c2-bps50',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'bps50',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					bps50: {
						label: 'BPS50',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width50.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'cps50',
						},
						peak2: {
							flat: 'cps50',
						},
						peak3: {
							flat: 'cps50',
						},
					},
					'c2-bps50': {
						label: `${___('Narożnik')} BPS50`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width50.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'width50.jpg', x: 1.512, y: 0.6 },
								coupler1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.504,
							height: 0.20,
							coupler: 0.20,
						},
						peak1: {
							flat: 'cps50',
						},
						peak2: {
							flat: 'cps50',
						},
						peak3: {
							flat: 'cps50',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'bps50',
					depth: 1,
					height: 2,
				},
				materials: {
					bps50: {
						label: 'BPS50',
						support: ['bps50', 'c2-bps50'],
						block: {
							texture: {
								width1: { src: 'width50.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.504,
							depth: 0.20,
							height: 0.20,
						},
						peak2: {
							flat: 'cps50',
						},
						peak3: {
							flat: 'cps50',
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
				czarny: { label: ___('Czarny') },
			},
			materials: {
				cps50: {
					label: `CPS50 ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width50.jpg', x: 1.512, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top50.jpg', x: 1.512, y: 0.2 },
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