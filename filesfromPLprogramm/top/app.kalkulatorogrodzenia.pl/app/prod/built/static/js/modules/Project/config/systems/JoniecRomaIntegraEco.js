import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Integra Eco',
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
		ri: {
			visible: true,
			label: '-',
			path: 'ri',
			options: {},
			colors: {
				bialy: { label: ___('Biały') },
				grafit: { label: ___('Grafit') },
				iryd: { label: ___('Iryd') },
			},
			default: {
				blocksColor: 'iryd',
				peaksFamily: 'flat',
				peaksColor: 'iryd',
			},
			settings: {
				distance: { min: 0.756, default: 4 },
				autocorner: 'c2-rie20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rie20',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					rie20: {
						label: 'RIE20',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.198, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.198,
							height: 0.20,
						},
						peak1: {
							flat: 'crie20',
						},
						peak2: {
							flat: 'crie20',
						},
						peak3: {
							flat: 'crie20',
						},
					},
					'c2-rie20': {
						label: `${___('Narożnik')} RIE20`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.6 },
								depth1: { src: 'width.jpg', x: 2.268, y: 0.6 },
								coupler1: { src: 'depth20.jpg', x: 0.198, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.756,
							height: 0.20,
							coupler: 0.198,
						},
						peak1: {
							flat: 'crie20',
						},
						peak2: {
							flat: 'crie20',
						},
						peak3: {
							flat: 'crie20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rie20',
					depth: 1,
					height: 2,
				},
				materials: {
					rie20: {
						label: 'RIE20',
						support: ['rie20', 'c2-rie20'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.198, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.198,
							height: 0.20,
						},
						peak2: {
							flat: 'crie20',
						},
						peak3: {
							flat: 'crie20',
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
				iryd: { label: ___('Iryd') },
			},
			materials: {
				crie20: {
					label: `CRIE20 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 2.268, y: 0.072 },
						depth1: { src: 'depth20.jpg', x: 0.198, y: 0.072 },
						top: { src: 'top20.jpg', x: 2.268, y: 0.198 },
					},
					width: 0.756,
					depth: 0.198,
					height: 0.072,
					protrude: 0,
				},
			},
		},
	},
});