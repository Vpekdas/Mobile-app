import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import InputField from "./InputField";

type TeamMember = {
    name: string;
    phone?: string;
    specialty: string[];
};

type Props = {
    team: TeamMember[];
    onChangeTeam: (team: TeamMember[]) => void;
};

export default function TeamMemberList({ team, onChangeTeam }: Props) {
    const { t } = useTranslation();

    return (
        <View style={{ flex: 1, width: "100%" }}>
            {team && team.length > 0 ? (
                team.map((member, index) => (
                    <View
                        key={index}
                        style={{
                            marginBottom: 10,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: "#64B6AC",
                            borderRadius: 8,
                        }}
                    >
                        <InputField
                            placeholder={t("name")}
                            value={member.name}
                            onChangeText={(text) => {
                                const updatedTeam = [...team];
                                updatedTeam[index].name = text;
                                onChangeTeam(updatedTeam);
                            }}
                            containerStyle={{ marginBottom: 5 }}
                        />
                        <InputField
                            placeholder={t("phone")}
                            value={member.phone}
                            onChangeText={(text) => {
                                const updatedTeam = [...team];
                                updatedTeam[index].phone = text;
                                onChangeTeam(updatedTeam);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                const updatedTeam = team.filter((_, i) => i !== index);
                                onChangeTeam(updatedTeam);
                            }}
                            style={{ marginTop: 5 }}
                        >
                            <Text style={{ color: "red" }}>{t("remove")}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text>{t("noTeamMembers")}</Text>
            )}
        </View>
    );
}
