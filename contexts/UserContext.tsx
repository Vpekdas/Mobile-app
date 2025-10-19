
import { User } from "@/types/user";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextData {
    userData: User | null;
    profileImage: string | null;
    loading: boolean;
    error: string | null;
}

const UserContext = createContext<UserContextData>({
    userData: null,
    profileImage: null,
    loading: true,
    error: null,
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const firestore = getFirestore();
            const storage = getStorage();
            const user = auth.currentUser;

            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as User;
                    setUserData(data);

                    const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
                    try {
                        const url = await getDownloadURL(imageRef);
                        setProfileImage(url);
                    } catch {
                        setProfileImage(null);
                    }
                }
            } catch (err) {
                setError("Failed to fetch user data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return <UserContext.Provider value={{ userData, profileImage, loading, error }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
