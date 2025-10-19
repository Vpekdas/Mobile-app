import { db } from "@/firebase";
import { normalizeString } from "@/utils/Location";
import { doc, setDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";
import Geocoder from "react-native-geocoding";

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

        const response = await Geocoder.from(formData.address);

        if (response.results.length > 0) {
            const { lat, lng } = response.results[0].geometry.location;

            const facility_search = normalizeString(formData.facility);
            const specialty_search = formData.specialty.map(normalizeString);

            const updatedFormData = {
                ...formData,
                latitude: lat,
                longitude: lng,
                facility_search,
                specialty_search,
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
        console.error("Save error:", error);
        Alert.alert("Error", "Something went wrong. Check console.");
        return false;
    }
};
