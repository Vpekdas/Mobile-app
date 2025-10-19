import { BASIC_LOGO } from "@/constants";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import Logo from "../components/Logo";

const handleError = (error: any) => {
    switch (error.code) {
        case "auth/invalid-email":
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            break;
        case "auth/user-not-found":
            Alert.alert("User Not Found", "No account found with this email.");
            break;
        default:
            Alert.alert("Error", "Something went wrong. Please try again later.");
            break;
    }
};

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Alert.alert("Please enter your email address.");
            return;
        }

        const auth = getAuth();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Success", "Password reset email sent. Please check your inbox.");
            setEmail("");
        } catch (error: any) {
            console.error("Password reset error:", error.message);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <InputField placeholder="Email" value={email} onChangeText={setEmail} secureTextEntry={false} />

                    <CustomButton
                        pressFunction={handleForgotPassword}
                        title={loading ? "Sending..." : "Reset password"}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        backgroundColor: "white",
    },
});
