const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);

  // Sentry yapılandırmasını al
  const sentryConfig = getSentryExpoConfig(__dirname);

  // SVG Transformer ayarlarını ekle
  defaultConfig.transformer = {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };

  defaultConfig.resolver = {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  };

  // Yapılandırmaları birleştir
  return {
    ...defaultConfig,
    ...sentryConfig,
    transformer: {
      ...defaultConfig.transformer,
      ...sentryConfig.transformer,
    },
    resolver: {
      ...defaultConfig.resolver,
      ...sentryConfig.resolver,
    },
  };
})();
