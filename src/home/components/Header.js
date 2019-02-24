import React,{Component} from 'react';
import {Icon, Header as Headers, Right, Left, Button} from 'native-base';
import {Text} from 'react-native';
import {withNavigation} from 'react-navigation';

class Header extends Component{
    handleIconClick(){
        //this.props.navigation.navigate('Agenda')
    }
    render(){
        return(
            <Headers style={{backgroundColor: 'skyblue'}}>
                <Left style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Button onPress={()=>this.handleIconClick()} transparent>
                    <Icon style={{marginRight: '2%', color: 'white'}} type='Feather' name={this.props.icon}/>
                    </Button>
                    <Text style={{marginRight: '3%', color: 'white', fontWeight: 'bold', fontSize: 20, fontStyle: 'italic', fontFamily: ''}}>Schedl</Text></Left>
                <Right/>
            </Headers>
        )
    }
}

export default withNavigation(Header);
