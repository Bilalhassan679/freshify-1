import React, {useEffect, Component, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  LogBox,
  ImageBackground,
  StatusBar,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigatior from './src/navigation/navigation';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/Reducer';
import {ApiPost} from './src/Config/helperFunction';
import {createCartIdUrl} from './src/Config/Url';
import types from './src/Redux/type';
import getCartData from './src/Config/getCartData';
import {widthPercentageToDP} from 'react-native-responsive-screen';

function AppTwo({navigation}) {
  const {cartData} = useSelector(state => state.cartData);

  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const time = () => {
    // if (Platform?.OS == 'android') {
    //   return 5000;
    // } else {
    //   return 9000;
    // }
    return 5000;
  };

  useEffect(async () => {
    (async () => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      LogBox.ignoreAllLogs(true);
    })();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);
  let Splash_Screen = (
    <ImageBackground
      source={require('./src/images/Splash.png')}
      style={styles.SplashScreen_RootView}>
      {/* <View style={styles.SplashScreen_ChildView}>
        <Image
          source={require('./src/images/TF.png')}
          style={{width: 150, height: '100%', resizeMode: 'contain'}}
        />
      </View> */}
    </ImageBackground>
  );
  return (
    <>
      <StatusBar hidden={true} />
      {isVisible === true ? (
        Splash_Screen
      ) : (
        <NavigationContainer>
          <StackNavigatior />
        </NavigationContainer>
      )}
      <FlashMessage position="top" />
    </>
  );
}

export default AppTwo;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
