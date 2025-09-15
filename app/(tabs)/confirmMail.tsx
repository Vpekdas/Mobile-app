import { BASIC_LOGO } from "@/constants";
import { useState } from "react";
import {
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

const isWeb = Platform.OS === "web";

export default function ConfirmMail() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = async () => {};

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {isWeb ? (
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <InputField
                        placeholder="Saisissez votre mail"
                        value={email}
                        onChangeText={setEmail}
                        secureTextEntry={false}
                    />

                    <CustomButton pressFunction={handleLoginPress} title={"Se connecter"} />
                </ScrollView>
            ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                        <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                        <InputField
                            placeholder="Saisissez votre mail"
                            value={email}
                            onChangeText={setEmail}
                            secureTextEntry={false}
                        />

                        <CustomButton pressFunction={handleLoginPress} title={"Se connecter"} />
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
