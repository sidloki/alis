export function normalize(content, options) {
  if (options.trimWhiteSpace) {
    content = content.replace(/^\n+|\s+$/g, '');
  }
  if (!options.preserveIndentation) {
    content = content.replace(/^[ \t]+/mg, '');
  }
  if (typeof options.replaceNewLines === 'string') {
    content = content.replace(/\n/g, options.replaceNewLines);
  }

  return content;
}

export function  negotiateLanguages(
  requestedLocales,
  availableLocales,
  defaultLocale
) {

  const supportedLocales = [];
  const additionalLocales = [];

  for (let requestedLocale of requestedLocales) {
    if (requestedLocale.indexOf('-') > 0) {
      const locale = requestedLocale.split('-')[0];
      if (requestedLocales.indexOf(locale) < 0) {
        additionalLocales.push(locale);
      }
    }
  }

  for (let requestedLocale of requestedLocales) {
    if (availableLocales.indexOf(requestedLocale) > -1
        && supportedLocales.indexOf(requestedLocale) < 0) {
      supportedLocales.push(requestedLocale);
    }
  }

  for (let additionalLocale of additionalLocales) {
    if (availableLocales.indexOf(additionalLocale) > -1
        && supportedLocales.indexOf(additionalLocale) < 0) {
      supportedLocales.push(additionalLocale);
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
  return (index && index == length) ? object : undefined;
}
