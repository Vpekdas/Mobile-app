// InputField.tsx
import React from "react";
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
    editable?: boolean;
    onFocus?: () => void;
}

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "#070670",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
};

const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
};

export default function InputField({
    containerStyle,
    textStyle,
    placeholder,
    onChangeText,
    value,
    secureTextEntry,
    editable,
    onFocus,
}: InputFieldProps) {
    return (
        <View style={[DEFAULT_CONTAINER_STYLE, containerStyle]}>
            <TextInput
                style={[DEFAULT_TEXT_STYLE, { flex: 1 }, textStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                editable={editable}
                onFocus={onFocus}
            />
        </View>
    );
}
