import UniKit from '../UniKit';


class WicketGeometry extends UniKit {
	constructor(args, config, data, unwrap) {
		super(unwrap);

		this.args = args;
		this.config = config;
		this.data = data;

		this.init();
		this.draw();

		this.geometry.computeFaceNormals();
		// this.geometry.computeVertexNormals();

		return this.geometry;
	}

	init = () => {
		this.w1 = this.bound(1, this.data.width, this.args.direction) + this.sum([this.args.indent?.left]);
		this.w2 = this.bound(2, this.data.width, this.args.direction) - this.sum([this.args.indent?.right]);

		this.h1 = 0 + this.sum([this.args.space]);
		this.h2 = this.data.height + this.sum([this.args.space]);
	}

	draw = () => {
		let w1;
		let w2;
		let h1;
		let h2;


		/* --- FRAME ---------------------------------------------- */

		if (this.config.frame) {
			['left', 'right', 'top', 'bottom'].forEach((v) => {
				let frame;

				switch (v) {
					case 'left':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w1;
							w2 = w1 + frame.size;

							h1 = this.h1;
							h2 = this.h2;
						}
						break;

					case 'right':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w2 - frame.size;
							w2 = w1 + frame.size;

							h1 = this.h1;
							h2 = this.h2;
						}
						break;

					case 'top':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w1;
							w2 = this.w2;

							h1 = this.h2 - frame.size;
							h2 = h1 + frame.size;
						}
						break;

					case 'bottom':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w1;
							w2 = this.w2;

							h1 = this.h1;
							h2 = h1 + frame.size;
						}
						break;

					default:
				}

				if (frame?.depth) {
					this.rect(w1, w2, h1, h2, -frame.depth / 2, frame.depth / 2, {}, 0);
				}
			});
		}


		/* --- SLATS ---------------------------------------------- */

		if (this.config.slats) {
			['left', 'right', 'top', 'bottom'].forEach((v) => {
				let slat;

				switch (v) {
					case 'left':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w1 + this.sum([this.config.frame?.left?.size, this.config.frame?.left?.space]);
							w2 = w1 + slat.size;

							h1 = this.h1 + this.sum([this.config.frame?.bottom?.size, this.config.frame?.bottom?.space]);
							h2 = this.h2 - this.sum([this.config.frame?.top?.size, this.config.frame?.top?.space]);
						}
						break;

					case 'right':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w2 - slat.size - this.sum([this.config.frame?.right?.size, this.config.frame?.right?.space]);
							w2 = w1 + slat.size;

							h1 = this.h1 + this.sum([this.config.frame?.bottom?.size, this.config.frame?.bottom?.space]);
							h2 = this.h2 - this.sum([this.config.frame?.top?.size, this.config.frame?.top?.space]);
						}
						break;

					case 'top':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w1 + this.sum([this.config.frame?.left?.size, this.config.frame?.left?.space]);
							w2 = this.w2 - this.sum([this.config.frame?.right?.size, this.config.frame?.right?.space]);

							h1 = this.h2 - slat.size - this.sum([this.config.frame?.top?.size, this.config.frame?.top?.space]);
							h2 = h1 + slat.size;
						}
						break;

					case 'bottom':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w1 + this.sum([this.config.frame?.left?.size, this.config.frame?.left?.space]);
							w2 = this.w2 - this.sum([this.config.frame?.right?.size, this.config.frame?.right?.space]);

							h1 = this.h1 + this.sum([this.config.frame?.bottom?.size, this.config.frame?.bottom?.space]);
							h2 = h1 + slat.size;
						}
						break;

					default:
				}

				if (slat?.depth) {
					this.rect(w1, w2, h1, h2, -slat.depth / 2, slat.depth / 2, {}, 0);
				}
			});
		}


		/* --- BRACKET -------------------------------------------- */

		if (this.config.bracket1) {
			switch (this.config.type) {
				case 'horizontal':
					const location = (this.h2 - this.h1) * 1 / 3;

					this.rect(
						this.w1,
						this.w2,
						this.h1 + location,
						this.h1 + location + this.config.bracket1.size,
						(-this.config.bracket1.position?.z || 0) - this.config.bracket1.depth / 2,
						(-this.config.bracket1.position?.z || 0) + this.config.bracket1.depth / 2,
						{},
						0,
					);
					break;

				case 'vertical':
					this.rect(
						(this.config.bracket1.position?.x || 0) + this.w1,
						(this.config.bracket1.position?.x || 0) + this.w2,
						(this.config.bracket1.position?.y || 0) + this.h1,
						(this.config.bracket1.position?.y || 0) + this.h1 + this.config.bracket1.size,
						(-this.config.bracket1.position?.z || 0) - this.config.bracket1.depth / 2,
						(-this.config.bracket1.position?.z || 0) + this.config.bracket1.depth / 2,
						{},
						0,
					);
					break;

				default:
			}
		}

		if (this.config.bracket2) {
			switch (this.config.type) {
				case 'horizontal':
					const location = (this.h2 - this.h1) * 2 / 3;

					this.rect(
						this.w1,
						this.w2,
						this.h1 + location,
						this.h1 + location + this.config.bracket2.size,
						(-this.config.bracket2.position?.z || 0) - this.config.bracket2.depth / 2,
						(-this.config.bracket2.position?.z || 0) + this.config.bracket2.depth / 2,
						{},
						0,
					);
					break;

				case 'vertical':
					this.rect(
						(this.config.bracket2.position?.x || 0) + this.w1,
						(this.config.bracket2.position?.x || 0) + this.w2,
						(this.config.bracket2.position?.y || 0) + this.h1,
						(this.config.bracket2.position?.y || 0) + this.h1 + this.config.bracket2.size,
						(-this.config.bracket2.position?.z || 0) - this.config.bracket2.depth / 2,
						(-this.config.bracket2.position?.z || 0) + this.config.bracket2.depth / 2,
						{},
						0,
					);
					break;

				default:
			}
		}


		/* --- PANELS --------------------------------------------- */

		w1 = this.w1 + this.data.span.left;
		w2 = this.w2 - this.data.span.right;

		h1 = this.h1 + this.data.span.bottom;
		h2 = this.h2 - this.data.span.top;

		this.panels.draw(w1, w2, h1, h2);
	}
}


export default WicketGeometry;