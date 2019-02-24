import React from 'react';
import { createStackNavigator,createAppContainer } from 'react-navigation';
 
import Home from './Home';
import SelectTheme from './SelectTheme';
import Edit from './Edit';
import EditPreview from './EditPreview';
import Complete from './Complete';
import EnterCode from './EnterCode';
import CordLog from './CordLog';
import Preview from './Preview';
 

const Stack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#FFBCA5',
          borderWidth: 0,
        },
        headerBackTitle: 'ホーム',
        headerBackTitleColor: '#4F4F4E',
      }
    },
    SelectTheme: {
      screen: SelectTheme,
      navigationOptions: {
        title: 'テーマを選択',
        headerStyle: {
          backgroundColor: '#FFF1E2',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Edit: {
      screen: Edit,
      navigationOptions: {
        title: '編集',
        headerStyle: {
          backgroundColor: '#A4D5D6',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    EditPreview : {
      screen: EditPreview,
      navigationOptions: {
        title: '確認',
        headerStyle: {
          backgroundColor: '#FFAF90',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Complete : {
      screen: Complete,
      navigationOptions: {
        title: '完成！',
        headerStyle: {
          backgroundColor: '#FFAF90',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    EnterCode : {
      screen: EnterCode,
      navigationOptions: {
        title: 'コードを入力',
        headerStyle: {
          backgroundColor: '#FFCD7B',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    CordLog : {
      screen: CordLog,
      navigationOptions: {
        title: '過去のコード',
        headerStyle: {
          backgroundColor: '#FFCD7B',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Preview: {screen: Preview,
      navigationOptions: {
        title: '本を見る',
        headerStyle: {
          backgroundColor: '#FFCD7B',
        },
        headerTintColor: '#4F4F4E',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(Stack);


export default class App extends React.Component {
  render() {
    return (
      <AppContainer 
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}