module.exports = {
	function (client) {
		const selectors = {
			countrySelection: '[alt="United States"]',
			searhTextBox: 'input[class="search-input"]',
			searchSubmit: 'button[type="submit"]',
			clearSearch: '[class="header-close-icon"]',
			emailNotificationPopUp: 'button[class="c-close-icon  c-modal-close-icon"]',
			buttonAddToCart: 'button[class="btn btn-primary btn-sm btn-block btn-leading-ficon add-to-cart-button"]',
			continueShopping: '[class="btn-default-link continue-shopping"]',
			cartLink: '[href="https://www.bestbuy.com/cart"]',
			cartTotalPrice: 'div[class="price-summary__total-value"]',
			cartItemRemove: '[class="btn-default-link link-styled-button cart-item__remove"]:first-of-type'
		};
		const timeout = 5 * 1000;
		const timeOut = 5000;
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
		// const socialMediaTitles = {
		// 	facebook: 'a[title="Facebook"]',
		// 	twitter: 'a[title="Twitter"]',
		// 	instagram: 'a[title="Instagram"]',
		// 	pinterest: 'a[title="Pinterest"]'
		// };
		let initialHandles; // contains an array of initial tabs
		let originalHandle; // contains the BestBuy tab

		const resources = [{
				selector: 'a[title="Facebook"]',
				url: 'https://www.facebook.com/bestbuy'
			},
			{
				selector: 'a[title="Twitter"]',
				url: 'https://twitter.com/'
			},
			{
				selector: 'a[title="Instagram"]',
				url: 'https://www.instagram.com/bestbuy/'
			},
			{
				selector: 'a[title="Pinterest"]',
				url: 'https://www.pinterest.com/bestbuy/'
			}
		];

		prepare();
		checkLinks();
		for (let i = 0; i < loopCicle; i++) {
			shopSearch();
			priceSummary();
			//cartScreenshot(i);
			removeFromCart();
			cartItemQuantity = 0;
		}

		// function prepare() {
		// 	client
		// 		.maximizeWindow()
		// 		.url('https://www.bestbuy.com/')
		// 		.waitForElementVisible('body', timeout)
		// 		// .takeScreenshot(`totalcartvalues.png`)
		// 		.waitForElementVisible(selectors.countrySelection, false)
		// 		.click(selectors.countrySelection).pause(timeout)
		// 		.perform(() => {
		// 			closeEmailPopUp();
		// 		})
		// }

		function prepare() {
			client
				.url('https://www.bestbuy.com/')
				.windowMaximize()
				.waitForElementVisible('body', timeOut)
				.windowHandles(({
					value
				}) => (initialHandles = value))
				.windowHandle(({
					value
				}) => (originalHandle = value))
				.waitForElementVisible(selectors.countrySelection, false)
				.click(selectors.countrySelection)
				.pause(timeout)
				.waitForElementVisible(selectors.emailNotificationPopUp, false)
				.click(selectors.emailNotificationPopUp);
		}

		function checkLinks() {
			client.perform(() => {
				resources.forEach(({
					selector,
					url
				}) => checkLink(selector, url));
			});
		}

		function checkLink(linkSelector, urlString) {
			client
				.waitForElementVisible(linkSelector, timeOut)
				.click(linkSelector)
				.windowHandles(({
					value
				}) => {
					const handles = value;

					handles.forEach(handle => {
						if (!initialHandles.includes(handle)) {
							client.switchWindow(handle);
						}
					});
				})
				.waitForElementVisible('body', timeOut)
				.verify.urlEquals(urlString)
				.closeWindow()
				.perform(() => client.switchWindow(originalHandle))
				.pause(timeOut);
		}

		// function closeEmailPopUp() {
		// 	client
		// 		.waitForElementVisible('body', timeout)
		// 		.click(selectors.emailNotificationPopUp)
		// 		.pause(timeout);
		// }

		// function openMediaLink(socialLink) {
		// 	client.click(socialLink).pause(timeout);
		// }

		// function windowSwith() {
		// 	client.windowHandles(function (result) {
		// 		let newWindow;
		// 		newWindow = result.value[1];
		// 		this.switchWindow(newWindow);
		// 	});
		// }

		// function checkSocialMedia() {
		// 	openMediaLink(socialMediaTitles.facebook);
		// 	windowSwith();
		// 	urlEqualityFacebook();
		// 	closeTab(0);
		// 	openMediaLink(socialMediaTitles.twitter);
		// 	windowSwith();
		// 	urlEqualityTwitter();
		// 	closeTab(0);
		// 	openMediaLink(socialMediaTitles.instagram);
		// 	windowSwith();
		// 	urlEqualityInstagram();
		// 	closeTab(0);
		// 	openMediaLink(socialMediaTitles.pinterest);
		// 	windowSwith();
		// 	urlEqualityPinterest();
		// 	closeTab(0);
		// }

		// function urlEqualityFacebook() {
		// 	client.expect.url().to.contain('https://www.facebook.com/bestbuy');
		// }

		// function urlEqualityTwitter() {
		// 	client.expect.url().to.contain('https://twitter.com/');
		// }

		// function urlEqualityInstagram() {
		// 	client.expect.url().to.contain('https://www.instagram.com/bestbuy/');
		// }

		// function urlEqualityPinterest() {
		// 	client.expect.url().to.contain('https://www.pinterest.com/bestbuy/');
		// }

		// function closeTab(label) {
		// 	client.closeWindow();
		// 	client.windowHandles(function (result) {
		// 		let newWindow;
		// 		newWindow = result.value[label];
		// 		this.switchWindow(newWindow);
		// 	});
		// }

		function shopSearch() {
			for (let i = 0, separateQuantity = 1; i < productsArray.length; i++, cartItemQuantity++, separateQuantity++) {
				client
					.waitForElementVisible('body', timeout)
					.waitForElementVisible(selectors.searhTextBox, timeout)
					.setValue(selectors.searhTextBox, [productsArray[i]])
					.click(selectors.searchSubmit)
					.pause(2000)
					.waitForElementVisible(selectors.buttonAddToCart)
					.click(selectors.buttonAddToCart)
					.waitForElementVisible(selectors.continueShopping, timeout, false)
					.click(selectors.continueShopping)
					.waitForElementVisible(selectors.clearSearch, timeout)
					.click(selectors.clearSearch, () => {
						console.log(`Items in cart: ${separateQuantity}`);
					})
					.pause(timeout)
			}
		}

		function priceSummary() {
			client.click(selectors.cartLink);
			client.getText(selectors.cartTotalPrice, function (result) {
				text = result.value;
				console.log(result);
			});
		}

		function cartScreenshot(value) {
			client.takeScreenshot(`totalcartvalue_${value}.png`)
		}

		function removeFromCart() {
			for (let i = 0, number = 0; i < cartItemQuantity; i++, number++) {
				client
					.waitForElementVisible(selectors.cartItemRemove, timeout, false)
					.pause(2000)
					.click(selectors.cartItemRemove, () => {
						number++
						console.log(`Items removed from cart: ${number}`)
					})
			}
		}
	}
};