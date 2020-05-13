import React from 'react'
import {
    View, Text, TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView, ScrollView
} from 'react-native'
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik'


const handleSubmit = (values, navigation) => {
    console.log('values', values);

};


export default function SignUpScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.box}>
                <Avatar
                    size="large"
                    source={require('../assets/images/heart-icon.jpeg')}
                />
                <Text style={{ fontSize: 30, paddingTop:10 }}>Criar conta</Text>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .email()
                            .required(),
                        password: yup
                            .string()
                            .min(6)
                            .required(),
                        confirmPassword: yup
                            .string()
                            .min(6)
                            .required()
                            .test('passwords-match', 'Passwords must match ya fool', function (
                                value
                            ) {
                                return this.parent.password === value;
                            }),
                    })}
                    onSubmit={values => handleSubmit(values, navigation)}>
                    {({ handleSubmit, values, setFieldValue, isValid }) => (
                        <View>
                            <TextInput
                                style={styles.input}
                                value={values.email}
                                form
                                placeholder=" Primeiro nome"
                                placeholderTextColor='black'
                                onChangeText={text => setFieldValue('first_name', text)}
                            />
                            <TextInput
                                style={styles.input}
                                value={values.email}
                                form
                                placeholder=" Sobrenome"
                                placeholderTextColor='black'
                                onChangeText={text => setFieldValue('last_name', text)}
                            />
                            <TextInput
                                style={styles.input}
                                value={values.email}
                                form
                                placeholder=" E-mail"
                                placeholderTextColor='black'
                                onChangeText={text => setFieldValue('email', text)}
                            />

                            <TextInput
                                style={styles.input}
                                value={values.password}
                                secureTextEntry={true}
                                placeholder=" Senha"
                                placeholderTextColor='black'
                                onChangeText={text => setFieldValue('password', text)}
                            />

                            <TextInput
                                style={styles.input}
                                value={values.confirmPassword}
                                secureTextEntry={true}
                                placeholder=" Confirme a senha"
                                placeholderTextColor='black'
                                onChangeText={text => setFieldValue('confirmPassword', text)}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 25 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleSubmit}
                                    disabled={!isValid}>
                                    <Text style={styles.buttonText}>CADASTRAR</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </Formik>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6d17b0',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    scrollView:{
        marginVertical:50
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 15
    },
    input: {
        marginTop: 15,
        marginLeft: 1,
        height: 60,
        width: 300,
        fontSize: 15,
        borderRadius: 15,
        borderColor: '#f0dcff',
        backgroundColor: '#f0dcff',

    },
    button: {
        backgroundColor: '#feee35',
        height: 40,
        width: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black'
    },
})


