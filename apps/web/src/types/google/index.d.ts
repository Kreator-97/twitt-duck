export declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: ( option: Initialize ) => any; // eslint-disable-line
          renderButton: (any, any) => any; // eslint-disable-line
          disableAutoSelect: () => void;
          revoke: (email: string, callback: (done: boolean) => void) => void;
        }
      }
    }
  }
}

interface Initialize {
  client_id: string,
  callback: (res: {clientId: string, credential: string}, error: undefined | string ) => void,
}
