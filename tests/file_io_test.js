module.exports = {
	function(client) {
		const selectors = {
			countrySelection: '[alt="United States"]',
			facebook: '[title="Facebook"]',
			twitter: '[title="Twitter"]',
			insagram: '[title="Instagram"]',
			pinterest: '[title="Pinterest"]'
		};

		const timeout = 5 * 1000;

		prepare();
		region();
		//socialMediaTest();

		function prepare() {
			client
				.maximizeWindow()
				.url('https://www.bestbuy.com/')
				.waitForElementVisible('body', timeout)
				.waitForElementPresent(selectors.countrySelection, timeout);
		}

		function region() {
			client.click(selectors.countrySelection).pause(timeout);
		}
	}
};
// 		function socialMediaTest() {
// 			client.getText(facebook, result => {
// 				openNewTab(result.value);

// 				var url;
// 				client.url(function (result) {
// 					url = result.value;
// 				});
// 				Browser.perform(done => {
// 					console.log(url);
// 					done();
// 				})
// 			})
// 		}
// 	}
// }
