const API_PREFIX = 'api';
const VERSION = 'v1';
const API_ROUTE = `/${API_PREFIX}/${VERSION}`;

export default {
  stats: `${API_ROUTE}/stats`,
  abi: `${API_ROUTE}/abi`,
  liquidity: `${API_ROUTE}/liquidity`,
  project: `${API_ROUTE}/project`,
  token: `${API_ROUTE}/token`,
};
