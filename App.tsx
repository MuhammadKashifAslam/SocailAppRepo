
import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import reduxStore from './src/store/saga/reduxStore';
import RNBootSplash from 'react-native-bootsplash';
import { StoreProvider } from './src/store'; // Import MobX StoreProvider
import AppNavigator from './src/screens/navigation/AppNavigator';
import NetInfo from '@react-native-community/netinfo';
import FlashMessage, { showMessage } from 'react-native-flash-message';

enableScreens();

const App = () => {

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        showMessage({
          message: "No Internet Connection",
          description: "Please connect to the internet.",
          type: "danger",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    RNBootSplash.hide();  // Hide the splash screen
  }, []);
  return (
    <SafeAreaProvider>
      <ReduxProvider store={reduxStore}>
        <StoreProvider>
          <AppNavigator />
          <FlashMessage position="top" />
        </StoreProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;

