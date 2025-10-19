export interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    type: "user" | "professional" | "";
    birthPlace: string;
    city: string;
    town: string;
    neighborhood: string;
    sex: "man" | "woman" | "other" | "";
    job: string;
    profileImageUrl?: string;
}
