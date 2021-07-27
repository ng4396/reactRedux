import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { AddCatData, CatListArray } from '../components/actions/LoginAction';

import { Images } from "../../src/Utils/Images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const AddCatDetail = ({ navigation, ...props }) => {
    const dispatch = useDispatch();

    const catListResData = useSelector(state => state.CATLISTRES);
    const catGetListRes = useSelector(state => state.CATLIStDATA);

    const [companyName, setCompanyName] = useState('');
    const [EfaName, setEfaName] = useState('');
    const [efaValue, setEfaValue] = useState('');
    const [equity, setEquity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [averageCost, setAverageCost] = useState('');
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [marketValue, setMarketValue] = useState('');
    const [unrealisedPL, setUnrealisedPl] = useState('');
    const [catArray, setCatArray] = useState([]);

    //----- Page Load useEffect called to get the cat list -----//
    useEffect(() => {
        setCatArray([]);
        setCompanyName('');
        setEfaName('');
        setEfaValue('');
        setEquity('');
        setQuantity('');
        setAverageCost('');
        setInvestmentAmount('');
        setMarketValue('');
        setUnrealisedPl('');
    }, [])

    //----- This useeffect call when there is catGetListRes -----//
    useEffect(() => {
        let array = [];
        if (catGetListRes != undefined && catGetListRes != '') {
            array.push(...catGetListRes)
        }
        setCatArray(array)
    }, [catGetListRes])

    //----- This useeffect call when adding the data -----//
    useEffect(() => {
        let arrayRe = [];
        if (catListResData != undefined && catListResData != '') {
            arrayRe.push(catListResData)
            setCatArray(catArray.push(catListResData))
            dispatch(CatListArray(catArray))
            navigation.goBack()
            dispatch(AddCatData(''))
        }
    }, [catListResData])

    //----- This is header view code -----//
    const HeaderView = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={Images.goBackArrow} style={styles.backImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleMainView}>
                    <Text style={styles.titleTextStyle}>Add Cat Detail</Text>
                </View>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => addCatFunc()}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //----- This function is to call dispatch method of AddCatData -----//
    const addCatFunc = () => {
        const sendData = {
            name: companyName,
            EFA: EfaName,
            efaValue: efaValue,
            equity: equity,
            quantity: quantity,
            averageCost: averageCost,
            investmentAmount: investmentAmount,
            marketValue: marketValue,
            unrealisedPL: unrealisedPL,
            
        }
        dispatch(AddCatData(sendData))
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    {HeaderView()}
                    <ScrollView>
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
                                placeholder='Enter Investment Amount'
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
                    </ScrollView>
                </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
    )
}

export default AddCatDetail;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerMainView: {
        height: 55,
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey'
    },
    backView: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    titleMainView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTextStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
    },
    catNameMainView: {
        alignSelf: 'center',
        marginTop: 10
    },
    catNameTextInput: {
        height: 40,
        width: width - 40,
        backgroundColor: '#f2f2f2',
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    catDescInput: {
        height: 100,
        width: width - 40,
        backgroundColor: '#f2f2f2',
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    }

})