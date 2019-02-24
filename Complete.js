import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, AsyncStorage, Alert, Clipboard } from 'react-native';
import { fbDatabase } from './fbDatabase';
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

// uuid
const uuidv1 = require('uuid/v1')
const id = uuidv1();

class Complete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        const toName = this.props.navigation.state.params.toName;
        const fromName = this.props.navigation.state.params.fromName;
        const titlePhoto = this.props.navigation.state.params.titlePhoto;
        const titleText = this.props.navigation.state.params.titleText;
        const mainPhoto = this.props.navigation.state.params.mainPhoto;
        const message = this.props.navigation.state.params.message;
        const theme = this.props.navigation.state.params.theme;
        await fbDatabase.ref('books/' + id).set(
            {
                id,
                toName,
                fromName,
                titlePhoto,
                titleText,
                mainPhoto,
                message,
                theme,
            },
        )
            .catch((error) => {
                Alert.alert('Error : firebase error.');
            });
        
        this.setData();
        await Font.loadAsync({
            'uzura': require('./assets/fonts/uzura.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    setData = async () => {
        try {
            await AsyncStorage.setItem('C' +id, id);
        } catch(error) {
            console.log(error);
        }
        console.log('ローカル保存完了');
    }

    render() {
        const titlePhoto = this.props.navigation.state.params.titlePhoto;
        const titleText = this.props.navigation.state.params.titleText;
        const theme = this.props.navigation.state.params.theme;

        return (
            this.state.fontLoaded ? (
            <View style={style.body}>
                <View style={[style.book, {backgroundColor: theme.backColor}]}>
                    <Image
                        source={{uri: titlePhoto}}
                        style={style.photo}
                        />
                    <Text style={[style.title, {color: theme.textColor}]}>{titleText}</Text>
                </View>
                <Text style={style.text}>共有コード</Text>
                <Text
                    style={style.cord}
                    onPress={() => {
                        Clipboard.setString(id);
                        Alert.alert('コピー : ' + id)
                    }}
                    >
                    {id}
                </Text>
                <Text style={style.text}>共有コードをタップしてコピー！</Text>
                <Text style={style.text}>本を贈りたい人に教えてあげてね</Text>
                <TouchableOpacity
                    style={style.nextBtn}
                    onPress={() => {
                        this.props.navigation.popToTop();
                    }}
                    >
                    <Text style={style.nextBtnText}>
                        タイトルに戻る
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
        backgroundColor: '#FFF1E2',
        position: 'relative',
    },

    book: {
        width: 180,
        height: 240,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFBDA0',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    photo: {
        width: 140,
        height: 105,
        backgroundColor: '#FFF1E2',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFBDA0',
        marginBottom: 12
    },
    title: {
        fontSize: 12,
        color: '#4D4D4D',
        fontFamily:'uzura'
    },

    text: {
        color: '#4F4F4E',
        fontSize: 14,
        fontFamily:'uzura'
    },
    cord: {
        fontSize: 20,
        color: '#FF2E56',
        margin: 10,
        textDecorationLine: 'underline',
    },

    nextBtn: {
        width: 200,
        backgroundColor: '#A4D5D6',
        borderRadius: 5,
        padding: 10,
        position: 'absolute',
        bottom: 50,
    },
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily:'uzura'
    },
});

export default Complete;