declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare var process: {
  env: {
    REACT_APP_API_URL: string;
  };
};
