import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, AsyncStorage } from 'react-native';
import { fbDatabase } from './fbDatabase';
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

class Preview extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titlePhoto: '',
            titleText: '',
            toName: '',
            fromName: '',
            mainPhoto: '',
            message: '',
            theme: {},
            error: true,
            page: 1,
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        const id = this.props.navigation.state.params.id;
        await fbDatabase.ref(`books/` + id).once("value", snapshot => {
            if (snapshot.val() === null || snapshot.val() === undefined) {
                return;
            }
            this.setData(id);
            this.setState({
                titlePhoto: snapshot.val().titlePhoto,
                titleText: snapshot.val().titleText,
                toName: snapshot.val().toName,
                fromName: snapshot.val().fromName,
                mainPhoto: snapshot.val().mainPhoto,
                message: snapshot.val().message,
                theme: snapshot.val().theme,
                error: false,
            })
        });
        this.setState({ fontLoaded: true });
        await Font.loadAsync({
          'uzura': require('./assets/fonts/uzura.ttf'),
        });
    }

    setData = async (id) => {
        try {
            await AsyncStorage.setItem('R'+id, id);
            console.log('ローカル保存完了');
        } catch(error) {
            console.log(error);
        }
    }

    renderPage(page) {
        switch(page) {
        case 1:
            return (
                <View style={style.bookConatiner}> 
                    <View style={style.leftEnptyPage}></View>
                    <View style={[style.rightPage, {backgroundColor: this.state.theme.backColor}]}>
                        <Image
                            source={{uri: this.state.titlePhoto}}
                            style={style.titlePhoto}
                        />
                        <Text style={[style.text, {color: this.state.theme.textColor}]}>{this.state.titleText}</Text>
                    </View>
                </View>
            )
        case 2:
            return (
                <View style={style.bookConatiner}> 
                    <View style={[style.leftPage, {backgroundColor: this.state.theme.backColor}]}>
                        <Image
                            source={{uri: this.state.mainPhoto}}
                            style={style.mainPhoto}
                            />
                    </View>
                    <View style={[style.rightPage, {backgroundColor: this.state.theme.backColor}]}>
                        <Text style={[style.text, {color: this.state.theme.textColor}]}>{this.state.message}</Text>
                    </View>
                </View>
            )
        case 3:
            return (
                <View style={style.bookConatiner}> 
                    <View style={[style.leftPage, {backgroundColor: this.state.theme.backColor}]}>
                        <Image style={style.logo}
                            source={{uri: 'https://user-images.githubusercontent.com/22916858/53279263-4f5f4380-3752-11e9-96a0-772d45fb6ba2.png'}}
                            />
                        <Text style={[style.text, {color: this.state.theme.textColor}]}>{'To. ' + this.state.toName}</Text>
                        <Text style={[style.text, {color: this.state.theme.textColor}]}>{'From. ' + this.state.fromName}</Text>
                    </View>
                    <View style={style.rightEnptyPage}></View>
                </View>
            )
        }
        return null;
    }

    pagePlus(page) {
        switch(page) {
            case 1: return 2;
            case 2: return 3;
            case 3: return 3;
        }
    }

    pageMinus(page) {
        switch(page) {
            case 1: return 1;
            case 2: return 1;
            case 3: return 2;
        }
    }

    render() {
        return (
            this.state.fontLoaded ? (
            <View style={style.body}>
                {this.state.error
                 ?  <Text style={{fontFamily:'uzura', margin: 30}}>入力コードが間違っています</Text>
                 :  this.renderPage(this.state.page)
                } 
                {this.state.error
                 ?  null
                 :  <View style={style.btnContainer}>
                        <TouchableOpacity
                            style={style.pageBtn}
                            onPress={() => {
                                this.setState({ page: this.pageMinus(this.state.page) })
                            }}
                            >
                            <Text style={style.pageBtnText}>
                                ◀︎
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.pageBtn}
                            onPress={() => {
                                this.setState({ page: this.pagePlus(this.state.page) })
                            }}
                            >
                            <Text style={style.pageBtnText}>
                                ▶︎
                            </Text>
                        </TouchableOpacity>
                    </View>
                }   
                <TouchableOpacity
                        style={style.nextBtn}
                        onPress={() => {
                            this.props.navigation.popToTop()
                        }}
                        >
                        <Text style={style.nextBtnText}>
                            タイトルへ
                        </Text>
                    </TouchableOpacity>
            </View>
            ) : null
        );
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    bookConatiner: {
        width: 300,
        height: 225,
        flexDirection: 'row',
    },
    leftPage: {
        width: 150,
        height: 225,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 2,
        borderRightWidth: 1,
        borderColor: '#FFD7C6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightEnptyPage: {
        width: 150,
        height: 225,
        backgroundColor: 'transparent'
    },
    leftEnptyPage: {
        width: 150,
        height: 225,
        backgroundColor: 'transparent'
    },
    rightPage: {
        width: 150,
        height: 225,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 2,
        borderLeftWidth: 1,
        borderColor: '#FFD7C6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 10,
        color: '#4D4D4D',
        fontFamily:'uzura'
    },
    logo: {
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: 15,
    },
    titlePhoto: {
        width: 120,
        height: 90,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFD7C6',
        marginBottom: 10
    },
    mainPhoto: {
        width: 120,
        height: 195,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFD7C6',
    },

    btnContainer: {
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pageBtn: {
        margin: 20,
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#FFAF90',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    pageBtnText: {
        color: 'white',
        fontSize: 30,
        fontFamily:'uzura',
        position: 'relative',
        top: 5,
    },

    nextBtnContainer: {
        width: width,
        height: 80,
        backgroundColor: '#FFAF90',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextBtn: {
        width: 200,
        backgroundColor: '#A4D5D6',
        borderRadius: 5,
        padding: 10,
    },
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'uzura',
    },

});

export default Preview;