import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

interface TextWithBorderProps {
    children: React.ReactNode;
    containerStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    selectable?: boolean;
}

export default function TextWithBorder({
    children,
    containerStyle,
    textStyle,
    selectable = false,
}: TextWithBorderProps) {
    return (
        <View style={[DEFAULT_CONTAINER_STYLE, containerStyle]}>
            <Text style={[DEFAULT_TEXT_STYLE, textStyle]} selectable={selectable}>
                {children}
            </Text>
        </View>
    );
}

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    borderColor: "#64B6AC",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#DAFFEF",
};

const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
    fontWeight: "bold",
};
