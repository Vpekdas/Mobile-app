import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";

export interface SearchBarProps {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
}

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#070670",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 30,
};

const DEFAULT_TEXT_STYLE: TextStyle = {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,
};

export default function SearchBar(props: SearchBarProps) {
    const { t } = useTranslation();

    return (
        <View style={[DEFAULT_CONTAINER_STYLE, props.containerStyle]}>
            <FontAwesome5 name="search" size={20} color="#666" style={{ marginRight: 8 }} />
            <TextInput
                style={[DEFAULT_TEXT_STYLE, props.textStyle]}
                placeholder={t("searchFacilities")}
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
}
