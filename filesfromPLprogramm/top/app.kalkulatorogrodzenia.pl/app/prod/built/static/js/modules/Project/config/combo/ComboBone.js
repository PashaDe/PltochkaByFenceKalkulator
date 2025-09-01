import { ___ } from 'classes/Translation';

import colors from './colors';


export default () => ({
	label: 'Bone',
	colors: colors().default,
	elements: {
		bone_down: { material: 'bone', width: 0.504, depth: 0.10, height: 0.144 },
		roof: { material: 'roof', width: 0.504, depth: 0.14, height: 0.05 },
	},
	default: {
		color: 'grafit',
	},
	variants: {
		// Roma
		'roma/bone_horizontal_roof': {
			label: `Bone - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_201: {
					destination: 2.016,
					offset: [0],
					structure: [
						['bone_down'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma/bone_horizontal': {
			label: `Bone - ${___('Poziomo')}`,
			destinations: {
				_201: {
					destination: 2.016,
					offset: [0],
					structure: [
						['bone_down'],
					],
				},
			},
		},

		// Roma Mega
		'roma_mega/bone_horizontal_roof': {
			label: `Bone - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_151: {
					destination: 1.512,
					offset: [0],
					structure: [
						['bone_down'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma_mega/bone_horizontal': {
			label: `Bone - ${___('Poziomo')}`,
			destinations: {
				_151: {
					destination: 1.512,
					offset: [0],
					structure: [
						['bone_down'],
					],
				},
			},
		},
	},
});