import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { getProfile } from '../services/api';
import { getUserInformation } from '../services/api';

export default function HomeScreen() {
  const [user, setUser] = useState({});
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
        <HomeCommon onClick={() => rotateMessages()} message={message} />
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

function HomeCommon(props) {
  return (
    <View style={styles.common}>
      <View style={styles.logoBox}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn0.iconfinder.com/data/icons/virus-transmission-6/64/8-gel-512.png',
          }}
        />
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{props.message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#6d17b0',
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
    color: 'white',
    fontSize: 22,
  },
  subHeading: {
    color: '#feee35',
    fontSize: 18,
    fontWeight: 'bold',
  },
  common: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  logoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
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
  buttonBox: {
    flex: 5,
    padding: 50,
  }
});
