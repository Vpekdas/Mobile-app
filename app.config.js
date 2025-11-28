export default ({ config }) => ({
    ...config,
    owner: "XOwnerX",
    name: "XAppNameX",
    slug: "X",
    version: "1.0.0",
    orientation: "portrait",
    icon: "XPathToLogoX",
    scheme: "X",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    runtimeVersion: {
        policy: "appVersion",
    },
    updates: {
        url: "XExpoURLX",
        enabled: true,
        fallbackToCacheTimeout: 0,
        checkAutomatically: "ON_LOAD",
        requestHeaders: {
            "expo-channel-name": "production",
        },
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "XBundleX",
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
            foregroundImage: "XPathToForegroundImageX",
            backgroundColor: "#E6F4FE",
            monochromeImage: "XPathToMonoChromeImageX",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "XPackageX",
        googleServicesFile: "./google-services.json",
    },

    web: {
        output: "static",
        favicon: "XPathToFaviconX",
    },

    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "XPathToSplashScreenX",
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
            projectId: "XExpoProjectIdX",
        },
    },
});
