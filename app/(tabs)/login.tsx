import { BASIC_LOGO } from "@/constants";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import Logo from "../components/Logo";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginPress = async () => {
        const auth = getAuth();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            router.replace("/home");
            console.log("Logged in:", user.email);
        } catch (error: any) {
            console.error("Login error:", error.message);
            Alert.alert("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterPress = () => {
        router.push("/register");
    };

    const handleForgotPassword = async () => {
        router.push("/resetPassword");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <InputField placeholder="Mail" value={email} onChangeText={setEmail} secureTextEntry={false} />

                    <InputField
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <Pressable onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
                    </Pressable>

                    {loading ? (
                        <ActivityIndicator size="large" color="#070670" />
                    ) : (
                        <CustomButton
                            pressFunction={handleLoginPress}
                            title="Login"
                            disabled={loading || !email || !password}
                        />
                    )}

                    <View style={styles.registerContainer}>
                        <Text>No account ? </Text>
                        <Pressable onPress={handleRegisterPress}>
                            <Text style={styles.forgotPassword}>Click here</Text>
                        </Pressable>
                    </View>

                    <View style={styles.contactWrapper}>
                        <Pressable onPress={() => router.push("/contact")}>
                            <Text style={styles.clickable}>Contact</Text>
                        </Pressable>
                    </View>

                    <View style={styles.legalWrapper}>
                        <Pressable onPress={() => router.push("/legal")}>
                            <Text style={styles.clickable}>Legal</Text>
                        </Pressable>
                    </View>
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
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        backgroundColor: "white",
        position: "relative",
        minHeight: "100%",
    },
    contactWrapper: {
        position: "absolute",
        bottom: "3%",
        right: "5%",
    },
    legalWrapper: {
        position: "absolute",
        bottom: "3%",
        left: "5%",
    },
    forgotPassword: {
        color: "#070670",
        textDecorationLine: "underline",
    },
    clickable: {
        color: "#070670",
        fontSize: 16,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
});
