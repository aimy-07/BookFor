import React from 'react';
import { StyleSheet, ScrollView, View, Text, AsyncStorage, Clipboard, Alert } from 'react-native';
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

class CordLog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            createBooks: [],
            readBooks: [],
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        await this.getData();
        await Font.loadAsync({
          'uzura': require('./assets/fonts/uzura.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    // setData = async () => {
    //     try {
    //         await AsyncStorage.setItem('C2870c5f0-36e9-11e9-95d7-47936b6d26b1', '2870c5f0-36e9-11e9-95d7-47936b6d26b1');
    //     } catch(error) {
    //         console.log(error);
    //     }
    //     console.log('ローカル保存完了');
    // }

    getData = async () => {
        try {
            const createBooks = [];
            const readBooks = [];
            await AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    console.log(stores)
                    stores.map((result, i, store) => {
                        if (store[i][0][0] === 'C') {
                            createBooks.push(store[i][1])
                        } else if (store[i][0][0] === 'R') {
                            readBooks.push(store[i][1])
                        }
                        this.setState({
                            createBooks,
                            readBooks,
                        })
                  });
                });
            });            
        } catch(error) {
            console.log(error);
        }
    }

    removeData = async () => {
        try {
            await AsyncStorage.clear();
            Alert.alert('削除成功！');
        }
        catch(error) {
                console.log(error);
            }
        }

    renderItems(mode) {
        if (mode === 'create') {
            if (this.state.createBooks.length === 0) {
                return null;
            }
            return this.state.createBooks.map((cord) => (
                <Text
                    key={cord}
                    style={style.createText}
                    onPress={() => {
                        Clipboard.setString(cord);
                        Alert.alert('コピー : ' + cord)
                    }}
                    >
                    {cord}
                </Text>
            ))
        } else if (mode === 'read') {
            if (this.state.readBooks.length === 0) {
                return null;
            }
            return this.state.readBooks.map((cord) => (
                <Text
                    key={cord}
                    style={style.readText}
                    onPress={() => {
                        Clipboard.setString(cord);
                        Alert.alert('コピー : ' + cord)
                    }}
                    >
                    {cord}
                </Text>
            ))
        }
    }

    render() {
        // this.removeData();
        return (
            this.state.fontLoaded ? (
            <View style={style.body}>
                <ScrollView contentContainerStyle={{width: width, padding: 20 }}> 
                <Text style={style.titleText}>
                    タップでコピーできるよ！
                </Text>
                <Text style={style.labelText}>
                    過去につくった本
                </Text>
                {this.renderItems('create')}
                <View style={style.spacer}/>
                <Text style={style.labelText}>
                    過去にみた本
                </Text>
                {this.renderItems('read')}
                </ScrollView>
            </View>
            ) : null
        );
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleText: {
        color: '#FF2D55',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        fontFamily:'uzura'
    },
    labelText: {
        color: '#4D4D4D',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily:'uzura'
    },
    createText: {
        color: '#A4D5D6',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily:'uzura'
    },
    readText: {
        color: '#FFCD7B',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily:'uzura'
    },
});

export default CordLog;