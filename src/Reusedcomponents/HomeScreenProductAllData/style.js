import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {color} from '../../Reusedcomponents/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  brandText: {
    color: 'black',
    fontSize: hp('2.5'),
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('3'),
  },
  mainContainer: {
    width: wp('45'),
    borderRadius: 15,
    marginLeft: wp('3'),
    shadowColor: '#000',
    marginTop: hp('1'),
    marginBottom: hp('1'),
    paddingBottom: hp('-10'),
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 3, height: 3},
    // marginTop: hp('1'),
    shadowRadius: 3,
    elevation: 7,
    backgroundColor: 'white',
  },
  topText: {
    color: 'black',
    fontSize: hp(Platform.OS == 'ios' ? '2' : '2.2'),
    marginLeft: wp('3'),
    marginTop: hp('1.5'),
    fontWeight: 'bold',
  },
  priceText: {
    color: color.textSecondaryColor,
    fontSize: hp('1.8'),
    marginLeft: wp('3'),
    fontWeight: '600',
  },
  insideImage: {
    width: wp('28'),
    height: hp('15'),
    marginTop: hp('1'),
    marginBottom: hp('1'),
    alignSelf: 'center',
    borderRadius: 10,
  },
  addCartbutton: {
    marginLeft: 'auto',
    backgroundColor: color.textPrimaryColor,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: wp('10'),
    alignItems: 'center',
    bottom: hp('-0.2'),
    // justifyContent: 'center',
    // marginRight: wp('0.4'),
  },
  outOfStockContainer: {
    color: color.textPrimaryColor,
    textAlign: 'center',
    // marginTop: hp(''),
    marginBottom: hp('0.5'),
  },
});
