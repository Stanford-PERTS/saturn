import * as functions from 'firebase-functions';

const isDeployed = (): boolean => {
  const config = functions.config();
  // Config is a really weird object. Even when `env in config` returns false
  // (which should detect prototyped properties) `config.env` may still return
  // an object.
  return 'env' in config && config.env.deployed === 'true';
};

export default isDeployed;
