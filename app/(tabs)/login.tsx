import { BASIC_LOGO } from "@/constants";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
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

const isWeb = Platform.OS === "web";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = async () => {
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;
            router.push("/home");
            console.log("Logged in:", user.email);
        } catch (error: any) {
            console.error("Login error:", error.message);
        }
    };

    const handleRegisterPress = () => {
        router.push("/register");
    };

    const handleForgotPassword = async () => {
        router.push("/resetPassword");
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {isWeb ? (
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
                        <Text style={{ color: "blue", textDecorationLine: "underline" }}>Forgot Password?</Text>
                    </Pressable>

                    <CustomButton pressFunction={handleLoginPress} title={"Login"} />
                    
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 16 }}>No account? </Text>
                        <Pressable onPress={handleRegisterPress}>
                            <Text style={{ color: "blue", fontSize: 16 }}>Click here</Text>
                        </Pressable>
                    </View>

                </ScrollView>
            ) : (
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
                            <Text style={{ color: "blue", textDecorationLine: "underline" }}>Forgot Password?</Text>
                        </Pressable>

                        <CustomButton pressFunction={handleLoginPress} title={"Login"} />

                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                            <Text style={{ fontSize: 16 }}>No account? </Text>
                            <Pressable onPress={handleRegisterPress}>
                                <Text style={{ color: "blue", fontSize: 16 }}>Click here</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            )}
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
