import Constants from "expo-constants";
import { Platform } from "react-native";

const {
    firebaseApiKeyAndroid,
    firebaseProjectIdAndroid,
    firebaseStorageBucketAndroid,
    firebaseMessagingSenderIdAndroid,
    firebaseAppIdAndroid,
    firebaseApiKeyIOS,
    firebaseProjectIdIOS,
    firebaseStorageBucketIOS,
    firebaseMessagingSenderIdIOS,
    firebaseAppIdIOS,
    firebaseApiKeyWeb,
    firebaseAuthDomainWeb,
    firebaseProjectIdWeb,
    firebaseStorageBucketWeb,
    firebaseMessagingSenderIdWeb,
    firebaseAppIdWeb,
    measurementId,
    googleMapsApiKey,
} = Constants.expoConfig.extra;

const firebaseConfig = Platform.select({
    ios: {
        apiKey: firebaseApiKeyIOS,
        projectId: firebaseProjectIdIOS,
        storageBucket: firebaseStorageBucketIOS,
        messagingSenderId: firebaseMessagingSenderIdIOS,
        appId: firebaseAppIdIOS,
    },
    android: {
        apiKey: firebaseApiKeyAndroid,
        projectId: firebaseProjectIdAndroid,
        storageBucket: firebaseStorageBucketAndroid,
        messagingSenderId: firebaseMessagingSenderIdAndroid,
        appId: firebaseAppIdAndroid,
    },
    default: {
        apiKey: firebaseApiKeyWeb,
        authDomain: firebaseAuthDomainWeb,
        projectId: firebaseProjectIdWeb,
        storageBucket: firebaseStorageBucketWeb,
        messagingSenderId: firebaseMessagingSenderIdWeb,
        appId: firebaseAppIdWeb,
        measurementId: measurementId,
    },
});

export const googleMapsApi = googleMapsApiKey;
export default firebaseConfig;
