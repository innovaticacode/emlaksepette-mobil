import { View, Text ,ImageBackground,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from 'react-native-vector-icons/Feather';
import PagerView from 'react-native-pager-view';
export default function DetailsPicture() {
  return (
    <View
        style={{ width: "100%", height: 250, borderRadius: 20, padding: 5}}
      >
        <ImageBackground
          source={require('./images/home.jpg')}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
        />
        <View
          style={{
            width: 50,
            height: 150,
            backgroundColor: "transparent",
            position: "absolute",
            right: 20,
            top: 43,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 20,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                justifyContent: "center",
                width: 40,
                height: 40,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Icon name="sharealt" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Icon name="hearto" size={20}  />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Icon2 name="bookmark" size={20}  />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}