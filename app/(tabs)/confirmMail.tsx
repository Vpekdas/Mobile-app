import { BASIC_LOGO } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { router } from "expo-router";
import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";

export default function ConfirmMail() {
    const { t } = useTranslation();

    const [checkingVerification, setCheckingVerification] = useState(false);
    const [resendingEmail, setResendingEmail] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { userData, loading, error, emailVerified, refreshUser } = useUser();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (!loading && user && emailVerified) {
            router.replace("/home");
        }
    }, [user, loading, emailVerified]);

    const handleCheckVerification = async () => {
        if (!user) {
            return;
        }

        try {
            setCheckingVerification(true);
            await user.reload();
            await user.getIdToken(true);

            if (user.emailVerified) {
                Alert.alert(t("success"), t("emailVerified"));
                if (refreshUser) {
                    await refreshUser();
                }
                router.replace("/home");
            } else {
                Alert.alert(t("stillNotVerified"), t("checkEmailLink"));
            }
        } catch (error) {
            Alert.alert(t("error"), t("verificationCheckFailed"));
        } finally {
            setCheckingVerification(false);
        }
    };

    const handleResendVerification = async () => {
        if (!user) {
            Alert.alert(t("noUserFound"), t("pleaseLoginToResend"));
            return;
        }

        if (user.emailVerified) {
            Alert.alert(t("emailVerified"), t("emailAlreadyVerified"));
            return;
        }

        try {
            await user.reload();

            if (!user.emailVerified) {
                setResendingEmail(true);
                await sendEmailVerification(user);
                Alert.alert(t("verificationEmailSent"), t("checkInbox"));
            } else {
                Alert.alert(t("emailVerified"), t("emailAlreadyVerified"));
            }
        } catch (error) {
            Alert.alert(t("failedToSendVerificationEmail)", t("somethingWentWrong")));
        } finally {
            setResendingEmail(false);
        }
    };

    if (loading) {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text>Loading user data...</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />
                <Text style={styles.text}>{t("verificationEmailInstructions")}</Text>
                <CustomButton
                    title={checkingVerification ? t("checking") : t("iClickedTheLink")}
                    pressFunction={handleCheckVerification}
                    disabled={checkingVerification || resendingEmail || refreshing}
                />
                <CustomButton
                    title={resendingEmail ? t("resending") : t("resendEmail")}
                    pressFunction={handleResendVerification}
                    disabled={checkingVerification || resendingEmail || refreshing}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        gap: 20,
    },
    text: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
});
