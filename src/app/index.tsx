import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import { use } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialised = useAuthStore((s) => s.isInitialised)

  if(!isInitialised) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }

  return isAuthenticated ? <Redirect href="/" /> : <Redirect href="/(auth)/login"/>
}