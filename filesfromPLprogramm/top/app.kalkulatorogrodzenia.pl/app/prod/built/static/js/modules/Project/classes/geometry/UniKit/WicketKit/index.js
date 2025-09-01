/*
*

args:
{
	direction: 'left' || 'right', // kierunek względem origin
	width: 1.00, // szerokość
	height: 1.50, // wysokość
	space: 0, // odległość od ziemi
	indent: { left: 0, right: 0 }, // wcięcie
}

config:
{
	// układ
	type: 'horizontal' || 'vertical',

	// ramka
	frame:
	{
		left:
		right:
		top:
		bottom:
		{
			size: 0.05, // szerokość lub wysokość w zależności od krawędzi
			depth: 0.05, // głębokość
			space: 0.01, // odstęp
		},
	},

	// belki na końcach
	slats:
	{
		left:
		right:
		top:
		bottom:
		{
			size: 0.02, // szerokość lub wysokość w zależności od krawędzi
			depth: 0.02, // głębokość
			space: 0.05, // odstęp
		},
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

	// klamka
	handle: 'standard',

	// gwint zamknięcia
	thread:
	{
		width: 0.035, // szerokość
		height: 0.285 || false, // wysokość - false jeśli 100%
		depth: 0.035, // głębokość
	},

	// zawias
	hinge:
	{
		width: 0.035, // szrtokość
		space: 0.10, // odległość od krawędzi
	},

	// słupki montażowe
	poles:
	{
		width: 0.08, // szerokość
		depth: 0.08, // głębokość
	},
}

*
*/

import WicketData from './data';
import WicketGeometry from './geometry';


class WicketKit {
	static data = (args, config) => {
		const data = new WicketData(args, config);

		return data;
	}

	static geometry = (args, config, data = {}, unwrap = {}) => {
		const geometry = new WicketGeometry(args, config, data, unwrap);

		return geometry;
	}
}


export default WicketKit;