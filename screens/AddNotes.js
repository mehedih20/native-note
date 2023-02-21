import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";

const AddNotes = ({ route, navigation }) => {
  const [textTitle, setTextTitle] = useState("");
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const { editIsActive, setList, updateListItem, setEditIsActive } =
    useGlobalContext();

  const title = editIsActive ? "Edit Note" : "Add Note";

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
    if (editIsActive) {
      const note = route.params.requiredNote;
      setTextTitle(note.title);
      setText(note.desc);
      setEditId(note.id);
    }
  }, [navigation, editIsActive]);

  const handleSubmit = () => {
    const newNote = {
      title: textTitle,
      desc: text,
      id: new Date().getTime().toString(),
    };

    if (!editIsActive) {
      setList((prev) => [...prev, newNote]);
    }
    if (editIsActive) {
      updateListItem(editId, newNote);
      setEditId(null);
    }
    handleReset();
    setEditIsActive(false);
    navigation.navigate("AllNotes");
  };

  const handleReset = () => {
    if (editIsActive) {
      navigation.navigate("AllNotes");
      setEditIsActive(false);
    }
    setText("");
    setTextTitle("");
  };

  return (
    <View style={styles.rootContainer}>
      <View>
        <TextInput
          style={styles.inputTitle}
          value={textTitle}
          onChangeText={(e) => setTextTitle(e)}
          placeholder="Title"
          placeholderTextColor="#7E7474"
        />
        <TextInput
          style={styles.inputText}
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder="Enter text here"
          numberOfLines={20}
          multiline={true}
          placeholderTextColor="#7E7474"
        />
        <View style={styles.btnContainer}>
          <View style={[styles.btnOuter, styles.marginRight]}>
            <Pressable style={styles.btnInner} onPress={handleSubmit}>
              <View>
                <Text style={styles.btnText}>
                  {editIsActive ? "Update" : "Add"}
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={[styles.btnOuter, styles.marginLeft]}>
            <Pressable style={styles.btnInner} onPress={handleReset}>
              <View>
                <Text style={styles.btnText}>
                  {editIsActive ? "Cancel" : "Reset"}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20,
    backgroundColor: "#393E46",
    flex: 1,
  },
  inputTitle: {
    backgroundColor: "#222831",
    color: "#C4B6B6",
    height: 50,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
  inputText: {
    backgroundColor: "#222831",
    color: "#C4B6B6",
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    marginVertical: 20,
    textAlignVertical: "top",
  },
  btnContainer: {
    flexDirection: "row",
  },
  btnOuter: {
    flex: 1,
  },
  btnInner: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9C3D54",
    elevation: 5,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    fontFamily: "font-mynerve",
    color: "white",
  },
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
});
