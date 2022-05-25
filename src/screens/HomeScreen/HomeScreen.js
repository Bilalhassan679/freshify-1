import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../Reusedcomponents/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../HomeScreen/style';
import {InputField} from '../../Reusedcomponents/InputField/inputFeild';
import {HomeBrandAllText} from '../../Reusedcomponents/homeBrandAllText/homeBrandAllText';
import {HomeScreenAllProductData} from '../../Reusedcomponents/HomeScreenProductAllData/homeScreenAllProductData';
import {HomeScreenCategoryData} from '../../Reusedcomponents/homeScreenCategoryData/homeScreenCatergoryData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {FAB} from 'react-native-paper';
import {Fab, Icon, NativeBaseProvider, Box, extendTheme} from 'native-base';
import {ApiGet, ApiPost} from '../../Config/helperFunction';
import {
  allCategoriesUrl,
  createCartIdUrl,
  FrontProductUrl,
} from '../../Config/Url';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {LoginHeader} from '../../Reusedcomponents/loginHeader';
import getCartData from '../../Config/getCartData';
import types from '../../Redux/type';

export default function HomeScreen({navigation, route}) {
  const [allProduct, setAllProduct] = useState([]);
  const [categoryFeatureProduct, setCategoryFeatureProduct] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isCategoryloading, setIsCategoryLoading] = useState(true);
  const {cartData} = useSelector(state => state.cartData);
  const [searchHome, setSearchHome] = useState('');

  const getFrontProduct = () => {
    ApiGet(FrontProductUrl).then(res => {
      if (res.success == true) {
        setAllProduct(res.data);
        setIsLoading(false);
      } else if (res.success == false) {
        setIsLoading(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Some thing is wrong',
          backgroundColor: color.textPrimaryColor,
        });
      } else {
        setIsLoading(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Success not found',
          backgroundColor: color.textPrimaryColor,
        });
      }
    });
  };

  const getFeathureFrontProduct = () => {
    let url = allCategoriesUrl + '?is_featured=1';
    ApiGet(url).then(res => {
      if (res.success == true) {
        setCategoryFeatureProduct(res.data);
        setIsCategoryLoading(false);
      } else if (res.data == []) {
        setIsCategoryLoading(false);
        setCategoryFeatureProduct([]);
      } else if (res.success == false) {
        setIsCategoryLoading(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Some thing is wrong',
          backgroundColor: color.textPrimaryColor,
        });
      } else {
        setIsCategoryLoading(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Success not found',
          backgroundColor: color.textPrimaryColor,
        });
      }
    });
  };
  const navigation1 = item => {
    navigation.navigate('ProductDetail', item);
  };
  const navigation2 = item => {
    navigation.navigate('SubCategory', item);
  };
  const theme = extendTheme({
    components: {
      FAB: {
        baseStyle: {},
        defaultProps: {},
        variants: {},
        sizes: {},
      },
    },
  });
  const [silderData, setSliderData] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const dispatch = useDispatch();
  const createCartId = async () => {
    console.log(456789098765423456789, cartData);
    if (!cartData.id) {
      let url = createCartIdUrl;
      let body = {};
      ApiPost(url, body).then(res => {
        if (res.success == true) {
          dispatch({
            type: types.CreateCart,
            payload: res.data,
          });
        }
      });
    } else {
      console.log('kjadbfbak');
    }
  };
  useEffect(() => {
    (async () => {
      await createCartId();
      getCartData();
      getFrontProduct();
      getFeathureFrontProduct();
    })();
  }, [cartData]);
  const searchHomeProducts = () => {
    navigation.navigate('SubCategory', {
      name: searchHome,
      search: true,
    });
    setSearchHome('');
  };
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setIsCategoryLoading(true);
    setRefreshing(true);
    wait(2000).then(() => {
      getFrontProduct();
      getFeathureFrontProduct();
      setRefreshing(false);
    });
  }, []);
  return (
    <NativeBaseProvider theme={theme}>
      <View>
        <StatusBar barStyle="dark-content" />
        {/* <View style={styles.header}>
          <View style={{width: wp('20')}} />
          <View style={styles.locationText}>
            <Ionicons
              name="location-outline"
              color={color.textSecondaryColor}
              size={20}
            />
            <Text style={styles.headerText}>Delivery To</Text>
            <Text
              style={{...styles.headerText, color: color.textSecondaryColor}}>
              Gulshan-e-Iqbal, Karachi, Sindh
            </Text>
          </View>
          <View style={styles.headerArrowStyle}>
            <TouchableOpacity>
              <Ionicons name="arrow-down" color="black" size={30} />
            </TouchableOpacity>
          </View>
        </View> */}
        <LoginHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingBottom: hp('23')}}>
          <View>
            <View style={styles.search}>
              <TouchableOpacity onPress={() => searchHomeProducts()}>
                <Ionicons name="search" size={20} color={'gray'} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search fresh grocery"
                placeholderTextColor={'gray'}
                style={styles.searchInput}
                onChangeText={e => setSearchHome(e)}
                onSubmitEditing={() => searchHomeProducts()}
                value={searchHome}
                autoFocus={false}
                focusable={true}
                autoCorrect={false}
              />
            </View>
            <View
              style={{
                marginTop: hp('2'),
              }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{flexDirection: 'row'}}>
                {silderData?.length > 0 &&
                  silderData?.map(res => {
                    return <Image source={require('../../images/sale2.png')} />;
                  })}
              </ScrollView>
              <HomeBrandAllText name="Top Selling" />
              <HomeScreenAllProductData
                navigation1={navigation1}
                allProduct={allProduct}
                isloading={isloading}
              />
              <HomeBrandAllText name="Popular Deals" />
              <HomeScreenAllProductData
                navigation1={navigation1}
                allProduct={allProduct}
                isloading={isloading}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: hp('1.3')}}>
                  <HomeBrandAllText name="Categories" />
                </View>
                <TouchableOpacity
                  style={styles.viewmore}
                  onPress={() => navigation.navigate('catergoryScreen')}>
                  <Text style={{color: color.textPrimaryColor}}>View more</Text>
                </TouchableOpacity>
              </View>
              <HomeScreenCategoryData
                navigation2={navigation2}
                categoryFeatureProduct={categoryFeatureProduct}
                isCategoryloading={isCategoryloading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <Fab
        renderInPortal={false}
        shadow={2}
        style={{backgroundColor: color.textPrimaryColor}}
        fontStyle={{color: 'red'}}
        size="sm"
        label={'Track your order'}
      /> */}
    </NativeBaseProvider>
  );
}
