/*
*

args:
{
	direction: 'left' || 'center' || 'right', // kierunek względem origin
	width: 5.00, // szerokość
	height: 1.50, // wysokość
	space: 0, // odległość od ziemi
	indent: { left: 0, right: 0 }, // wcięcie
}

config:
{
	// układ
	type: 'horizontal' || 'vertical',

	// belki na końcach - pionowe dla 'horizontal', poziome dla 'vertical'
	slats:
	{
		size: 0.02, // szerokość lub wysokość w zależności od 'type'
		depth: 0.024, // głębokość
		space: // odstęp
		[
			0, // top dla 'horizontal', left dla 'vertical'
			0, // bottom dla 'horizontal', right dla 'vertical'
		],
	},

	// wspornik
	bracket:
	{
		size: 0.02, // szerokość lub wysokość w zależności od 'type'
		depth: 0.024, // głębokość
		position { x: 0, y: 0, z: 0 }, // pozycja
	},

	// panele
	panels: {},

	// słupki łączące, gdy szerokość przekracza maksymalną długość panela
	joiners:
	{
		width: 0.08, // szerokość
		depth: 0.08, // głębokość
	},
}

*
*/

import FencingData from './data';
import FencingGeometry from './geometry';


class FencingKit {
	static data = (args, config) => {
		const data = new FencingData(args, config);

		return data;
	}

	static geometry = (args, config, data = {}, unwrap = {}) => {
		const geometry = new FencingGeometry(args, config, data, unwrap);

		return geometry;
	}
}


export default FencingKit;