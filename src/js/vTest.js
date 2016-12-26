(function (factory) {
	var export_name = 'vTest';
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(export_name, [], factory);
	} else {
		window[export_name] = factory();
	}
}(function () {
	var vTest = {
		data: [],
		record: function (name, value) {
			this.data.push({name: name, value: value, time: new Date().getTime()});
		},
		submit: function () {
			var formdata = new FormData();
			formdata.append('data', JSON.stringify(this.data));

			var url = '//nb.im20.com.cn/lyh/vTest.php';
			var xhr = new XMLHttpRequest();
			if ("withCredentials" in xhr) {
				// XHR for Chrome/Firefox/Opera/Safari.
				xhr.open("POST", url, true);
			} else if (typeof XDomainRequest != "undefined") {
				// XDomainRequest for IE.
				xhr = new XDomainRequest();
				xhr.open("POST", url);
			} else {
				xhr = null;
				console.error('Cannot run vTest in a not XHR supported environment!');
				return;
			}

			xhr.addEventListener("load", function (e) {
				console.log(JSON.parse(xhr.responseText));
			}, false);

			xhr.send(formdata);
			this.data = [];
		}
	};
	vTest.record('userAgent', navigator.userAgent);
	vTest.record('location', location.href);

	return vTest;
}));