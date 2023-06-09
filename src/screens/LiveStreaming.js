import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { createAgoraRtcEngine } from "react-native-agora";

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import RtcEngine from "react-native-agora";

export default function LiveStreaming() {
  const AgoraEngine = useRef();
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState("");
  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(
      "5cf59d284e3447da910bd1ee6c032ab7"
    );
  };
  const createLive = () => {
    const engine = createAgoraRtcEngine();
    engine.initialize({ appId: "5cf59d284e3447da910bd1ee6c032ab7" });
    navigation.navigate("Live", { type: "create", channel: uuid() });
  };
  const joinLive = () =>
    navigation.navigate("Live", { type: "join", channel: joinChannel });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.joinContainer}>
        <TextInput
          value={joinChannel}
          onChangeText={setJoinChannel}
          placeholder="Enter Livestream Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={joinLive}
          disabled={joinChannel === ""}
          style={[
            styles.button,
            { backgroundColor: joinChannel === "" ? "#555555" : "#78b0ff" },
          ]}
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: "#333",
  },
  createContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  joinContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingTop: 50,
    borderTopWidth: 1,
    borderColor: "#22222255",
  },
  joinChannelInput: {
    backgroundColor: "#cccccc77",
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 17,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#78b0ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
