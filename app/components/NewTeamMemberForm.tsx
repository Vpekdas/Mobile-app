import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import InputField from "./InputField";

type TeamMember = {
    name: string;
    phone?: string;
    specialty: string[];
};

type Props = {
    specialties: { id: string; name: string }[];
    onAddMember: (member: TeamMember) => void;
};

export default function NewTeamMemberForm({ specialties, onAddMember }: Props) {
    const { t } = useTranslation();
    const [newMember, setNewMember] = React.useState<TeamMember>({
        name: "",
        phone: "",
        specialty: [],
    });

    const handleAdd = () => {
        if (newMember.name.trim() !== "" && newMember.specialty.length > 0) {
            onAddMember(newMember);
            setNewMember({ name: "", phone: "", specialty: [] });
        } else {
            Alert.alert(t("error"), t("fillAllFieldsTeamMember"));
        }
    };

    return (
        <View
            style={{
                marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#64B6AC",
                borderRadius: 8,
            }}
        >
            <InputField
                placeholder={t("name")}
                value={newMember.name}
                onChangeText={(text) => setNewMember((prev) => ({ ...prev, name: text }))}
                containerStyle={{ marginBottom: 5 }}
            />
            <View style={{ marginBottom: 10 }}>
                <MultiSelect
                    hideTags
                    items={specialties}
                    uniqueKey="id"
                    onSelectedItemsChange={(selectedItems) =>
                        setNewMember((prev) => ({ ...prev, specialty: selectedItems }))
                    }
                    selectedItems={newMember.specialty}
                    selectText={t("chooseSpecialties")}
                    searchInputPlaceholderText={t("searchSpecialties")}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#5D737E"
                    selectedItemTextColor="#070670"
                    selectedItemIconColor="#070670"
                    itemTextColor="#5D737E"
                    displayKey="name"
                    searchInputStyle={{ color: "#CCC" }}
                    submitButtonColor="#070670"
                    submitButtonText={t("validate")}
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
            <InputField
                placeholder={t("phone")}
                value={newMember.phone}
                onChangeText={(text) => setNewMember((prev) => ({ ...prev, phone: text }))}
            />
            <TouchableOpacity
                onPress={handleAdd}
                style={{
                    marginTop: 10,
                    backgroundColor: "#4D4CB1",
                    padding: 10,
                    borderRadius: 8,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white" }}>{t("addTeamMember")}</Text>
            </TouchableOpacity>
        </View>
    );
}
