import { useRoute } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import questions from "../data/questions";

const ResultsScreen = () => { 
    const route = useRoute();
    const navigation = useNavigation();
    const data = questions;
    const totalQuestions = data.length;
    
    return (
        <SafeAreaView style={{backgroundColor:"#2C2C2C",flex:1}}>
            <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between", marginHorizontal:5}}>
                <Text style={{color: "white", fontSize: 25}}>Results</Text>

            </View>

            <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between", marginVertical:10, marginHorizontal:5}}>
                <Text style={{color: "white", fontSize: 16}}>Questions Answered Correctly</Text>
                <Text style={{color: "white", fontSize: 16}}>({route.params.points}/{totalQuestions})</Text>
            </View>

            <View 
                style={{
                    backgroundColor:"#363636", 
                    maxHeight:"50%", 
                    width: "98%", 
                    borderRadius:7,
                    marginTop:20,
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                
                <View style={{alignItems:"center"}}>
                    {route.params.points === totalQuestions ? (
                        <Text style={{color:"white", fontSize:30, fontWeight:"bold", textAlign:"center", marginTop:8}}>No Weak Words! Great Job!</Text>
                    ) : (
                        <View>
                            <Text style={{color:"white", fontSize:30, fontWeight:"bold", textAlign:"center", marginTop:8}}>Weak Words:</Text>
                            <FlatList data={route.params.answers} renderItem={({item, i}) => (
                                <View style={{alignItems:"center"}}>
                                    {item.answer === false ? (
                                        <Text style={{fontSize:70, color:"white"}}>{item.weakWord}</Text>
                                    ):(null)}
                                </View>
                            )}/>
                        </View>
                    )}
                </View>

            </View>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Home')}
                style={{
                    backgroundColor:"#606060", 
                    padding:14, 
                    width:"auto", 
                    borderRadius:25, 
                    marginLeft:'auto', 
                    marginRight:"auto",
                    marginVertical: 20,
                }}
            >
                <Text style={{color:"white", fontWeight:"600", textAlign:"center", fontSize:20}}>Finish</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ResultsScreen

const styles = StyleSheet.create({})