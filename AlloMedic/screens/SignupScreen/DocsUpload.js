import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";

const DocsUpload = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        Envoi De Documents en guise d'identification :
      </Text>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Entrez votre C.I.N" style={styles.cinInput} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    textAlign: "left",
    fontSize: 18,
    marginVertical: 15,
  },
  inputContainer: {
    alignItems: "center",
  },
  cinInput: {
    backgroundColor: "#F1F7FC",
    color: "#999999",
    fontSize: 14,
    borderRadius: 15,
    width: 343,
    height: 50,
    paddingLeft: 20,
    marginBottom: 20,
  },
});

export default DocsUpload;
