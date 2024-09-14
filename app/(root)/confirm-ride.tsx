import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const router = useRouter();
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  // useEffect(() => {
  //   console.log("Drivers:", drivers);
  // }, [drivers]);

  return (
    <RideLayout title="Choose a Rider" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <DriverCard
              selected={selectedDriver!}
              item={item}
              setSelected={() => setSelectedDriver(item.id!, item.price!,  item.time!)}
            />
          );
        }}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
