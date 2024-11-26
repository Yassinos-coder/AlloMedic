import React, { useState } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';
import AccountStyles from './AccountStyles';
import CustomText from '../../Components/CustomText';

const AccountSettings = () => {
  const userData = useSelector((state) => state.UserReducer.userData);
  const [editEmail, setEditEmail] = useState(false);
  const [editHomeAddress, setEditHomeAddress] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editPassword, setEditPassword] = useState(false);


  const [updatedInputs, setUpdatedInputs] = useState({})
  console.log(userData)

  return (
    <SafeAreaView style={AccountStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
          <View style={AccountStyles.ActionsView}>
            <CustomText> Cliquez sur le champ que vous souhaitez modifier </CustomText>

            {/* Email Section */}
            <Pressable
              style={AccountStyles.pressableEdits}
              onPress={() => setEditEmail(!editEmail)}
            >
              <CustomText> Modifier votre adresse email </CustomText>
              <Input value={editEmail ? updatedInputs.email : userData.email} editable={editEmail} />
              {editEmail && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => setEditEmail(false)}
                  />
                  <Icon
                    name="closecircle"
                    type="antdesign"
                    color="#FF4D4F"
                    onPress={() => setEditEmail(false)}
                  />
                </View>
              )}
            </Pressable>

            {/* Home Address Section */}
            <Pressable
              style={AccountStyles.pressableEdits}
              onPress={() => setEditHomeAddress(!editHomeAddress)}
            >
              <CustomText> Modifier votre Adresse Domicile </CustomText>
              <Input value={editHomeAddress ? updatedInputs.homeAddress : userData.homeAddress} editable={editHomeAddress} />
              {editHomeAddress && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => setEditHomeAddress(false)}
                  />
                  <Icon
                    name="closecircle"
                    type="antdesign"
                    color="#FF4D4F"
                    onPress={() => setEditHomeAddress(false)}
                  />
                </View>
              )}
            </Pressable>

            {/* Phone Number Section */}
            <Pressable
              style={AccountStyles.pressableEdits}
              onPress={() => setEditPhoneNumber(!editPhoneNumber)}
            >
              <CustomText> Modifier votre Numero de Telephone </CustomText>
              <Input value={editPhoneNumber ? updatedInputs.phonenumber : userData.phonenumber} editable={editPhoneNumber} />
              {editPhoneNumber && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => setEditPhoneNumber(false)}
                  />
                  <Icon
                    name="closecircle"
                    type="antdesign"
                    color="#FF4D4F"
                    onPress={() => setEditPhoneNumber(false)}
                  />
                </View>
              )}
            </Pressable>

            {/* Password Section */}
            <Pressable
              style={AccountStyles.pressableEdits}
              onPress={() => setEditPassword(!editPassword)}
            >
              <CustomText> Modifier votre Mot de passe </CustomText>
              <Input
              value={editPassword ? updatedInputs.password : '*********'}
                editable={editPassword}
                secureTextEntry={true}
                keyboardType="visible-password"
              />
              {editPassword && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => setEditPassword(false)}
                  />
                  <Icon
                    name="closecircle"
                    type="antdesign"
                    color="#FF4D4F"
                    onPress={() => setEditPassword(false)}
                  />
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountSettings;
