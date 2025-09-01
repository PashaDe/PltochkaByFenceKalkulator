import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Giga',
	migration: false,
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
		rg: {
			visible: true,
			label: '-',
			path: 'rg',
			options: {},
			colors: {
				bialy: { label: ___('Biały') },
				grafit: { label: ___('Grafit') },
				iryd: { label: ___('Iryd') },
				popiel: { label: ___('Popiel') },
				sandy: { label: ___('Sandy') },
			},
			default: {
				blocksColor: 'iryd',
				peaksFamily: 'flat',
				peaksColor: 'iryd',
			},
			settings: {
				distance: { min: 0.504, default: 5 },
				autocorner: 'c2-rgm20',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rgm20',
					width: 1,
					depth: 1,
					height: 4,
				},
				materials: {
					rgm20: {
						label: 'RGM20',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 1.2 },
								depth1: { src: 'depth20.jpg', x: 0.198, y: 1.2 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.198,
							height: 0.40,
						},
						peak1: {
							flat: 'crgm20',
						},
						peak2: {
							flat: 'crgm20',
						},
						peak3: {
							flat: 'crgm20',
						},
					},
					'c2-rgm20': {
						label: `${___('Narożnik')} RGM20`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 1.2 },
								depth1: { src: 'width.jpg', x: 1.512, y: 1.2 },
								coupler1: { src: 'depth20.jpg', x: 0.198, y: 1.2 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.504,
							depth: 0.504,
							height: 0.40,
							coupler: 0.198,
						},
						peak1: {
							flat: 'crgm20',
						},
						peak2: {
							flat: 'crgm20',
						},
						peak3: {
							flat: 'crgm20',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rgm20',
					depth: 1,
					height: 1,
				},
				materials: {
					rgm20: {
						label: 'RGM20',
						support: ['rgm20', 'c2-rgm20'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 1.512, y: 1.2 },
								depth1: { src: 'depth20.jpg', x: 0.198, y: 1.2 },
							},
							resizeable: { depth: false, height: true },
							width: 0.504,
							depth: 0.198,
							height: 0.40,
						},
						peak2: {
							flat: 'crgm20',
						},
						peak3: {
							flat: 'crgm20',
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
				popiel: { label: ___('Popiel') },
				sandy: { label: ___('Sandy') },
			},
			materials: {
				crgm20: {
					label: `CRGM20 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 1.512, y: 0.072 },
						depth1: { src: 'depth20.jpg', x: 0.198, y: 0.072 },
						top: { src: 'top20.jpg', x: 1.512, y: 0.198 },
					},
					width: 0.504,
					depth: 0.198,
					height: 0.072,
					protrude: 0,
				},
			},
		},
	},
});