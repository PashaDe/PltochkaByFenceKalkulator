import Index from './views/Index';
import Duplicate from './views/Duplicate';
import Follow from './views/Follow';
import Delete from './views/Delete';


export default {
	views: [
		{ route: { path: '', component: Index } },
		{ route: { path: 'duplicate/:id', component: Duplicate } },
		{ route: { path: 'follow/:id', component: Follow } },
		{ route: { path: 'delete/:id', component: Delete } },
	],
};