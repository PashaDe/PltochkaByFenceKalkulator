import React from 'react';

import container from 'redux/container';
import * as workspaceActions from '../../redux/workspace/actions';
import * as dialogActions from 'modules/assets/Dialog/redux/actions';
import * as popupActions from 'modules/assets/Popup/redux/actions';

import Http from 'classes/Http';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import ButtonImage from 'components/ui/ButtonImage';
import ButtonText from 'components/ui/ButtonText';


class Valuation {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;

		if (this.instance.editMode()) {
			workspaceActions.add('bottom-right', 'valuation', (<div className="p-2"><ButtonText action={() => this.valuation()} text={___('Wycena')} /></div>));
		}
	}

	data = () => {
		let output = {
			id: this.instance.id,
			title: this.instance.settings.title,
			description: this.instance.settings.description,
			system: this.instance.system,
			blocksFamily: this.instance.blocksFamily,
			blocksColor: this.instance.blocksColor,
			peaksFamily: this.instance.peaksFamily,
			peaksColor: this.instance.peaksColor,
			settings: this.instance.settings,
			config: {
				system: this.instance.getSystem(),
				mailboxes: this.instance.config.mailboxes,
				lamps: this.instance.config.lamps,
				ledblocks: this.instance.config.ledblocks,
			},
			poles: [],
			walls: [],
		};

		Objects.entries(this.instance.poles).forEach(([key, entry]) => {
			output.poles[key] = {
				config: {
					size: {
						width: entry.config.size.width,
						depth: entry.config.size.depth,
						height: entry.config.size.height,
						fullHeight: entry.config.size.fullHeight,
					},
					polygonBreak: entry.config.polygonBreak,
					virtual: entry.config.virtual,
					blockMaterialId: entry.config.blockMaterialId,
				},
				additionals: {
					mailbox: entry.additionals.mailbox.status ? entry.additionals.mailbox.config : false,
					lamp: entry.additionals.lamp.status ? entry.additionals.lamp.config : false,
					ledblock: entry.additionals.ledblock.status ? entry.additionals.ledblock.config : false,
				},
				dimension: {
					poleWidth: entry.poleWidth,
					poleDepth: entry.poleDepth,
					peakWidth: entry.peakWidth,
				},
				blockMaterial: entry.blockMaterial,
				angle: entry.angle,
				seating: entry.seating,
				break: entry.break,
				wall1: ((entry.wall) ? {
					config: {
						size: {
							depth: entry.wall.config.size.depth,
							height: entry.wall.config.size.height,
						},
						kind: entry.wall.config.kind,
						blockMaterialId: entry.wall.config.blockMaterialId,
					},
					dimension: {
						wallWidth: entry.wall.wallWidth,
						peakWidth: entry.wall.peakWidth,
					},
					wallElements: entry.wall.wallElements,
					blockMaterial: entry.wall.blockMaterial,
					status: entry.wall.status,
				} : false),
				wall2: ((entry.next && entry.next.wall) ? {
					config: {
						size: {
							depth: entry.next.wall.config.size.depth,
							height: entry.next.wall.config.size.height,
						},
						kind: entry.next.wall.config.kind,
						blockMaterialId: entry.next.wall.config.blockMaterialId,
					},
					dimension: {
						wallWidth: entry.next.wall.wallWidth,
						peakWidth: entry.next.wall.peakWidth,
					},
					wallElements: entry.next.wall.wallElements,
					blockMaterial: entry.next.wall.blockMaterial,
					status: entry.next.wall.status,
				} : false),
			};

			if (entry.next && entry.next.wall) {
				output.walls[key] = {
					config: {
						size: {
							depth: entry.next.wall.config.size.depth,
							height: entry.next.wall.config.size.height,
						},
						kind: entry.next.wall.config.kind,
						blockMaterialId: entry.next.wall.config.blockMaterialId,
					},
					additionals: {
						panels: entry.next.wall.panels.valuation,
						combo: entry.next.wall.combo.valuation,
					},
					dimension: {
						wallWidth: entry.next.wall.wallWidth,
						peakWidth: entry.next.wall.peakWidth,
					},
					wallElements: entry.next.wall.wallElements,
					blockMaterial: entry.next.wall.blockMaterial,
					status: entry.next.wall.status,
					pole1: ((entry.next.wall.pole1) ? {
						config: {
							size: {
								width: entry.next.wall.pole1.config.size.width,
								depth: entry.next.wall.pole1.config.size.depth,
								height: entry.next.wall.pole1.config.size.height,
								fullHeight: entry.next.wall.pole1.config.size.fullHeight,
							},
							polygonBreak: entry.next.wall.pole1.config.polygonBreak,
							virtual: entry.next.wall.pole1.config.virtual,
							blockMaterialId: entry.next.wall.pole1.config.blockMaterialId,
						},
						dimension: {
							poleWidth: entry.next.wall.pole1.poleWidth,
							poleDepth: entry.next.wall.pole1.poleDepth,
							peakWidth: entry.next.wall.pole1.peakWidth,
						},
						blockMaterial: entry.next.wall.pole1.blockMaterial,
						angle: entry.next.wall.pole1.angle,
						seating: entry.next.wall.pole1.seating,
						break: entry.next.wall.pole1.break,
					} : false),
					pole2: ((entry.next.wall.pole2) ? {
						config: {
							size: {
								width: entry.next.wall.pole2.config.size.width,
								depth: entry.next.wall.pole2.config.size.depth,
								height: entry.next.wall.pole2.config.size.height,
								fullHeight: entry.next.wall.pole2.config.size.fullHeight,
							},
							polygonBreak: entry.next.wall.pole2.config.polygonBreak,
							virtual: entry.next.wall.pole2.config.virtual,
							blockMaterialId: entry.next.wall.pole2.config.blockMaterialId,
						},
						dimension: {
							poleWidth: entry.next.wall.pole2.poleWidth,
							poleDepth: entry.next.wall.pole2.poleDepth,
							peakWidth: entry.next.wall.pole2.peakWidth,
						},
						blockMaterial: entry.next.wall.pole2.blockMaterial,
						angle: entry.next.wall.pole2.angle,
						seating: entry.next.wall.pole2.seating,
						break: entry.next.wall.pole2.break,
					} : false),
					wall1: ((entry.wall) ? {
						config: {
							size: {
								height: entry.wall.config.size.height,
							},
							kind: entry.wall.config.kind,
						},
						blockMaterial: entry.wall.blockMaterial,
						status: entry.wall.status,
					} : false),
					wall2: ((entry.next.next.wall) ? {
						config: {
							size: {
								height: entry.next.next.wall.config.size.height,
							},
							kind: entry.next.next.wall.config.kind,
						},
						blockMaterial: entry.next.next.wall.blockMaterial,
						status: entry.next.next.wall.status,
					} : false),
				};
			}
		});

		return output;
	}

	valuation = () => {
		const data = this.data();

		Http.post('valuation/', {
			data: { data: JSON.stringify(data) },
			success: (response) => {
				popupActions.show(
					response,
					(
						<div className="valuation-toolbar">
							<ButtonImage action={() => this.pdf(response)} type="pdf" description={___('Generuj PDF')} />
							<ButtonImage action={() => this.xls()} type="xls" description={___('Generuj XLS')} />
							<ButtonImage action={() => this.ows()} type="ows" description={___('Pobierz OWS')} />

							{(
								Objects.in(container.user.type, ['admin', 'employee', 'distributor'])
								&& container.user.nip
							) && (
								<ButtonImage action={() => this.comarch()} type="order" description={___('Złóż zamówienie')} />
							)}
						</div>
					),
				);
			},
		});
	}

	pdf = (data) => {
		let form = document.createElement('form');
		form.action = `${container.config.api?.url}../generators/pdf/`;
		form.method = 'post';
		form.target = '_blank';

		let input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'data';
		input.value = data;

		document.body.appendChild(form);

		form.appendChild(input);
		form.submit();
		form.remove();
	}

	xls = () => {
		let summary = document.querySelector('#result table.summary');

		let data = {
			header: [],
			result: [],
			weight: {
				label: summary?.querySelector('[data-field-label="weight"]')?.innerText,
				value: summary?.querySelector('[data-field-value="weight"]')?.innerText?.replace(' ', ''),
				unit: summary?.querySelector('[data-field-unit="weight"]')?.innerText,
			},
			surface: {
				label: summary?.querySelector('[data-field-label="surface"]')?.innerText,
				value: summary?.querySelector('[data-field-value="surface"]')?.innerText?.replace(' ', '').replace(',', '.'),
				unit: summary?.querySelector('[data-field-unit="surface"]')?.innerText,
			},
			capacity: {
				label: summary?.querySelector('[data-field-label="capacity"]')?.innerText,
				value: summary?.querySelector('[data-field-value="capacity"]')?.innerText?.replace(' ', '').replace(',', '.'),
				unit: summary?.querySelector('[data-field-unit="capacity"]')?.innerText,
			},
			priceNet: {
				label: summary?.querySelector('[data-field-label="priceNet"]')?.innerText,
				value: summary?.querySelector('[data-field-value="priceNet"]')?.innerText?.replace(' ', '').replace(',', '.'),
				unit: summary?.querySelector('[data-field-unit="priceNet"]')?.innerText,
			},
			priceGross: {
				label: summary?.querySelector('[data-field-label="priceGross"]')?.innerText,
				value: summary?.querySelector('[data-field-value="priceGross"]')?.innerText?.replace(' ', '').replace(',', '.'),
				unit: summary?.querySelector('[data-field-unit="priceGross"]')?.innerText,
			},
		};

		let header = document.querySelector('#result table.result thead');

		if (header) {
			data.header = {
				name: header.querySelector('[data-field-label="name"]')?.innerText,
				code: ___('Kod'),
				color: header.querySelector('[data-field-label="color"]')?.innerText,
				quantity: header.querySelector('[data-field-label="quantity"]')?.innerText,
				priceNet: ___('Netto'),
				priceGross: ___('Brutto'),
			};
		}

		let result = document.querySelector('#result table.result tbody');

		if (result) {
			Objects.values(result.querySelectorAll('tr')).forEach((entry) => {
				data.result.push({
					name: entry.querySelector('[data-field-value="name"]')?.innerText,
					code: entry.querySelector('[data-field-value="code"]')?.innerText,
					color: entry.querySelector('[data-field-value="color"]')?.innerText,
					quantity: entry.querySelector('[data-field-value="quantity"]')?.innerText,
					priceNet: entry.querySelector('[data-field-value="priceNet"]')?.innerText?.replace(' ', '').replace(',', '.'),
					priceGross: entry.querySelector('[data-field-value="priceGross"]')?.innerText?.replace(' ', '').replace(',', '.'),
				});
			});
		}

		let form = document.createElement('form');
		form.action = `${container.config.api?.url}../generators/xls/`;
		form.method = 'post';

		let input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'data';
		input.value = JSON.stringify(data);

		document.body.appendChild(form);

		form.appendChild(input);
		form.submit();
		form.remove();
	}

	ows = () => {
		let file;

		switch (container.lang) {
			case 'pl_PL':
				file = 'ows-joniec-2021-04-01.pdf';
				break;

			default:
				file = 'gtcs-joniec-2023-07-08.pdf';
		}

		if (file) {
			const dir = `${container.config.api?.url}../download/`;

			window.location.replace(`${dir}${file}`);
		}
	}

	comarch = () => {
		dialogActions.confirm(
			___('Po przesłaniu do rozliczenia, projekt zostanie zablokowany. Kontynuować ?'),
			() => {
				this.instance.extensions.storage.save(true, () => {
					const data = this.data();

					Http.post('comarch/add/', {
						data: { data: JSON.stringify(data) },
						success: (response) => {
							if (response.status) {
								window.location.replace('/');
							}
						},
					});
				});
			},
		);
	}
}


export default Valuation;