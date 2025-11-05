import { auth, db } from "../../firebase";
import { Sex, UserType } from "../../types/enums";
import { validatePhoneNumber, validateRequiredField } from "../../utils/Registration";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { BASIC_LOGO, BASIC_PICKER, REGISTER_FIELDS } from "../../constants";
import CustomButton from "../components/CustomButton";
import ImagePickerComponent from "../components/ImagePickerComponent";
import InputFieldWithLabel from "../components/InputFIeldWithLabel";
import Logo from "../components/Logo";

const storage = getStorage();

export interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    type: UserType;
    birthPlace: string;
    city: string;
    town: string;
    neighborhood: string;
    sex: Sex;
    job: string;
}

export default function Register() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<User>({
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "",
        email: "",
        type: UserType.USER,
        birthPlace: "",
        city: "",
        town: "",
        neighborhood: "",
        sex: Sex.MAN,
        job: "",
    });
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleInputChange = (key: keyof User, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "birthDate",
            "phone",
            "email",
            "birthPlace",
            "city",
            "town",
            "neighborhood",
            "job",
            "type",
            "sex",
        ];

        for (const field of requiredFields) {
            if (!validateRequiredField(formData[field as keyof User])) {
                Alert.alert(t("error"), t("fillAllMandatoryFields"));
                return false;
            }
        }

        if (!validatePhoneNumber(formData.phone)) {
            Alert.alert(t("error"), t("invalidPhoneNumber"));
            return false;
        }

        return true;
    };

    const uploadProfileImage = async (userId: string) => {
        if (!profileImage) {
            return null;
        }

        try {
            const response = await fetch(profileImage);
            const blob = await response.blob();
            const storageRef = ref(storage, `profileImages/${userId}/profile.jpg`);
            await uploadBytes(storageRef, blob);
            return await getDownloadURL(storageRef);
        } catch (error) {
            return null;
        }
    };

    const handleCreateAccountPress = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);

            const profileImageUrl = await uploadProfileImage(user.uid);

            const newUser: User & { profileImageUrl?: string } = {
                ...formData,
                ...(profileImageUrl && { profileImageUrl }),
            };

            await setDoc(doc(db, "users", user.uid), newUser, { merge: true });
            router.replace("/confirmMail");
        } catch (error) {
            Alert.alert(t("error"), t("errorCreatingAccount"));
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            setFormData((prevData) => ({
                ...prevData,
                birthDate: formattedDate,
            }));
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    {REGISTER_FIELDS.map((field, index) => (
                        <InputFieldWithLabel
                            key={index}
                            label={t(field.label)}
                            placeholder={t(field.placeholder)}
                            value={formData[field.key as keyof User]}
                            onChange={(value) => handleInputChange(field.key as keyof User, value)}
                        />
                    ))}

                    <View>
                        <InputFieldWithLabel
                            label={t("birthDate")}
                            value={formData.birthDate}
                            onFocus={() => setShowDatePicker(true)}
                            editable={true}
                        />

                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode="date"
                                display="inline"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Picker
                        selectedValue={formData.sex}
                        onValueChange={(itemValue) => handleInputChange("sex", itemValue)}
                        style={BASIC_PICKER.pickerContainer}
                        itemStyle={BASIC_PICKER.picker}
                    >
                        <Picker.Item label={t("man")} value="man" />
                        <Picker.Item label={t("woman")} value="woman" />
                        <Picker.Item label={t("other")} value="other" />
                    </Picker>

                    <Picker
                        selectedValue={formData.type}
                        onValueChange={(itemValue) => handleInputChange("type", itemValue)}
                        style={BASIC_PICKER.pickerContainer}
                        itemStyle={BASIC_PICKER.picker}
                    >
                        <Picker.Item label={t("user")} value="user" />
                        <Picker.Item label={t("professional")} value="professional" />
                    </Picker>

                    <InputFieldWithLabel
                        label={t("password")}
                        placeholder={t("password")}
                        value={password}
                        onChange={setPassword}
                        isSecure={true}
                    ></InputFieldWithLabel>

                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                        <View style={styles.image}>
                            <ImagePickerComponent
                                selectedImage={profileImage}
                                onImageSelected={(imageUri) => setProfileImage(imageUri)}
                                onImageError={(error) => console.error("ImagePicker error:", error)}
                            />
                        </View>
                    </View>

                    <CustomButton pressFunction={handleCreateAccountPress} title={t("createAccount")} />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        padding: 20,
        alignItems: "center",
        gap: 25,
        paddingBottom: 100,
        backgroundColor: "white",
    },
    image: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});
