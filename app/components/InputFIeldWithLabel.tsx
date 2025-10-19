// InputFieldWithLabel.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputField from "../components/InputField";

interface InputFieldWithLabelProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange?: (text: string) => void;
    isSecure?: boolean;
    editable?: boolean;
    onFocus?: () => void;
}


export default function InputFieldWithLabel({
    label,
    placeholder,
    value,
    onChange,
    isSecure = false,
    editable = true,
    onFocus,
}: InputFieldWithLabelProps) {
    return (
        <View style={styles.labeledField}>
            <Text style={styles.label}>
                {label} <Text style={styles.required}>*</Text>
            </Text>
            <InputField
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isSecure}
                editable={editable}
                onFocus={onFocus}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    labeledField: {
        width: "100%",
        alignItems: "center",
        gap: 4,
    },
    label: {
        width: "80%",
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    required: {
        color: "#070670",
    },
});
