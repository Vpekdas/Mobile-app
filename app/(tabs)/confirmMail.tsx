import { BASIC_LOGO } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { router } from "expo-router";
import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";

export default function ConfirmMail() {
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
        if (!user) return;

        try {
            setCheckingVerification(true);
            await user.reload();
            await user.getIdToken(true);

            if (user.emailVerified) {
                Alert.alert("Success", "Your email is verified!");
                if (refreshUser) {
                    await refreshUser();
                }
                router.replace("/home");
            } else {
                Alert.alert("Still not verified", "Please check your email and click the link.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong while checking verification.");
            console.error(error);
        } finally {
            setCheckingVerification(false);
        }
    };

    const handleResendVerification = async () => {
        if (!user) {
            Alert.alert("No user found", "Please log in to resend the verification email.");
            return;
        }

        if (user.emailVerified) {
            Alert.alert("Email already verified", "Your email has already been verified.");
            return;
        }

        try {
            await user.reload();

            if (!user.emailVerified) {
                setResendingEmail(true);
                await sendEmailVerification(user);
                Alert.alert("Verification email sent", "Please check your inbox.");
            } else {
                Alert.alert("Email already verified", "Your email is already verified.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Failed to send verification email", "Something went wrong. Please try again later.");
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
                <Text style={styles.text}>
                    A verification email has been sent to your inbox. Please click the link to verify your account.
                </Text>
                <CustomButton
                    title={checkingVerification ? "Checking..." : "I clicked the link"}
                    pressFunction={handleCheckVerification}
                    disabled={checkingVerification || resendingEmail || refreshing}
                />
                <CustomButton
                    title={resendingEmail ? "Resending..." : "Resend Email"}
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
