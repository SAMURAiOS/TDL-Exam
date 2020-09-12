module.exports = {
	function(client) {
		const selectors = {
			countrySelection: '[alt="United States"]',
			searchSubmit: 'button[type="submit"]',
			emailNotificationPopUp: 'button[class="c-close-icon  c-modal-close-icon"]',
			buttonAddToCart:
				'button[class="btn btn-primary btn-sm btn-block btn-leading-ficon add-to-cart-button"]',
			summaryPopUp: '[href="/cart"]',
			cartProductsQuantity: 'class="btn-default-link link-styled-button cart-item__save"'
		};

		const timeout = 5 * 1000;
		const productsArray = [
			'MacBook',
			'Coffee maker',
			'Garden pot',
			'Pencil',
			'Car',
			'Shirt',
			'Shoes',
			'Food'
		];
		const socialMediaTitles = {
			facebook: 'a[title="Facebook"]',
			twitter: 'a[title="Twitter"]',
			instagram: 'a[title="Instagram"]',
			pinterest: 'a[title="Pinterest"]'
		};
		const randomElement = productsArray[Math.floor(Math.random() * productsArray.length)];
		const totalprice = { cartvalue: 'div[class="price-summary__total-value"]' };

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
		addToCart();
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
			client.expect.url().to.not.contain('https://www.twitter.com/BestBuy');
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
			client
				.url('https://www.bestbuy.com/', timeout)
				.waitForElementVisible('body', timeout)
				.setValue('input[class="search-input"]', [randomElement])
				.pause(5000)
				.click(selectors.searchSubmit)
				.pause(timeout);
		}

		function addToCart() {
			client
				.waitForElementVisible('body', timeout)
				.click(selectors.buttonAddToCart)
				.pause(timeout);
		}

		function priceSummary() {
			client
				.waitForElementVisible('body', timeout)
				.click(selectors.summaryPopUp)
				.pause(timeout);
			// console.log(totalprice.cartvalue);
		}
	}
};
