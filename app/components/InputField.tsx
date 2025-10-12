import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";

export interface InputFieldProps {
    label?: string;
    required?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
}

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "#C0FDFB",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
};

const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
};

const LABEL_STYLE: TextStyle = {
    width: "80%",
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
};

const REQUIRED_STAR_STYLE: TextStyle = {
    color: "#070670",
};

export default function InputField(props: InputFieldProps) {
    return (
        <View style={[DEFAULT_CONTAINER_STYLE, props.containerStyle]}>
            <TextInput
                style={[DEFAULT_TEXT_STYLE, { flex: 1 }, props.textStyle]}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
}
