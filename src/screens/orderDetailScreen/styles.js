import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../Reusedcomponents/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
  },
  productDetailContainer: {
    alignItems: 'center',
    marginTop: hp('3'),
    marginBottom: hp('2'),
    flexDirection: 'row',
    height: hp('15'),
    width: wp('90'),
  },
  ImageMainContainer: {
    height: hp('14'),
    width: wp('25'),
    backgroundColor: 'white',
    marginRight: wp('7'),
    marginLeft: wp('3'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailImageContainer: {
    height: hp('10'),
    width: wp('16'),
  },
  yogurtText: {
    color: color.black,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp('5'),
  },
  totalText: {
    color: color.textColor,
    fontFamily: 'Poppins-Bold',
    textAlign: 'right',
    marginLeft: 'auto',
    marginRight: wp('4'),
  },
  productPaymentMainContainer: {
    height: hp('35'),
    width: wp('90'),
  },
  paymentDetailsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('2.2'),
    color: color.black,
    paddingBottom: hp('1'),
  },
  textMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1'),
    marginTop: hp('1'),
  },
  LeftText: {
    color: color.textColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('2.2'),
  },
  rightText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('2.2'),
    color: 'gray',
  },
  totalBillContainer: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2.2'),
    color: color.textColor,
    textAlign: 'right',
  },
  priceText: {
    color: 'gray',
    fontSize: hp('2.2'),
  },
});
