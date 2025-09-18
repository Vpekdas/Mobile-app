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
        googleServicesFile: "./app/GoogleService-Info.plist",
    },

    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/logo/new_logo.jpeg",
            backgroundColor: "#E6F4FE",
            monochromeImage: "./assets/images/android-icon-monochrome.png",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "com.captainplouf.NiE",
        googleServicesFile: "./app/google-services.json",
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
        // ANDROID
        firebaseApiKeyAndroid: process.env.FIREBASE_API_KEY_ANDROID,
        firebaseProjectIdAndroid: process.env.FIREBASE_PROJECT_ID_ANDROID,
        firebaseStorageBucketAndroid: process.env.FIREBASE_STORAGE_BUCKET_ANDROID,
        firebaseMessagingSenderIdAndroid: process.env.FIREBASE_MESSAGING_SENDER_ID_ANDROID,
        firebaseAppIdAndroid: process.env.FIREBASE_APP_ID_ANDROID,

        // IOS
        firebaseApiKeyIOS: process.env.FIREBASE_API_KEY_IOS,
        firebaseProjectIdIOS: process.env.FIREBASE_PROJECT_ID_IOS,
        firebaseStorageBucketIOS: process.env.FIREBASE_STORAGE_BUCKET_IOS,
        firebaseMessagingSenderIdIOS: process.env.FIREBASE_MESSAGING_SENDER_ID_IOS,
        firebaseAppIdIOS: process.env.FIREBASE_APP_ID_IOS,
        
        // WEB
        firebaseApiKeyWeb: process.env.FIREBASE_API_KEY_WEB,
        firebaseAuthDomainWeb: process.env.FIREBASE_AUTH_DOMAIN_WEB,
        firebaseProjectIdWeb: process.env.FIREBASE_PROJECT_ID_WEB,
        firebaseStorageBucketWeb: process.env.FIREBASE_STORAGE_BUCKET_WEB,
        firebaseMessagingSenderIdWeb: process.env.FIREBASE_MESSAGING_SENDER_ID_WEB,
        firebaseAppIdWeb: process.env.FIREBASE_APP_ID_WEB,

        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        eas: {
            projectId: "f9c1cb81-a7e9-4e63-a842-5f613b99a203",
        },
    },
});
