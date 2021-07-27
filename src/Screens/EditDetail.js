import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {CatListArray} from '../components/actions/LoginAction';

import { Images } from "../../src/Utils/Images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const EditDetail = ({ navigation, ...props }) => {
   const dispatch = useDispatch();

   const catListResData = useSelector(state => state.CATLIStDATA);

   const [companyName, setCompanyName] = useState('');
   const [EfaName, setEfaName] = useState('');
   const [efaValue,setEfaValue] = useState('');
   const [equity, setEquity] = useState('');
   const [quantity, setQuantity] = useState('');
   const [averageCost, setAverageCost] = useState('');
   const [investmentAmount, setInvestmentAmount] = useState('');
   const [marketValue, setMarketValue] = useState('');
   const [unrealisedPL, setUnrealisedPl] = useState('');
    const [catMainList, setCatList] = useState([]);
    const [arrayIndex, setArrayIndex] = useState('');

    //----- Page Load useEffect called to get the cat list -----//
    useEffect(() => {
            if(props && props.route && props.route.params){
                if(props.route.params.editData){
                    setCompanyName(props.route.params.editData.name);
                    setEfaName(props.route.params.editData.EFA);
                    setEfaValue(props.route.params.editData.efaValue);
                    setEquity(props.route.params.editData.equity);
                    setQuantity(props.route.params.editData.quantity);
                    setAverageCost(props.route.params.editData.averageCost);
                    setInvestmentAmount(props.route.params.editData.investmentAmount);
                    setMarketValue(props.route.params.editData.marketValue);
                    setUnrealisedPl(props.route.params.editData.unrealisedPL);
                }
                if(props.route.params){
                    setArrayIndex(props.route.params.editIndex);
                }
            }
    }, [])

    //----- This useEffect will call when catListResData > 0 -----//
    useEffect(() => {
        if(catListResData != undefined && catListResData.length > 0){
            setCatList(catListResData)
        }
    }, [catListResData])

    //----- This is Header code -----//
    const HeaderView = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.goBackArrow} style={styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleMainView}>
                    <Text style={styles.titleTextStyle}>Edit Detail</Text>
                </View>
                <View style={styles.backView}>
                <TouchableOpacity onPress={() => EditFunc()}>
                    <Text>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    //----- This function is for edit the data of a particular index of an array -----//
    const EditFunc = () => {
        const newValue = {
            name: companyName,
            EFA:EfaName,
            efaValue:efaValue,
            equity:equity,
            quantity:quantity,
            averageCost:averageCost,
            investmentAmount:investmentAmount,
            marketValue:marketValue,
            unrealisedPL:unrealisedPL,
        }
        const copyOfImages = [...catMainList];
        copyOfImages[arrayIndex] = newValue;
        dispatch(CatListArray(copyOfImages))
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
             <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            {HeaderView()}
            <View>
                <View style={styles.catNameMainView}>
                    <Text>Company Name</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter Company Name'
                        value={companyName}
                        onChangeText={(text) => setCompanyName(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>EFA</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter EFA Name'
                        value={EfaName}
                        onChangeText={(text) => setEfaName(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>EFA Value</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter EFA Value'
                        value={efaValue}
                        onChangeText={(text) => setEfaValue(text)}
                    />
                </View>

                <View style={styles.catNameMainView}>
                    <Text>Equity</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter Equity Name'
                        value={equity}
                        onChangeText={(text) => setEquity(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>Quantity</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter Quantity'
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>Average Cost</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter Average Cost'
                        value={averageCost}
                        onChangeText={(text) => setAverageCost(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>Investment Amount</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter cat breed'
                        value={investmentAmount}
                        onChangeText={(text) => setInvestmentAmount(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>Market Value</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter Market Value'
                        value={marketValue}
                        onChangeText={(text) => setMarketValue(text)}
                    />
                </View>
                <View style={styles.catNameMainView}>
                    <Text>Unrealized P/L</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter Unrealized P/L'
                        value={unrealisedPL}
                        onChangeText={(text) => setUnrealisedPl(text)}
                    />
                </View>

            </View>
        </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default EditDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    headerMainView:{
        height:55, 
        width: width, 
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 0.5,
        borderColor:'lightgrey'
    },
    backView:{
        flex:0.5, 
        alignItems:'center', 
        justifyContent:'center'
    },
    backImage:{
        height:20, 
        width:20, 
        resizeMode:'contain'
    },
    titleMainView:{
        flex:3, 
        alignItems:'center', 
        justifyContent:'center'
    },
    titleTextStyle:{
        color:'#000', 
        fontSize:18, 
        fontWeight:'600'
    },
    catNameMainView:{
        alignSelf:'center', 
        marginTop:10
    },
    catNameTextInput:{
        height:40, 
        width: width - 40, 
        backgroundColor:'#f2f2f2', 
        marginTop:5, 
        paddingHorizontal:10, 
        borderRadius:5
    },
    catDescInput:{
        height:100, 
        width: width - 40, 
        backgroundColor:'#f2f2f2', 
        marginTop:5, 
        paddingHorizontal:10, 
        borderRadius:5
    }
   
})