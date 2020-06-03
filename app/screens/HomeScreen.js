import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { getProfile } from '../services/api';
import { getUserInformation } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});
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
        avatar: require('../assets/images/snack-icon.png')
      }
      setUser(params);
    } catch (err) {
      Alert.alert('Erro ao buscar profile');
      console.log('Error', err);
    }
  }

  useEffect(function () {
    findProfileInformation();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <HeaderProfile name={user.name} lastname={user.lastname} points={user.points} avatar={user.avatar} />
        <Home
          onClick={() => rotateMessages()}
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
        message={props.message}
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
  return (
    <View style={styles.bottom}>
    {/*
      <View style={styles.imgBox}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://cdn0.iconfinder.com/data/icons/virus-transmission-6/64/8-gel-512.png',
          }}
        />
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{props.message}</Text>
      </View>
      */}
    </View>
  );
}

const darkPurple = '#6d17b0';
const yellow = '#feee35';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
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
    color: '#fafafa',
    fontSize: 22,
  },
  subHeading: {
    color: '#feee35',
    fontSize: 18,
    fontWeight: 'bold',
  },
  home: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  top: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkPurple,
    marginBottom: 15,
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
  bottom: {
    flex: 3,
    flexDirection: 'row',
  },
  imgBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 100,
    width: 100,
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#6d17b0',
    fontSize: 22,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#6d17b0',
  },
});
