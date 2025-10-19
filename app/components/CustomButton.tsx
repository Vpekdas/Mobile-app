import React from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

export interface CustomButtonProps {
    pressFunction: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    title: string;
    disabled?: boolean; 
}

const DEFAULT_BUTTON_STYLE: ViewStyle = {
    width: "80%",
    height: 40,
    backgroundColor: "#64B6AC",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
};

const DISABLED_BUTTON_STYLE: ViewStyle = {
    backgroundColor: "#A0BFB9",
};

const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#FCFFFD",
    fontSize: 16,
};

const DISABLED_TEXT_STYLE: TextStyle = {
    color: "#E0E4E3",
};

export default function CustomButton({ pressFunction, style, textStyle, title, disabled = false }: CustomButtonProps) {
    return (
        <Pressable
            onPress={pressFunction}
            style={({ pressed }) => [
                DEFAULT_BUTTON_STYLE,
                style,
                disabled && DISABLED_BUTTON_STYLE,
                pressed && !disabled && { opacity: 0.75 },
            ]}
            disabled={disabled}
        >
            <Text style={[DEFAULT_TEXT_STYLE, textStyle, disabled && DISABLED_TEXT_STYLE]}>{title}</Text>
        </Pressable>
    );
}
