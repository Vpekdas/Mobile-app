import { enableScreens } from "react-native-screens";
enableScreens();

import { Stack, usePathname } from "expo-router";
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { UserProvider } from "../../contexts/UserContext";

import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../i18n";
import NavBar from "../components/NavBar";
import UserHeader from "../components/UserHeader";

export default function RootLayout() {
    const pathname = usePathname();

    const showUserHeaderRoutes = ["/home", "/search", "/pro", "/account", "/offer"];
    const showReactHeaderRoutes = ["/account/info", "/account/offer", "/legal", "/contact", "/detail", "/resetPassword", "/register"];

    const showUserHeader = showUserHeaderRoutes.includes(pathname);
    const showReactHeader = showReactHeaderRoutes.includes(pathname);

    const showNavBar =
        pathname !== "/login" &&
        pathname !== "/register" &&
        pathname !== "/confirmMail" &&
        pathname !== "/resetPassword" &&
        pathname !== "/contact" &&
        pathname !== "/legal";

    return (
        <UserProvider>
            <SafeAreaProvider>
                <StatusBar
                    barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
                    backgroundColor={Platform.OS === "android" ? "#070670" : undefined}
                />

                <View style={styles.container}>
                    {showUserHeader && <UserHeader />}

                    <View style={styles.content}>
                        <Stack
                            screenOptions={({ route }) => ({
                                headerShown: showReactHeader,
                                headerBackTitleVisible: false,
                                headerBackTitleDisplayMode: "minimal",
                                title: "",
                            })}
                        />
                    </View>

                    {showNavBar && <NavBar />}
                </View>
            </SafeAreaProvider>
        </UserProvider>
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
