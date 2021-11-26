module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  outputFileTracing: true, // https://github.com/vercel/next.js/issues/8251#issuecomment-961930976
}
