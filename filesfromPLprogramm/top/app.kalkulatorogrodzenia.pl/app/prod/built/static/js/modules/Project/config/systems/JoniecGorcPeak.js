import { ___ } from 'classes/Translation';


export default () => ({
	label: 'GORC<sup>&reg;</sup> Peak',
	migration: false,
	technical: false,
	adds: {
		combo: false,
		fencings: { space: { top: 0.02, bottom: 0.03 } },
		wickets: { space: { top: 0.02 } },
		gates: { space: { top: 0.02 } },
		panels: true,
		mailboxes: true,
		lamps: true,
		ledblocks: false,
	},
	blocks: {
		uni: {
			visible: true,
			label: '-',
			path: 'gp',
			options: {
				// gm: { type: 'checkbox', label: ___('Zamień płytki GP na bloczki GM'), default: false, reload: false, permissions: ['admin', 'employee', 'distributor'] },
			},
			colors: {
				dark: { label: ___('Dark') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
				wanad: { label: ___('Wanad') },
			},
			default: {
				blocksColor: 'onyx',
				peaksFamily: 'flat',
				peaksColor: 'onyx',
			},
			settings: {
				distance: { min: 0.756, default: 4 },
				autocorner: 'c2-gp19',
				offsets: 'continuous',
				sameAlignment: false,
			},
			pole: {
				default: {
					material: 'gp19',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					gp19: {
						label: 'GPSM',
						modifiable: ['line'],
						supportReplacement: 'gp28',
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.756, y: 0.36 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.18 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.195,
							height: 0.18,
						},
						peak1: {
							flat: 'cpgpsm',
						},
						peak2: {
							flat: 'cpgpsm',
						},
						peak3: {
							flat: 'cpgpmm',
						},
					},
					gp28: {
						label: 'GPSD',
						modifiable: ['line'],
						seating: 2,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 0.756, y: 0.36 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.18 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.28,
							height: 0.18,
						},
						peak1: {
							flat: 'cpgpsd',
						},
						peak2: {
							flat: 'cpgpsd',
						},
						peak3: {
							flat: 'cpgpsd', // REQUIRED !!!
						},
					},
					'c2-gp19': {
						label: `${___('Narożnik')} GPSM`,
						modifiable: ['corner1', 'corner2'],
						seating: 2,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 0.756, y: 0.36 },
								depth1: { src: 'width.jpg', x: 0.756, y: 0.36 },
								coupler1: { src: 'depth19.jpg', x: 0.195, y: 0.18 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.756,
							height: 0.18,
							coupler: 0.195,
						},
						peak1: {
							flat: 'cpgpsm',
						},
						peak2: {
							flat: 'cpgpsm',
						},
						peak3: {
							flat: 'cpgpmm',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'gpmm',
					depth: 1,
					height: 2,
				},
				materials: {
					gpmm: {
						label: 'GPMM',
						support: ['gp19', 'gp28', 'c2-gp19'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.756, y: 0.36 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.18 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.195,
							height: 0.18,
						},
						peak2: {
							flat: 'cpgpsm',
						},
						peak3: {
							flat: 'cpgpmm',
						},
					},
					gpmmp: {
						disabled: {
							material: 'gpmm',
						},
						label: 'GPMMP',
						support: ['gp19', 'gp28', 'c2-gp19'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 0.756, y: 0.36 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.18 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.195,
							height: 0.18,
						},
						peak2: {
							flat: 'cpgpsm',
						},
						peak3: {
							flat: 'cpgpmm',
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
				dark: { label: ___('Dark') },
				onyx: { label: ___('Onyx') },
				piryt: { label: ___('Piryt') },
				wanad: { label: ___('Wanad') },
			},
			materials: {
				cpgpsm: {
					label: `CPGPSM ${___('daszek płaski trzystronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.403,
					depth: 0.245,
					height: 0.06,
					protrude: 0.025,
				},
				cpgpmm: {
					label: `CPGPMM ${___('daszek płaski dwustronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.50,
					depth: 0.245,
					height: 0.06,
					protrude: 0.025,
				},
				cpgpsd: {
					label: `CPGPSD ${___('daszek płaski trzystronnie łupany')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						depth1: { src: 'side.jpg', x: 0.45, y: 0.15 },
						top: { src: 'top.jpg', x: 0.6, y: 0.6 },
					},
					width: 0.403,
					depth: 0.33,
					height: 0.06,
					protrude: 0.025,
				},
			},
		},
	},
});