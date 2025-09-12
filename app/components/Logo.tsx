import { Image, ImageSourcePropType, ImageStyle, StyleProp } from "react-native";

export interface LogoProps {
    source: ImageSourcePropType;
    size?: number;
    style?: StyleProp<ImageStyle>;
}

export default function Logo({ source, size, style }: LogoProps) {
    return <Image source={source} style={[{ width: size, height: size }, style]} resizeMode="contain" />;
}
