import React from 'react';
import { View, Button, Picker, StyleSheet, Modal } from 'react-native'

const options = [
    { value: 'g', label: 'g' },
    { value: 'ml', label: 'ml' },
    { value: 'Teelöffel', label: 'Teelöffel' },
    { value: 'Esslöffel', label: 'Esslöffel' },
    { value: 'Priese', label: 'Priese' },
    { value: 'Päckchen', label: 'Päckchen' },
    { value: 'Tasse', label: 'Tasse' },
    { value: '-', label: 'keine Einheit' }
  ]

export default class Zutaten extends React.Component{
    constructor(props){
        super(props);
    }

    state={
        selectedOption: "g"
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
        backgroundColor: "white",
        //justifyContent: "flex-end",
        //alignContent: "center",
        left: 10,
        right: 10,
        bottom: 0,
        alignItems: "center",
        position: "absolute",
        paddingBottom: 30
    }
 })
        /*

         {options.map((item, index) => {
                    return <Picker.Item label = {item.label} value = {item.value} />
                })}
       
        <TextInput 
            value = {this.props.value} 
            onChangeText = {(selectedOption) => {this.setState({selectedOption: selectedOption}), this.props.onSelectOption(selectedOption)}} 
        />

        <Select 
            value = {this.props.value}
            onChange={(selectedOption) => {this.setState({selectedOption: selectedOption}), this.props.onSelectOption(selectedOption)} } 
            options={options}
        />

         <Zutaten
                    value={this.state.selectedOption} 
                    onSelectOption={(value) => {alert(value)}}
                />
        */
