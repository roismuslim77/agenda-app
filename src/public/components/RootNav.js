import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../../home/screens';
import AgendaScreen from '../../agenda/screen';

const RootNav = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Agenda: {
        screen: AgendaScreen
    }
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})

export default createAppContainer(RootNav);