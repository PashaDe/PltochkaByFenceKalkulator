import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Classic',
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
		rc: {
			visible: true,
			label: '-',
			path: 'rc',
			options: {},
			colors: {
				gagat: { label: ___('Gagat') },
				onyx: { label: ___('Onyx') },
				bialy: { label: ___('Biały') },
			},
			default: {
				blocksColor: 'onyx',
				peaksFamily: 'flat',
				peaksColor: 'onyx',
			},
			settings: {
				distance: { min: 0.504, default: 5 },
				autocorner: 'c2-brsm',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'brsm',
					width: 1,
					depth: 1,
					height: 8,
				},
				materials: {
					brsm: {
						label: 'BRSM',
						modifiable: ['line'],
						supportReplacement: 'brdm',
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
							flat: 'crsm',
						},
						peak2: {
							flat: 'crsm',
						},
						peak3: {
							flat: 'crsm',
						},
					},
					brmm: {
						disabled: {
							material: 'brsm',
						},
						label: 'BRMM',
						modifiable: ['line'],
						supportReplacement: 'brdm',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width25.jpg', x: 0.756, y: 0.6 },
								depth1: { src: 'depth20.jpg', x: 0.2, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.252,
							depth: 0.20,
							height: 0.20,
						},
						peak1: {
							flat: 'crmm',
						},
						peak2: {
							flat: 'crmm',
						},
						peak3: {
							flat: 'crmm',
						},
					},
					brdm: {
						disabled: {
							colors: ['bialy'],
							material: 'brsm',
						},
						label: 'BRDM',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
								depth1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.36,
							height: 0.20,
						},
						peak1: {
							flat: 'crdm',
						},
						peak2: {
							flat: 'crdm',
						},
						peak3: {
							flat: 'crdm',
						},
					},
					'c2-brsm': {
						label: `${___('Narożnik')} BRSM`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-brdm',
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
							flat: 'crsm',
						},
						peak2: {
							flat: 'crsm',
						},
						peak3: {
							flat: 'crsm',
						},
					},
					'c1-brdm': {
						disabled: {
							colors: ['bialy'],
							material: 'c2-brsm',
						},
						label: 'BRDM',
						modifiable: ['corner1'],
						modifiableReplacement: 'c2-brdm',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
								depth1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
							},
							resizeable: { width: false, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.36,
							depth: 0.36,
							height: 0.20,
						},
						peak1: {
							flat: 'crdm',
						},
						peak2: {
							flat: 'crdm',
						},
						peak3: {
							flat: 'crdm',
						},
					},
					'c2-brdm': {
						disabled: {
							colors: ['bialy'],
							material: 'c2-brsm',
						},
						label: `${___('Narożnik')} BRDM`,
						modifiable: ['corner2'],
						modifiableReplacement: 'c1-brdm',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
								depth1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
								coupler1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 2, depth: 2 },
							width: 0.36,
							depth: 0.36,
							height: 0.20,
							coupler: 0.36,
						},
						peak1: {
							flat: 'crdm',
						},
						peak2: {
							flat: 'crdm',
						},
						peak3: {
							flat: 'crdm',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'brsm',
					depth: 1,
					height: 2,
				},
				materials: {
					brsm: {
						label: 'BRSM',
						support: ['brsm', 'brmm', 'brdm', 'c2-brsm', 'c1-brdm', 'c2-brdm'],
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
							flat: 'crsm',
						},
						peak3: {
							flat: 'crsm',
						},
					},
					brdm: {
						disabled: {
							colors: ['bialy'],
							material: 'brsm',
						},
						label: 'BRDM',
						support: ['brdm', 'c1-brdm', 'c2-brdm'],
						block: {
							texture: {
								width1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
								depth1: { src: 'width36.jpg', x: 1.08, y: 0.6 },
							},
							resizeable: { depth: false, height: true },
							width: 0.36,
							depth: 0.36,
							height: 0.20,
						},
						peak2: {
							flat: 'crdm',
						},
						peak3: {
							flat: 'crdm',
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
				gagat: { label: ___('Gagat') },
				onyx: { label: ___('Onyx') },
				bialy: { label: ___('Biały') },
			},
			materials: {
				crsm: {
					label: `CRSM ${___('daszek płaski')}`,
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
				crmm: {
					label: `CRMM ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width25.jpg', x: 0.756, y: 0.05 },
						depth1: { src: 'depth20.jpg', x: 0.2, y: 0.05 },
						top: { src: 'top25.jpg', x: 0.756, y: 0.2 },
					},
					width: 0.252,
					depth: 0.20,
					height: 0.05,
					protrude: 0,
				},
				crdm: {
					disabled: {
						colors: ['bialy'],
						material: 'crsm',
						target: true,
					},
					label: `CRSM ${___('daszek płaski')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width36.jpg', x: 1.08, y: 0.05 },
						depth1: { src: 'width36.jpg', x: 1.08, y: 0.05 },
						top: { src: 'top36.jpg', x: 1.08, y: 0.36 },
					},
					width: 0.36,
					depth: 0.36,
					height: 0.05,
					protrude: 0,
				},
			},
		},
	},
});