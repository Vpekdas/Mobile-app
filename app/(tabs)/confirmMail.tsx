import { BASIC_LOGO } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { router } from "expo-router";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";

const isWeb = Platform.OS === "web";

export default function ConfirmMail() {
    const { userData, loading: userLoading } = useUser();
    const [checkingVerification, setCheckingVerification] = useState(false);
    const [resendingEmail, setResendingEmail] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    const handleCheckVerification = async () => {
        if (!user) {
            return;
        }

        try {
            setCheckingVerification(true);
            await user.reload();

            if (user.emailVerified) {
                Alert.alert("Success", "Your email is verified!");
                router.replace("/home");
            } else {
                Alert.alert("Still not verified", "Please check your email and click the link.");
            }
        } catch (error: any) {
            Alert.alert("Error", error?.message || "Failed to verify.");
        } finally {
            setCheckingVerification(false);
        }
    };

    const handleResendVerification = async () => {
        if (!user || user.emailVerified) {
            return;
        }

        try {
            setResendingEmail(true);
            await sendEmailVerification(user);
            Alert.alert("Verification email sent", "Please check your inbox.");
        } catch (error: any) {
            Alert.alert("Error", error?.message || "Failed to send verification email.");
        } finally {
            setResendingEmail(false);
        }
    };

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>{userLoading ? "Loading user data..." : "User not logged in."}</Text>
            </View>
        );
    }

    const content = (
        <>
            <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

            <Text style={styles.text}>
                A verification email has been sent to your inbox. Please click the link to verify your account.
            </Text>

            <CustomButton
                title={checkingVerification ? "Checking..." : "I clicked the link"}
                pressFunction={handleCheckVerification}
                disabled={checkingVerification || resendingEmail}
            />
            <CustomButton
                title={resendingEmail ? "Resending..." : "Resend Email"}
                pressFunction={handleResendVerification}
                disabled={checkingVerification || resendingEmail}
            />
        </>
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {isWeb ? (
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    {content}
                </ScrollView>
            ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                        {content}
                    </ScrollView>
                </TouchableWithoutFeedback>
            )}
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
