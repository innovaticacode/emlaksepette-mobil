import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import IconGraph from "react-native-vector-icons/SimpleLineIcons";
import { addDotEveryThreeDigits } from "./methods/merhod";
import SettingsItem from "./SettingsItem";
import PaymentItem from "./PaymentItem";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
   const TextView =({text,header})=>{
    return(
        <View style={{padding:5}}>
            <Text style={{color:'#333',fontSize:13,fontWeight:'400'}}><Text style={{fontWeight:600}}>{header}</Text>{' '}{text}</Text>
        </View>
    )
   }
export default function TextAlertModal({ visible, onClose }) {
  return (
    <Modal animationType="fade" visible={visible} style={{ margin: 0 }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <View style={{position:'absolute',right:-9,top:-15}}>
                <TouchableOpacity style={{backgroundColor:'#EC4042',borderRadius:50,padding:5}} onPress={()=>{
                    onClose(false)
                }} >
                    <Icon name="close" color={'white'} size={22}/>
                </TouchableOpacity>
            </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{gap:5}}>
            <View style={{padding:5}}>
            <Text style={{color:'#EC4042',fontSize:14,fontWeight:'700'}}>Gayrimenkul Alırken/Kiralarken </Text>
            <Text style={{color:'#EC4042',fontSize:14,fontWeight:'700'}}>Dikkat Edilmesi Gerekenler!</Text>
            </View>

            <TextView text={'Emlaksepette.com olarak, kullanıcılarımızın güvenliğini en üst düzeyde tutmak önceliğimizdir. Bu nedenle, satın almak veya kiralamak istediğiniz emlak ile ilgili işlemleri yaparken dikkatli olmanız büyük önem taşımaktadır. İşte dikkat etmeniz gereken bazı önemli noktalar:'}/>
            <TextView header={'Ödeme Yapmadan Önce:'} text={'Satın alma veya kiralama işlemlerinde kesin karar vermeden önce hiçbir şekilde ön ödeme yapmayınız. Kapora veya avans ödemeleri konusunda dikkatli olunuz ve dolandırıcılık riski taşıyan durumlara karşı tedbirli davranınız.'}/>
            <TextView  header={'İlan Bilgilerini Doğrulama:'}text={'İlan sahiplerinin verdikleri bilgileri dikkatlice kontrol ediniz. İlanlarda belirtilen bilgilerin ve görsellerin doğruluğunu teyit etmek için mümkünse yerinde inceleme yapınız veya güvenilir kaynaklardan doğrulama isteyiniz.'}/>
            <TextView header={'İletişim ve Profil Bilgileri:'} text={'İlan sahiplerinin hesap profillerindeki bilgilerin doğruluğunu kontrol ediniz. Şüpheli veya eksik bilgiye sahip ilan sahipleri ile iletişimde temkinli olunuz. Güvenliğiniz için, kimlik doğrulaması yapmış kullanıcılar ile iletişim kurmayı tercih ediniz.'}/>
            <TextView header={'Sözleşme ve Hukuki Belgeler: '} text={'Satın alma veya kiralama işlemlerinde sözleşme yapmadan önce hukuki belgeleri dikkatlice inceleyiniz ve gerektiğinde bir uzmana danışınız. Tüm koşulların net bir şekilde belirtildiği ve taraflarca kabul edildiği belgeler üzerinden işlem yapınız.'}/>
            <TextView  header={'Geri Bildirim ve Şikayetler: '}text={'Emlaksepette.com olarak, kullanıcı deneyimini ve güvenliğini sürekli olarak iyileştirmek için geri bildirimlerinizi önemsiyoruz. Eğer ilanlarda belirtilen bilgi veya görsellerin gerçeği yansıtmadığını düşünüyorsanız veya ilan sahiplerinin hesap profillerindeki bilgilerin doğru olmadığını fark ederseniz, lütfen bize hemen bildirin.'}/>
            <TextView text={'Güvenli bir emlak deneyimi için bu önemli noktalara dikkat ederek, dolandırıcılık ve benzeri olumsuz durumlardan korunabilirsiniz.'}/>

          </ScrollView>

          <View style={{paddingTop:10}}>
            <TouchableOpacity style={{padding:8,backgroundColor:'#EC4042',borderRadius:5}}>
                <Text style={{textAlign:'center',fontSize:14,fontWeight:'600',color:'white'}}>Bir daha Gösterme</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "95%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 5,
    height: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  ModalHeader: {
    width: "100%",
    padding: 10,
    backgroundColor: "#EA2C2E",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  Icon: {
    backgroundColor: "#40C351",
    padding: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerGrey: {
    width: "100%",
    backgroundColor: "#EEEEEE",
    padding: 8,
  },
  ongorulenView: {
    paddingTop: 10,
    gap: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
