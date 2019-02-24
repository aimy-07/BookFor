import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, Image } from 'react-native';
import { theme } from './Themes';
import { Font } from 'expo';

class SelectTheme extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme: theme.colorful,
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
                <View style={style.previewContainer}>
                    <Image
                        source={{uri: this.state.theme.img}}
                        style={style.preview}
                        />
                </View>
                <View style={style.themeBtnsContainer}>
                    <Text style={style.themeTitle}>
                        テーマ
                    </Text>
                    <ScrollView horizontal={true} style={style.scroll}>
                        <TouchableOpacity
                            style={[style.themeBtn, {backgroundColor: theme.colorful.backColor}]}
                            onPress={() => {
                                this.setState({
                                    theme: theme.colorful
                                })
                            }}
                            >
                            <Text style={{color: theme.colorful.textColor, fontFamily:'uzura'}}>誕生日</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[style.themeBtn, {backgroundColor: theme.antique.backColor}]}
                            onPress={() => {
                                this.setState({
                                    theme: theme.antique
                                })
                            }}
                            >
                            <Text style={{color: theme.antique.textColor, fontFamily:'uzura'}}>記念日</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[style.themeBtn, {backgroundColor: theme.calm.backColor}]}
                            onPress={() => {
                                this.setState({
                                    theme: theme.calm
                                })
                            }}
                            >
                            <Text style={{color: theme.calm.textColor, fontFamily:'uzura'}}>思い出</Text>
                        </TouchableOpacity>
                    </ScrollView> 
                </View>
                <View style={style.nextBtnContainer}>
                    <TouchableOpacity
                        style={style.nextBtn}
                        onPress={() => this.props.navigation.navigate('Edit', {
                            theme: this.state.theme
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
    },

    previewContainer: {
        flex: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        height: 250,
        width: 250,
    },

    themeBtnsContainer: {
        flex: 2,
        backgroundColor: '#FFF1E2',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    themeTitle: {
        textAlign: 'center',
        color: '#4F4F4E',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        fontFamily:'uzura'
    },
    scroll: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    themeBtn: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'uzura'
    },

    nextBtnContainer: {
        flex: 2,
        backgroundColor: '#FFF1E2',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextBtn: {
        width: 200,
        backgroundColor: '#FF2D55',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'uzura'
    },
});

export default SelectTheme;