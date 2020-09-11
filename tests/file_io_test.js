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
		const productsArray = [
			'MacBook',
			'Xiaomi',
			'Apple',
			'Can',
			'Car',
			'Shirt',
			'Shoes',
			'Food'
		];

		prepare();
		region();
		shopSearch();

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

		function shopSearch() {
			client
				.url('https://www.bestbuy.com/', timeout)
				.waitForElementVisible('body', timeout)
				.setValue('input[class="search-input"]', [productsArray[1], client.Keys.ENTER]),
				timeout;
		}
	}
};