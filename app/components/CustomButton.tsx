import React from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

export interface CustomButtonProps {
    pressFunction: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    title: string;
}

export default function CustomButton({ pressFunction, style, textStyle, title }: CustomButtonProps) {
    return (
        <Pressable onPress={pressFunction} style={style}>
            <Text style={textStyle}>{title}</Text>
        </Pressable>
    );
}
