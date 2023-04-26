const { InchChains, baseUrl, OneInchApi } = require('../src');

let OneInch = new OneInchApi(InchChains.BinanceSmartChain);

const init = async () => {
	let resp = await OneInch.healtcheck();
	console.log('resp', resp);
	let respSpender = await OneInch.approveSpender();
	console.log('respSpender', respSpender);
	let respApproveTransaction = await OneInch.approveTransaction(
		'0x111111111117dc0aa78b770fa6a738034120c302',
		100000000000
	);
	console.log('respApproveTransaction', respApproveTransaction);
	// let respLiquiditySources = await OneInch.liquiditySources();
	// console.log('respLiquiditySources', respLiquiditySources);
	// let respTokens = await OneInch.tokens();
	// console.log('respTokens', respTokens);
	// let respPresets = await OneInch.presets();
	// console.log('respPresets', respPresets);
	// let respQuote = await OneInch.quote(
	// 	'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	// 	'0x111111111117dc0aa78b770fa6a738034120c302',
	// 	10000000000000000
	// );
	// console.log('respQuote', respQuote);
	// let respSwap = await OneInch.swap(
	// 	'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	// 	'0x111111111117dc0aa78b770fa6a738034120c302',
	// 	10000000000000000,
	// 	'',
	// 	1
	// );
	// console.log('respSwap', respSwap);
};

init();
