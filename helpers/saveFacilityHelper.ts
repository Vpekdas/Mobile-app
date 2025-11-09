import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";
import Geocoder from "react-native-geocoding";
import { db } from "../firebase";
import { normalizeString } from "../utils/Location";

export const saveFacilityData = async (formData: any, facilityImage: string | null) => {
    try {
        let profileImageUrl = null;

        if (facilityImage) {
            const response = await fetch(facilityImage);
            const blob = await response.blob();

            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                return;
            }

            const storageRef = ref(getStorage(), `facilityImages/${user.uid}.jpg`);
            await uploadBytes(storageRef, blob);
            profileImageUrl = await getDownloadURL(storageRef);
        }

        const addressParts = [formData.address, formData.postalCode, formData.city, formData.country].filter(
            (part) => part && part.trim() !== ""
        );
        const fullAddress = addressParts.join(", ");
        const response = await Geocoder.from(fullAddress);

        if (response.results.length > 0) {
            const { lat, lng } = response.results[0].geometry.location;

            const facilityWords = formData.facility
                .split(" ")
                .map(normalizeString)
                .filter((w: string) => w.length > 0);

            const specialtySearch = formData.specialty.map(normalizeString);
            const citySearch = normalizeString(formData.city);

            const updatedFormData = {
                ...formData,
                latitude: lat,
                longitude: lng,
                specialtySearch,
                citySearch,
                searchKeywords: [normalizeString(formData.facility), ...facilityWords, ...specialtySearch, citySearch],
                ...(profileImageUrl && { logo: profileImageUrl }),
            };

            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                Alert.alert("Error", "No authenticated user when saving");
                return false;
            }

            const estRef = doc(db, "establishments", user.uid);
            await setDoc(estRef, updatedFormData);

            return true;
        } else {
            Alert.alert("Error", "Geolocation not found");
            return false;
        }
    } catch (error) {
        let errorMessage = "An unexpected error occurred while saving the facility.";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        }
        Alert.alert("Error", errorMessage);
        return false;
    }
};
