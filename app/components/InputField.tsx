import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";

export interface InputFieldProps {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
}

export default function InputField(props: InputFieldProps) {
    return (
        <View style={props.containerStyle}>
            <TextInput
                style={[{ flex: 1 }, props.textStyle]}
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
