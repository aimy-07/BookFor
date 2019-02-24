import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, View, Text } from 'react-native';
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

class EditPreview extends React.Component {
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
    }

    render() {
        const toName = this.props.navigation.state.params.toName;
        const fromName = this.props.navigation.state.params.fromName;
        const titlePhoto = this.props.navigation.state.params.titlePhoto;
        const titleText = this.props.navigation.state.params.titleText;
        const mainPhoto = this.props.navigation.state.params.mainPhoto;
        const message = this.props.navigation.state.params.message;
        const theme = this.props.navigation.state.params.theme;

        return (
            this.state.fontLoaded ? (
            <View style={style.body}>
                <ScrollView contentContainerStyle={{width: width, padding: 20, alignItems: 'center'}}>

                    <View style={style.bookConatiner}> 
                        <View style={[style.leftPage, {backgroundColor: theme.backColor}]}> 
                            <Image style={style.logo}
                                source={{uri: 'https://user-images.githubusercontent.com/22916858/53279263-4f5f4380-3752-11e9-96a0-772d45fb6ba2.png'}}
                                />
                            <Text style={[style.text, {color: theme.textColor}]}>{'To. ' + toName}</Text>
                            <Text style={[style.text, {color: theme.textColor}]}>{'From. ' + fromName}</Text>
                        </View>
                        <View style={[style.rightPage, {backgroundColor: theme.backColor}]}> 
                            <Image
                                source={{uri: titlePhoto}}
                                style={style.titlePhoto}
                                />
                            <Text style={[style.text, {color: theme.textColor}]}>{titleText}</Text>
                        </View>
                    </View>

                    <View style={style.spacer}></View>

                    <View style={style.bookConatiner}> 
                        <View style={[style.leftPage, {backgroundColor: theme.backColor}]}> 
                            <Image
                                source={{uri: mainPhoto}}
                                style={style.mainPhoto}
                                />
                        </View>
                        <View style={[style.rightPage, {backgroundColor: theme.backColor}]}> 
                            <Text style={[style.text, {color: theme.textColor}]}>{message}</Text>
                        </View>
                    </View>

                </ScrollView>

                {/* 次へボタン */}
                <View style={style.nextBtnContainer}>
                    <TouchableOpacity
                        style={style.nextBtn}
                        onPress={() => {
                            this.props.navigation.navigate('Complete', {
                                titlePhoto,
                                titleText,
                                toName,
                                fromName,
                                mainPhoto,
                                message,
                                theme,
                            })
                        }}
                        >
                        <Text style={style.nextBtnText}>
                            つぎへ
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
        backgroundColor: 'white',
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



    spacer: {
        width: 300,
        height: 30,
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
        backgroundColor: '#FF2D55',
        borderRadius: 5,
        padding: 10,
        fontFamily:'uzura'
    },
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'uzura'
    },

});

export default EditPreview;