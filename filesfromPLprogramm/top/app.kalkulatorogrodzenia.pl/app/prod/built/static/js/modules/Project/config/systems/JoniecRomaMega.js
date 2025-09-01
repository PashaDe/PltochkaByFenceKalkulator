import { ___ } from 'classes/Translation';


export default () => ({
	label: 'ROMA Mega',
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
		rm: {
			visible: true,
			label: '-',
			path: 'rm',
			options: {},
			colors: {
				aragon: { label: ___('Aragon') },
				gabro: { label: ___('Gabro') },
				galena: { label: ___('Galena') },
				lidyt: { label: ___('Lidyt') },
				// oliwka: { label: ___('Oliwka') },
				snow: { label: ___('Snow') },
				turmalin: { label: ___('Turmalin') },
			},
			default: {
				blocksColor: 'gabro',
				peaksFamily: 'flat',
				peaksColor: 'gabro',
			},
			settings: {
				distance: { min: 0.756, default: 4 },
				autocorner: 'c2-rm19',
				offsets: false,
				sameAlignment: true,
			},
			pole: {
				default: {
					material: 'rm19',
					width: 1,
					depth: 1,
					height: 6,
				},
				materials: {
					rm19: {
						label: 'RM19',
						modifiable: ['line'],
						supportReplacement: 'rm28',
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.864 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.195,
							height: 0.288,
						},
						peak1: {
							flat: 'crm19',
						},
						peak2: {
							flat: 'crm19',
						},
						peak3: {
							flat: 'crm19',
						},
					},
					rm28: {
						label: 'RM28',
						modifiable: ['line'],
						seating: 0,
						block: {
							type: 'cuboid',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.864 },
							},
							resizeable: { width: true, depth: false, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.28,
							height: 0.288,
						},
						peak1: {
							flat: 'crm28',
						},
						peak2: {
							flat: 'crm28',
						},
						peak3: {
							flat: 'crm28',
						},
					},
					'c2-rm19': {
						label: `${___('Narożnik')} RM19`,
						modifiable: ['corner1', 'corner2'],
						supportReplacement: 'c2-rm28',
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								depth1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								coupler1: { src: 'depth19.jpg', x: 0.195, y: 0.864 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.756,
							height: 0.288,
							coupler: 0.195,
						},
						peak1: {
							flat: 'crm19',
						},
						peak2: {
							flat: 'crm19',
						},
						peak3: {
							flat: 'crm19',
						},
					},
					'c2-rm28': {
						label: `${___('Narożnik')} RM28`,
						modifiable: ['corner1', 'corner2'],
						seating: 0,
						block: {
							type: 'corner',
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								depth1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								coupler1: { src: 'depth28.jpg', x: 0.28, y: 0.864 },
							},
							resizeable: { width: true, depth: true, height: true },
							minimum: { width: 1, depth: 1 },
							width: 0.756,
							depth: 0.756,
							height: 0.288,
							coupler: 0.28,
						},
						peak1: {
							flat: 'crm28',
						},
						peak2: {
							flat: 'crm28',
						},
						peak3: {
							flat: 'crm28',
						},
					},
				},
			},
			wall: {
				default: {
					material: 'rm19',
					depth: 1,
					height: 2,
				},
				materials: {
					rm19: {
						label: 'RM19',
						support: ['rm19', 'rm28', 'c2-rm19', 'c2-rm28'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								depth1: { src: 'depth19.jpg', x: 0.195, y: 0.864 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.195,
							height: 0.288,
						},
						peak2: {
							flat: 'crm19',
						},
						peak3: {
							flat: 'crm19',
						},
					},
					rm28: {
						label: 'RM28',
						support: ['rm28', 'c2-rm28'],
						block: {
							texture: {
								width1: { src: 'width.jpg', x: 2.268, y: 0.864 },
								depth1: { src: 'depth28.jpg', x: 0.28, y: 0.864 },
							},
							resizeable: { depth: false, height: true },
							width: 0.756,
							depth: 0.28,
							height: 0.288,
						},
						peak2: {
							flat: 'crm28',
						},
						peak3: {
							flat: 'crm28',
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
				aragon: { label: ___('Aragon') },
				gabro: { label: ___('Gabro') },
				galena: { label: ___('Galena') },
				lidyt: { label: ___('Lidyt') },
				// oliwka: { label: ___('Oliwka') },
				snow: { label: ___('Snow') },
				turmalin: { label: ___('Turmalin') },
			},
			materials: {
				crm19: {
					label: `CRM19 ${___('daszek gładki')}`,
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
				crm28: {
					label: `CRM28 ${___('daszek gładki')}`,
					type: 'flat2',
					texture: {
						width1: { src: 'width.jpg', x: 2.268, y: 0.072 },
						depth1: { src: 'depth28.jpg', x: 0.28, y: 0.072 },
						top: { src: 'top28.jpg', x: 2.268, y: 0.28 },
					},
					width: 0.756,
					depth: 0.28,
					height: 0.072,
					protrude: 0,
				},
			},
		},
	},
});