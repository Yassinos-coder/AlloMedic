import React, { useEffect, useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon } from '@rneui/themed';
import AccountStyles from './AccountStyles';
import CustomText from '../../Components/CustomText';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { UpdateUserData } from '../../redux/UserReducer';
import * as SecureStore from 'expo-secure-store'

const AccountSettings = () => {
  const route = useRoute();
  const dispatch = useDispatch()
  const [editEmail, setEditEmail] = useState(false);
  const [editHomeAddress, setEditHomeAddress] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [updatedInputs, setUpdatedInputs] = useState({});
  const [userData, setUserData] = useState(route.params?.userData || {});
  const [newData, setNewData] = useState({})
  const [uuid, setUUID] = useState()
  useEffect(() => {
    const intializeCmp = async () => {
      if (route.params?.userData) {
        setUserData(route.params.userData);
      }
      const uuid = await SecureStore.getItemAsync('uuid')
      setUUID(uuid)
    }
    intializeCmp()
  }, [route.params?.userData]);

  // Function to update the field in updatedInputs state
  const handleInputChange = (field, value) => {
    setUpdatedInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save changes and exit edit mode
  const saveChanges = (field) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: updatedInputs[field] || prevData[field],
    }));
    setUpdatedInputs((prev) => ({ ...prev, [field]: '' }));
  };
  const submitUpdate = (dataToUpdate) => {
    dispatch(UpdateUserData({ newData, dataToUpdate, uuid }))
  }

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
              <Input
                value={editEmail ? updatedInputs.email : userData.email}
                editable={editEmail}
                onChangeText={(value) => {
                  handleInputChange('email', value)
                  setNewData({ ...newData, email: value })
                }

                }
              />
              {editEmail && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => {
                      saveChanges('email');
                      setEditEmail(false);
                      submitUpdate('email')
                    }}
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
              <Input
                value={editHomeAddress ? updatedInputs.homeAddress : userData.homeAddress}
                editable={editHomeAddress}
                onChangeText={(value) => {
                  handleInputChange('homeAddress', value)
                  setNewData({ ...newData, HomeAddress: value })
                }}
              />
              {editHomeAddress && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => {
                      saveChanges('homeAddress');
                      setEditHomeAddress(false);
                      submitUpdate('homeAddress')
                    }}
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
              <Input
                value={editPhoneNumber ? updatedInputs.phonenumber : userData.phonenumber}
                editable={editPhoneNumber}
                onChangeText={(value) => {
                  handleInputChange('phonenumber', value)
                  setNewData({ ...newData, phonenumber: value })
                }}
              />
              {editPhoneNumber && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => {
                      saveChanges('phonenumber');
                      setEditPhoneNumber(false);
                      submitUpdate('phonenumber')
                    }}
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
                onChangeText={(value) => {
                  handleInputChange('password', value)
                  setNewData({ ...newData, password: value })
                }}
              />
              {editPassword && (
                <View style={AccountStyles.actionsOnEdit}>
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    color="#52C41A"
                    onPress={() => {
                      saveChanges('password');
                      setEditPassword(false);
                      submitUpdate('password')
                    }}
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
