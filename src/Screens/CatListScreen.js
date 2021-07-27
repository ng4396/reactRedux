import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Animated, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CatListArray } from '../components/actions/LoginAction';
import { Images } from "../../src/Utils/Images";

//----- company == cat -----//
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
//----- Progress Bar  -----//
export const ProgressBarLine = ({ ...props }) => {
    const { progress } = props
    return (
        <View>
            <View style={styles.ProgressContainer}>
            <View style={styles.prog1}>
                    <Animated.View style={[StyleSheet.absoluteFill],
                    {
                        backgroundColor: "green",
                        borderRadius:10,
                        width: progress.toString() + '%',
                    }}
                     />
                </View>
            </View>
        </View>
    );

};

export const ProgressBarCircle = ({ ...props }) => {
    const { progressCircle } = props
    return (
        <View style={styles.progressCircle}>       
            <Animated.View style={[StyleSheet.absoluteFill], 
            {
               marginTop: 10,
               height: 100,
               width: 100,
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 100 / 2,
               borderWidth: 15,
               position:'absolute',
               borderLeftColor:'#4db8ff',
               borderRightColor:'transparent',
               borderBottomColor: 'transparent',
               borderTopColor:'transparent'
               
            }} />
           
        </View>
    );

};

export const CatListScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const catListResData = useSelector(state => state.CATLIStDATA);

    const [catMainList, setCatList] = useState([]);
    const [uiRender, setUiRender] = useState(false);

    //----- CompanyList res Useeffect called -----//
    useEffect(() => {
        if (catListResData != undefined && catListResData.length > 0) {
            setCatList(catListResData)
        }
    }, [catListResData])

    //----- This is header view code -----//
    const HeaderView = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.backView}>
                    <TouchableOpacity>
                        <Image source={Images.menuIcon} style={styles.backImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleMainView}>
                    <Text style={styles.titleTextStyle}>INVESTMENT PLANS</Text>
                </View>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddCatDetail')}>
                        <Image source={Images.addIcon} style={styles.backImage} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //----- This is delete function -----//
    const deleteItemFunc = (getData) => {
        const index = catMainList.indexOf(getData);
        catMainList.splice(index, 1);
        dispatch(CatListArray(catMainList))
        setUiRender(!uiRender)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {HeaderView()}
                <ScrollView>
                    <View style={styles.mainBox}>
                        <Text style={styles.protfolio}>Portfolio</Text>
                        <View style={styles.progressCircleMain}>
                            <ProgressBarCircle progressCircle={80} />
                            <View style={styles.ProgressCircleImage}>
                                <View style={styles.proCirView1}>
                                    <View style={styles.squareBox1}></View>
                                    <Text style={styles.boxTxt}>Mutual Funds</Text>
                                </View>
                                <View style={styles.proCirView1}>
                                    <View style={styles.squareBox2}></View>
                                    <Text style={styles.boxTxt}>ETF's</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        catMainList && catMainList.length > 0 ? (
                            <View>
                                {catMainList.map((catItem, catIndex) => (
                                    <View style={styles.mainBox}>
                                        <View style={styles.headerBox}>
                                            <View>
                                                <Text style={styles.logoTxt}>iShares</Text>
                                                <Text style={styles.hederTxt}>{catItem.name}</Text>
                                                <Text style={styles.logoTxt2}>{catItem.equity}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.companyHeader}>{catItem.EFA}</Text>
                                                <Text style={styles.companyHeaderValue}>${catItem.efaValue}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.QuantityBox}>
                                            <View>
                                                <Text style={styles.quantityHeader}>Quantity</Text>
                                                <Text style={styles.quantityValue}>{catItem.quantity}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.quantityHeader}>Avg.Cost</Text>
                                                <Text style={styles.quantityValue}>${catItem.averageCost}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.quantityHeader}>Investment Amount</Text>
                                                <Text style={styles.quantityValue}>${catItem.investmentAmount}</Text>
                                            </View>

                                        </View>
                                        <View style={styles.secondBox}>
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.marketValueBox}>
                                                    <View style={styles.marketBox}>
                                                        <Text style={styles.marketHeaderTxt}>Market Value</Text>
                                                        <Text style={styles.marketValueTxt}>${catItem.marketValue}</Text>
                                                    </View>
                                                    <View style={styles.marketBox}>
                                                        <Text style={styles.percentageValue}>% if Portfolio value</Text>
                                                        <Text style={styles.perctTxt}>40%</Text>
                                                    </View>
                                                    <ProgressBarLine progress={50} />
                                                </View>
                                                <View style={styles.marketValueBox}>
                                                    <View style={styles.marketBox}>
                                                        <Text style={styles.marketHeaderTxt}>Unrealized P/L</Text>
                                                        <Text style={styles.marketValueTxt}>${catItem.unrealisedPL}</Text>
                                                    </View>
                                                    <View style={styles.marketBox}>
                                                        <Text style={styles.percentageValue}>% return</Text>
                                                        <Text style={styles.perctTxt}>40%</Text>
                                                    </View>
                                                    <ProgressBarLine progress={80} />
                                                </View>
                                            </View>
                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity style={styles.buyBtn}><Text style={styles.buyTxt}>BUY</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.buyBtn}><Text style={styles.buyTxt}>SELL</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={styles.editDeleteView}>
                                            <TouchableOpacity onPress={() => navigation.navigate('EditDetail', { editData: catItem, editIndex: catIndex })}>
                                                <Image source={Images.editIcon} style={styles.editDeleteImageStyle} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteItemFunc(catItem)}>
                                                <Image source={Images.deleteIcon} style={[styles.editDeleteImageStyle, { marginLeft: 15 }]} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ) : null
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default CatListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6'
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
    ListMainTouchable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderColor: '#000',
        borderBottomWidth: 0.5,
    },
    nameDescMainView: {
        justifyContent: 'center',
        marginLeft: 10
    },
    nameBreedMainViewe: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    breedTextStyle: {
        color: 'lightgrey',
        fontSize: 11,
        marginLeft: 10
    },
    descTextStyle: {
        color: 'grey',
        fontSize: 12,
        width: width / 2 + 85
    },
    editDeleteView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    editDeleteImageStyle: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    mainBox: {
        width: '95%',
        margin: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 3,
        shadowColor: '#cccccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        borderColor: '#0000000D',
        borderWidth: 0.3
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoTxt: {
        color: '#88cc00',
        fontSize: 24,
        fontWeight: 'bold'
    },
    hederTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    logoTxt2: {
        fontSize: 10
    },
    companyHeader: {
        fontSize: 18,
        color: '#8A8A8A',
        textAlign: 'center'
    },
    companyHeaderValue: {
        fontSize: 20,
        color: '#2eb8b8',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    QuantityBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e6e6e6',
        padding: 5,
        paddingHorizontal: 20,
        marginTop: 5
    },
    quantityHeader: {
        color: '#8A8A8A',
        fontSize: 10
    },
    quantityValue: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    secondBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    marketValueBox: {
        paddingHorizontal: 10,
        backgroundColor: '#e6e6e6',
        padding: 5,
        marginTop: 5,
    },
    marketBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    marketHeaderTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    marketValueTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    percentageValue: {
        color: '#8A8A8A',
        fontSize: 12
    },
    perctTxt: {
        fontWeight: 'bold',
        fontSize: 12
    },
    buttonContainer: {
        justifyContent: 'space-around',
        marginHorizontal: 5
    },
    buyBtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ff9933',
        padding: 15,
        paddingHorizontal: 15
    },
    buyTxt: {
        color: '#ff9933'
    },
    circleContainer: {
        height: 200,
        width: 200,
        borderColor: '#F9F9FD',
        borderWidth: 12,
        borderRadius: 100,
        alignSelf: 'center',
        // marginTop:h(5),
        justifyContent: 'center'
    },
    progressCircle: {
        marginTop: 10,
        height: 100,
        width: 100,
        justifyContent: 'center',
        borderColor: '#608000',
        alignItems: 'center',
        borderRadius: 100 / 2,
        borderWidth: 15
    },
    progressCircleFilled:{
        marginTop: 10,
        height: 100,
        width: 100,
        justifyContent: 'center',
        borderColor: 'red',
        alignItems: 'center',
        borderRadius: 100 / 2,
        borderWidth: 15,
        position:'absolute'
    },
    protfolio: {
        fontSize: 20
    },
    ProgressCircleImage: {
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    progressCircleMain: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    proCirView1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    squareBox1: {
        backgroundColor: '#4db8ff',
        height: 15,
        width: 15,
        alignSelf: 'center',
    },
    squareBox2: {
        backgroundColor: '#608000',
        height: 15,
        width: 15,
        alignSelf: 'center',
    },
    boxTxt: {
        color: '#8A8A8A',
        fontSize: 16,
        padding: 10
    },
    ProgressContainer: {
        marginTop: 10,
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden',

    },
    prog1: {
        flexDirection: 'row',
        height: 4,
        backgroundColor: '#00000014',

    },
    AnimatedProg: {
        backgroundColor: "green",
        borderRadius: 10,
    }







})