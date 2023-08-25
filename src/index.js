const axios = require('axios');
// import axios from "axios";
/**
 * @readonly
 * @enum {number}
 */

const baseUrl = 'https://api.1inch.dev/swap/v5.2/';

const InchChains = {
	Ethereum: 1,
	BinanceSmartChain: 56,
	Polygon: 137,
	Optimism: 10,
	Arbitrum: 42161,
	Gnosis: 100,
	Avalanche: 43114,
	Fantom: 250,
	SEFULIAN: 1337,
};

const instance = axios.default.create({
	baseURL: 'https://api.1inch.dev/swap/v5.2/',
	headers: {
		common: {
			accept: 'application/json',
			'Cache-Control': 'no-cache',
			// Authorization: "Bearer c9XPccRwDALjWHe8IqkB8r8wxlCHTDGe"
		},
	},
});

class OneInchApi {
	#chainId = 1337;
	#instance = '';
	#baseUrl = `${baseUrl}`;

	constructor(chainId, apiSecret) {
		instance.defaults.headers.common.Authorization = `Bearer ${apiSecret}`;
		this.#chainId = chainId;
		this.#instance = instance;
	}

	//check api health
	healtcheck = async () => {
		try {
			// console.log(#instance.defaults.headers.common)
			let res = await this.#instance.get(`${this.#chainId}/healthcheck`);
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	//approveSpender
	approveSpender = async () => {
		try {
			let res = await this.#instance.get(`${this.#chainId}/approve/spender`);
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	//approveTransaction
	approveTransaction = async (tokenAddress, amount) => {
		try {
			let res = await this.#instance.get(
				`${this.#chainId}/approve/transaction`,
				{
					params: { tokenAddress, amount },
				}
			);
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	//allowance
	approveAllowance = async (tokenAddress, walletAddress) => {
		try {
			let res = await this.#instance.get(`${this.#chainId}/approve/allowance`, {
				params: { tokenAddress, walletAddress },
			});
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	//Liquidity sources
	liquiditySources = async () => {
		try {
			let res = await this.#instance.get(`${this.#chainId}/liquidity-sources`);
			return res.data.protocols;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	//tokens
	tokens = async () => {
		try {
			let res = await this.#instance.get(`${this.#chainId}/tokens`);
			return res.data.tokens;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	//presets
	presets = async () => {
		try {
			let res = await this.#instance.get(`${this.#chainId}/presets`);
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	/**
	 * @description Find the best quote to exchange via 1inch router
	 * @remarks
	 * **Options:**
	 * - protocols - default: all
	 * - fee - Min: 0; max: 3; Max: 0; max: 3; default: 0
	 * - gasLimit - amount in units
	 * - connectorTokens - max: 5
	 * - complexityLevel - min: 0; max: 3; default: 2
	 * - mainRouteParts - default: 10; max: 50
	 * - parts - split parts. default: 50; max: 100
	 * - gasPrice - default: fast from network
	 * ***
	 * **One of the following errors:**
	 * - Insufficient liquidity
	 * - Cannot estimate
	 * - You may not have enough ETH balances for gas fee
	 * - FromTokenAddress cannot be equals to toTokenAddress
	 * - Cannot estimate. Don't forget about miner fee. Try to leave the buffer of ETH for gas
	 * - Not enough balance
	 * - Not enough allowance
	 * @param fromTokenAddress  - Example: 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	 * @param toTokenAddress - Example: 0x111111111117dc0aa78b770fa6a738034120c302
	 * @param amount - In token UNITS (amount * (10 ** tokenDecimals)) Example : 10000000000000000
	 * @param options - Full info about options you can find in "remarks"
	 */
	quote = async (fromTokenAddress, toTokenAddress, amount, options = {}) => {
		try {
			let res = await this.#instance.get(`${this.#chainId}/quote`, {
				params: Object.assign(
					{ fromTokenAddress, toTokenAddress, amount },
					options
				),
			});
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};

	/**
	 * @description Generate data for calling the 1inch router for exchange
	 * @remarks
	 * **Options:**
	 * - protocols - default: all
	 * - destReceiver - Receiver of destination currency. default: fromAddress;
	 * - referrerAddress - string
	 * - fee - Min: 0; max: 3; Max: 0; max: 3; default: 0
	 * - gasLimit - amount in units
	 * - disableEstimate -
	 * - permit - https://eips.ethereum.org/EIPS/eip-2612
	 * - burnChi - default: false;` *Suggest checking user's balance and
	 * - allowance before set this flag; CHI should be approved to spender address*
	 * - allowPartialFill - default: false
	 * - parts - split parts. default: 50; max: 100
	 * - connectorTokens - max: 5
	 * - complexityLevel - min: 0; max: 3; default: 2
	 * - mainRouteParts - default: 10; max: 50
	 * - gasPrice - default: fast from network
	 * ***
	 * **One of the following errors:**
	 * - Insufficient liquidity
	 * - Cannot estimate
	 * - You may not have enough ETH balances for gas fee
	 * - FromTokenAddress cannot be equals to toTokenAddress
	 * - Cannot estimate. Don't forget about miner fee. Try to leave the buffer of ETH for gas
	 * - Not enough balance
	 * - Not enough allowance
	 * @param fromTokenAddress  - Example: 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	 * @param toTokenAddress  - Example: 0x111111111117dc0aa78b770fa6a738034120c302
	 * @param amount  - In token UNITS (amount * (10 ** tokenDecimals)) Example : 10000000000000000
	 * @param fromAddress - The address that calls the 1inch contract
	 * @param slippage - min: 0; max: 50; (Percentage)
	 * @param options - Full info about options you can find in "remarks"
	 */
	swap = async (src, dst, amount, from, slippage, options = {}) => {
		try {
			console.log('swap', `${this.#chainId}/swap`);
			let res = await this.#instance.get(`${this.#chainId}/swap`, {
				params: Object.assign({ src, dst, amount, from, slippage }, options),
			});
			return res.data;
		} catch (error) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log('error.response', error.response.data);
				return error.response.data;
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log('error.request', error.request);
				return error.request;
			} else {
				// Error occurred while setting up the request
				console.log('error.request', 'unhandled');
			}
		}
	};
}

module.exports = { baseUrl, InchChains, OneInchApi };
