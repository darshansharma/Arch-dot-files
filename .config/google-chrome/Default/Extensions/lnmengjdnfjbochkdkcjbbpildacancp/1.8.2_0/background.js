	// Called when the user clicks on the browser action.
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.executeScript(null, {
			file : "loader.js"
		});
	});
	var contexts = [ "page", "selection" ];
	var markerLoader = 'chrome-context';
	chrome.contextMenus.create({
		"title" : "Highlight with Marker.to",
		"contexts" : contexts,
		"onclick" : function() {
			markerLoader = 'chrome-context';
			chrome.tabs.executeScript(null, {
				code : "var markerLoader='chrome-context';"
			}, function() {
				chrome.tabs.executeScript(null, {
					file : "loader.js"
				});
			});

		}
	});

	chrome.extension.onRequest.addListener(function(request, sender,
			sendResponse) {
		if (request.method == "getLocalStorage") {
			sendResponse({
				data : localStorage
			});
		} else if (request.method == 'disableQuickStart') {
				localStorage.uponSelectText = false;
			sendResponse({}); // snub them.
		}else if (request.method == 'setInstantHighlighterCheckboxValue') {
			localStorage.instantHighlighterDisabled = request.disabledValue;
			sendResponse({}); // snub them.
		} else if (request.method == 'openShareDialog') {
			window.open(request.url, "_blank", "toolbar=no, scrollbars=no, resizable=yes, top=300, left=500, width=800, height=400");
			sendResponse({}); // snub them.
		}
		else {
			console.log("Unkonwn Request for Ext")
			sendResponse({}); // snub them.
		}
	});

	function onInstall() {
		chrome.tabs.create({url: "http://marker.to/install/done"});
	}

	function onUpdate() {
		chrome.tabs.create({url: "http://marker.to/install/updated"});
	}

	function getVersion() {
		var details = chrome.app.getDetails();
		return details.version;
	}

	// Check if the version has changed.
	var currVersion = getVersion();
	var prevVersion = localStorage['version']
	if (currVersion != prevVersion) {
		// Check if we just installed this extension.
		if (typeof prevVersion == 'undefined') {
			onInstall();
		} else {
			//onUpdate();
		}
		localStorage['version'] = currVersion;
	}

	if(chrome.runtime.setUninstallURL) {
		chrome.runtime.setUninstallURL('http://marker.to/uninstalled');
	}

