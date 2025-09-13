import React from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

export interface CustomButtonProps {
    pressFunction: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    title: string;
}

const DEFAULT_BUTTON_STYLE: ViewStyle = {
    width: "80%",
    height: 40,
    backgroundColor: "#64B6AC",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
};

const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#FCFFFD",
    fontSize: 16,
};

export default function CustomButton({ pressFunction, style, textStyle, title }: CustomButtonProps) {
    return (
        <Pressable onPress={pressFunction} style={[DEFAULT_BUTTON_STYLE, style]}>
            <Text style={[DEFAULT_TEXT_STYLE, textStyle]}>{title}</Text>
        </Pressable>
    );
}
