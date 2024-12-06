import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="Camera" options={{ headerShown: false }} />
    </Stack>
  );
}
