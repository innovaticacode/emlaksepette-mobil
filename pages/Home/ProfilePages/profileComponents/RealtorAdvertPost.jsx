import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Entypo";
import { frontEndUriBase } from "../../../../components/methods/apiRequest";
import { Platform } from "react-native";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";
export default function RealtorAdvertPost({ Onpress, housing }) {
  const [parsedImage, setParsedImage] = useState(null);

  useEffect(() => {
    if (housing?.housing_type_data) {
      try {
        const parsedData = JSON.parse(housing.housing_type_data);
        setParsedImage(parsedData.image);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [housing]);

  return (
    <View style={[style.card, { gap: 5 }]}>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        <View style={{ width: 90, height: 80 }}>
          <Image
            source={{ uri: `${frontEndUriBase}housing_images/${parsedImage}` }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            borderRadius={4}
          />
        </View>
        <View>
          <View style={{ gap: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "80%" }}>
                <Text style={{ color: "grey", fontSize: 9, fontWeight: "600" }}>
                  #2000{housing.id}
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#333" }}
                  numberOfLines={1}
                >
                  {housing.housing_title}
                </Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => Onpress(housing.id)}>
                  <Icon2 name="dots-three-vertical" size={20} color={"#333"} />
                </TouchableOpacity>
              </View>
            </View>

            {housing?.expires_at && (
              <Text style={{ fontSize: 11, color: "grey", fontWeight: "600" }}>
                {`İlan Bitiş Tarihi: ${housing?.expires_at}`}
              </Text>
            )}
          </View>
          {housing?.price && (
            <View style={{ paddingTop: 9 }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#333" }}>
                {addDotEveryThreeDigits(housing?.price)} TL
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          paddingTop: 10,
          gap: 7,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="heart" color={"red"} size={15} />
          <Text style={{ color: "grey", fontSize: 12 }}>
            {housing?.favorites_count}
          </Text>
        </View>
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="bookmark" color={"#333"} size={13} />
          <Text style={{ color: "grey", fontSize: 12 }}>100</Text>
        </View> */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="eye" color={"grey"} size={16} />
          <Text style={{ color: "grey", fontSize: 12 }}>
            {housing?.views_count}{" "}
          </Text>
        </View>
        {housing?.status == 0 && (
          <Text style={{ fontSize: 13, color: "#B81900", fontWeight: "500" }}>
            Pasif
          </Text>
        )}
        {housing?.status == 1 && (
          <Text style={{ fontSize: 13, color: "#27B006" }}>Yayında</Text>
        )}
        {housing?.status == 2 && (
          <Text style={{ fontSize: 13, color: "#E57809" }}>
            Admin Onayı Bekliyor
          </Text>
        )}
        {housing?.status == 3 && (
          <Text style={{ fontSize: 13, color: "#B81900", fontWeight: "500" }}>
            Reddedildi
          </Text>
        )}
      </View>
      {/* <View style={{flexDirection:'row',backgroundColor:'green'}}>
            <View style={{gap:6}}>
               
      
                  
                   
            </View>
            <View style={{backgroundColor:'red',width:90,height:80}}>

</View>
            </View> */}

      {/* 
            <View style={{padding:5}}>
                <View style={{gap:10}}>
                    <Text style={{fontSize:15,fontWeight:'600',color:'#333'}} numberOfLines={1}>{housing.housing_title}</Text>
                    <Text style={{fontSize:11,color:'grey',fontWeight:'600'}}>İlan Bitiş Tarihi: 1 Tem 2024 13:18</Text>
                </View>
                <View style={{paddingTop:10,gap:7}}>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                        <Icon name='eye' color={'grey'} size={16}/>
                        <Text style={{color:'grey',fontSize:12}}>100 Gösterim</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                        <Icon name='star' color={'grey'} size={15}/>
                        <Text style={{color:'grey',fontSize:12}}>100 Favori</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                        <Icon name='bookmark' color={'grey'} size={13}/>
                        <Text style={{color:'grey',fontSize:12}}>100 Koleksiyona Ekleme</Text>
                </View>
                <View style={{paddingTop:5}}>
                {status==0 &&  <Text style={{bottom:5,fontSize:13,color:'#B81900',fontWeight:'500'}}>Pasif</Text> }
                   {status==1 &&    <Text style={{bottom:5,fontSize:13,color:'#27B006'}}>Yayında</Text>}
                   {status==2 &&  <Text style={{bottom:5,fontSize:13,color:'#E57809'}}>Admin Onayı Bekliyor</Text> }
                   {status==3 && <Text style={{bottom:5,fontSize:13,color:'#B81900',fontWeight:'500'}}>Reddedildi</Text>  }
                </View>
                </View>
            </View> */}
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

{
  /* <View style={style.container}>
<View style={style.Post}>
       <View style={style.Image}>
          
          
           <ImageBackground source={{uri : frontEndUri + housing.image.replace('public','storage')}} style={{width:'100%',height:'100%'}} resizeMode='cover' /> 
       </View>

       <View style={style.CaptionAndInfo}>
       <View style={{position:'absolute',zIndex:1,right:0,}}>
           <Text style={{fontSize:10}}>İlan No: {housing.id + 1000000}</Text>
           
           </View>
           <View style={{position:'absolute',zIndex:1,right:0,top:20}}> 
           <TouchableOpacity onPress={() => {Onpress(housing.id)}}>
            <Icon2 name='dots-three-vertical' size={18}/>
            </TouchableOpacity>       
           </View> 
               <View style={style.Caption}>
                   <Text
                   numberOfLines={2}
                   style={{
                       fontSize:12,
                       color:'#141824',
                       fontWeight:'400',
                     
                   }}>{housing.housing_title}</Text>
                   <View style={{flexDirection:'row'}}>
                       <Icon name='location' size={11}/>
                       <Text style={{fontSize:10}}>{housing.city.title}/ {housing.county.title} / {housing.neighborhood.mahalle_title}</Text>
                   </View>
               
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:12,bottom:5}}>İlan Sayısı {housing.room_count}</Text>
                  
                    {
                      status==0 
                    :
         
                   }
                   
                   </View>
                  
               </View>
              

          
       </View>
</View>
</View> */
}
