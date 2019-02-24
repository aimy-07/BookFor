import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from './lottie/title.json';
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
          'uzura': require('./assets/fonts/uzura.ttf'),
        });
        this.setState({ fontLoaded: true });
        if (this.loadingAnimation) this.loadingAnimation.play();
    }

    // componentWillUnmount() {
        // this.offValueChanged();
    // }

    // messages以下のデータの変更の監視を開始
    // onValueChanged() {
    //     fbDatabase.ref(`books`).on("value", snapshot => {
    //         console.log(snapshot.val());
    //     });
    // }

    // messages以下のデータの変更のcallbackを削除
    // offValueChanged() {
    //     if (fbDatabase.ref((`books`))) {
    //         fbDatabase.ref((`books`)).off();
    //     }
    // }

    // setData = async () => {
    //     try {
    //         await AsyncStorage.setItem('test', 'Yun');
    //     } catch(error) {
    //         console.log(error);
    //     }
    //     Alert.alert('Yunを保存成功！');
    // }
    
    // getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('test');
    //         if (value !== null) {
    //             Alert.alert(value + 'を取得成功！');
    //         } else {
    //             Alert.alert('We have no data');
    //         }
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    // removeData = async () => {
    //     try {
    //         await AsyncStorage.removeItem('test');
    //     } catch(error) {
    //         console.log(error);
    //     }
    //     Alert.alert('testを削除成功！');
    // }
    
    render() {
        return (
            this.state.fontLoaded ? (
            <View style={style.body}>

                <LottieView
                    ref={(refs) => {
                        this.loadingAnimation = refs;
                    }}
                    source={anim}
                    style={style.lottie}
                    />

                <View style={style.titleContainer}>
                    <Text style={style.title}>
                        Book for
                    </Text>
                    <Text style={style.subTitle}>
                        とくべつな日をおくろう
                    </Text>
                </View>

                <View style={style.btnsContainer}>
                    <TouchableOpacity
                        style={style.createBtn}
                        onPress={() => this.props.navigation.navigate('SelectTheme')}
                        >
                        <Text style={style.createBtnText}>
                            つくる
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.previewBtn}
                        onPress={() => this.props.navigation.navigate('EnterCode')}
                        >
                        <Text style={style.previewBtnText}>
                            みる
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            ) : null
        );
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFBCA5',
        position: 'relative',
    },

    lottie: {
        position: 'absolute',
        top: -50,
    },

    titleContainer: {
        position: 'absolute',
        top: 30,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        marginTop: 30,
        fontFamily:'uzura'
    },
    subTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        fontFamily:'uzura'
    },


    btnsContainer: {
        position: 'absolute',
        bottom: 50,
    },
    createBtn: {
        width: 200,
        backgroundColor: '#FF2D55',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FF2D55',
        padding: 10,
        marginBottom: 20,
    },
    createBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'uzura'
    },
    previewBtn: {
        width: 200,
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
    },
    previewBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'uzura'
    },
});

export default Home;