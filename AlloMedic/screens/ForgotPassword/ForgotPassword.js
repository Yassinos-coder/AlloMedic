import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable } from "react-native";
import { ForgotPasswordStyle } from "./ForgotPasswordStyle";

const ForgotPassword = () => {
  const [emailReset, setEmailReset] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SafeAreaView style={ForgotPasswordStyle.container}>
      <View style={ForgotPasswordStyle.textBox}>
        <Text style={ForgotPasswordStyle.textBoxText}>
          Veuillez saisir votre{" "}
          <Text style={{ fontWeight: "700" }}>adresse e-mail</Text> ci-dessous.
          Si le compte existe, vous recevrez un e-mail contenant le lien de
          réinitialisation dans un délai de 1 à 5 minutes. Nous vous souhaitons
          une agréable journée !
        </Text>
      </View>
      <View style={ForgotPasswordStyle.inputBox}>
        <TextInput
          style={[
            ForgotPasswordStyle.inputBoxInput,
            isFocused && ForgotPasswordStyle.focusedInput,
          ]}
          placeholder="Entrez votre email"
          value={emailReset}
          onChangeText={setEmailReset}
          keyboardType="email-address"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Pressable style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}>
          <View
            style={[
              ForgotPasswordStyle.buttonView,
              { width: 200, alignSelf: "center" },
            ]}
          >
            <Text style={ForgotPasswordStyle.buttonText}>Réinitialiser</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
