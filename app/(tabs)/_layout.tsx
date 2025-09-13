import { PROFILE_PICTURE } from "@/constants";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import NavBar from "../components/NavBar";
import UserHeader from "../components/UserHeader";

export default function RootLayout() {
    const pathname = usePathname();

    const showHeaderRoutes = ["/home", "/search", "/pro", "/account"];
    const showUserHeader = showHeaderRoutes.includes(pathname);
    return (
        <View style={styles.container}>
            {showUserHeader && <UserHeader profilePicUri={PROFILE_PICTURE.source} />}
            <View style={styles.content}>
                <Stack
                    screenOptions={({ route }) => ({
                        headerShown: ["/home", "/search", "/pro", "/account"].includes(route.name),
                    })}
                />
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
