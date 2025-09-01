import UniKit from '../UniKit';


class FencingData extends UniKit {
	constructor(args, config) {
		super();

		this.args = args;
		this.config = config;
		this.data = {};

		switch (this.config.type) {
			case 'horizontal':
				this.data.span = {
					left: 0,
					right: 0,
					top: this.sum([
						this.config.frame?.top?.size,
						this.config.frame?.top?.space,

						this.config.slats?.space[0],
					]),
					bottom: this.sum([
						this.config.frame?.bottom?.size,
						this.config.frame?.bottom?.space,

						this.config.slats?.space[1],
					]),
				};
				this.data.span.x = this.data.span.left + this.data.span.right;
				this.data.span.y = this.data.span.top + this.data.span.bottom;

				this.data.panels = this.panels.data(this.args.height - this.data.span.y);
				this.data.width = this.args.width;
				this.data.height = this.data.panels.size + this.data.span.y;
				break;

			case 'vertical':
				this.data.span = {
					left: this.sum([
						this.config.frame?.left?.size,
						this.config.frame?.left?.space,

						this.config.slats?.space[0],
					]),
					right: this.sum([
						this.config.frame?.right?.size,
						this.config.frame?.right?.space,

						this.config.slats?.space[1],
					]),
					top: 0,
					bottom: 0,
				};
				this.data.span.x = this.data.span.left + this.data.span.right;
				this.data.span.y = this.data.span.top + this.data.span.bottom;

				this.data.panels = this.panels.data(this.args.width - this.data.span.x);
				this.data.width = this.args.width;
				this.data.height = this.args.height;
				break;

			default:
		}

		return this.data;
	}
}


export default FencingData;