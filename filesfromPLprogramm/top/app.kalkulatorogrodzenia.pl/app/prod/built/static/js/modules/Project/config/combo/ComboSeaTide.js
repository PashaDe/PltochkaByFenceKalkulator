import { ___ } from 'classes/Translation';

import colors from './colors';


export default () => ({
	label: 'Sea & Tide',
	colors: colors().default,
	elements: {
		sea_down: { material: 'sea', width: 1.008, depth: 0.10, height: 0.10 },
		sea_up: { material: 'sea', width: 1.008, depth: 0.10, height: 0.10 },
		sea_left: { material: 'sea', width: 0.10, depth: 0.10, height: 1.008 },
		sea_right: { material: 'sea', width: 0.10, depth: 0.10, height: 1.008 },
		tide_down: { material: 'tide', width: 0.504, depth: 0.10, height: 0.10 },
		tide_up: { material: 'tide', width: 0.504, depth: 0.10, height: 0.10 },
		tide_left: { material: 'tide', width: 0.10, depth: 0.10, height: 0.504 },
		tide_right: { material: 'tide', width: 0.10, depth: 0.10, height: 0.504 },
		roof: { material: 'roof', width: 0.504, depth: 0.14, height: 0.05 },
	},
	default: {
		color: 'grafit',
	},
	variants: {
		// Roma
		'roma/sea_tide_horizontal_roof': {
			label: `Sea & Tide - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['tide_up', 'sea_up', 'sea_up', 'tide_up'],
					],
					roof: ['roof'],
				},
				_252: {
					destination: 2.52,
					offset: [0, 0],
					structure: [
						['sea_down', 'sea_down', 'tide_down'],
						['tide_up', 'sea_up', 'sea_up'],
					],
					roof: ['roof'],
				},
				_201: {
					destination: 2.016,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['tide_up', 'sea_up', 'tide_up'],
					],
					roof: ['roof'],
				},
				_151: {
					destination: 1.512,
					offset: [0, 0],
					structure: [
						['sea_down', 'tide_down'],
						['tide_up', 'sea_up'],
					],
					roof: ['roof'],
				},
				_100: {
					destination: 1.008,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['tide_up'],
					],
					roof: ['roof'],
				},
				_50: {
					destination: 0.504,
					offset: [0, 0],
					structure: [
						['tide_down'],
						['tide_up'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma/sea_tide_horizontal': {
			label: `Sea & Tide - ${___('Poziomo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['tide_up', 'sea_up', 'sea_up', 'tide_up'],
					],
				},
				_252: {
					destination: 2.52,
					offset: [0, 0],
					structure: [
						['sea_down', 'sea_down', 'tide_down'],
						['tide_up', 'sea_up', 'sea_up'],
					],
				},
				_201: {
					destination: 2.016,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['tide_up', 'sea_up', 'tide_up'],
					],
				},
				_151: {
					destination: 1.512,
					offset: [0, 0],
					structure: [
						['sea_down', 'tide_down'],
						['tide_up', 'sea_up'],
					],
				},
				_100: {
					destination: 1.008,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['tide_up'],
					],
				},
				_50: {
					destination: 0.504,
					offset: [0, 0],
					structure: [
						['tide_down'],
						['tide_up'],
					],
				},
			},
		},
		'roma/sea_horizontal_roof': {
			label: `Sea - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_100: {
					destination: 1.008,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['sea_up'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma/sea_horizontal': {
			label: `Sea - ${___('Poziomo')}`,
			destinations: {
				_100: {
					destination: 1.008,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['sea_up'],
					],
				},
			},
		},
		'roma/tide_horizontal_roof': {
			label: `Tide - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_50: {
					destination: 0.504,
					offset: [0, 0],
					structure: [
						['tide_down'],
						['tide_up'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma/tide_horizontal': {
			label: `Tide - ${___('Poziomo')}`,
			destinations: {
				_50: {
					destination: 0.504,
					offset: [0, 0],
					structure: [
						['tide_down'],
						['tide_up'],
					],
				},
			},
		},
		'roma/sea_vertical_roof': {
			label: `Sea - ${___('Pionowo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['sea_left', 'sea_right'],
					],
					roof: ['roof'],
				},
				_201: {
					destination: 2.016,
					offset: [0.008],
					structure: [
						['sea_left', 'sea_right'],
					],
					roof: ['roof'],
				},
				_100: {
					destination: 1.008,
					offset: [0.004],
					structure: [
						['sea_left', 'sea_right'],
					],
					roof: ['roof'],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['sea_left', 'sea_right'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma/sea_vertical': {
			label: `Sea - ${___('Pionowo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['sea_left', 'sea_right'],
					],
				},
				_201: {
					destination: 2.016,
					offset: [0.008],
					structure: [
						['sea_left', 'sea_right'],
					],
				},
				_100: {
					destination: 1.008,
					offset: [0.004],
					structure: [
						['sea_left', 'sea_right'],
					],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['sea_left', 'sea_right'],
					],
				},
			},
		},
		'roma/tide_vertical_roof': {
			label: `Tide - ${___('Pionowo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['tide_left', 'tide_right'],
					],
					roof: ['roof'],
				},
				_201: {
					destination: 2.016,
					offset: [0.008],
					structure: [
						['tide_left', 'tide_right'],
					],
					roof: ['roof'],
				},
				_100: {
					destination: 1.008,
					offset: [0.004],
					structure: [
						['tide_left', 'tide_right'],
					],
					roof: ['roof'],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['tide_left', 'tide_right'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma/tide_vertical': {
			label: `Tide - ${___('Pionowo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['tide_left', 'tide_right'],
					],
				},
				_201: {
					destination: 2.016,
					offset: [0.008],
					structure: [
						['tide_left', 'tide_right'],
					],
				},
				_100: {
					destination: 1.008,
					offset: [0.004],
					structure: [
						['tide_left', 'tide_right'],
					],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['tide_left', 'tide_right'],
					],
				},
			},
		},

		// Roma Mega
		'roma_mega/sea_tide_horizontal_roof': {
			label: `Sea & Tide - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0, 0],
					structure: [
						['tide_down', 'sea_down', 'sea_down', 'tide_down'],
						['sea_up', 'sea_up', 'sea_up'],
					],
					roof: ['roof'],
				},
				_151: {
					destination: 1.512,
					offset: [0, 0],
					structure: [
						['sea_down', 'tide_down'],
						['tide_up', 'sea_up'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma_mega/sea_tide_horizontal': {
			label: `Sea & Tide - ${___('Poziomo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0, 0],
					structure: [
						['tide_down', 'sea_down', 'sea_down', 'tide_down'],
						['sea_up', 'sea_up', 'sea_up'],
					],
				},
				_151: {
					destination: 1.512,
					offset: [0, 0],
					structure: [
						['sea_down', 'tide_down'],
						['tide_up', 'sea_up'],
					],
				},
			},
		},
		'roma_mega/sea_horizontal_roof': {
			label: `Sea - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['sea_up'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma_mega/sea_horizontal': {
			label: `Sea - ${___('Poziomo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0, 0],
					structure: [
						['sea_down'],
						['sea_up'],
					],
				},
			},
		},
		'roma_mega/tide_horizontal_roof': {
			label: `Tide - ${___('Poziomo')} + ${___('Daszek')}`,
			destinations: {
				_151: {
					destination: 1.512,
					offset: [0, 0],
					structure: [
						['tide_down'],
						['tide_up'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma_mega/tide_horizontal': {
			label: `Tide - ${___('Poziomo')}`,
			destinations: {
				_151: {
					destination: 1.512,
					offset: [0, 0],
					structure: [
						['tide_down'],
						['tide_up'],
					],
				},
			},
		},
		'roma_mega/sea_vertical_roof': {
			label: `Sea - ${___('Pionowo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['sea_left', 'sea_right'],
					],
					roof: ['roof'],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['sea_left', 'sea_right'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma_mega/sea_vertical': {
			label: `Sea - ${___('Pionowo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['sea_left', 'sea_right'],
					],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['sea_left', 'sea_right'],
					],
				},
			},
		},
		'roma_mega/tide_vertical_roof': {
			label: `Tide - ${___('Pionowo')} + ${___('Daszek')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['tide_left', 'tide_right'],
					],
					roof: ['roof'],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['tide_left', 'tide_right'],
					],
					roof: ['roof'],
				},
			},
		},
		'roma_mega/tide_vertical': {
			label: `Tide - ${___('Pionowo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012],
					structure: [
						['tide_left', 'tide_right'],
					],
				},
				_10: {
					destination: 0.10,
					offset: [0],
					structure: [
						['tide_left', 'tide_right'],
					],
				},
			},
		},
		'roma_mega/tide_roof_vertical': {
			label: `Tide & ${___('Daszek')} - ${___('Pionowo')}`,
			destinations: {
				_302: {
					destination: 3.024,
					offset: [0.012, 0],
					structure: [
						['tide_left', 'tide_right'],
						['roof'],
					],
				},
				_10: {
					destination: 0.10,
					offset: [0, 0],
					structure: [
						['tide_left', 'tide_right'],
						['roof'],
					],
				},
			},
		},
	},
});