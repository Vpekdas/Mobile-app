export default ({ config }) => ({
    ...config,
    owner: "test734973557347",
    name: "test",
    slug: "test",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/react-logo.png",
    scheme: "test",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    runtimeVersion: {
        policy: "appVersion",
    },
    updates: {
        url: "https://u.expo.dev/aab37c28-111e-46ac-b54e-14c7789e65f4",
        enabled: true,
        fallbackToCacheTimeout: 0,
        checkAutomatically: "ON_LOAD",
        requestHeaders: {
            "expo-channel-name": "production",
        },
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.company.test",
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
            foregroundImage: "./assets/images/android-icon-foreground.png",
            backgroundColor: "#E6F4FE",
            monochromeImage: "./assets/images/android-icon-monochrome.png",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "",
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
                image: "assets/images/splash-icon.png",
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
            projectId: "aab37c28-111e-46ac-b54e-14c7789e65f4",
        },
    },
});
