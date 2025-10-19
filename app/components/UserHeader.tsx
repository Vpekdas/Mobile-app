import { useUser } from "@/contexts/UserContext";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

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
            <Text style={styles.text}>Bonjour {userData?.firstName || ""}</Text>
            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.image} />
            ) : (
                <View style={[styles.image, { backgroundColor: "#ccc" }]} />
            )}
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
