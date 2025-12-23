import { Stack } from "expo-router";
import { Image } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Home",
          headerLeft: () => (
            <Image 
              source={require('./../assets/images/franchiseLogo.png')} 
              style={{ width: 60, height: 60, marginLeft: 10 }}
              resizeMode="contain"
            />
          ),
        }} 
      />
    </Stack>
  );
}
