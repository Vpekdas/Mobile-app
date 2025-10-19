import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import { ActivityIndicator, Image, Platform, StyleSheet, Text, View } from "react-native";

export default function UserHeader() {
    const { userData, profileImage, loading } = useUser();

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#5D737E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bonjour {userData?.firstName || "User"}</Text>

            <Image
                source={profileImage ? { uri: profileImage } : DEFAULT_PROFILE_PICTURE.source}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        top: Platform.OS === "android" ? 20 : 0,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignSelf: "flex-end",
    },
    text: {
        fontSize: 20,
        color: "#5D737E",
        fontWeight: "600",
        alignSelf: "center",
    },
});
