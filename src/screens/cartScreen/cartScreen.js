import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {color} from '../../Reusedcomponents/color';
import {styles} from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackHeader} from '../../Reusedcomponents/Header/BackHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {NineCubesLoader, BallIndicator} from 'react-native-indicators';
import {
  allCartDataUrl,
  deleteCartUrl,
  IMAGE_BASED_URL,
  quantityControllerUrl,
} from '../../Config/Url';
import {ApiGet, ApiPost} from '../../Config/helperFunction';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import NoProductView from '../../Reusedcomponents/NoProductView/noProductView';
import getCartData from '../../Config/getCartData';

export default function cartScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [cartAllData, setCartAllData] = useState([]);
  const {cartData} = useSelector(state => state.cartData);
  const {cartDataLength} = useSelector(state => state.cartDataLength);
  console.log(8686, cartData);
  const getCartDataAll = () => {
    let url = allCartDataUrl + cartData.id;
    // let url = allCartDataUrl + '39';
    ApiGet(url).then(res => {
      if (res.success == true) {
        setCartAllData(res?.data);
        setLoading(false);
      } else if (res.data.items == []) {
        setCartAllData([]);
        setLoading(false);
      } else if (res.success == false) {
        setLoading(false);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Some thing is wrong',
          backgroundColor: color.textPrimaryColor,
        });
      } else {
        console.log(res, 56);
        setLoading(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Network Failed',
          backgroundColor: color.textPrimaryColor,
        });
      }
    });
  };
  const delCartData = id => {
    // let url = allCartDataUrl + cartData.id;
    let url = deleteCartUrl + cartData.id + '?item_id=' + id;
    console.log(url);
    ApiGet(url).then(res => {
      if (res.success == true) {
        setCartAllData(res?.data);
        setLoading(false);
        getCartData();
      } else if (res.data.items == []) {
        setCartAllData([]);
        setLoading(false);
      } else if (res.success == false) {
        setLoading(false);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Some thing is wrong',
          backgroundColor: color.textPrimaryColor,
        });
      } else {
        console.log(res, 56);
        setLoading(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Network Failed',
          backgroundColor: color.textPrimaryColor,
        });
      }
    });
  };

  useEffect(() => {
    getCartDataAll();
  }, [cartDataLength]);

  const navigate = () => {
    navigation.goBack();
  };
  return (
    <>
      <BackHeader text="My Cart" navigate={navigate} />

      <ScrollView contentContainerStyle={{paddingBottom: hp('8')}}>
        {loading ? (
          <View style={{alignSelf: 'center', marginTop: hp('20%')}}>
            <BallIndicator
              size={50}
              color={color.textPrimaryColor}
              dotRadius={10}
            />
          </View>
        ) : (
          <View
            style={{
              marginTop: hp('3'),
            }}>
            <FlatList
              data={cartAllData.items}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      ...styles.TotalMaincontainer,
                      flexDirection: 'row',
                      marginBottom: hp('3'),
                      padding: wp('2'),
                    }}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: IMAGE_BASED_URL + item?.products?.image?.url,
                      }}
                      style={styles.imageStyle}
                    />
                    <View>
                      <View style={styles.innerMainView}>
                        <Text style={styles.itemName}>
                          {item?.products?.name}{' '}
                          {item?.products?.product_sale_type?.single_qty_text}
                        </Text>
                        <TouchableOpacity
                          style={{
                            marginLeft: 'auto',
                            height: hp('3.5'),
                          }}
                          onPress={() => delCartData(item.id)}>
                          <Entypo name="cross" color={'gray'} size={20} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text style={{color: 'gray'}}>
                          Rs {item?.products?.price} x {item?.quantity}
                        </Text>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity>
                            <FontAwesome5
                              color={color.textPrimaryColor}
                              name="minus"
                              size={10}
                            />
                          </TouchableOpacity>
                          <Text style={{marginLeft: wp('1'), color: 'black'}}>
                            1
                          </Text>
                          <TouchableOpacity>
                            <MaterialIcons
                              color={color.textPrimaryColor}
                              style={{
                                marginRight: wp('-1.5'),
                              }}
                              name="add"
                              size={18}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

            {cartAllData.items.length > 0 ? (
              <View style={styles.TotalMaincontainer}>
                <View style={styles.innerTotalView}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={{...styles.totalText, marginLeft: 'auto'}}>
                    Rs {cartAllData?.total}
                  </Text>
                </View>
                <View style={{...styles.innerTotalView, marginTop: wp('-6')}}>
                  <Text style={styles.bottomTotalText}>
                    {cartAllData?.items.length} Items
                  </Text>
                  <Text style={{...styles.bottomTotalText, marginLeft: 'auto'}}>
                    (Inc of taxes)
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('checkOutScreen', cartAllData.items)
                  }
                  style={styles.processButton}>
                  <Text style={styles.processText}>Proceed To Checkout</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <NoProductView text={'No Cart Fount'} />
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
}
