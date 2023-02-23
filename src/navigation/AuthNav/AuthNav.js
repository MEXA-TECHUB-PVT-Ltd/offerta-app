
import * as React from 'react';
import { View, Text } from 'react-native';

///////////////////navigation prop///////////////
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import LoaderScreen from '../../screens/Auth/LoaderScreen';
import OnboardingScreen from '../../screens/Onboarding/OnboadingScreen';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
import CreateProfile from '../../screens/Auth/CreateProfile';
import ForgetPassword from '../../screens/Auth/ForgetPassword';
import Verification from '../../screens/Auth/Verification';
import ResetPassword from '../../screens/Auth/ResetPassword';

const Stack = createNativeStackNavigator();
function AuthNav() {
  return (
    <Stack.Navigator>
            <Stack.Screen name="LoaderScreen" component={LoaderScreen}
        options={{
          headerShown: false,
        }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}
        options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false,
        }} />
        <Stack.Screen name="SignUp" component={SignUp}
        options={{
          headerShown: false,
        }} />
             <Stack.Screen name="CreateProfile" component={CreateProfile}
        options={{
          headerShown: false,
        }} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword}
        options={{
          headerShown: false,
        }} />
                <Stack.Screen name="ResetPassword" component={ResetPassword}
        options={{
          headerShown: false,
        }} />
                <Stack.Screen name="Verification" component={Verification}
        options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  );
}

export default AuthNav;