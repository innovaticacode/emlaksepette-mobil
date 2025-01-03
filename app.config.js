import "dotenv/config";

export default {
  expo: {
    sdkVersion: "51.0.0",
    platforms: ["android", "ios"],
    name: "Emlak Sepette",
    slug: "emlak-sepette",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/app-logo.png",
    userInterfaceStyle: "light",
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "$(Emlak Sepette)'nin konumunuzu kullanmasına izin verin.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "Profil bilgilerinizi güncellemek için fotoğraflarınıza erişmek istiyoruz.",
          cameraPermission:
            "Bu uygulama fotoğraf çekmek için kamerayı kullanır.",
        },
      ],
      [
        "@sentry/react-native",
        {
          organization: "emlak-sepette",
          project: "emlak-sepette",
          url: "https://sentry.io/",
        },
      ],
      "expo-secure-store",
    ],
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Konumunuza erişmek istiyoruz.",
        NSCameraUsageDescription:
          "Bu uygulama, fotoğraf çekmek için kamerayı kullanır.",
        NSPhotoLibraryUsageDescription:
          "Bu uygulama, fotoğraf seçmek için fotoğraf kitaplığınıza erişim gerektirir.",
      },
      bundleIdentifier: "com.sepettebilgiteknolojileri.emlaksepette",
      associatedDomains: ["applinks:example.com"],
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      adaptiveIcon: {
        foregroundImage: "./assets/app-logo.png",
        backgroundColor: "#ffffff",
      },
      package: "com.sepettebilgiteknolojileri.emlaksepette",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API,
        },
      },
    },
    web: {
      favicon: "./assets/app-logo.png",
    },
    extra: {
      eas: {
        projectId: "611f088f-e956-4ec9-9874-11b48455bb26",
      },
    },
  },
};
