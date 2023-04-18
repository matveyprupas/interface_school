const configs = require('./configs')

module.exports = function(configValue /* (key: string) => string */) {
	let myConfig = 'myConfig';
	console.log(configs)

	configs.changeConfig = (config) => {
		console.log(currentConfig, config, myConfig)
		currentConfig = config;
		myConfig = config;
	}

	const makeDynamicConfig = obj => obj;
    const dynamicConfigValue = (value) => {
		let result = `${myConfig}:${value}`;

		console.log(result);
		return result;
	};

    return {
        makeDynamicConfig,
        dynamicConfigValue,
    };
}
