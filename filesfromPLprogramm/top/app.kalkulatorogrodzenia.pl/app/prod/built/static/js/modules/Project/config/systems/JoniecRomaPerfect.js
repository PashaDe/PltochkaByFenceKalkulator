import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Perfect',
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
		rp: {
			visible: true,
			label: '-',
			path: 'rp',
			options: {},
			colors: {
				// 'beryl': { label: ___('Beryl') },
				dioryt: { label: ___('Dioryt') },
				milos: { label: ___('Milos') },
				morion: { label: ___('Morion') },
				alba: { label: ___('Alba') },
			},
			default: {
				blocksColor: 'dioryt',
				peaksFamily: 'flat',
				peaksColor: 'dioryt',
			},
			settings: {
				distance: { min: 0.504, default: 5 },
				autocorner: 'c2-rp20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rp20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					rp20: {
						label: 'RP20',
						modifiable: ['line'],
						supportReplacement: 'rp28',
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
							flat: 'crp20',
						},
						peak2: {
							flat: 'crp20',
						},
						peak3: {
							flat: 'crp20',
						},
					},
					rp28: {
						disabled: {
							material: 'rp20',
						},
						label: 'RP28',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								width2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth28_1.jpg', x: 0.28, y: 0.6 },
								depth2: { src: 'depth28_2.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.28,
							height: 0.20,
						},
						peak1: {
							flat: 'crp28',
						},
						peak2: {
							flat: 'crp28',
						},
						peak3: {
							flat: 'crp28',
						},
					},
					'c2-rp20': {
						label: `${___('Narożnik')} RP20`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-rp28',
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
							flat: 'crp20',
						},
						peak2: {
							flat: 'crp20',
						},
						peak3: {
							flat: 'crp20',
						},
					},
					'c2-rp28': {
						disabled: {
							material: 'c2-rp20',
						},
						label: `${___('Narożnik')} RP28`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								width2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								depth2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								coupler1: { src: 'depth28_1.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.504,
							height: 0.20,
							coupler: 0.28,
						},
						peak1: {
							flat: 'crp28',
						},
						peak2: {
							flat: 'crp28',
						},
						peak3: {
							flat: 'crp28',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rp20',
					depth: 1,
					height: 2,
				},
				materials: {
					rp20: {
						label: 'RP20',
						support: ['rp20', 'rp28', 'c2-rp20', 'c2-rp28'],
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
							flat: 'crp20',
						},
						peak3: {
							flat: 'crp20',
						},
					},
					rp28: {
						disabled: {
							material: 'rp20',
						},
						label: 'RP28',
						support: ['rp28', 'c2-rp28'],
						block: {
							texture: {
								width1: { src: 'width_1.jpg', x: 1.512, y: 0.6 },
								width2: { src: 'width_2.jpg', x: 1.512, y: 0.6 },
								depth1: { src: 'depth28_1.jpg', x: 0.28, y: 0.6 },
								depth2: { src: 'depth28_2.jpg', x: 0.28, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.504,
							depth: 0.28,
							height: 0.20,
						},
						peak2: {
							flat: 'crp28',
						},
						peak3: {
							flat: 'crp28',
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
				// 'beryl': { label: ___('Beryl') },
				dioryt: { label: ___('Dioryt') },
				milos: { label: ___('Milos') },
				morion: { label: ___('Morion') },
				alba: { label: ___('Alba') },
			},
			materials: {
				crp20: {
					label: `CRP20 ${___('daszek scratch czterostronnie')}`,
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
				crp28: {
					label: `CRP28 ${___('daszek scratch czterostronnie')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width_1.jpg', x: 1.512, y: 0.05 },
						width2: { src: 'width_2.jpg', x: 1.512, y: 0.05 },
						depth1: { src: 'depth28_1.jpg', x: 0.28, y: 0.05 },
						depth2: { src: 'depth28_2.jpg', x: 0.28, y: 0.05 },
						top: { src: 'top28.jpg', x: 1.512, y: 0.28 },
					},
					width: 0.504,
					depth: 0.28,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});