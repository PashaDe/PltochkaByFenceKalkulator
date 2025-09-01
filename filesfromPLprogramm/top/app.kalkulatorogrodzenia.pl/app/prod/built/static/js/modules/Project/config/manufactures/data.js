import { ___ } from 'classes/Translation';


export default () => ({
	colors: {
		default: {
			ral7016: { label: 'RAL 7016', color: '464c50' },
			ral7039: { label: 'RAL 7039', color: '6d6a63' },
			ral7042: { label: 'RAL 7042', color: '81888e' },
			ral9005: { label: 'RAL 9005', color: '303030' },
		},
	},
	customizables: {
		default: {
			space: {
				default: '0.02',
				options: {
					0.005: { label: `0,5 ${___('cm')}` },
					0.01: { label: `1,0 ${___('cm')}` },
					0.015: { label: `1,5 ${___('cm')}` },
					0.02: { label: `2,0 ${___('cm')}` },
					0.025: { label: `2,5 ${___('cm')}` },
					0.03: { label: `3,0 ${___('cm')}` },
					0.035: { label: `3,5 ${___('cm')}` },
					0.04: { label: `4,0 ${___('cm')}` },
					0.045: { label: `4,5 ${___('cm')}` },
					0.05: { label: `5,0 ${___('cm')}` },
					0.055: { label: `5,5 ${___('cm')}` },
					0.06: { label: `6,0 ${___('cm')}` },
					0.065: { label: `6,5 ${___('cm')}` },
					0.07: { label: `7,0 ${___('cm')}` },
					0.075: { label: `7,5 ${___('cm')}` },
					0.08: { label: `8,0 ${___('cm')}` },
				},
			},
		},
	},
	materials: {
		sheet: [
			{
				material: 1,
				mode: 'all',
			},
		],
		perforated: [
			{
				material: 2,
				mode: 'all',
				wrap: 'wrap',
			},
		],
		second: [
			{
				material: 3,
				mode: 'top',
				wrap: 'wrap',
				variant: { offset: 1, amount: 1 },
			},
		],
	},
});