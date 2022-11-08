import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Ionicons, FontAwesome5, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import {AcelerometroScreen, PedometroScreen, MagnetometroScreen, GyroscopioScreen, VideoAudioScreen } from "../screens";


const Drawer = createDrawerNavigator();

export default function HomeRoute() {
    return (
        <Drawer.Navigator
                screenOption={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.black},
                    headerTintColor: colors.black,
                    drawerStyle: {
                        backgroundColor: colors.black,
                    },
                    drawerInactiveTintColor: colors.black,
                    drawerActiveTintColor: colors.black,
                }}
            >

            <Drawer.Screen
                name="AudioVideo"
                component={VideoAudioScreen}
                options={{
                    drawerLabel: "Áudio Vídeo",
                    drawerIcon: () => (
                        <MaterialCommunityIcons
                            name="video"
                            size={24}
                            color={colors.black}
                        />
                    ),
                }}
            /> 
            <Drawer.Screen
                name="Pedometro"
                component={PedometroScreen}
                options={{
                    drawerLabel: "Pedometro",
                    drawerIcon: () => (
                      <FontAwesome5 
                        name="shoe-prints" 
                        size={24} 
                        color="black" 
                      />
                    ),
                }}
            />  
            <Drawer.Screen
                name="Magneto"
                component={MagnetometroScreen}
                options={{
                    drawerLabel: "Magneto",
                    drawerIcon: () => (
                      <FontAwesome5 
                        name="compass" 
                        size={24} 
                        color="black" 
                      />
                  ),
                }}
            />  
            <Drawer.Screen
                name="Gyroscopio"
                component={GyroscopioScreen}
                options={{
                    drawerLabel: "Gyroscopio",
                    drawerIcon: () => (
                      <FontAwesome5 
                        name="balance-scale" 
                        size={24} 
                        color="black" 
                    />
                    ),
                }}
            />  
            <Drawer.Screen
                name="Acelerometro"
                component={AcelerometroScreen}
                options= {{
                    drawerLabel: "Acelerômetro",
                    drawerIcon: () => (
                        <MaterialCommunityIcons
                            name="speedometer"
                            size={24}
                            color={colors.black}
                        />
                    ),
                }}
            />
        
        </Drawer.Navigator>
    );
}