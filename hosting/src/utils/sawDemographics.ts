// Helper `hideWhen` function to `saw_demographics` flag sent by Neptune portal.

import { ResponseDocContextValue } from '../index.d';

const sawDemographics = (response: ResponseDocContextValue): boolean | null =>
  response && response.meta.saw_demographics;

export default sawDemographics;
