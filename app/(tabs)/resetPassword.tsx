import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import { BASIC_LOGO } from "../../constants";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import Logo from "../components/Logo";

const handleError = (error: FirebaseError, t: any) => {
    switch (error.code) {
        case "auth/invalid-email":
            Alert.alert(t("error"), t("invalidEmail"));
            break;
        case "auth/user-not-found":
            Alert.alert(t("error"), t("userNotFoundMsg"));
            break;
        default:
            Alert.alert(t("error"), t("somethingWentWrong"));
            break;
    }
};

export default function ResetPassword() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Alert.alert(t("error"), "pleaseEnterEmail");
            return;
        }

        const auth = getAuth();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(t("success"), t("passwordResetSent"));
            setEmail("");
        } catch (error: any) {
            handleError(error, t);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <InputField
                        placeholder={t("email")}
                        value={email}
                        onChangeText={setEmail}
                        secureTextEntry={false}
                    />

                    <CustomButton
                        pressFunction={handleForgotPassword}
                        title={loading ? t("sending") : t("resetPassword")}
                        disabled={loading}
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
