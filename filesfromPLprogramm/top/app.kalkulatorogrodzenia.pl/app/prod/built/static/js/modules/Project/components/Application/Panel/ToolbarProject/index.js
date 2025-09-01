import React from 'react';

import container from 'redux/container';

import { ___ } from 'classes/Translation';

import Button from './Button';


class ToolbarProject extends React.Component {
	render() {
		return (
			<section className="toolbar-project">
				<Button action={() => container.app.actions.setPanel('colors-blocks')} type="colors-blocks" description={___('Wybierz kolor bloczków')} />
				<Button action={() => container.app.actions.setPanel('colors-peaks')} type="colors-peaks" description={___('Wybierz kolor daszków')} />

				{(container?.app?.getSystem()?.adds.combo) && (
					<Button action={() => container.app.actions.setPanel('combo')} type="combo" description={___('Konfiguruj kombo')} />
				)}

				{(container?.app?.getSystem()?.adds.fencings) && (
					<Button action={() => container.app.actions.setPanel('fencings')} type="fencings" description={___('Konfiguruj wypełnienia')} />
				)}

				<Button action={() => container.app.extensions.average.start()} type="average" description={___('Rozłóż słupki równomiernie')} />
				<Button action={() => container.app.actions.setSetting('move')} type="move" description={___('Blokada przenoszenia elementów')} param={{ enabled: container.app?.settings.move }} after={() => this.forceUpdate()} />

				{(container?.app?.getSystem()?.migration) && (
					<Button action={() => container.app.actions.setPanel('migration')} type="migration" description={___('Migruj projekt do innego systemu')} />
				)}

				<Button action={() => container.app.actions.setSetting('autosave')} type="autosave" description={___('Autozapis')} param={{ enabled: container.app?.settings.autosave }} after={() => this.forceUpdate()} />
				<Button action={() => container.app.actions.setPanel('settings')} type="settings" description={___('Ustawienia projektu')} />
			</section>
		);
	}
}


export default ToolbarProject;