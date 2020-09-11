module.exports = {
	function(client) {
		const selectors = {
			fileInput: 'input[type="file"]',
			downloadLink: 'a[href*="https://file.io"]'
		};

		const filePath = ['.', 'assets', 'alpacaHighRes.jpg'];
		const timeout = 5 * 1000;
		const uploadTimeout = 10 * 1000;

		prepare();
		uploadFile();
		openLink();

		function prepare() {
			client
				.url('https://www.file.io/')
				.waitForElementVisible('body', timeout)
				.waitForElementPresent(selectors.fileInput, timeout);
		}

		function uploadFile() {
			client
				.setValue(selectors.fileInput, require('path').resolve(...filePath))
				.waitForElementVisible(selectors.downloadLink, uploadTimeout);
		}

		function openLink() {
			client.getText(selectors.downloadLink, result => {
				openNewTab(result.value);

				function openNewTab(url) {
					client
						.execute(
							function (url) {
								window.open(url);
							},
							[url]
						)
						.pause(3 * 1000);
				}
			});
		}
	}
};