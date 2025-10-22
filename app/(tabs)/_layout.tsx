import { UserProvider } from "@/contexts/UserContext";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import NavBar from "../components/NavBar";
import UserHeader from "../components/UserHeader";
import "../../i18n";

export default function RootLayout() {
    const pathname = usePathname();

    const showUserHeaderRoutes = ["/home", "/search", "/pro", "/account", "/offer"];
    const showReactHeaderRoutes = ["/account/info", "/legal", "/contact", "/detail", "/resetPassword", "/register"];

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
            <View style={styles.container}>
                {showUserHeader && <UserHeader />}

                <View style={styles.content}>
                    <Stack
                        screenOptions={({ route }) => {
                            return {
                                headerShown: showReactHeader,
                            };
                        }}
                    />
                </View>

                {showNavBar && <NavBar />}
            </View>
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
