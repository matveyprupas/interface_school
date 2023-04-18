module.exports = function(configValue /* (key: string) => string */) {
    // Ваше решение
    const makeDynamicConfig = e => e;
    const dynamicConfigValue = configValue;

    return {
        makeDynamicConfig,
        dynamicConfigValue,
    };
}