/* eslint-disable quote-props */
import migrations from './migrations';

import JoniecGorc from './systems/JoniecGorc';
// import JoniecGorcTop from './systems/JoniecGorcTop';
import JoniecGorcPeak from './systems/JoniecGorcPeak';
import JoniecRomaClassic from './systems/JoniecRomaClassic';
import JoniecRomaHorizon from './systems/JoniecRomaHorizon';
import JoniecRomaMega from './systems/JoniecRomaMega';
import JoniecRomaVitalEco from './systems/JoniecRomaVitalEco';
import JoniecRomaVitalEcoMultigrain from './systems/JoniecRomaVitalEcoMultigrain';
import JoniecRomaIntegraEco from './systems/JoniecRomaIntegraEco';
import JoniecRomaGiga from './systems/JoniecRomaGiga';
import JoniecRomaLite from './systems/JoniecRomaLite';
import JoniecRomaNova from './systems/JoniecRomaNova';
import JoniecRomaPerfect from './systems/JoniecRomaPerfect';
import JoniecRomaDiamond from './systems/JoniecRomaDiamond';
import JoniecModyn from './systems/JoniecModyn';
// import CastoramaCasto from './systems/CastoramaCasto';
import CastoramaTora from './systems/CastoramaTora';
import CastoramaGorc from './systems/CastoramaGorc';
import MerkuryRoda from './systems/MerkuryRoda';
// import MerkuryMarco from './systems/MerkuryMarco';
import MerkuryBeno from './systems/MerkuryBeno';
import MerkuryGorc from './systems/MerkuryGorc';
// import MerkuryGorcTop from './systems/MerkuryGorcTop';
import ObiTobi from './systems/ObiTobi';
import PsbPiro from './systems/PsbPiro';
// import PsbAstra from './systems/PsbAstra';
import PsbAtol from './systems/PsbAtol';
import PsbPaso from './systems/PsbPaso';
import PsbPromo from './systems/PsbPromo';
import PsbDrago from './systems/PsbDrago';
import BricoIco from './systems/BricoIco';
// import BricoAstra from './systems/BricoAstra';
import BricoBico from './systems/BricoBico';
import BricoGorc from './systems/BricoGorc';
import LeroyKimo from './systems/LeroyKimo';
import LeroyBeskid from './systems/LeroyBeskid';
import LeroyMerlo from './systems/LeroyMerlo';
import LeroyGorc from './systems/LeroyGorc';

import ComboSeaTide from './combo/ComboSeaTide';
import ComboBone from './combo/ComboBone';

import FencingsMetal from './manufactures/FencingsMetal';
import FencingsAluminium from './manufactures/FencingsAluminium';
// import FencingsSheet from './manufactures/FencingsSheet';

import WicketsMetal from './manufactures/WicketsMetal';
import WicketsAluminium from './manufactures/WicketsAluminium';
// import WicketsSheet from './manufactures/WicketsSheet';

import GatesMetal from './manufactures/GatesMetal';
import GatesAluminium from './manufactures/GatesAluminium';
// import GatesSheet from './manufactures/GatesSheet';

import PanelsDefault from './panels/PanelsDefault';

import MailboxesDefault from './mailboxes/MailboxesDefault';

import LampsDefault from './lamps/LampsDefault';

import LedblocksDefault from './ledblocks/LedblocksDefault';


export default () => ({
	/* --- SYSTEMS -------------------------------------------- */

	/*
	*

	{
		sameAlignment - maksymalna wysokość murka równa ze słupkiem
		modifiableReplacement - przełączanie materiału pomiędzy corner1, a corner2
		supportReplacement - przełączanie materiału na wypadek, gdyby nie był obsługiwany przez mur

		seating: 0 - brak osadzenia na murku; zaczyna się od ziemi i ma przerwanie ciągu
				 1 - osadzenie na murku; zaczyna się od murka i ma przerwanie ciągu
				 2 - osadzenie na murku; zaczyna się od murka i kontynuuje ciąg

		block:
			minimum: {} - minimalny rozmiar; nie da się zrobić mniejszego elementu
	}

	*
	*/

	systemsDir: '/assets/img/systems/',

	systems: {
		// joniec
		'joniec-gorc': JoniecGorc(),
		// 'joniec-gorc_top': JoniecGorcTop(),
		'joniec-gorc_peak': JoniecGorcPeak(),
		'joniec-roma_classic': JoniecRomaClassic(),
		'joniec-roma_horizon': JoniecRomaHorizon(),
		'joniec-roma_mega': JoniecRomaMega(),
		'joniec-roma_vital_eco': JoniecRomaVitalEco(),
		'joniec-roma_vital_eco_multigrain': JoniecRomaVitalEcoMultigrain(),
		'joniec-roma_integra_eco': JoniecRomaIntegraEco(),
		'joniec-roma_giga': JoniecRomaGiga(),
		'joniec-roma_lite': JoniecRomaLite(),
		'joniec-roma_nova': JoniecRomaNova(),
		'joniec-roma_perfect': JoniecRomaPerfect(),
		'joniec-roma_diamond': JoniecRomaDiamond(),
		'joniec-modyn': JoniecModyn(), // !!!

		// castorama
		// 'castorama-casto': CastoramaCasto(),
		'castorama-tora': CastoramaTora(),
		'castorama-gorc': CastoramaGorc(),

		// merkury
		'merkury-roda': MerkuryRoda(),
		// 'merkury-marco': MerkuryMarco(),
		'merkury-beno': MerkuryBeno(),
		'merkury-gorc': MerkuryGorc(),
		// 'merkury-gorc_top': MerkuryGorcTop(),

		// obi
		'obi-tobi': ObiTobi(),

		// psb
		'psb-piro': PsbPiro(),
		// 'psb-astra': PsbAstra(),
		'psb-atol': PsbAtol(),
		'psb-paso': PsbPaso(),
		'psb-promo': PsbPromo(),
		'psb-drago': PsbDrago(),

		// brico
		'brico-ico': BricoIco(),
		// 'brico-astra': BricoAstra(),
		'brico-bico': BricoBico(),
		'brico-gorc': BricoGorc(),

		// leroy
		'leroy-kimo': LeroyKimo(),
		'leroy-beskid': LeroyBeskid(),
		'leroy-merlo': LeroyMerlo(),
		'leroy-gorc': LeroyGorc(),
	},

	migrations: migrations(),


	/* --- COMBO ---------------------------------------------- */

	combo: {
		'sea_tide': ComboSeaTide(),
		'bone': ComboBone(),
	},


	/* --- FENCINGS ------------------------------------------- */

	fencings: {
		'metal': FencingsMetal(),
		'aluminium': FencingsAluminium(),
		// 'sheet': FencingsSheet(),
	},


	/* --- WICKETS -------------------------------------------- */

	wickets: {
		'metal': WicketsMetal(),
		'aluminium': WicketsAluminium(),
		// 'sheet': WicketsSheet(),
	},


	/* --- GATES ---------------------------------------------- */

	gates: {
		'metal': GatesMetal(),
		'aluminium': GatesAluminium(),
		// 'sheet': GatesSheet(),
	},


	/* --- PANELS --------------------------------------------- */

	panels: {
		'default': PanelsDefault(),
	},


	/* --- MAILBOXES ------------------------------------------ */

	mailboxes: {
		'default': MailboxesDefault(),
	},


	/* --- LAMPS ---------------------------------------------- */

	lamps: {
		'default': LampsDefault(),
	},


	/* --- LEDBLOCKS ------------------------------------------ */

	ledblocks: {
		'default': LedblocksDefault(),
	},
});