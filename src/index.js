import { h, render } from 'preact';
import './style';

import f7 from './lib/framework7.min.js';

let root;
function init() {
	let App = require('./components/index').default;
	root = render(<App />, document.body, root); //we render the app here

	// We setup Framework7 here
	var myApp = new Framework7({
		root : "#app" //where does the app start, at the div with #app as id
	});

	var $$ = Dom7;

	// Add one view (see index.js to see where the main view is defined)
	var mainView = myApp.addView('#view-index', {
		main: true,
		domCache : true,
		fastClicks: true,
		activeState: true,
		activeStateElements: true,
		animatePages: true,
	});

	mainView = myApp.addView('#view-day', {
		name: 'view-day',
		domCache : true,
		fastClicks: true,
		activeState: true,
		activeStateElements: true,
		animatePages: true,
	});

	mainView = myApp.addView('#view-week', {
		name: 'view-week',
		domCache : true,
		fastClicks: true,
		activeState: true,
		activeStateElements: true,
		animatePages: true,
	});

	// Init slider and store its instance in mySwiper variable
	var mySwiper = myApp.swiper('.swiper-container', {
		 spaceBetween: 0,
		 speed: 400,
		 direction: 'horizontal',
	}); 
	
	$$('.open-notification').on('click', function () {
	    var clickedLink = this;
		myApp.popover('.popover-notification', clickedLink);
	});


}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

//in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/index', () => requestAnimationFrame(init) );
}

init();
