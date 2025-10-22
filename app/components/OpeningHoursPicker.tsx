import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Day = {
    day: string;
    start?: string;
    end?: string;
};

type Props = {
    openingHours: Day[];
    defaultOpeningHours: Day[];
    openTimePicker: (index: number, type: "start" | "end") => void;
    showTimePicker: boolean;
    timePickerValue: Date;
    onTimeChange: (event: any, selectedDate?: Date | undefined) => void;
};

export default function OpeningHoursPicker({
    openingHours,
    defaultOpeningHours,
    openTimePicker,
    showTimePicker,
    timePickerValue,
    onTimeChange,
}: Props) {
    const { t } = useTranslation();

    const hours = openingHours.length ? openingHours : defaultOpeningHours;

    return (
        <View style={styles.container}>
            {hours.map((day, index) => (
                <View key={day.day} style={styles.dayContainer}>
                    <Text style={styles.dayText}>{day.day}</Text>

                    <TouchableOpacity style={styles.timeButton} onPress={() => openTimePicker(index, "start")}>
                        <Text>{day.start || t("start")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.timeButton} onPress={() => openTimePicker(index, "end")}>
                        <Text>{day.end || t("end")}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {showTimePicker && (
                <DateTimePicker
                    value={timePickerValue}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onTimeChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    dayContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#64B6AC",
        borderRadius: 8,
    },
    dayText: {
        flex: 1,
    },
    timeButton: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        backgroundColor: "#DAFFEF",
        borderRadius: 6,
        alignItems: "center",
    },
});
