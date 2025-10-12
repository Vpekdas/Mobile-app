import { BASIC_LOGO } from "@/constants";
import { auth } from "@/firebase";
import { router } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
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
    const [loading, setLoading] = useState(false);

    const handleCheckVerification = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                setLoading(true);
                await user.reload();

                if (user.emailVerified) {
                    Alert.alert("Success", "Your email is verified!");
                    router.replace("/home");
                } else {
                    Alert.alert("Still not verified", "Please check your email and click the link.");
                }
            }
        } catch (error: any) {
            Alert.alert("Error", error?.message || "Failed to verify.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerification = async () => {
        const user = auth.currentUser;
        if (user && !user.emailVerified) {
            await sendEmailVerification(user);
        }
    };

    const Content = () => (
        <View style={styles.container}>
            <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

            <Text style={styles.text}>
                A verification email has been sent to your inbox. Please click the link to verify your account.
            </Text>

            <CustomButton
                title={loading ? "Checking..." : "I clicked the link"}
                pressFunction={handleCheckVerification}
            />
            <CustomButton title="Resend Email" pressFunction={handleResendVerification} />
        </View>
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {isWeb ? (
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Content />
                </ScrollView>
            ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                        <Content />
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
