import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View, TouchableOpacity,TextInput
} from 'react-native';
import Modal from "react-native-modal";
import { Button, Fab, Icon, Content } from 'native-base';
import {Calendar} from 'react-native-calendars';
import { connect } from 'react-redux';
import moment from "moment";
import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../components/Header';
import {addDate} from '../../public/redux/actions/date';

class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: 'true',
        isDateTimePickerVisible: false,
        isModalVisible: false, 
        textTitle: '', 
        textDetails: '',
        selected: moment(new Date()).format("YYYY-MM-DD"),
        btnText: 'Save',
        marked:{}
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    str = JSON.stringify(date).substr(1,10)
    this.setState({
      selected: str
    })
    this._hideDateTimePicker();
  };
  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={styles.container}>
        <Header icon="calendar"/>
        <Calendar
          style={styles.calendar}
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
        <Content style={{marginTop: '13%', backgroundColor: 'skyblue', borderRadius: 10}}>
          <View style={{flex: 3}}>
          <View style={{flexDirection:'row', alignContent: 'center'}}>
          <Text style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom:'3%', marginTop: '5%', marginLeft: '2%', marginRight: '2%'}}
              >{this.state.selected}
          </Text> 
          <Button transparent onPress={this._showDateTimePicker}>
          <Icon style={{color: 'white', paddingRight: 45, paddingTop: 20}} name="calendar" type="Ionicons"/>
          </Button>
          </View>
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
          <View style={{flexDirection: 'row', marginLeft: '-0.3%', marginTop: '3%', marginBottom: '2%'}}>
          <Button style={{width: 100, justifyContent: 'center', backgroundColor: 'white', marginRight: '1%'}} onPress={()=>this.sendData(this.state.selected)}><Text> {this.state.btnText} </Text></Button>
          <Button style={{width: 100, marginLeft: '1%',justifyContent: 'center', backgroundColor: 'white'}} onPress={()=>this.onCancelPress()}><Text> Close </Text></Button>
          </View>
          </View>
        </Content>
      </Modal>
    {/* ------------------------------------------------ */}
      <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
    {/* ------------------------------------------------ */}
      <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this._toggleModal}>
          <Icon name="share" />
      </Fab>
    </View>
    );
  }

  onCancelPress(){
    this.setState({
      textTitle: '', btnText: 'Save', textTitle: '', textDetails: ''
    })
    this.setState({ isModalVisible: !this.state.isModalVisible })
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
      textTitle: '', btnText: 'Save', textTitle: '', textDetails: ''
    })
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  async onDayPress(day) {
    this.setState({
      selected: day.dateString
    })
    await this.props.getDate.detail.map((item)=>{
      return item.date == day.dateString ? 
       this.setState({textTitle: item.details[0], btnText: 'Update', textDetails: item.details[1]})  :''
    })
  }

  onDayLongPress(day){
    // 
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