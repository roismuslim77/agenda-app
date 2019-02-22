import React,{Component} from 'react';
import {Icon, Header as Headers, Right, Left, Button} from 'native-base';
import {Text} from 'react-native';
import {withNavigation} from 'react-navigation';

class Header extends Component{
    handleIconClick(){
        this.props.navigation.navigate('Agenda')
    }
    render(){
        return(
            <Headers style={{backgroundColor: 'skyblue'}}>
                <Left>
                    <Text style={{marginRight: '3%', color: 'white', fontWeight: 'bold'}}>Schedl</Text></Left>
                <Right>
                    <Button onPress={()=>this.handleIconClick()} transparent>
                    <Icon style={{marginRight: '2%', color: 'white'}} type='Ionicons' name={this.props.icon}/>
                    </Button></Right>
            </Headers>
        )
    }
}

export default withNavigation(Header);
