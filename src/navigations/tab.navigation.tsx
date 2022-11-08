import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { VideoAudioScreen, AcelerometroScreen, PedometroScreen, MagnetometroScreen, GyroscopioScreen } from "../screens";
import { Ionicons, Feather, AntDesign,  MaterialCommunityIcons, FontAwesome, Foundation } from "@expo/vector-icons";
import colors from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.third,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveBackgroundColor: colors.third,
        tabBarInactiveTintColor: colors.white,
      }}
    >      
      <Tab.Screen
        name="AudioVideo"
        component={VideoAudioScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="video" size={24} color={colors.white} />
          ),
        }}
      />
      <Tab.Screen
        name="Acelerometro"
        component={AcelerometroScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="car" size={24} color={colors.white} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedometro"
        component={PedometroScreen}
        options={{
          tabBarIcon: () => (
            <Foundation name="foot" size={24} color={colors.white} />
          ),
        }}
      />
       <Tab.Screen
        name="Magneto"
        component={MagnetometroScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="magnet" size={24} color={colors.white} />
          ),
        }}
      />
          <Tab.Screen
        name="Giroscopio"
        component={GyroscopioScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name= "balance-scale" size={24} color={colors.white} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}