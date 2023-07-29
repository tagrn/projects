import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Alert, View, Image, TextInput, SafeAreaView, Button, SectionList } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";

// 여기 파이어 베이스 키 자리. 데이터 숨겼습니다.

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

var DATA = [
  {
    title: "example",
    data: ["example", "example", "ex"],
  },
];

var user;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function getDataInit(user) {
  firebase
    .database()
    .ref(user)
    .on("value", (snapshot) => {
      DATA = snapshot.val()
    });
}

function InputScreen({ navigation }) {
  getDataInit();
  const [userID, setID] = useState("0");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 3 }}> </Text>
      <Text style={{ fontSize: 25 }}> 사용자 ID를 입력하세요. </Text>
      <Text style={{ fontSize: 20 }}> </Text>
      <Text style={{ fontSize: 13 }}> ID 입력 </Text>
      <Text style={{ fontSize: 5 }}> </Text>
      <TextInput
        style={styles.input}
        placeholder="  여기에 입력해주세요    "
        onChangeText={(val) => setID(val)}
      />
      <Text style={{ fontSize: 17 }}> </Text>
      <Text style={{ fontSize: 10 }}> ID : {userID} </Text>
      <Text style={{ fontSize: 17 }}> </Text>
      <Button
        color="#54afe5"
        title="ID입력"
        onPress={() =>
          Alert.alert("김구브라더스", "사용자 " + userID + "로 검색할까요?", [
            {
              text: "네",
              onPress: () => {
                firebase
                  .database()
                  .ref(userID)
                  .on("value", (snapshot) => {
                    console.log(snapshot)
                    DATA = snapshot.val()
                  });
                navigation.navigate("List")
              },
            },
            { text: "아니오", onPress: () => console.log("아니오") },
          ])
        }
      ></Button>
      <Text style={{ fontSize: 15 }}> </Text>
    </SafeAreaView>
  );
}

function ListScreen({ navigation }) {
  const handlePress = () => navigation.navigate("Home")
  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={5} style={ styles.text }>
      나의 영화 리스트</Text>
      
      <Text style={{ fontSize: 20 }} >
      </Text>
      <Text style={{ fontSize: 20 }} >
      {DATA}
      </Text>
      
      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontSize: 20}}>{title}</Text>
        )}
      /> */}
      <Text numberOfLines={5} style={{ fontSize: 10 }} >
      </Text>
      <Button title="돌아가기" onPress={handlePress}/>
      <Text numberOfLines={5} style={{ fontSize: 10 }} >
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

function HomeScreen({ navigation }) {
  const handlePress = () => navigation.navigate("Input")
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/home.png")}/>
      
    
      <Text numberOfLines={5} style={{ fontSize: 40 }} >
      </Text>

      <Button title="나의 영화 리스트 보기" onPress={handlePress}/>
      {/* <Image source={require('./assets/icon.png')}/> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Input" component={InputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: "bold"
  },
  item: {
    backgroundColor: "#fff",
    padding: 3,
    width: 250,
  },
});
