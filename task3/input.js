const i18nMethods = {
    number: function (value, currency) {
        let result = '';
        if (!!currency) {
            result = new Intl.NumberFormat(this.locale, { style: 'currency', currency }).format(value);
            return result;
        } else {
            result = new Intl.NumberFormat(this.locale).format(value);
            return result;
        }
    },
    date: function (value) {
        const date = new Date(value);
        const result = new Intl.DateTimeFormat(this.locale, { dateStyle: 'full', timeStyle: 'long' }).format(date)
        return result;
    },
    plural: function (key, number) {
        const pluralResult = new Intl.PluralRules(this.locale).select(number)
        return `${this.number(number)} ${key[pluralResult]}`;
    },
    list: function (...args) {
        return new Intl.ListFormat(this.locale, { style: 'long', type: 'conjunction' }).format(args.filter(el => !!el));
    },
    relativeTime: function (value, unit) {
        return new Intl.RelativeTimeFormat(this.locale, { style: 'long' }).format(value, unit);
    },
};

function getI18nText({ stringTokens, variables, translations, locale }) {
    const self = { stringTokens, variables, translations, locale };
    let locales = !locale ? Object.keys(translations) : null;
    let result = [];

    let i18nText = stringTokens.map(el => {
        if(Array.isArray(el)) {
            let result = '';
            const funcArgs = el.slice(1).map(arg => {
                if( typeof arg !== 'string' ) {
                    return arg;
                }
                if( arg.includes('$') ) {
                    return variables[arg.slice(1)];
                }
                if( arg.includes('#') ) {

                    if(!!locale) {
                        return translations[locale][arg.slice(1)];
                    } else if (Array.isArray(locales)) {
                        result = locales.map(el => {
                            return getI18nText({ stringTokens, variables, translations, locale: el })
                        });
                        return result;
                    } else {
                        return '';
                    }
                }
                return arg;
            });
            result = i18nMethods[el[0].slice(1)].bind({...i18nMethods, ...self})(...funcArgs);
            return result;
        }
        if( el.includes('$') ) {
            return variables[el.slice(1)];
        }
        if( el.includes('#') ) {
            if(!!locale) {
                return translations[locale][el.slice(1)];
            } else if (Array.isArray(locales)) {

                result = locales.map(el => {
                    return getI18nText({ stringTokens, variables, translations, locale: el });
                });
                return result;
            } else {
                return '';
            }        }
        return el;
    }).join('');

    if( locales ) {
        return result.join('\n');
    } else {
        return i18nText;
    }

}



const args1 = {
    stringTokens: ["key", " ", "$var", " ", "#translation"],
    variables: { var: 100 },
    translations: {
        "ru-RU": { translation: "тест" },
        "en-US": { translation: "test" },
        "de-DE": { translation: "prüfen" },
        "hi-IN": { translation: "परीक्षा" },
        "ar-AA": { translation: "امتحان" },
    },
    locale: 'ru-RU',
    // locale: 'en-US',
    // locale: 'de-DE',
    // locale: 'hi-IN',
    // locale: 'ar-AA',
};

// getI18nText(args1); // ru-RU en-US de-DE hi-IN ar-AA

const args2 = {
    stringTokens: [
        ["@number", "$var", "USD"], 
        ' - ', 
        ["@date", 1676561884561], 
        ' - ', 
        ["@plural", "#day", "$tripDays"], 
        ' - ', 
        ["@list", "Motorcycle", "$item", "#bus"],
        ' - ',
        ["@relativeTime", -5, "hours"]
    ],
    variables: { var: 123456789.0123, tripDays: 2, item: 'Car' },
    translations: {  
        "ru-RU" : {             
          price: "Цена",               
          bus: "Автобус",      
          day: {               
              zero: " дней",  
              one: " день",  
              few: " дня",  
              many: " дней",  
              other: " дней",  
          }  
        },  
        "en-US": {  
            price: "Price",    
            bus: "Bus",  
            day: {  
                one: " day",  
                other: " days",  
              }  
        },  
    },
    // locale: 'ru-RU',
    // locale: 'en-US',
    // locale: 'de-DE',
    // locale: 'hi-IN',
    // locale: 'ar-AA',
};

// getI18nText(args2); // ru-RU en-US de-DE hi-IN ar-AA

const args3 = {
    stringTokens: ["key", " ", "$var", " ", "#translation"],
    variables: {var: 100 },
    translations: {
        "ru-RU": { translation: "тест" },
        "en-US": { translation: "test" },
        "de-DE": { translation: "prüfen" },
        "hi-IN": { translation: "परीक्षा" },
        "ar-AA": { translation: "امتحان" },
    },
    // locale: 'ru-RU',
    // locale: 'en-US',
    // locale: 'de-DE',
    // locale: 'hi-IN',
    // locale: 'ar-AA',
};

console.log(getI18nText(args3)); // ru-RU en-US de-DE hi-IN ar-AA


module.exports = getI18nText;