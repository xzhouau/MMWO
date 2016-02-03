/*
 * JS that runs in the context of a page that's been loaded into the browser.
 * It will inject a 'openNewWindow' function into the page contaxt.
 * @author: Jason Zhou
 * 
 * Usage: 
 * in user's javascript call this function anywhere: openNewWindow(url, parameters)
 * For example: openNewWindow("http://google.com.au", {top: 200, left:2000, width:500, height:600});
 */

// Random unique name, to be used to minimize conflicts:
var EVENT_FROM_PAGE = '__mmwo_chrome_ext_' + new Date().getTime();

var s = document.createElement('script');
s.textContent = '(' + function(send_event_name) {
	// NOTE: This function is serialized and runs in the page's context
	// Begin of the page's functionality
	window.openNewWindow = function(url, param) {
		sendMessage({
			url: url,
			param: param
		});
	};

	// Begin of messaging implementation:
	function sendMessage(message, callback) {
		var transporter = document.createElement('dummy');

		// Functionality to notify content script
		var event = document.createEvent('Events');
		event.initEvent(send_event_name, true, false);
		transporter.setAttribute('data', JSON.stringify(message));
		(document.body || document.documentElement).appendChild(transporter);
		transporter.dispatchEvent(event);
	}
} + ')(' + JSON.stringify( /*string*/ EVENT_FROM_PAGE) + ');';
document.documentElement.appendChild(s);
s.parentNode.removeChild(s);


// Handle messages from/to page:
document.addEventListener(EVENT_FROM_PAGE, function(e) {
	var transporter = e.target;
	if (transporter) {
		var request = JSON.parse(transporter.getAttribute('data'));
		// Send message to background
		chrome.runtime.sendMessage({
			type: 'page',
			request: request
		});
	}
});
