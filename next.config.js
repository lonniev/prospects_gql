module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  pageExtensions: ['graphql', 'jsx', 'js', 'tsx', 'ts'],
}
