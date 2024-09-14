import { View, Text, Image, Linking, Alert } from "react-native";
import React, { useCallback } from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { useRouter } from "expo-router";

const OAuth = () => {
  const {startOAuthFlow} = useOAuth({strategy: "oauth_google"});
  const router = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if(result && result.code === "session_exists" || result?.code==="Success"){
        Alert.alert("Success", "Session Exists! Redirecting to home page")
        router.push("/(root)/(tabs)/home")
      }

      Alert.alert(result?.success ? "Success" : "Error",result?.message)
    } catch (error) {
      console.error("OAuth error!",error)
    }
  },[]);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg font-JakartaMedium">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In With Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
