import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DEFAULT_PROFILE_PICTURE } from "../../constants";
import { useUser } from "../../contexts/UserContext";

export default function UserHeader() {
    const { t } = useTranslation();
    const { userData, profileImage, loading } = useUser();

    if (loading) {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ActivityIndicator size="small" color="#5D737E" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {t("hello")} {userData?.firstName || t("user")}
                </Text>

                <Image
                    source={profileImage ? { uri: profileImage } : DEFAULT_PROFILE_PICTURE.source}
                    style={styles.image}
                />
            </View>
        </SafeAreaView>
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
        width: 48,
        height: 48,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        color: "#5D737E",
        fontWeight: "600",
    },
});
