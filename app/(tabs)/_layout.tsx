import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import NavBar from "../components/NavBar";

export default function RootLayout() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Stack />
            </View>
            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingBottom: 60,
    },
});
