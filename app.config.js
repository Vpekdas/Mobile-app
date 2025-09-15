import * as dotenv from "dotenv";
dotenv.config();

export default ({ config }) => ({
    ...config,
    owner: "captain-plouf-2",
    name: "NiE",
    slug: "nie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "NiE",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

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
    },

    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/android-icon-foreground.png",
            backgroundColor: "#E6F4FE",
            monochromeImage: "./assets/images/android-icon-monochrome.png",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "com.captainplouf.NiE",
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
                image: "./assets/images/splash-icon.png",
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
        [
            "expo-build-properties",
            {
                ios: {
                    useFrameworks: "static",
                },
            },
        ],
    ],

    experiments: {
        typedRoutes: true,
        reactCompiler: true,
    },

    extra: {
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        firebaseAppId: process.env.FIREBASE_APP_ID,
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        eas: {
            projectId: "f9c1cb81-a7e9-4e63-a842-5f613b99a203",
        },
    },
});
