import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Image, View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Font } from 'expo';

// window size
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');


class Edit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titlePhoto: null,
            titleText: '',
            toName: '',
            fromName: '',
            mainPhoto: null,
            message: '',
            hasCameraRollPermission: null,
            fontLoaded: false,
        }
    }

    async componentWillMount() {
        // カメラロールに対するPermissionを許可
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    }

    async componentDidMount() {
        await Font.loadAsync({
          'uzura': require('./assets/fonts/uzura.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        const theme = this.props.navigation.state.params.theme;
        const inputError = 
            this.state.titlePhoto === null ||
            this.state.mainPhoto === null ||
            this.state.titleText === '' ||
            this.state.message === '' ||
            this.state.fromName === '' ||
            this.state.toName === '';

        return (
            this.state.fontLoaded ? (
            <View style={style.body}>
                <KeyboardAwareScrollView contentContainerStyle={{width: width, padding: 20, alignItems: 'center'}}>

                    {/* １ページ目 */}
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279308-ad8c2680-3752-11e9-871c-db761d4ee02b.png'}}
                        style={style.bookImage}                
                        />
                    <Text style={style.labelText}>
                        表紙写真
                    </Text>
                    {/* 写真 */}
                    {(this.state.hasCameraRollPermission && this.state.titlePhoto)
                    ? <View style={{position: 'relative'}}>
                        <Image
                            style={style.pictureFrame1}
                            source={{ uri: this.state.titlePhoto }}
                            />
                        <Text
                            style={style.deleteBtn}
                            onPress={() => {
                                this.setState({
                                    titlePhoto: null
                                })
                            }}
                            >
                            ×
                        </Text>
                      </View>
                    : <View　style={style.pictureFrame1}>
                        <TouchableOpacity
                            style={style.addPictureBtn}
                            onPress={async () => {
                                let result = await ImagePicker.launchImageLibraryAsync({
                                    allowsEditing: false,
                                    aspect: [4, 3],
                                    base64: true
                                });
                                if (!result.cancelled) {
                                    this.setState({
                                        titlePhoto: 'data:image/jpeg;base64,' + result.base64
                                    });
                                }
                            }}
                            >
                            <Text style={style.addPicturePlus}>+</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    <Text style={style.labelText}>
                        タイトル
                    </Text>
                    <TextInput
                        style={style.textInput1}
                        multiline={false}
                        onChangeText={(inputValue) => {
                            this.setState({
                                titleText: inputValue
                            }
                        )}}
                        />
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279389-44f17980-3753-11e9-87b2-c5a730ec4989.png'}}
                        style={style.line}                        
                        />

                    {/* ２ページ目 */}
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279309-b11fad80-3752-11e9-8a45-770247ce1997.png'}}
                        style={style.bookImage}                        
                        />
                    <Text
                        style={style.labelText}>
                        贈る相手の名前
                    </Text>
                    <TextInput
                        style={style.textInput1}
                        multiline={false}
                        onChangeText={(inputValue) => {
                            this.setState({
                                toName: inputValue
                            })
                        }}
                        />
                    <Text
                        style={style.labelText}>
                        贈り主の名前
                    </Text>
                    <TextInput
                        style={style.textInput1}
                        multiline={false}
                        onChangeText={(inputValue) => {
                            this.setState({
                                fromName: inputValue
                            })
                        }}
                        />
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279389-44f17980-3753-11e9-87b2-c5a730ec4989.png'}}
                        style={style.line}                        
                        />

                    {/* ３ページ目 */}
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279310-b3820780-3752-11e9-90f1-dd4668c12a86.png'}}
                        style={style.bookImage}                        
                        />
                    <Text style={style.labelText}>
                        写真
                    </Text>
                    {/* 写真 */}
                    {(this.state.hasCameraRollPermission && this.state.mainPhoto)
                    ? <View style={{position: 'relative'}}>
                        <Image
                            style={style.pictureFrame2}
                            source={{ uri: this.state.mainPhoto }}
                            />
                        <Text
                            style={style.deleteBtn}
                            onPress={() => {
                                this.setState({
                                    mainPhoto: null
                                })
                            }}
                            >
                            ×
                        </Text>
                      </View>
                    : <View　style={style.pictureFrame2}>
                        <TouchableOpacity
                            style={style.addPictureBtn}
                            onPress={async () => {
                                let result = await ImagePicker.launchImageLibraryAsync({
                                    allowsEditing: false,
                                    aspect: [3, 4],
                                    base64: true
                                });
                                if (!result.cancelled) {
                                    this.setState({
                                        mainPhoto: 'data:image/jpeg;base64,' + result.base64
                                    });
                                }
                            }}
                            >
                            <Text style={style.addPicturePlus}>+</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279389-44f17980-3753-11e9-87b2-c5a730ec4989.png'}}
                        style={style.line}                        
                        />

                    {/* ４ページ目 */}
                    <Image
                        source={{uri: 'https://user-images.githubusercontent.com/22916858/53279311-b67cf800-3752-11e9-8790-3a7f3133e8e1.png'}}
                        style={style.bookImage}                        
                        />
                    <Text style={style.labelText}>
                        メッセージ
                    </Text>
                    <TextInput
                        style={style.textInput2}
                        multiline={true}
                        onChangeText={(inputValue) => {
                            this.setState({
                                message: inputValue,
                            })
                        }}
                        />
                </KeyboardAwareScrollView>

                {/* 次へボタン */}
                <View style={style.nextBtnContainer}>
                    <TouchableOpacity
                        disabled={inputError}
                        style={inputError ? [style.nextBtn, {backgroundColor: 'gray'}] : style.nextBtn}
                        onPress={() => this.props.navigation.navigate('EditPreview', {
                            titlePhoto: this.state.titlePhoto,
                            titleText: this.state.titleText,
                            toName: this.state.toName,
                            fromName: this.state.fromName,
                            mainPhoto: this.state.mainPhoto,
                            message: this.state.message,
                            theme,
                        })}
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

    bookImage: {
        width: 300,
        height: 225,
    },

    labelText: {
        width: 300,
        color: '#878787',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 2,
        alignSelf: 'flex-start',
        fontFamily:'uzura'
    },

    pictureFrame1: {
        width: 300,
        height: 240,
        backgroundColor: '#FFF1E2',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#BDBFBF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureFrame2: {
        width: 300,
        height: 400,
        backgroundColor: '#FFF1E2',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#BDBFBF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteBtn: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        right: 10,
        fontFamily:'uzura'
    },

    addPictureBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#FFAF90',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    addPicturePlus: {
        color: '#FFAF90',
        textAlign: 'center',
        fontSize: 38,
        fontWeight: 'bold',
        position: 'relative',
        fontFamily:'uzura'
    },

    textInput1: {
        width: 300,
        backgroundColor: '#FFF1E2',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#BDBFBF',
        padding: 5,
        fontSize: 20,
        color: '#4D4D4D',
        fontFamily:'uzura'
    },
    textInput2: {
        width: 300,
        height: 200,
        backgroundColor: '#FFF1E2',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#BDBFBF',
        padding: 5,
        fontSize: 20,
        color: '#4D4D4D',
        fontFamily:'uzura'
    },

    line: {
        width: 300,
        height: 10,
        marginTop: 40,
        marginBottom: 40,
    },

    nextBtnContainer: {
        width: width,
        height: 80,
        backgroundColor: '#A8DADB',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextBtn: {
        width: 200,
        backgroundColor: '#FF2D55',
        borderRadius: 5,
        padding: 10,
    },
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'uzura'
    },

});

export default Edit;