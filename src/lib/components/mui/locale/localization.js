// localization.js
import mergedLocalizationDatadaDK from './data-grid/daDK';
import mergedLocalizationDatadeDE from './data-grid/deDE';
import mergedLocalizationDataelGR from './data-grid/elGR';
import mergedLocalizationDataesES from './data-grid/esES';
import mergedLocalizationDatafrFR from './data-grid/frFR';
import mergedLocalizationDataitIT from './data-grid/itIT';
import mergedLocalizationDatatrTR from './data-grid/trTR';
import ptPT from './data-grid/ptPT';
import mergedLocalizationDataenUS from './data-grid/enUS';
import * as React from 'react';
export const locales = {
  'en': mergedLocalizationDataenUS,
  'tr-TR': mergedLocalizationDatatrTR,
  'es-ES': mergedLocalizationDataesES,
  'da-DK': mergedLocalizationDatadaDK,
  'de-DE': mergedLocalizationDatadeDE,
  'el-GR': mergedLocalizationDataelGR,
  'fr-FR': mergedLocalizationDatafrFR,
  'pt-PT': ptPT,
  'it-IT': mergedLocalizationDataitIT
};