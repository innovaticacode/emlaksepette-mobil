import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "./methods/user";
import { Image } from "expo-image";

export default function ProjectPost({
  project,
  ımage,
  location,
  city,
  user,
  ProfilImage,
  ProjectNo,
  loading,
}) {
  const generateRandomColorCode = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

 
  const [randomColor,setRandomColor]=useState(null)
  useEffect(()=>{
    const RandomColor = generateRandomColorCode();
      setRandomColor(RandomColor)
  },[user])
  const navigation = useNavigation();
  const [userLogin, setuserLogin] = useState({});
  useEffect(() => {
    getValueFor("user", setuserLogin);
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          ProjectId: ProjectNo,
        })
      }
    >
      
      <View style={styles.container}>
        {
          userLogin.corporate_type ==='Emlak Ofisi' &&
          <View style={{position:'absolute',right:0,height:'50%',zIndex:1,justifyContent:'flex-end'}}>
          <View style={{backgroundColor:'white',padding:8,borderTopLeftRadius:40,borderBottomLeftRadius:40}}>
            <Text style={{color:'#EA2C2E',fontSize:14,fontWeight:'700'}}>%{project.club_rate} KOMİSYON!</Text>
          </View>
  </View>
        }
   
        <Image
          source={{ uri: ımage }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Logo ve Başlığı içeren alan */}
        <View style={styles.logoTitleContainer}>
      
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: randomColor + "CC" },
            ]}
          >
          
            <View
              style={{
                height: "40%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: ProfilImage }}
                  style={styles.logoImage}
                  contentFit="cover"
                  transition={200}
                />
              </View>
            </View>

            <View style={{ height: "60%", gap: 10 }}>
              <Text style={styles.titleText}>
                {project?.project_title?.toUpperCase()}
              </Text>
              <Text style={[styles.titleText, { fontSize: 12 }]}>
                {project.city.title}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: width > 400 ? 230 : 180,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  logoTitleContainer: {
    width: "40%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
  },
  logoContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25, // İsteğe bağlı: Yuvarlak logo için
  },
  titleContainer: {
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    opacity: 0.8,
  },
  titleText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
    textAlign: "center",
  },
});
