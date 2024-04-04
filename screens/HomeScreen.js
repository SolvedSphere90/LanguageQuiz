import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
        const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Quiz')}
                style={{
                    backgroundColor:"#606060", 
                    padding:14, 
                    width:"auto", 
                    borderRadius:25, 
                    marginLeft:'auto', 
                    marginRight:"auto",}}
            >
                <Text style={{color:"white", fontWeight:"600", textAlign:"center", fontSize: 30}}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C',
        alignItems: 'center',
        justifyContent: 'center',
      },
})