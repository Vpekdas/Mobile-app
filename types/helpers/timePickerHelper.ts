export const openTimePickerHelper = (
    dayIndex: number,
    type: "start" | "end",
    formData: any,
    setTimePickerDayIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setTimePickerType: React.Dispatch<React.SetStateAction<"start" | "end" | null>>,
    setTimePickerValue: React.Dispatch<React.SetStateAction<Date>>,
    setShowTimePicker: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setTimePickerDayIndex(dayIndex);
    setTimePickerType(type);

    const timeStr = formData.openingHours?.[dayIndex]?.[type] || "08:00";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    setTimePickerValue(date);
    setShowTimePicker(true);
};

export const onTimeChangeHelper = (
    event: any,
    selectedDate: Date | undefined,
    timePickerDayIndex: number | null,
    timePickerType: "start" | "end" | null,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    setShowTimePicker: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (event.type === "dismissed") {
        setShowTimePicker(false);
        return;
    }

    if (selectedDate && timePickerDayIndex !== null && timePickerType) {
        const hours = selectedDate.getHours().toString().padStart(2, "0");
        const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
        const timeFormatted = `${hours}:${minutes}`;

        setFormData((prev: any) => {
            const newOpeningHours = [...(prev.openingHours || [])];
            if (!newOpeningHours[timePickerDayIndex]) {
                newOpeningHours[timePickerDayIndex] = { day: "", start: "", end: "" };
            }
            newOpeningHours[timePickerDayIndex] = {
                ...newOpeningHours[timePickerDayIndex],
                [timePickerType]: timeFormatted,
            };
            return { ...prev, openingHours: newOpeningHours };
        });
    }

    setShowTimePicker(false);
};
