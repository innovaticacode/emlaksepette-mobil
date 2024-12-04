const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  const sentryConfig = getSentryExpoConfig(__dirname);

  // SVG Transformer ve Sentry config birleşimi
  return {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      ...sentryConfig.transformer,
      babelTransformerPath: require.resolve(
        "react-native-svg-transformer/expo"
      ),
    },
    resolver: {
      ...defaultConfig.resolver,
      ...sentryConfig.resolver,
      assetExts: defaultConfig.resolver.assetExts.filter(
        (ext) => ext !== "svg"
      ),
      sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
    },
  };
})();
