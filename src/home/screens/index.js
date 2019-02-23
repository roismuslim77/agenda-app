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
        btnText: 'Save',
        marked:{}
        //marked: {'2019-02-25':{marked:true},'2019-02-28':{marked:true}}
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
            this.onDayPress(date)
                this._toggleModal()
            }}
          hideArrows={false}
          onDayLongPress={(date)=>{
            this.onDayLongPress(date)
          }}
        />
    <Modal 
    isVisible={this.state.isModalVisible}
    backdropColor="transparent"
    >
      <View style={{marginTop: '2%', backgroundColor: 'skyblue', borderRadius: 10, height: '80%'}}>
        <View style={{flex: 3}}>
        <Text style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom:'3%', marginTop: '5%', marginLeft: '2%', marginRight: '50%'}}
            >{this.state.selected}
        </Text>
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
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginLeft: '-0.3%', marginTop: '2%', marginBottom: '2%'}}><Button style={{width: 100, justifyContent: 'center', backgroundColor: 'white', marginRight: '1%'}} onPress={()=>this.sendData(this.state.selected)}><Text> {this.state.btnText} </Text></Button>
        <Button style={{width: 100, marginLeft: '1%',justifyContent: 'center', backgroundColor: 'white'}} onPress={this._toggleModal}><Text> Close </Text></Button>
        </View>
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
    this.setState({
      textTitle: '', btnText: 'Save'
    })
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }
  async onDayPress(day) {
    this.setState({
      selected: day.dateString
    })
    await this.props.getDate.detail.map((item)=>{
      return item.date == day.dateString ? 
       this.setState({textTitle: item.details[0], btnText: 'Update'})  :''
    })
  }
  onDayLongPress(day){
    alert('long')
  }
}
const mapStateToProps = (state) => {
    return state
  }
export default connect(mapStateToProps)(CalendarsScreen)

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 2,
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