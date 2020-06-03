import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NavigationBar() {
  const navigation = useNavigation();

  return (
    //<View style={styles.footer}>
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon={require('../assets/images/iconQuiz.png')}
        onPress={() => navigation.navigate("Quiz")}
      />
      <Appbar.Action
        icon={require('../assets/images/iconHome.png')}
        onPress={() => navigation.navigate("Home")}
      />
      <Appbar.Action
        icon={require('../assets/images/iconRanking.png')}
        onPress={() => navigation.navigate("Rank")}
      />
    </Appbar>
    //</View>
  );
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6d17b0',
    flex: 0.1,
    borderRadius: 30,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    backgroundColor: '#6d17b0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
