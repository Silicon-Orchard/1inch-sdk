var e=0;function r(r){return"__private_"+e+++"_"+r}function t(e,r){if(!Object.prototype.hasOwnProperty.call(e,r))throw new TypeError("attempted to use private field on non-instance");return e}const o=require("axios"),s="https://api.1inch.io/v5.0/";o.defaults.headers.common.accept="application/json";var n=r("chainId"),a=r("baseUrl");module.exports={baseUrl:s,InchChains:{Ethereum:1,BinanceSmartChain:56,Polygon:137,Optimism:10,Arbitrum:42161,Gnosis:100,Avalanche:43114,Fantom:250},OneInchApi:class{constructor(e){var r=this;Object.defineProperty(this,n,{writable:!0,value:1}),Object.defineProperty(this,a,{writable:!0,value:`${s}${t(this,n)[n]}`}),this.healtcheck=async function(){try{return(await o.get(`${t(r,a)[a]}/healthcheck`)).data}catch(e){if(e.response)return console.log("error.response",e.response.data),e.response.data;if(e.request)return console.log("error.request",e.request),e.request;console.log("error.request","unhandled")}},this.approveSpender=async function(){try{return(await o.get(`${t(r,a)[a]}/approve/spender`)).data}catch(e){if(e.response)return console.log("error.response",e.response.data),e.response.data;if(e.request)return console.log("error.request",e.request),e.request;console.log("error.request","unhandled")}},this.approveTransaction=async function(e,s){try{return(await o.get(`${t(r,a)[a]}/approve/transaction`,{params:{tokenAddress:e,amount:s}})).data}catch(e){if(e.response)return console.log("error.response",e.response.data),e.response.data;if(e.request)return console.log("error.request",e.request),e.request;console.log("error.request","unhandled")}},this.approveAllowance=async function(e,s){try{return(await o.get(`${t(r,a)[a]}/approve/allowance`,{params:{tokenAddress:e,walletAddress:s}})).data}catch(e){if(e.response)return console.log("error.response",e.response.data),e.response.data;if(e.request)return console.log("error.request",e.request),e.request;console.log("error.request","unhandled")}},t(this,n)[n]=e}}};
