import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {icon_focused} from '../constants/TabBarStyles';
import {icon_not_focused} from '../constants/TabBarStyles';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? icon_focused : icon_not_focused}
    />
  );
}
