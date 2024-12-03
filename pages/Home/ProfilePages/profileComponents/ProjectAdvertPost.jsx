import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Entypo";
import { frontEndUri } from "../../../../components/methods/apiRequest";
import { Platform } from "react-native";

export default function ProjectAdvertPost({ Onpress, project }) {
  const [status, setStatus] = useState(project.status);
  const apiUrl = "http://192.168.18.31:8000/";
  const { width, height } = Dimensions.get("window");
  return (
    <View style={[style.card, { gap: 5 }]}>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        <View
          style={{
            backgroundColor: "grey",
            width: 90,
            height: 80,
            borderRadius: 5,
          }}
        >
          <ImageBackground
            source={{
              uri: apiUrl + project.image.replace("public", "storage"),
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            borderRadius={5}
          />
          <View style={{ paddingTop: 2, paddingBottom: 2 }}>
            <Text style={{ color: "grey", fontSize: 9, fontWeight: "600" }}>
              İlan No: {project.id + 1000000}
            </Text>
          </View>
        </View>
        <View>
          <View style={{ gap: 0 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "80%" }}>
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: "#333" }}
                  numberOfLines={1}
                >
                  {project.project_title}
                </Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    Onpress(project.id, project.project_title);
                  }}
                >
                  <Icon2 name="dots-three-vertical" size={20} color={"#333"} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{ fontSize: 10, color: "grey", fontWeight: "600" }}>
              {project?.city?.title} / {project?.county?.ilce_title} /{" "}
              {project?.neighbourhood?.mahalle_title}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ paddingTop: 4, gap: 2 }}>
              <Text style={{ fontSize: 10, fontWeight: "600", color: "#333" }}>
                İlan Sayısı: {project?.room_count}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "600", color: "#333" }}>
                Onaydaki Siparişler: {project?.paymentPending}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "600", color: "#333" }}>
                Satışa Açık Adet: {project?.paymentPending}
              </Text>
            </View>
            <View style={{ paddingTop: 4, gap: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: "600", color: "#333" }}>
                Satış Adeti: {project?.cartOrders}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "600", color: "#333" }}>
                Satışa Kapalı: {project?.offSale}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingTop: 10,
          gap: 7,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="heart" color={"red"} size={15} />
          <Text style={{ color: "grey", fontSize: 12 }}>
            {project?.favorite_count}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="bookmark" color={"#333"} size={13} />
          <Text style={{ color: "grey", fontSize: 12 }}>
            {project?.sharer_links_count}
          </Text>
        </View>
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="eye" color={"grey"} size={16} />
          <Text style={{ color: "grey", fontSize: 12 }}>100 </Text>
        </View> */}
        <View>
          {status == 0 && (
            <Text style={{ fontSize: 13, color: "#B81900", fontWeight: "500" }}>
              Pasif
            </Text>
          )}
          {status == 1 && (
            <Text style={{ fontSize: 13, color: "#27B006" }}>Yayında</Text>
          )}
          {status == 2 && (
            <Text style={{ fontSize: 13, color: "#E57809" }}>
              Admin Onayı Bekliyor
            </Text>
          )}
          {status == 3 && (
            <Text style={{ fontSize: 13, color: "#B81900", fontWeight: "500" }}>
              Reddedildi
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const style = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

// <TouchableOpacity>
// <View style={style.container}>
//  <View style={style.Post}>
//         <View style={style.Image}>

//             <ImageBackground source={{uri : frontEndUri  +  project.image.replace('public','storage')}} style={{width:'100%',height:'100%'}} resizeMode='cover' />
//         </View>

//         <View style={style.CaptionAndInfo}>
//         <View style={{position:'absolute',zIndex:1,right:0,}}>
//             <Text style={{fontSize:10}}>İlan No: {project.id + 1000000}</Text>

//             </View>
//             <View style={{position:'absolute',zIndex:1,right:0,top:20}}>
//             <TouchableOpacity onPress={() => {Onpress(project.id,project.project_title)}}>
//              <Icon2 name='dots-three-vertical' size={18}/>
//              </TouchableOpacity>
//             </View>
//                 <View style={style.Caption}>
//                     <Text style={{
//                         fontSize:16,
//                         color:'#141824',
//                         fontWeight:'400',

//                     }}>{project.project_title}</Text>
//                     <View style={{flexDirection:'row'}}>
//                         <Icon name='location' size={11}/>
//                         <Text style={{fontSize:10}}>İstanbul / Kartal / Cevizli</Text>
//                     </View>

//                     <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
//                     <Text style={{fontSize:12,bottom:5}}>İlan Sayısı {project.room_count}</Text>
//                     {status==0 &&  <Text style={{bottom:5,fontSize:13,color:'#B81900',fontWeight:'500'}}>Pasif</Text> }
//                     {status==1 &&    <Text style={{bottom:5,fontSize:13,color:'#27B006'}}>Yayında</Text>}
//                     {status==2 &&  <Text style={{bottom:5,fontSize:13,color:'#E57809'}}>Admin Onayı Bekliyor</Text> }
//                     {status==3 && <Text style={{bottom:5,fontSize:13,color:'#B81900',fontWeight:'500'}}>Reddedildi</Text>  }
//                     {/* {
//                        status==0
//                      :

//                     }
//                     */}
//                     </View>

//                 </View>

//         </View>
//  </View>
// </View>
// </TouchableOpacity>
