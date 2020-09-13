module.exports = {
	function(client) {
		const selectors = {
			countrySelection: '[alt="United States"]',
			searhTextBox: 'input[class="search-input"]',
			searchSubmit: 'button[type="submit"]',
			clearSearch: '[class="header-close-icon"]',
			emailNotificationPopUp: 'button[class="c-close-icon  c-modal-close-icon"]',
			buttonAddToCart:
				'button[class="btn btn-primary btn-sm btn-block btn-leading-ficon add-to-cart-button"]',
			continueShopping: '[class="btn-default-link continue-shopping"]',
			cartLink: '[href="https://www.bestbuy.com/cart"]',
			cartProductsQuantity: 'class="btn-default-link link-styled-button cart-item__save"',
			cartNumberOfProducts: 'div[class="dot"]'
		};
		const timeout = 5 * 1000;
		const productsArray = [
			'Elgato - Wave:3 Wired Cardioid Condenser USB Microphone',
			'Super Mario 3D All-Stars - Nintendo Switch, Nintendo Switch Lite',
			'LoungeFly - Pikachu Expressions Backpack - Multicolor',
			'Apple - HomePod - Space Gray',
			'Nintendo - Switch 32GB Lite - Turquoise',
			'PowerA - Zelda: Breath of the Wild Edition Controller for Nintendo Switch - Black',
			'Amazon - Fire TV Stick with all-new Alexa Voice Remote Streaming Media Player - Black',
			'Braun - BrewSense 12-Cup Coffee Maker - Stainless Steel/White'
		];
		const socialMediaTitles = {
			facebook: 'a[title="Facebook"]',
			twitter: 'a[title="Twitter"]',
			instagram: 'a[title="Instagram"]',
			pinterest: 'a[title="Pinterest"]'
		};

		prepare();
		emailPopUpWindow();
		openMediaLink(socialMediaTitles.facebook);
		windowSwith();
		urlEqualityFacebook();
		closeTab(0);
		openMediaLink(socialMediaTitles.twitter);
		windowSwith();
		urlEqualityTwitter();
		closeTab(0);
		openMediaLink(socialMediaTitles.instagram);
		windowSwith();
		urlEqualityInstagram();
		closeTab(0);
		openMediaLink(socialMediaTitles.pinterest);
		windowSwith();
		urlEqualityPinterest();
		closeTab(0);
		shopSearch();
		priceSummary();

		function prepare() {
			client
				.maximizeWindow()
				.url('https://www.bestbuy.com/')
				.waitForElementVisible('body', timeout)
				.waitForElementPresent(selectors.countrySelection, timeout);
			client.click(selectors.countrySelection).pause(timeout);
		}

		function emailPopUpWindow() {
			client
				.waitForElementVisible('body', timeout)
				.click(selectors.emailNotificationPopUp)
				.pause(timeout);
		}

		function openMediaLink(socialLink) {
			client.click(socialLink).pause(timeout);
		}

		function windowSwith() {
			client.windowHandles(function (result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
			});
		}

		function urlEqualityFacebook() {
			client.expect.url().to.contain('https://www.facebook.com/bestbuy');
		}

		function urlEqualityTwitter() {
			client.expect.url().to.contain('https://twitter.com/');
		}

		function urlEqualityInstagram() {
			client.expect.url().to.contain('https://www.instagram.com/bestbuy/');
		}

		function urlEqualityPinterest() {
			client.expect.url().to.contain('https://www.pinterest.com/bestbuy/');
		}

		function closeTab(label) {
			client.closeWindow();
			client.windowHandles(function (result) {
				var newWindow;
				newWindow = result.value[label];
				this.switchWindow(newWindow);
			});
		}

		function shopSearch() {
			for (let i = 0; i < productsArray.length; i++) {
				client
					.waitForElementVisible('body', timeout)
					.setValue(selectors.searhTextBox, [productsArray[i]])
					.pause(5000)
					.click(selectors.searchSubmit)
					.pause(5000)
					.click(selectors.buttonAddToCart)
					.pause(5000)
					.click(selectors.continueShopping)
					.pause(timeout)
					.click(selectors.clearSearch);
			}
		}

		function priceSummary() {
			client.click(selectors.cartLink);
			client.getText('div[class="price-summary__total-value"]', function (result) {
				text = result.value;
				console.log(result);
				//client.takeScreenshot('screenshot.png');
			});
		}
	}
};
