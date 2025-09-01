import UniKit from '../UniKit';


class GateSlidingGeometry extends UniKit {
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
		this.w1 = this.bound(1, this.data.width, 'center') + this.sum([this.args.indent?.left]) + this.sum([this.args.open]) * this.data.direction;
		this.w2 = this.bound(2, this.data.width, 'center') - this.sum([this.args.indent?.right]) + this.sum([this.args.open]) * this.data.direction;

		this.h1 = 0 + this.sum([this.args.space]);
		this.h2 = this.data.height + this.sum([this.args.space]);

		this.d = this.sum([this.args.inside, this.config.support?.depth / 2]) * this.data.side;
	}

	draw = () => {
		let w1;
		let w2;
		let h1;
		let h2;
		let d1;
		let d2;

		let pos;


		/* --- BASEMENT ------------------------------------------- */

		if (this.config.basement) {
			['top', 'bottom', 'base'].forEach((v) => {
				let basement;

				switch (v) {
					case 'top':
						basement = this.config.basement[v];

						if (basement?.depth) {
							h1 = this.h2 - basement.height;
							h2 = h1 + basement.height;
						}
						break;

					case 'bottom':
						basement = this.config.basement[v];

						if (basement?.depth) {
							h1 = this.h1 + this.sum([this.config.basement?.base?.height]);
							h2 = h1 + basement.height;
						}
						break;

					case 'base':
						basement = this.config.basement[v];

						if (basement?.depth) {
							h1 = this.h1;
							h2 = h1 + basement.height;
						}
						break;

					default:
				}

				if (basement?.depth) {
					d1 = this.d - basement.depth / 2 - this.sum([basement?.inside]);
					d2 = this.d + basement.depth / 2 + this.sum([basement?.outside]);

					pos = (basement.width === false) ? this.sum([this.config.extra?.width]) : basement.width;

					switch (this.args.direction) {
						case 'left':
							this.rect(this.w1 - pos, this.w2, h1, h2, d1, d2, {}, 0);
							break;

						case 'right':
							this.rect(this.w1, this.w2 + pos, h1, h2, d1, d2, {}, 0);
							break;

						default:
					}
				}
			});
		}


		/* --- FRAME ---------------------------------------------- */

		if (this.config.frame) {
			['left', 'center', 'right', 'top', 'bottom'].forEach((v) => {
				let frame;

				switch (v) {
					case 'left':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w1;
							w2 = w1 + frame.size;

							h1 = this.h1;
							h2 = this.h2 - this.sum([this.config.basement?.top?.height]);
						}
						break;

					case 'center':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = (this.w1 + this.w2) / 2 - frame.size / 2;
							w2 = w1 + frame.size;

							h1 = this.h1;
							h2 = this.h2 - this.sum([this.config.basement?.top?.height]);
						}
						break;

					case 'right':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w2 - frame.size;
							w2 = w1 + frame.size;

							h1 = this.h1;
							h2 = this.h2 - this.sum([this.config.basement?.top?.height]);
						}
						break;

					case 'top':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w1;
							w2 = this.w2;

							h1 = this.h2 - frame.size - this.sum([this.config.basement?.top?.height]);
							h2 = h1 + frame.size;
						}
						break;

					case 'bottom':
						frame = this.config.frame[v];

						if (frame?.depth) {
							w1 = this.w1;
							w2 = this.w2;

							h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height]);
							h2 = h1 + frame.size;
						}
						break;

					default:
				}

				if (frame?.depth) {
					this.rect(w1, w2, h1, h2, this.d - frame.depth / 2, this.d + frame.depth / 2, {}, 0);
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

							h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height, this.config.frame?.bottom?.size, this.config.frame?.bottom?.space]);
							h2 = this.h2 - this.sum([this.config.basement?.top?.height, this.config.frame?.top?.size, this.config.frame?.top?.space]);
						}
						break;

					case 'right':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w2 - slat.size - this.sum([this.config.frame?.right?.size, this.config.frame?.right?.space]);
							w2 = w1 + slat.size;

							h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height, this.config.frame?.bottom?.size, this.config.frame?.bottom?.space]);
							h2 = this.h2 - this.sum([this.config.basement?.top?.height, this.config.frame?.top?.size, this.config.frame?.top?.space]);
						}
						break;

					case 'top':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w1 + this.sum([this.config.frame?.left?.size, this.config.frame?.left?.space]);
							w2 = this.w2 - this.sum([this.config.frame?.right?.size, this.config.frame?.right?.space]);

							h1 = this.h2 - slat.size - this.sum([this.config.basement?.top?.height, this.config.frame?.top?.size, this.config.frame?.top?.space]);
							h2 = h1 + slat.size;
						}
						break;

					case 'bottom':
						slat = this.config.slats[v];

						if (slat?.depth) {
							w1 = this.w1 + this.sum([this.config.frame?.left?.size, this.config.frame?.left?.space]);
							w2 = this.w2 - this.sum([this.config.frame?.right?.size, this.config.frame?.right?.space]);

							h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height, this.config.frame?.bottom?.size, this.config.frame?.bottom?.space]);
							h2 = h1 + slat.size;
						}
						break;

					default:
				}

				if (slat?.depth) {
					this.rect(w1, w2, h1, h2, this.d - slat.depth / 2, this.d + slat.depth / 2, {}, 0);
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
						(-this.config.bracket1.position?.z || 0) + this.d - this.config.bracket1.depth / 2,
						(-this.config.bracket1.position?.z || 0) + this.d + this.config.bracket1.depth / 2,
						{},
						0,
					);
					break;

				case 'vertical':
					h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height]);

					this.rect(
						(this.config.bracket1.position?.x || 0) + this.w1,
						(this.config.bracket1.position?.x || 0) + this.w2,
						(this.config.bracket1.position?.y || 0) + h1,
						(this.config.bracket1.position?.y || 0) + h1 + this.config.bracket1.size,
						(-this.config.bracket1.position?.z || 0) + this.d - this.config.bracket1.depth / 2,
						(-this.config.bracket1.position?.z || 0) + this.d + this.config.bracket1.depth / 2,
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
						(-this.config.bracket2.position?.z || 0) + this.d - this.config.bracket2.depth / 2,
						(-this.config.bracket2.position?.z || 0) + this.d + this.config.bracket2.depth / 2,
						{},
						0,
					);
					break;

				case 'vertical':
					h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height]);

					this.rect(
						(this.config.bracket2.position?.x || 0) + this.w1,
						(this.config.bracket2.position?.x || 0) + this.w2,
						(this.config.bracket2.position?.y || 0) + h1,
						(this.config.bracket2.position?.y || 0) + h1 + this.config.bracket2.size,
						(-this.config.bracket2.position?.z || 0) + this.d - this.config.bracket2.depth / 2,
						(-this.config.bracket2.position?.z || 0) + this.d + this.config.bracket2.depth / 2,
						{},
						0,
					);
					break;

				default:
			}
		}


		/* --- EXTRA ---------------------------------------------- */

		if (this.config.extra) {
			d1 = this.d - this.config.extra.depth / 2;
			d2 = this.d + this.config.extra.depth / 2;

			switch (this.config.extra.type) {
				case 'square':
					['top', 'side', 'diagonal'].forEach((v) => {
						switch (v) {
							case 'top':
								h1 = this.h2 - this.config.extra.size;
								h2 = h1 + this.config.extra.size;

								switch (this.args.direction) {
									case 'left':
										w1 = this.w1 - this.config.extra.width;
										w2 = this.w1;
										break;

									case 'right':
										w1 = this.w2;
										w2 = this.w2 + this.config.extra.width;
										break;

									default:
								}

								this.rect(w1, w2, h1, h2, d1, d2, {}, 0);
								break;

							case 'side':
								h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height]);
								h2 = this.h2;

								switch (this.args.direction) {
									case 'left':
										w1 = this.w1 - this.config.extra.width;
										w2 = w1 + this.config.extra.size;
										break;

									case 'right':
										w1 = this.w2 + this.config.extra.width - this.config.extra.size;
										w2 = w1 + this.config.extra.size;
										break;

									default:
								}

								this.rect(w1, w2, h1, h2, d1, d2, {}, 0);
								break;

							case 'diagonal':
								let f1 = 0;
								let f2 = 0;

								h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height]);
								h2 = this.h2 - this.config.extra.size;

								switch (this.args.direction) {
									case 'left':
										w1 = this.w1 - this.config.extra.width + this.config.extra.size;
										w2 = this.w1;

										f1 = this.config.extra.size;
										break;

									case 'right':
										w1 = this.w2 + this.config.extra.width - this.config.extra.size;
										w2 = this.w2;

										f2 = this.config.extra.size;
										break;

									default:
								}

								this.quad([
									[w1 - f2, h1, d1 + this.D],
									[w1 - f2, h1, d2 - this.D],
									[w1 + f1, h1, d2 - this.D],
									[w1 + f1, h1, d1 + this.D],

									[w2 - f1, h2, d1 + this.D],
									[w2 - f1, h2, d2 - this.D],
									[w2 + f2, h2, d2 - this.D],
									[w2 + f2, h2, d1 + this.D],
								], {}, 0);
								break;

							default:
						}
					});
					break;

				case 'triangle':
					['diagonal'].forEach((v) => {
						switch (v) {
							case 'diagonal':
								let f1 = 0;
								let f2 = 0;

								h1 = this.h1 + this.sum([this.config.basement?.bottom?.height, this.config.basement?.base?.height]);
								h2 = this.h2;

								switch (this.args.direction) {
									case 'left':
										w1 = this.w1 - this.config.extra.width + 0.02;
										w2 = this.w1 + this.config.extra.size;

										f1 = this.config.extra.size;
										break;

									case 'right':
										w1 = this.w2 + this.config.extra.width - 0.02;
										w2 = this.w2 - this.config.extra.size;

										f2 = this.config.extra.size;
										break;

									default:
								}

								this.quad([
									[w1 - f2, h1, d1 + this.D],
									[w1 - f2, h1, d2 - this.D],
									[w1 + f1, h1, d2 - this.D],
									[w1 + f1, h1, d1 + this.D],

									[w2 - f1, h2, d1 + this.D],
									[w2 - f1, h2, d2 - this.D],
									[w2 + f2, h2, d2 - this.D],
									[w2 + f2, h2, d1 + this.D],
								], {}, 0);
								break;

							default:
						}
					});
					break;

				default:
			}
		}


		/* --- PANELS --------------------------------------------- */

		w1 = this.w1 + this.data.span.left;
		w2 = this.w2 - this.data.span.right;

		h1 = this.h1 + this.data.span.bottom;
		h2 = this.h2 - this.data.span.top;

		this.panels.draw(w1, w2, h1, h2, this.d);
	}
}


export default GateSlidingGeometry;