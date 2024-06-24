export const healthCheckSync = (): string => 'OK';

export const healthCheckAsync = (): Promise<string> => {
  return Promise.resolve('OK');
};
