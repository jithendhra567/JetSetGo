import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import NAVIGATION from './NavConts';
import Home from '../screens/home/Home';
import SplashScreen from '../screens/SplashScreen';
import Flights from '../screens/home/Flights';

const Stack = createStackNavigator();

export const MAX_SPLASH_SCREEN_TIME = 3000;

const RootNavigator = () => {
  const [showSplashScreen, setSplashScreen] = React.useState(true);

  useEffect(() => {
    startApplication();
  }, []);

  const startApplication = () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, MAX_SPLASH_SCREEN_TIME);
  };

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={NAVIGATION.HOME} component={Home} />
        <Stack.Screen name={NAVIGATION.FLIGHTS} component={Flights} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
