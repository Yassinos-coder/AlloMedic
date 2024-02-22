import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Signup } from "../../redux/UserReducer";

const DocsUpload = () => {
  const dispatch = useDispatch()
  const route = useRoute();
  const [imageCIN, setImage] = useState([]);
  const [imageMedic, setImageMedic] = useState([]);

  const [newUser, setNewUser] = useState(route.params?.newUser);

  const uploadCINImages = async () => {
    try {
      let pickResult;
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      pickResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: true,
      });
      if (!pickResult.canceled) {
        // save image
        const newImages = pickResult.assets.map((asset) => asset.uri);
        setImage((prevImages) => [...prevImages, ...newImages]);
        setNewUser((prevUser) => ({ ...prevUser, uploaded_docs: newImages }));
        console.log(newUser);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const uploadMEDICImages = async () => {
    try {
      let pickResult;
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      pickResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: true,
      });
      if (!pickResult.canceled) {
        // save image
        const newImages = pickResult.assets.map((asset) => asset.uri);
        setImageMedic((prevImages) => [...prevImages, ...newImages]);
        setNewUser((prevUser) => ({
          ...prevUser,
          uploaded_docs: [...prevUser.uploaded_docs, ...newImages],
        }));
        console.log(newUser);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const uploadAllDataToServer = async () => {
    try {
      const formData = new FormData();

      // Append CIN images
      imageCIN.forEach((image, index) => {
        formData.append("cinImages", {
          uri: image,
          type: "image/jpeg",
          name: `cin_image_${index}.jpg`,
        });
      });

      // Append Medic images
      imageMedic.forEach((image, index) => {
        formData.append("medicImages", {
          uri: image,
          type: "image/jpeg",
          name: `medic_image_${index}.jpg`,
        });
      });

      // Append user data
      formData.append("userData", JSON.stringify(newUser));

      // Send formData to the server
      dispatch(Signup({ SignupData: formData })).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        Envoi De Documents en guise d'identification :
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Entrez votre C.I.N"
          style={styles.cinInput}
          value={newUser.cin}
          onChangeText={(text) => {
            setNewUser((prevUser) => ({
              ...prevUser,
              cin: text,
            }));
          }}
        />
      </View>
      <Pressable onPress={() => uploadCINImages()}>
        <View style={styles.buttons}>
          <Text style={styles.buttonText}>
            {" "}
            Selectionner les images de votre C.I.N{" "}
          </Text>
        </View>
      </Pressable>
      <View style={styles.cinImages}>
        {imageCIN.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.imageCard} />
        ))}
      </View>
      <Text style={styles.headerText}>
        Envoi De License, diplome ou certifications en medcine et infermerie :
      </Text>
      <Pressable onPress={() => uploadMEDICImages()}>
        <View style={styles.buttons}>
          <Text style={styles.buttonText}>
            {" "}
            Selectionner les images pour envoyer{" "}
          </Text>
        </View>
      </Pressable>
      <View style={styles.cinImages}>
        {imageMedic.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.imageCard} />
        ))}
      </View>
      <Pressable onPress={() => uploadAllDataToServer()}>
        <View
          style={[styles.buttons, { backgroundColor: "green", marginTop: 15 }]}
        >
          <Text style={styles.buttonText}> Terminer L'inscription </Text>
        </View>
      </Pressable>
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
  buttons: {
    marginTop: 5,
    width: 343,
    height: 50,
    backgroundColor: "#3A7DFF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
  cinImages: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
  },
  imageCard: {
    resizeMode: "contain",
    marginTop: 10,
    width: 150,
    height: 150,
  },
});

export default DocsUpload;
