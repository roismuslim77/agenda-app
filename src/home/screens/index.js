import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View, TouchableOpacity,TextInput
} from 'react-native';
import Modal from "react-native-modal";
import { Button } from 'native-base';
import {Calendar} from 'react-native-calendars';
import { connect } from 'react-redux'

import Header from '../components/Header';
import {addDate} from '../../public/redux/actions/date';

class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalVisible: false, 
        textTitle: '', 
        textDetails: '',
        selected: '',
        marked:{}
        // marked: {'2019-02-25':{marked:true},'2019-02-28':{marked:true}}
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });
  componentDidMount(){
    this.props.getDate.detail.map((item)=>{
        this.setState({
          marked: {
                  ...this.state.marked,
                  [item.date]:{marked:true}
              }
        })
    })
  }
  render() {
      console.log(this.state.marked)
    return (
      <View style={styles.container}>
        <Header icon="list"/>
        <Calendar
          style={styles.calendar}
          current={'2019-02-22'}
          firstDay={1}
          //markedDates={this.renderItem()}
          markedDates={this.state.marked}
          // disabledByDefault={true}
          onDayPress={(date) =>{
                this._toggleModal()
                this.onDayPress(date)
            }}
          hideArrows={false}
        />
    <Modal 
    isVisible={this.state.isModalVisible}
    backdropColor="transparent"
    >
      <View style={{ backgroundColor: 'skyblue', borderRadius: 10, height: 400}}>
        <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 1, marginTop: '3%', marginLeft: '2%', marginRight: '2%'}}
            onChangeText={(textTitle) => this.setState({textTitle})}
            value={this.state.textTitle}
            placeholder="Title"
        />
        <TextInput
            style={{ maxHeight:150, borderBottomColor: 'white', borderBottomWidth: 1, marginTop: '2%', marginLeft: '2%', marginRight: '2%'}}
            onChangeText={(textDetails) => this.setState({textDetails})}
            value={this.state.textDetails}
            multiline={true}
            placeholder="Details"
        />
        <Text style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom:'3%', marginTop: '5%', marginLeft: '2%', marginRight: '50%'}}
            >{this.state.selected}</Text>
        <Button primary onPress={()=>this.sendData(this.state.selected)}><Text> Save </Text></Button>
      </View>
    </Modal>
  </View>
    );
  }
  sendData(value){
    let data = {date:this.state.selected, details:[this.state.textTitle,this.state.textDetails]}
    this.props.dispatch(addDate(data))
    this.setState({
        marked: {
            ...this.state.marked,
            [this.state.selected]:{marked:true,}
        }
    })
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}
const mapStateToProps = (state) => {
    return state
  }
export default connect(mapStateToProps)(CalendarsScreen)

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: '100%'
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});