import { View, Text, FlatList, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { useGlobalContext } from "../context/context";

const AllNotes = ({ navigation }) => {
  const { list } = useGlobalContext();

  const rootEmptyStyle = list.length == 0 ? styles.rootEmpty : null;

  const handlePress = (id) => {
    navigation.navigate("SingleNote", {
      noteId: id,
    });
  };

  return (
    <View style={[styles.rootContainer, rootEmptyStyle]}>
      {list.length != 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <Pressable onPress={() => handlePress(itemData.item.id)}>
                <View style={styles.listItem}>
                  <Text style={styles.listItemTitle}>
                    {itemData.item.title}
                  </Text>
                  <Text style={styles.listItemText}>{itemData.item.desc}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      ) : (
        <Text style={styles.nothingText}>Nothing to show...</Text>
      )}
    </View>
  );
};

export default AllNotes;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#393E46",
    flex: 1,
    paddingBottom: 10,
  },
  rootEmpty: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#222831",
    elevation: 16,
    padding: 20,
    borderRadius: 5,
  },
  nothingText: {
    fontFamily: "font-mynerve",
    fontSize: 24,
    color: "#7E7474",
  },
  listItemText: {
    color: "white",
  },
  listItemTitle: {
    fontFamily: "font-mynerve",
    marginBottom: 10,
    color: "#C4B6B6",
    fontSize: 18,
  },
});
