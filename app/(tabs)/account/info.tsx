import TextWithBorder from "@/app/components/TextWithBorder";
import { BASIC_LOGO, USER_FIELDS } from "@/constants";
import { useUser } from "@/contexts/UserContext";

import { User } from "@/types/user";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Logo from "../../components/Logo";

export default function Info() {
    const { t } = useTranslation();
    const { userData, profileImage, loading, error } = useUser();

    if (loading) {
        return (
            <View style={styles.centered}>
                <TextWithBorder>{t("loading")}</TextWithBorder>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <TextWithBorder>{t("errorLoadingUserData")}</TextWithBorder>
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.centered}>
                <TextWithBorder>{t("userNotFound")}</TextWithBorder>
            </View>
        );
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

                    {USER_FIELDS.map((field, index) => (
                        <TextWithBorder key={index}>
                            {`${t(field.label)}: ${userData[field.key as keyof User]}`}
                        </TextWithBorder>
                    ))}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        padding: 20,
        alignItems: "center",
        gap: 25,
        paddingBottom: 100,
        backgroundColor: "white",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});
