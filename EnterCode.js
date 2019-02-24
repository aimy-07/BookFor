import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

class EnterCode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
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
        return (
            this.state.fontLoaded ? (
            <View style={style.body}>
                <Text style={style.titleText}>
                    {'本の共有コードを\n入力してね！'}
                </Text>
                <TextInput
                    style={style.textInput}
                    multiline={false}
                    placeholder={'共有コード'}
                    onChangeText={(inputValue) => {
                        this.setState({
                            id: inputValue
                        })
                    }}
                    />
                <Text
                    style={style.cordCheckBtn}
                    onPress={() => this.props.navigation.navigate('CordLog')}
                    >
                    過去につくった/みた本のコードをみる
                </Text>   
                
                <TouchableOpacity
                    style={style.nextBtn}
                    onPress={() => this.props.navigation.navigate('Preview', {
                        id: this.state.id,
                    })}
                    >
                    <Text style={style.nextBtnText}>
                        つぎへ
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
        justifyContent: 'center',
    },
    titleText: {
        color: '#4D4D4D',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily:'uzura'
    },
    textInput: {
        width: 240,
        backgroundColor: '#FFF1E2',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#BDBFBF',
        padding: 5,
        fontSize: 20,
        color: '#4D4D4D',
        marginTop: 20,
        marginBottom: 20,
        fontFamily:'uzura'
    },
    cordCheckBtn: {
        textAlign: 'center',
        color: '#FF2D55',
        fontSize: 14,
        marginBottom: 100,
        fontFamily:'uzura'
    },
    nextBtn: {
        width: 200,
        backgroundColor: '#FFAF90',
        borderRadius: 5,
        padding: 10,
    },
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily:'uzura'
    },
});

export default EnterCode;