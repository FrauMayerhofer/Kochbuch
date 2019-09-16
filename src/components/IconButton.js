import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity } from 'react-native-gesture-handler';
import {icon_focused} from '../constants/TabBarStyles';

export default function IconButton(props) {
    return (
        <TouchableOpacity onPress={props.onItemPressed} 
            disabled={props.disabled}>
            <Ionicons
                style={props.style}
                name={props.name}
                size={props.size}
                color={props.color !== undefined ? props.color: icon_focused} 
            />
        </TouchableOpacity>
    )
}
