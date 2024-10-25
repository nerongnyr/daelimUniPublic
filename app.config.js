import "dotenv/config";

export default {
  expo: {
    name: "daelimUni",
    slug: "daelimUni",
    version: "1.0.0",
    userInterfaceStyle: "autoautomatic",
    extra: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
    },
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["ACCESS_FINE_LOCATION"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
