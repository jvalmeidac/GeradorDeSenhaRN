import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import Slider from "@react-native-community/slider";
import Clipboard from "expo-clipboard";

export default function App() {
  const [senha, setSenha] = useState("");
  const [tamanho, setTamanho] = useState(5);

  function generatePassword() {
    var senha = Math.random().toString(36).slice(-tamanho);
    setSenha(senha);
  }

  function onValueChange(value) {
    setTamanho(value);
  }

  function showToast() {
    ToastAndroid.show("Senha copiada para o clipboard", ToastAndroid.SHORT);
  }

  function copyToClipboard() {
    Clipboard.setString(senha);
    showToast();
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./src/assets/logo.png")} />

      <Text style={styles.title}>{Math.round(tamanho)} caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={5}
          onValueChange={(value) => onValueChange(value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text>Gerar Senha</Text>
      </TouchableOpacity>

      {senha !== "" && (
        <View>
          <Text style={styles.info}>Clique na senha para copiá-la</Text>
          <TouchableOpacity
            style={styles.passwordBox}
            onPress={copyToClipboard}
          >
            <Text style={styles.password}>{senha}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3FF",
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
    width: "90%",
    borderRadius: 7,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    width: 150,
    height: 50,
    borderRadius: 8,
  },
  passwordBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    maxWidth: 200,
    height: 50,
    borderRadius: 8,
    padding: 10,
  },
  password: {
    fontSize: 20,
  },
  info: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
  },
});
