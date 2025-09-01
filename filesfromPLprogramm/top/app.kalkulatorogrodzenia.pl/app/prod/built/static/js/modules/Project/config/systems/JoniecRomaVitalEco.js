import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Vital Eco',
	migration: false,
	technical: false,
	adds: {
		combo: false,
		fencings: { space: { top: 0, bottom: 0.03 } },
		wickets: { space: { top: 0 } },
		gates: { space: { top: 0 } },
		panels: true,
		mailboxes: true,
		lamps: true,
		ledblocks: false,
	},
	blocks: {
		rv: {
			visible: true,
			label: '-',
			path: 'rv',
			options: {},
			colors: {
				bialy: { label: ___('Biały') },
				grafit: { label: ___('Grafit') },
				iryd: { label: ___('Iryd') },
				kalcyt: { label: ___('Kalcyt') },
				popiel: { label: ___('Popiel') },
			},
			default: {
				blocksColor: 'iryd',
				peaksFamily: 'flat',
				peaksColor: 'iryd',
			},
			settings: {
				distance: { min: 0.57, default: 5 },
				autocorner: 'c2-rve19',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rve19',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					rve19: {
						label: 'RVE19',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.71, y: 0.6 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.57,
							depth: 0.195,
							height: 0.20,
						},
						peak1: {
							flat: 'crve19',
						},
						peak2: {
							flat: 'crve19',
						},
						peak3: {
							flat: 'crve19',
						},
					},
					'c2-rve19': {
						label: `${___('Narożnik')} RVE19`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.71, y: 0.6 },
								depth1: { src: 'width.jpg', x: 1.71, y: 0.6 },
								coupler1: { src: 'depth19.jpg', x: 0.195, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.57,
							depth: 0.57,
							height: 0.20,
							coupler: 0.195,
						},
						peak1: {
							flat: 'crve19',
						},
						peak2: {
							flat: 'crve19',
						},
						peak3: {
							flat: 'crve19',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rve19',
					depth: 1,
					height: 2,
				},
				materials: {
					rve19: {
						label: 'RVE19',
						support: ['rve19', 'c2-rve19'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.71, y: 0.6 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.57,
							depth: 0.195,
							height: 0.20,
						},
						peak2: {
							flat: 'crve19',
						},
						peak3: {
							flat: 'crve19',
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
				kalcyt: { label: ___('Kalcyt') },
				popiel: { label: ___('Popiel') },
			},
			materials: {
				crve19: {
					label: `CRVE19 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.71, y: 0.06 },
						depth1: { src: 'depth19.jpg', x: 0.195, y: 0.06 },
						top: { src: 'top19.jpg', x: 1.71, y: 0.195 },
					},
					width: 0.57,
					depth: 0.195,
					height: 0.06,
					protrude: 0,
				},
			},
		},
	},
});