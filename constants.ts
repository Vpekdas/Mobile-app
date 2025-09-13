import { StyleSheet } from "react-native";
import { InputFieldProps } from "./app/components/InputField";
import { LogoProps } from "./app/components/Logo";

export const BASIC_INPUT_FIELD: InputFieldProps = {
    containerStyle: {
        width: "80%",
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "#C0FDFB",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
    },
    textStyle: {
        color: "#5D737E",
        fontSize: 16,
    },
};

export const BASIC_LOGO: LogoProps = {
    source: require("./assets/logo/NiE.jpeg"),
    size: 200,
    style: {
        marginBottom: 50,
    },
};

export const PROFILE_PICTURE = {
    source: require("./assets/logo/profile.png"),
};

export const BASIC_CUSTOM_BUTTON = StyleSheet.create({
    basicCustomButton: {
        width: "80%",
        height: "5%",
        backgroundColor: "#64B6AC",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});

export const BASIC_CUSTOM_BUTTON_TEXT = StyleSheet.create({
    basicCustomButtonText: {
        color: "#FCFFFD",
        fontSize: 16,
    },
});

export const BASIC_PICKER = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        padding: 20,
        alignItems: "center",
        gap: 25,
    },
    pickerContainer: {
        width: "80%",
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "#C0FDFB",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
    picker: {
        flex: 1,
        color: "#5D737E",
        fontSize: 16,
    },
});
