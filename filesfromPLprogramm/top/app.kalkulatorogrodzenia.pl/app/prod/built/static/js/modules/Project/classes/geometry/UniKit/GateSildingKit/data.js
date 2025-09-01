import UniKit from '../UniKit';


class GateSlidingData extends UniKit {
	constructor(args, config) {
		super();

		this.args = args;
		this.config = config;
		this.data = {};

		this.data.span = {
			left: this.sum([
				this.config.frame?.left?.size,
				this.config.frame?.left?.space,

				this.config.slats?.left?.size,
				this.config.slats?.left?.space,
			]),
			right: this.sum([
				this.config.frame?.right?.size,
				this.config.frame?.right?.space,

				this.config.slats?.right?.size,
				this.config.slats?.right?.space,
			]),
			top: this.sum([
				this.config.basement?.top?.height,

				this.config.frame?.top?.size,
				this.config.frame?.top?.space,

				this.config.slats?.top?.size,
				this.config.slats?.top?.space,
			]),
			bottom: this.sum([
				this.config.basement?.bottom?.height,
				this.config.basement?.base?.height,

				this.config.frame?.bottom?.size,
				this.config.frame?.bottom?.space,

				this.config.slats?.bottom?.size,
				this.config.slats?.bottom?.space,
			]),
		};
		this.data.span.x = this.data.span.left + this.data.span.right;
		this.data.span.y = this.data.span.top + this.data.span.bottom;

		switch (this.args.side) {
			case 'front':
				this.data.side = 1;
				break;

			case 'back':
				this.data.side = -1;
				break;

			default:
		}

		switch (this.args.direction) {
			case 'left':
				this.data.direction = -1;
				break;

			case 'right':
				this.data.direction = 1;
				break;

			default:
		}

		switch (this.config.type) {
			case 'horizontal':
				this.data.panels = this.panels.data(this.args.height - this.data.span.y);
				this.data.width = this.args.width;
				this.data.height = this.data.panels.size + this.data.span.y;
				break;

			case 'vertical':
				this.data.panels = this.panels.data(this.args.width - this.data.span.x);
				this.data.width = this.args.width;
				this.data.height = this.args.height;
				break;

			default:
		}

		return this.data;
	}
}


export default GateSlidingData;