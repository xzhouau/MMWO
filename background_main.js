/*
 * Single long running page to listen the user function execution.
 * It opens a new window at user defined position and dimension, with multi monitors support.
 * @author: Jason Zhou
 */

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	var log_prefix = '#MMWO Chrome extension# ';

	if (message && message.type == 'page') {
		chrome.system.display.getInfo(function(displayInfo) {
			if (displayInfo.length > 1) {
				console.log(log_prefix + "multiple monitors detected: ");
				console.log(displayInfo);
			}
		});
		
		var page_request = message.request;
		console.log(log_prefix + 'open new window at:');
		console.log(page_request);

		// Open new window by given parameters
		chrome.windows.create({
			url: page_request.url,
			left: page_request.param.left,
			top: page_request.param.top,
			width: page_request.param.width,
			height: page_request.param.height
		});
	}
});
