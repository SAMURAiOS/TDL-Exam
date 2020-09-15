// TODO: Change the file name to something more appropriate
// TODO: Use arrow functions wherever it is possible
// TODO: Remove pauses wherever it is possible and use .waitForElement...() instead
module.exports = {
	function(client) {
		// TODO: Why do use element attribute selectors. Use shortened version, i.e., .class and #id for classes and IDs respectively
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
			cartItemRemove:
				'[class="btn-default-link link-styled-button cart-item__remove"]:first-of-type'
		};
		// TODO: Move these under all arrays and objects
		const timeout = 5 * 1000;
		let cartItemQuantity = 0;
		let loopCicle = 5;
		const productsArray = [
			'cap',
			'shirt',
			'LoungeFly - Pikachu Expressions Backpack - Multicolor',
			'Apple - HomePod - Space Gray',
			'Desert Rats with Baseball Bats, Vol. 3 [LP] - VINYL',
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
		// TODO: Change to the function we wrote during the course. Remember that .windowHandles() order might change
		closeTab(0);
		openMediaLink(socialMediaTitles.twitter);
		// TODO: Check spelling
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
		for (let i = 0; i < loopCicle; i++) {
			shopSearch();
			priceSummary();
			takeCartScreeenshot(i);
			removeFromCart();
		}

		function prepare() {
			client
				.maximizeWindow()
				.url('https://www.bestbuy.com/')
				.waitForElementVisible('body', timeout)
				.waitForElementPresent(selectors.countrySelection, timeout);
				// TODO: Why can't this be put under the first client object and has to be put as a seperate client?
			client.click(selectors.countrySelection).pause(timeout);
		}

		// TODO: Can be called in prepare() function using .perform(() => emailPopUpWindow)
		// TODO: Rename to something more proper, e.g., closeEmailPopUp()
		function emailPopUpWindow() {
			client
				.waitForElementVisible('body', timeout)
				.click(selectors.emailNotificationPopUp)
				.pause(timeout);
		}

		// TODO: This can be merged with the urlEquality...() function
		function openMediaLink(socialLink) {
			client.click(socialLink).pause(timeout);
		}

		function windowSwith() {
			client.windowHandles(function (result) {
				let newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
			});
		}

		// Create a wrapper function these. There is no reason to create a seperate function for each social network
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
		
		// TODO: Change to the function we wrote during the course. Remember that .windowHandles() order might change
		function closeTab(label) {
			client.closeWindow();
			client.windowHandles(function (result) {
				let newWindow;
				newWindow = result.value[label];
				this.switchWindow(newWindow);
			});
		}

		function shopSearch() {
			// TODO: Why do you need both i and separateQuantity
			for (let i = 0, separateQuantity = 1; i < productsArray.length; i++, cartItemQuantity++, separateQuantity++) {
				client
					.waitForElementVisible('body', timeout)
					.setValue(selectors.searhTextBox, [productsArray[i]])
					.pause(2000)
					.click(selectors.searchSubmit)
					.pause(2000)
					.click(selectors.buttonAddToCart)
					.pause(2000)
					.click(selectors.continueShopping)
					.pause(2000)
					// TODO: Use one line function for this
					.click(selectors.clearSearch, () => {
						console.log(`Items in cart: ${separateQuantity}`);
					})
					.pause(timeout)
			}
		}

		function priceSummary() {
			client.click(selectors.cartLink);
			// TODO: Do not use hardocoded selectors. Use object destructuring. Use arrow functions. Log the correct value.
			client.getText('div[class="price-summary__total-value"]', function (result) {
				text = result.value;
				console.log(result);
			});
		}

		// TODO: Choose more appropriate function parameter name
		function takeCartScreeenshot(value) {
			client.saveScreenshot(`./screenshots/totalcartvalue_${value}.png`);
		}

		function removeFromCart() {
			// TODO: Is it really <= not just < cartItemQuantity?
			for (let i = 0; i <= cartItemQuantity; i++) {
				client
					.waitForElementVisible('body', timeout)
					.pause(2000)
					.click(selectors.cartItemRemove)
					.pause(2000, () => {
						console.log(`Items removed from cart: ${cartItemQuantity}`);
					})
					.waitForElementVisible('body', timeout);
			}
		}
	}
};
