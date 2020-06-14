import isDeployed from './isDeployed';

const isLocalhost = (): boolean => !isDeployed();

export default isLocalhost;
