export function  negotiateLanguages(
  requestedLocales,
  availableLocales,
  defaultLocale
) {

  const supportedLocales = [];
  const locales = [];

  for (let requestedLocale of requestedLocales) {
    let locale = requestedLocale;
    if (locales.indexOf(locale) < 0) {
      locales.push(locale);
    }
    if (locale.indexOf('-') > 0) {
      let additionalLocale = locale.split('-')[0];
      if (locales.indexOf(additionalLocale) < 0) {
        locales.push(additionalLocale);
      }
    }
  }

  for (let locale of locales) {
    if (availableLocales.indexOf(locale) > -1
        && supportedLocales.indexOf(locale) < 0) {
      supportedLocales.push(locale);
    }
  }

  if (supportedLocales.indexOf(defaultLocale) < 0) {
    supportedLocales.push(defaultLocale);
  }
  return supportedLocales;
}

export function getProp(object, path) {
  const keys = Array.isArray(path) ? path : path.split('.');
  const length = keys.length;
  let index = 0;

  while (object && index < length) {
    object = object[keys[index++]];
  }
  return (index && index === length) ? object : undefined;
}
