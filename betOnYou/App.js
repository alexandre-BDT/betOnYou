import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Play from "./src/Play";
import BackPage from "./src/BackPage";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Play" component={Play} />
          <Stack.Screen name="BackPageShop" component={BackPage} />
          <Stack.Screen name="BackPageProfil" component={BackPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
