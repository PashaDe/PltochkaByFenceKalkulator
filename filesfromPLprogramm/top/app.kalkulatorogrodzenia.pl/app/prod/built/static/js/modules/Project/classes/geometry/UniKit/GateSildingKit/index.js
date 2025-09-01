/*
*

args:
{
	direction: 'left' || 'right', // kierunek względem origin
	width: 6.00, // szerokość
	height: 1.50, // wysokość
	space: 0, // odległość od ziemi
	indent: { left: 0, right: 0, inside: 0 }, // wcięcie
	inside: 0, // przesunięcie
	open: 0, // otwarcie
}

config:
{
	// układ
	type: 'horizontal' || 'vertical',

	// poziome wsporniki na szerokość większą niż prześwit
	basement:
	{
		top:
		bottom:
		base:
		{
			width: 0.50 || false, // szerokość - false jeśli 100% (prześwit + extra)
			height: 0.05, // wysokość
			depth: 0.05, // głębokość
			inside: 0.02, // powiększone do środka
			outside: 0.02, // powiększone na zewnątrz
		},
	},

	// ramka
	frame:
	{
		left:
		center:
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

	// wspornik poza prześwitem
	extra:
	{
		type: 'square' || 'triangle', // typ
		width: 1.50, // szrtokość
	},

	// wsparcie po przeciwnej stronie extra - przez które przejeżdża brama
	support: {},
}

*
*/

import GateSlidingData from './data';
import GateSlidingGeometry from './geometry';


class GateSlidingKit {
	static data = (args, config) => {
		const data = new GateSlidingData(args, config);

		return data;
	}

	static geometry = (args, config, data = {}, unwrap = {}) => {
		const geometry = new GateSlidingGeometry(args, config, data, unwrap);

		return geometry;
	}
}


export default GateSlidingKit;