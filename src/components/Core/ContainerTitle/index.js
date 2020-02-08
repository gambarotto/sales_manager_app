import React from 'react';
import { View , StyleSheet} from 'react-native';
import LinerGradient from 'react-native-linear-gradient'

// import { Container } from './styles';
import Colors from '../../../styles/Colors'

export default function ContainerTitle({
    children, 
    colorOne = Colors.darkPrimaryColor,
    colorTwo = Colors.defaultPrimaryColor 
}) {
    return (
        <LinerGradient
            style={styles.containerTitle}
            colors={[colorOne, colorTwo]}>
            {children}
        </LinerGradient>
    );
}

const styles = StyleSheet.create({
    containerTitle:{
        backgroundColor:Colors.defaultPrimaryColor,
        borderRadius:8
    
      },
})