import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, {useState, useEffect} from "react";
import questions from "../data/questions";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const QuizScreen = () => {
    const navigation = useNavigation();
    const data = questions;
    const totalQuestions = data.length;
    // points
    const [points, setPoints] = useState(0);

    // index of question
    const [index, setIndex] = useState(0);

    // answer Status (true/false)
    const [answerStatus, setAnswerStatus] = useState(null);

    // answers
    const [answers, setAnswers] = useState([]);

    //selected answer
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // progress bar
    const progressPercentage = Math.floor((index/totalQuestions) * 100);

    useEffect(() => {
        if (selectedAnswerIndex!== null) {
            if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {   
                setPoints((points) => points + 1);
                setAnswerStatus(true);
                answers.push({questionNumber: index + 1, answer:true});
            } else{
                setAnswerStatus(false);
                answers.push({questionNumber: index + 1, answer:false, weakWord: data[index].question});
            }
        }
    },[selectedAnswerIndex]);

    useEffect(() => {
        setSelectedAnswerIndex(null);
        setAnswerStatus(null);
    },[index]);

    useEffect(() => {
        if (index + 1 > data.length) {
            navigation.navigate("Results", {
                points: points, 
                answers: answers,
            });
        }
    },[index]);

    const currentQuestion = data[index];
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text style={{color: "white", fontSize:25}}>Choose the correct image!</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}
                    style={{padding:10,backgroundColor:"#606060",borderRadius:20}}
                >
                    <Text style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Exit</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text style={{color: "white", fontSize: 16,}}>Progress</Text>
                <Text style={{color: "white", fontSize: 16,}}>{index/totalQuestions * 100}%</Text>
            </View>

            {/* Progress Bar */}
            <View 
                style={{
                    backgroundColor: "#363636",
                    width: "95%",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 20,
                    borderRadius: 20,
                    justifyContent: "center",
                    marginTop: 5,
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <View 
                    style={{
                        backgroundColor: "#9ACDFC",
                        borderRadius: 20,
                        position: "absolute",
                        left: 0,
                        height: 20,
                        right: 0,
                        width: `${progressPercentage}%`,
                        marginTop: 20,
                    }}
                />
            </View>

            <View
                style={{
                    marginTop: 20,
                    backgroundColor: "#363636",
                    padding: 10,
                    borderRadius: 6,
                    borderColor: "#252525",
                    borderWidth: 1,
                    alignItems: "center",
                    width: "98%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                {/* Show the word */}
                <View style={{flexDirection: "row"}}>
                    <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>{currentQuestion?.question}</Text>
                    <TouchableOpacity>
                        <AntDesign style={{textAlign: "center", paddingLeft:10}} name="sound" size={25} color="#9ACDFC" />
                    </TouchableOpacity>
                </View>
                
                {/* Show the options*/}
                <View 
                    style={{ 
                        marginTop: 12,
                        flexDirection: "row",
                        flexWrap: 'wrap',
                    }}>
                    {currentQuestion?.options.map((item, index) => (
                        <TouchableOpacity 
                        onPress={() => selectedAnswerIndex === null && setSelectedAnswerIndex(index)}
                        style={{
                                    flexDirection: "row", 
                                    alignItems: "center",
                                    width: "48%", 
                                    height: 150,
                                    borderWidth:0.5,
                                    borderColor:"#252525", 
                                    marginVertical:10,
                                    marginHorizontal: "1%", 
                                    borderRadius:20, 
                                    backgroundColor: "#606060",
                            }}   
                        >
                            <Image
                                style={
                                    {
                                        width: "100%", 
                                        height: "100%",
                                        borderWidth:1,
                                        borderColor:"#252525", 
                                        borderRadius:20, 
                                    }
                                }
                                resizeMode="cover" 
                                source={item.image}
                            />
                            {selectedAnswerIndex === index && index === currentQuestion?.correctAnswerIndex ? (
                                <AntDesign style={styles.effectContainer} name="checkcircle" size={20} color="green" />
                            ) : selectedAnswerIndex!== null && selectedAnswerIndex === index ? (
                                <AntDesign style={styles.effectContainer} name="closecircle" size={20} color="red" />
                            ) : (
                                null
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View 
                style={
                    answerStatus === null 
                        ? null 
                        :   {
                                marginTop:45,
                                backgroundColor:"#363636",
                                padding:10,
                                borderRadius:7,
                                borderWidth:1,
                                borderColor: "#252525",
                                height:120,
                                width: "98%",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }
                }
            >
                {answerStatus === null ? null : (
                    <Text 
                        style={
                            answerStatus == null 
                                ? null 
                                : {color:"white",fontSize:17,textAlign:"center",fontWeight:"bold"}
                        }
                    >
                        {!!answerStatus ? "Correct! Well Done!" : "Sorry! Not quite right!"}
                    </Text>
                )}

                {answerStatus !== null && index + 1 >= questions.length ? (
                    <TouchableOpacity 
                        onPress={() => 
                            navigation.navigate("Results", {
                                points: points, 
                                answers: answers,
                            })
                        }
                        style={{
                            backgroundColor: "#606060",
                            padding: 10,
                            borderRadius: 20,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Submit</Text>
                    </TouchableOpacity>
                ) : answerStatus === null ? null : (
                    <TouchableOpacity 
                        onPress={() => setIndex(index + 1)}
                        style={{
                            backgroundColor: "#606060",
                            padding: 10,
                            borderRadius: 20,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Next Question</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C',
    },
    effectContainer: {
        textAlign: "center", 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        padding: 10, 
        marginLeft: "2%",
        marginBottom: "60%",
        position: "absolute"
    },
})