exports.healthCheckSync = (): string => 'OK';

exports.healthCheckAsync = (): Promise<string> => {
  return Promise.resolve('OK');
};
