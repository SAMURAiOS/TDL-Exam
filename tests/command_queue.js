// module.exports = {
// 	function(client) {
// 		let value;

// 		client
// 			.url('https://duckduckgo.com/', () => (value = 'TestDevLab'))
// 			.waitForElementVisible('body', 5 * 1000)
// 			.setValue('#search_form_input_homepage', value, () => { // value = undefined
// 				client
// 					.clearValue('#search_form_input_homepage')
// 					.setValue('#search_form_input_homepage', value); // value = 'TestDevLab'
// 			})
// 			.getValue('#search_form_input_homepage', () => {
// 				client
// 					.clearValue('#search_form_input_homepage', () => {
// 						value1 = 'Pikachu';
// 					})
// 					.setValue('#search_form_input_homepage', value1, () => { // value1 = undefined
// 						console.log(value1); // value1 = 'Pikachu'
// 					});
// 			})
// 			.pause(5 * 1000);

// 		let value1; // JS is executed before any NW code so vars can be declared after the code
// 	}
// };