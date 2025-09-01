import { ___ } from 'classes/Translation';


export default () => ({
	label: 'BRICO MARCHE - ICO',
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
		i: {
			visible: true,
			label: '-',
			path: 'i',
			options: {},
			colors: {
				piryt: { label: ___('Piryt') },
				onyx: { label: ___('Onyx') },
			},
			default: {
				blocksColor: 'piryt',
				peaksFamily: 'flat',
				peaksColor: 'piryt-lupany',
			},
			settings: {
				distance: { min: 0.39, default: 5 },
				autocorner: 'c2-ico',
				offsets: 'modular-alternately',
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'ico',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					ico: {
						label: 'ICO',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width_1.jpg', x: 0.78, y: 0.38 },
								width2: { src: 'width_2.jpg', x: 0.78, y: 0.38 },
								depth1: { src: 'depth.jpg', x: 0.195, y: 0.19 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.39,
							depth: 0.195,
							height: 0.19,
						},
						peak1: {
							flat: 'cpgs',
						},
						peak2: {
							flat: 'cpgs',
						},
						peak3: {
							flat: 'cpgm',
						},
					},
					'c2-ico': {
						label: `${___('Narożnik')} ICO`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width_1.jpg', x: 0.78, y: 0.38 },
								width2: { src: 'width_2.jpg', x: 0.78, y: 0.38 },
								depth1: { src: 'width_1.jpg', x: 0.78, y: 0.38 },
								depth2: { src: 'width_2.jpg', x: 0.78, y: 0.38 },
								coupler1: { src: 'depth.jpg', x: 0.195, y: 0.19 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.39,
							depth: 0.39,
							height: 0.19,
							coupler: 0.195,
						},
						peak1: {
							flat: 'cpgs',
						},
						peak2: {
							flat: 'cpgs',
						},
						peak3: {
							flat: 'cpgm',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'ico',
					depth: 1,
					height: 2,
				},
				materials: {
					ico: {
						label: 'ICO',
						support: ['ico', 'c2-ico'],
						block: {
							texture: {
								width1: { src: 'width_1.jpg', x: 0.78, y: 0.38 },
								width2: { src: 'width_2.jpg', x: 0.78, y: 0.38 },
								depth1: { src: 'depth.jpg', x: 0.195, y: 0.19 },
							},
							resizeable: { depth: false, height: true },
							width: 0.39,
							depth: 0.195,
							height: 0.19,
						},
						peak2: {
							flat: 'cpgs',
						},
						peak3: {
							flat: 'cpgm',
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
				'piryt-lupany': { label: ___('Piryt') },
				'onyx-lupany': { label: ___('Onyx') },
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
					protrude: 0.02,
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
					protrude: 0.02,
				},
			},
		},
	},
});