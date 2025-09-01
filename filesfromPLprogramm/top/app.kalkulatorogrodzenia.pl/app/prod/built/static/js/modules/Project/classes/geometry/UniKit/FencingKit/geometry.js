import UniKit from '../UniKit';


class FencingGeometry extends UniKit {
	constructor(args, config, data, unwrap) {
		super(unwrap);

		this.args = args;
		this.config = config;
		this.data = data;

		this.joiners = [];

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
		let d1;
		let d2;

		let count;
		let pos;


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
			d1 = -this.config.slats.depth / 2;
			d2 = this.config.slats.depth / 2;

			switch (this.config.type) {
				case 'horizontal':
					['left', 'right'].forEach((v) => {
						switch (v) {
							case 'left':
								w1 = this.w1;
								break;

							case 'right':
								w1 = this.w2 - this.config.slats.size;
								break;

							default:
						}

						this.rect(w1, w1 + this.config.slats.size, this.h1, this.h2, d1, d2, {}, 0);
					});
					break;

				case 'vertical':
					['top', 'bottom'].forEach((v) => {
						switch (v) {
							case 'top':
								h1 = this.h2 - this.config.slats.size;
								break;

							case 'bottom':
								h1 = this.h1;
								break;

							default:
						}

						this.rect(this.w1, this.w2, h1, h1 + this.config.slats.size, d1, d2, {}, 0);
					});
					break;

				default:
			}
		}


		/* --- BRACKET -------------------------------------------- */

		if (this.config.bracket1) {
			switch (this.config.type) {
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


		/* --- JOINERS -------------------------------------------- */

		if (this.config.joiners && this.config.joiners.interval) {
			count = Math.ceil(((this.w2 - this.w1) + this.config.joiners.width) / (this.config.joiners.interval + this.config.joiners.width)) - 1;

			for (let i = 1; i <= count; i++) {
				pos = ((this.w2 - this.w1) / (count + 1)) * i;

				w1 = this.w1 + pos - this.config.joiners.width / 2;
				w2 = this.w1 + pos + this.config.joiners.width / 2;

				d1 = -this.config.joiners.depth / 2;
				d2 = this.config.joiners.depth / 2;

				if (this.config.type === 'horizontal') {
					this.rect(w1, w2, 0, this.h2, d1, d2, {}, 0);

					// slats
					if (this.config.slats) {
						// eslint-disable-next-line no-loop-func
						['left', 'right'].forEach((v) => {
							switch (v) {
								case 'left':
									this.rect(w1 - this.config.slats.size, w1, this.h1, this.h2, -this.config.slats.depth / 2, this.config.slats.depth / 2, {}, 0);
									break;

								case 'right':
									this.rect(w2, w2 + this.config.slats.size, this.h1, this.h2, -this.config.slats.depth / 2, this.config.slats.depth / 2, {}, 0);
									break;

								default:
							}
						});
					}
				} else {
					this.joiners.push({ start: w1, end: w2 });
				}
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


export default FencingGeometry;