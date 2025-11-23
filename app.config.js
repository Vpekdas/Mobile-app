export default ({ config }) => ({
    ...config,
    owner: "7y77xkpsgg",
    name: "NiE",
    slug: "nie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo/app_logo.jpeg",
    scheme: "nie",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    runtimeVersion: {
        policy: "appVersion",
    },
    updates: {
        url: "https://u.expo.dev/539fd5d7-2981-4a3b-bd4f-d76b89dc55fc",
        enabled: true,
        fallbackToCacheTimeout: 0,
        checkAutomatically: "ON_LOAD",
        requestHeaders: {
            "expo-channel-name": "production",
        },
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.captainplouf.NiE",
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false,
            NSLocationWhenInUseUsageDescription:
                "We need your location to provide relevant results based on your current location.",
            NSLocationAlwaysUsageDescription:
                "We need your location to provide relevant results even when the app is in the background.",
        },
        googleServicesFile: "./GoogleService-Info.plist",
    },

    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/logo/app_logo.jpeg",
            backgroundColor: "#E6F4FE",
            monochromeImage: "./assets/images/android-icon-monochrome.png",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "com.captainplouf.NiE",
        googleServicesFile: "./google-services.json",
    },

    web: {
        output: "static",
        favicon: "./assets/images/favicon.png",
    },

    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/logo/logo.jpeg",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#ffffff",
                dark: {
                    backgroundColor: "#000000",
                },
            },
        ],
        "@react-native-firebase/app",
        "@react-native-firebase/auth",
        "@react-native-firebase/crashlytics",
        [
            "expo-build-properties",
            {
                ios: {
                    useFrameworks: "static",
                    buildReactNativeFromSource: true,
                },
            },
        ],
        "expo-web-browser",
    ],

    experiments: {
        typedRoutes: true,
        reactCompiler: true,
    },

    extra: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,

        eas: {
            projectId: "539fd5d7-2981-4a3b-bd4f-d76b89dc55fc",
        },
    },
});
