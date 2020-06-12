import React, { useState, useEffect } from 'react';
import { FlatList, Image, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { getProfile } from '../services/api';
import { getUserInformation } from '../services/api';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [cases, setCases] = useState({});
  const helpMessage = 'Responda o Quiz para ganhar pontos!';
  const messages = [
    'Lave sempre muito bem as mãos.',
    'Utilize álcool gel fora de casa.',
    'Tenha cuidado com os produtos em mercados.'
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const message = messages[messageIndex];
  const rotateMessages = function () {
    if (messageIndex + 1 >= messages.length) {
      setMessageIndex(0);
    }
    setMessageIndex(messageIndex + 1);
  }

  async function findProfileInformation() {
    try {
      let userinfo = await getUserInformation()
      let params = {
        points: await getProfile(),
        name: userinfo.first_name,
        lastname: userinfo.last_name,
        avatar: require('../assets/images/warning.png')
      }
      setUser(params);
    } catch (err) {
      Alert.alert('Erro ao buscar profile');
      console.log('Error', err);
    }
  }

  function fetchCases() {
    axios.get('https://api.covid19api.com/summary')
      .then(res => {
        setCases(res.data.Countries.find(x => x.CountryCode === 'BR'));
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  useEffect(function () {
    findProfileInformation();
    fetchCases();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <HeaderProfile name={user.name} lastname={user.lastname} points={user.points} avatar={user.avatar} />
        <Home
          onClick={() => rotateMessages()}
          info={cases}
          help={helpMessage}
          message={message}
          action={() => navigation.navigate("Quiz")}
        />
      </View>
    </>
  );
}

function HeaderProfile(props) {
  return (
    <View style={styles.header}>
      <Avatar
        size='large'
        rounded
        source={props.avatar}
      />
      <View style={styles.profile}>
        <Text style={styles.heading}>{props.name} {props.lastname}</Text>
        <View>
          <Text style={styles.subHeading}>{props.points} pontos</Text>
        </View>
      </View>
    </View>
  );
}

function Home(props) {
  return (
    <View style={styles.home}>
      <Top
        help={props.help}
        action={props.action}
      />
      <Bottom
        info={props.info}
      />
    </View>
  );
}

function Top(props) {
  return (
    <TouchableOpacity
      style={styles.top}
      onPress={props.action}
    >
      <Image
        style={styles.infoImg}
        source={{
          uri: 'https://cdn0.iconfinder.com/data/icons/virus-transmission-6/64/4-doctor-512.png'
        }}
      />
      <View style={styles.helpBox}>
        <Text style={styles.help}>{props.help}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Bottom(props) {
  const data = [
    { name: 'NewConfirmed', caption: 'novos confirmados' },
    { name: 'TotalConfirmed', caption: 'total confirmados' },
    { name: 'NewDeaths', caption: 'novas mortes' },
    { name: 'TotalDeaths', caption: 'total mortes' },
    { name: 'NewRecovered', caption: 'novos recuperados' },
    { name: 'TotalRecovered', caption: 'total recuperados' },
  ];
  const dateArr = new Date(props.info.Date).toLocaleDateString().split("/");
  const date = dateArr[1] + '/' + dateArr[0] + '/' + dateArr[2];
  return (
    <View style={styles.bottom}>
      <View style={styles.bottomTitle}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://cdn0.iconfinder.com/data/icons/virus-transmission-6/64/1-virus-512.png'
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Situação pandêmica do COVID-19 no Brasil</Text>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.subtitle}>Atualizado em: {date}</Text>
        <Text style={styles.subtitle}>Referência: covid19api</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <FlatList
            numColumns={2}
            data={data}
            keyExtractor={item => item.name}
            renderItem={({ item }) => {
              return (
                <View style={styles.casoBox}>
                  <Text style={styles.casoValue}>{props.info[item.name]}</Text>
                  <Text style={styles.casoCaption}>{item.caption}</Text>
                  <View style={styles.casoColor} />
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const darkPurple = '#6d17b0';
const lightPurple = '#9967bf';
const yellow = '#feee35';
const lightGray = '#f2f0f5';
const white = '#fafafa';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  top: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkPurple,
    marginBottom: 30,
  },
  bottom: {
    flex: 3,
  },
  header: {
    backgroundColor: darkPurple,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profile: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  heading: {
    color: white,
    fontSize: 22,
    paddingLeft: 10,
  },
  subHeading: {
    color: yellow,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  home: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  infoImg: {
    height: 60,
    width: 60,
    marginLeft: 40,
    marginRight: 10,
  },
  helpBox: {
    flex: 2,
  },
  help: {
    color: darkPurple,
    fontSize: 16,
    padding: 10,
  },
  bottomTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: lightPurple,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 5,
  },
  bottomContent: {
    flex: 5,
    backgroundColor: lightGray,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    color: white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10
  },
  subtitle: {
    color: 'black',
    textAlign: 'right',
    fontSize: 12,
    marginTop: 2,
    marginBottom: -2,
  },
  casoBox: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
    //borderWidth: 1,
    //borderColor: darkPurple,
    paddingVertical: 20,
    paddingHorizontal: 5,
    margin: 5,
  },
  casoColor: {
    height: 5,
    backgroundColor: lightPurple
  },
  casoValue: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  casoCaption: {
    fontSize: 14,
    paddingLeft: 10,
  },
  img: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
});
