// Helper function for `open_responses_lcs` flag sent by Neptune portal.

import { ResponseDocContextValue } from '../index.d';

const whenOpenResponse = (condition: string) => (
  response: ResponseDocContextValue,
): boolean | null =>
  response &&
  response.meta.showOpenResponses &&
  response.meta.showOpenResponses.includes(condition);

export default whenOpenResponse;
