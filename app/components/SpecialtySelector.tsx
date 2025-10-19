import React from "react";
import { View } from "react-native";
import MultiSelect from "react-native-multiple-select";

type Props = {
    specialties: { id: string; name: string }[];
    selectedItems: string[];
    onSelectedItemsChange: (selectedItems: string[]) => void;
};

export default function SpecialtySelector({ specialties, selectedItems, onSelectedItemsChange }: Props) {
    return (
        <View style={{ flex: 1 }}>
            <MultiSelect
                hideTags
                items={specialties}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Choose specialty"
                searchInputPlaceholderText="Search specialty"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#5D737E"
                selectedItemTextColor="#070670"
                selectedItemIconColor="#070670"
                itemTextColor="#5D737E"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#070670"
                submitButtonText="Validate"
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
    );
}
