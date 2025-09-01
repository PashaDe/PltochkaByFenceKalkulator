import { ___ } from 'classes/Translation';

import variants from './variants';
import heights from './heights';


export default () => ({
	label: '-',
	models: {
		full: {
			label: ___('Pełne'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
		},
		grid: {
			label: ___('Kratka'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		slant: {
			label: `${___('Kratka skos')}`,
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		kumiko: {
			label: ___('Kumiko'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		tribal: {
			label: ___('Tribal'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		circles: {
			label: ___('Koła'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		flower: {
			label: ___('Kwiat'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		inside: {
			label: ___('Z jedną wstawką'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.27,
			pattern: 0.27,
		},
		insides: {
			label: ___('Z wieloma wstawkami'),
			variant: variants().default,
			heights: heights().default,
			panel: 0.22,
			inside: 0.035,
		},
	},
});