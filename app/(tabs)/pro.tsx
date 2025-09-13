import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";

import MultiSelect from "react-native-multiple-select";

import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    borderColor: "#64B6AC",
    flexDirection: "row",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#DAFFEF",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
};

const DEFAULT_NAME_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
};

interface FormData {
    facility: string;
    address: string;
    type: "hospital" | "clinic" | "office";
    sector: "public" | "private";
    telephone: string;
    specialty: string[];
    location?: {
        latitude: number;
        longitude: number;
    };
}

export default function Pro() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        facility: "Mon établissement",
        address: "Adresse",
        type: "hospital",
        sector: "public",
        telephone: "Téléphone",
        specialty: ["Cardiologie"],
    });

    const fields = [
        { key: "facility", label: "Établissement" },
        { key: "address", label: "Adresse" },
        { key: "type", label: "Type" },
        { key: "sector", label: "Secteur" },
        { key: "telephone", label: "Téléphone" },
        { key: "specialty", label: "Spécialité" },
    ];

    const pickerOptions: Record<string, { label: string; value: string }[]> = {
        type: [
            { label: "Hôpital", value: "hospital" },
            { label: "Clinique", value: "clinic" },
            { label: "Cabinet", value: "office" },
        ],
        sector: [
            { label: "Public", value: "public" },
            { label: "Privé", value: "private" },
        ],
    };

    const specialties = [
        { id: "Cardiologie", name: "Cardiologie" },
        { id: "Dermatologie", name: "Dermatologie" },
        { id: "Généraliste", name: "Généraliste" },
        { id: "Pédiatrie", name: "Pédiatrie" },
    ];

    const isPickerField = (key: string) => ["type", "sector"].includes(key);

    const handleChange = (key: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const renderField = (key: keyof typeof formData, label: string) => (
        <View key={key} style={DEFAULT_CONTAINER_STYLE}>
            {editingField === key ? (
                key === "specialty" ? (
                    <View style={{ flex: 1 }}>
                        <MultiSelect
                            hideTags
                            items={specialties}
                            uniqueKey="id"
                            onSelectedItemsChange={(selectedItems) => handleChange("specialty", selectedItems)}
                            selectedItems={formData.specialty}
                            selectText="Choisir spécialités"
                            searchInputPlaceholderText="Rechercher spécialité..."
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#5D737E"
                            selectedItemTextColor="#070670"
                            selectedItemIconColor="#070670"
                            itemTextColor="#5D737E"
                            displayKey="name"
                            searchInputStyle={{ color: "#CCC" }}
                            submitButtonColor="#070670"
                            submitButtonText="Valider"
                            styleDropdownMenu={{
                                backgroundColor: "#e0f7fa",
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#00796b",
                            }}
                            styleDropdownMenuSubsection={{
                                paddingLeft: 10,
                                borderColor: "#004d40",
                                borderWidth: 1,
                                borderRadius: 8,
                            }}
                        />
                    </View>
                ) : isPickerField(key) ? (
                    <Picker
                        selectedValue={formData[key]}
                        onValueChange={(value) => handleChange(key, value)}
                        style={{ flex: 1 }}
                    >
                        {pickerOptions[key].map((option) => (
                            <Picker.Item label={option.label} value={option.value} key={option.value} />
                        ))}
                    </Picker>
                ) : (
                    <InputField
                        value={formData[key]}
                        onChangeText={(text) => handleChange(key, text)}
                        containerStyle={{ flex: 1 }}
                        textStyle={DEFAULT_NAME_STYLE}
                    />
                )
            ) : (
                <Text style={DEFAULT_NAME_STYLE}>
                    {key === "specialty" ? formData.specialty.join(", ") : formData[key]}
                </Text>
            )}
            <TouchableOpacity onPress={() => setEditingField(editingField === key ? null : key)}>
                <FontAwesome5 name="edit" size={24} color="#4D4CB1" />
            </TouchableOpacity>
        </View>
    );

    const handleSave = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.warn("No authenticated user found.");
            return;
        }

        try {
            const estRef = doc(db, "establishments", user.uid);
            await setDoc(estRef, formData);
            setEditingField(null);
            console.log("Form data saved successfully.");
        } catch (error) {
            console.error("Error saving form data:", error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <FlatList
                    data={fields}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => renderField(item.key as keyof typeof formData, item.label)}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "space-evenly",
                        padding: 16,
                        gap: 12,
                    }}
                    ListFooterComponent={<CustomButton pressFunction={handleSave} title={"Sauvegarder"} />}
                />
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
