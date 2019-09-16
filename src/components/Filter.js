import React from 'react';
import { View, Button, Picker, StyleSheet, Modal } from 'react-native'

const options = [
    { value: 'asc', label: 'Name (aufsteigend)' },
    { value: 'desc', label: 'Name (absteigend)' },
    { value: 'zeit asc', label: 'Zubereitungszeit (aufsteigend)' },
    { value: 'zeit desc', label: 'Zubereitungszeit (absteigend)' },
    { value: 'counter asc', label: 'Aufrufe (aufsteigend)' },
    { value: 'counter desc', label: 'Aufrufe (absteigend)' },
    { value: 'schwierigkeit asc', label: 'Schwierigkeit (aufsteigend)' },
    { value: 'schwierigkeit desc', label: 'Schwierigkeit (absteigend)' },
    { value: 'standard', label: 'Standard' }
  ]

export default class Filter extends React.Component{
    constructor(props){
        super(props);
    }

    state={
        selectedOption: "asc"
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption});
    };

    render(){
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.isPickerVisible}
                >
                <View style={styles.modal}>
                    <Picker selectedValue = {this.state.selectedOption} 
                            style={{width: "100%"}}
                            onValueChange = {(value) => this.handleChange(value)} >

                    {options.map((item, index) => {
                            return <Picker.Item label = {item.label} value = {item.value} key={index} />
                    })}

                    </Picker>
                    <Button 
                        title={"Auswahl speichern"} 
                        onPress={()=>  this.props.onSelectOption(this.state.selectedOption)}/> 
                </View>
                </Modal>
            </View>   
        )
    }
}

const styles = StyleSheet.create({
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    },
    modal:{
        backgroundColor: 'rgba(255, 255, 255, 0.99)',
        //justifyContent: "flex-end",
        //alignContent: "center",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        position: "absolute",
        paddingBottom: 30
    }
 })
