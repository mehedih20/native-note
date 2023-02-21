import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { useGlobalContext } from "../context/context";

const SingleNote = ({ route, navigation }) => {
  const { list, deleteListItem, setEditIsActive } = useGlobalContext();
  const noteId = route.params.noteId;

  const requiredNote = list.find((item) => item.id === noteId);

  const handleDelete = (id) => {
    deleteListItem(id);
    navigation.navigate("AllNotes");
  };

  const handleEdit = () => {
    setEditIsActive(true);
    navigation.navigate("AddNotes", {
      requiredNote,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: requiredNote.title,
    });
  }, [navigation]);

  return (
    <View style={styles.rootScreen}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{requiredNote.title}</Text>
        </View>
        <Text style={styles.text}>{requiredNote.desc}</Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={[styles.btnOuter, styles.marginRight]}>
          <Pressable style={styles.btnInner} onPress={handleEdit}>
            <View>
              <Text style={styles.btnText}>Edit</Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.btnOuter, styles.marginLeft]}>
          <Pressable
            style={styles.btnInner}
            onPress={() => handleDelete(requiredNote.id)}
          >
            <View>
              <Text style={styles.btnText}>Delete</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SingleNote;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: "#222831",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  title: {
    color: "#C4B6B6",
    fontSize: 20,
    borderRadius: 5,
    marginBottom: 15,
    fontFamily: "font-mynerve",
    backgroundColor: "#333",
    padding: 5,
  },
  text: {
    color: "#fff",
    fontSize: 17,
  },
  btnContainer: {
    flexDirection: "row",
    margin: 10,
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
    marginRight: 5,
  },
  marginLeft: {
    marginLeft: 5,
  },
});
