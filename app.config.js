export default ({ config }) => ({
    ...config,
    owner: "captain_plouf",
    name: "NiE",
    slug: "nie",
    version: "1.0.3",
    orientation: "portrait",
    icon: "./assets/logo/app_logo.png",
    scheme: "nie",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    updates: {
        url: "https://u.expo.dev/f9c1cb81-a7e9-4e63-a842-5f613b99a203",
        enabled: true,
        fallbackToCacheTimeout: 0,
        checkAutomatically: "ON_LOAD",
    },
    runtimeVersion: {
        policy: "appVersion",
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
            foregroundImage: "./assets/logo/app_logo.png",
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
                android: {
                    enableHermes: true,
                    hermesFlags: ["-O", "-output-source-map"],
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
            projectId: "f9c1cb81-a7e9-4e63-a842-5f613b99a203",
        },
    },
});
