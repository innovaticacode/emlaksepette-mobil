import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Platform } from "react-native";

export default function Team({ teamm }) {
  console.log(teamm, "asw332d");
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0][0] + nameParts[1][0].toUpperCase();
    } else if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    } else {
      return "";
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {teamm && teamm.length > 0 ? (
        teamm.map((team, i) => (
          <View key={i} style={styles.container}>
            <View style={styles.card}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={[styles.profileImage, { borderRadius: 50 }]}>
                  <Text style={{ fontSize: 17, color: "white" }}>
                    {getInitials(team.name)}
                  </Text>
                </View>
                <View style={styles.profileName}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "grey",
                      fontWeight: "bold",
                    }}
                  >
                    {team.name}
                  </Text>
                  <Text style={{ fontSize: 9, color: "grey", left: 2 }}>
                    {team.title}
                  </Text>
                </View>
                <View style={styles.referenceCode}>
                  <Text style={{ fontSize: 9, color: "grey" }}>
                    Referans Kodu
                  </Text>
                  <Text style={{ color: "grey", fontSize: 11 }}>
                    {team.code}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text>Takım bilgisi bulunamadı</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  referenceCode: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
