import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React,{useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from "@react-navigation/native";
import InfoUsual from "./Sell And Rent tab Pages/InfoUsual";
import PaymentProcces from "./Sell And Rent tab Pages/PaymentProcces";
import DateProcces from "./Sell And Rent tab Pages/DateProcces";
import ApplyProcces from "./Sell And Rent tab Pages/ApplyProcces";
export default function SellAndRentFormPage() {
  const [tabs, settabs] = useState(1)
    const navigation=useNavigation()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.TextHead}>
          Hızlı güvenli ve kolay satışın yolu...{" "}
        </Text>
        <Text style={{ fontSize: 18, color: "#333", fontWeight: "500" }}>
          Emlaksepette/Sat Kirala
        </Text>

        <Text style={{ color: "#898F9E", width: 300 }}>
          Arsa, konut, işyeri, turistik tesis, devremülk tüm
          gayrimenkullerinizin satış veya kiralamasını emlaksepette sizin
          yerinize yapsın zamanınız size kalsın formu doldur bilgilerini gir kolay sat kirala!
        </Text>
      </View>
      <View style={{ paddingTop:20, gap: 10 }}>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('SendSellAndRentForm')
          }}
          style={styles.btnToForm}>
            <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>
              Formu Doldur
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingTop: 50, margin: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 22, color: "#E54242",fontWeight:'500' }}>
          Sat Kiralanın Avantajları
        </Text>

        <View style={[styles.card, { alignItems: "center", gap: 5 }]}>
          <View style={{backgroundColor:'#E54242',padding:5,borderRadius:5,       transform: [{ perspective: 300 }, { rotateY: '-45deg' }], paddingLeft:32,paddingRight:32}}>
          <Icon name="cash-fast" size={30} color={"white"} />
          </View>
        
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#E54242",
            }}
          >
            Sat Kirala İle Hızlı Satış
          </Text>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "grey", fontWeight: "400", fontSize: 13 }}>
              Satmak veya kiralamak istediğiniz gayrimenkulünüzün bilgilerini
              girin. Binlerce profesyonel emlak danışmanı vasıtasıyla hızlı ve
              kolayca satışını sizin yerinize biz sağlayalım.
            </Text>
          </View>
        </View>
        <View style={[styles.card, { alignItems: "center" }]}>
          <View style={{backgroundColor:'#E54242',padding:5,borderRadius:5,       transform: [{ perspective: 300 }, { rotateY: '-45deg' }], paddingLeft:32,paddingRight:32}}>
          <Icon name="cash-lock" size={32} color={"white"} />
          </View>
     
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#E54242",
            }}
          >
            Kapora Güvence Sistemi
          </Text>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "grey", fontWeight: "400", fontSize: 13 }}>
              Gayrimenkulünüzün satışı tamamlandığı takdirde kapora güvence
              sistemiyle kaporanız bizim güvencemiz altındadır.
            </Text>
          </View>
        </View>
        <View style={[styles.card, { alignItems: "center" }]}>
          <View style={{backgroundColor:'#E54242',padding:5,borderRadius:5,       transform: [{ perspective: 300 }, { rotateY: '-45deg' }], paddingLeft:32,paddingRight:32}}>
          <Icon2 name='users' size={30} color={"white"} />
          </View>
       
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#E54242",
            }}
          >
         Emlaksepette.com Uzmanlğı
          </Text>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "grey", fontWeight: "400", fontSize: 13 }}>
            Emlaksepette.com ile tüm satış veya kiralama süreçlerinde profesyonel ve güvenilir hizmet alırsınız.
            </Text>
          </View>
        </View>
            <View style={{padding:10}}>
              <Text style={{textAlign: "center", fontSize: 22, color: "#E54242",fontWeight:'500'}}>İlanımı nasıl satarım?</Text>
            </View>
            <View style={[styles.card, { alignItems: "center" }]}>
              <View style={{backgroundColor:'#E54242',padding:5,borderRadius:5,transform: [{ perspective: 300 }, { rotateY: '-45deg' }], paddingLeft:32,paddingRight:32}}>  
          <Icon name='form-select' size={25} color={"white"} />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#E54242",
            }}
          >
             Formu Doldurun
          </Text>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "grey", fontWeight: "400", fontSize: 13 }}>
            Satmak veya kiralamak istediğiniz gayrimenkulünüzün ilan bilgilerini girin (Fiyat,Lokasyon vb) profesyonel gayrimenkul danışmanlarımız sizi arasın.
            </Text>
          </View>
        </View>
        <View style={[styles.card, { alignItems: "center" }]}>
          <View style={{backgroundColor:'#E54242',padding:1,borderRadius:5,transform: [{ perspective: 300 }, { rotateY: '-45deg' }], paddingLeft:28,paddingRight:28}}>
          <Icon name='home-account' size={37} color={"white"} />
          </View>
       
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#E54242",
            }}
          >
            Profesyonel Emlak Danışmanlığı
          </Text>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "grey", fontWeight: "400", fontSize: 13 }}>
            İlanınız gerekli incelemeler sonrasında onaylandığında profesyonel emlak danışmanlarımız satış süreciyle ilgili tüm süreçlerde danışmanlık hizmeti vermektedir. Gayrimenkulünüzün Fotoğraf çekimleri, potansiyel alıcı/müşteri bulma, satış sürecindeki devir ve tüm yasal işlemleri adınıza takip etmektedir.
            </Text>
          </View>
        </View>
        <View style={[styles.card, { alignItems: "center" }]}>
          <View style={{backgroundColor:'#E54242',padding:1,borderRadius:5,transform: [{ perspective: 300 }, { rotateY: '-45deg' }], paddingLeft:28,paddingRight:28}}>
          <Icon name='cash-check' size={37} color={"white"} />
          </View>
       
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#E54242",
            }}
          >
            Hızlı Güvenli ve Kolay Satın
          </Text>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "grey", fontWeight: "400", fontSize: 13 }}>
            Gayrimenkulünüzün sorunsuz zahmetsiz hızlı ve kolay satışını tamamlayın.
            </Text>
          </View>
        </View>
        <View style={{padding:20}}>
          <Text style={{color:'#333',textAlign:'center',fontSize:20}}>Sıkça Sorulan Sorular</Text>
        </View>
       <ScrollView horizontal contentContainerStyle={{gap:10,paddingBottom:10}} showsHorizontalScrollIndicator={false}>

        <TouchableOpacity style={[styles.btn,{
          backgroundColor:tabs==1?'#5396DF':'#ebebeb',
        }]} onPress={()=>{
          settabs(1)
        }}>
          <Text style={{color: tabs==1? 'white':'#5396DF'}}>Genel Bilgiler</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn,{
          backgroundColor:tabs==2?'#5396DF':'#ebebeb',
        }]} onPress={()=>{
          settabs(2)
        }}>
          <Text style={{color: tabs==2? 'white':'#5396DF'}}>Fiyatlama Süreci</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={[styles.btn,{
          backgroundColor:tabs==3?'#5396DF':'#ebebeb',
        }]} onPress={()=>{
          settabs(3)
        }}>
          <Text style={{color: tabs==3? 'white':'#5396DF'}}>Randevu Süreci</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn,{
          backgroundColor:tabs==4?'#5396DF':'#ebebeb',
        }]}
        onPress={()=>{
          settabs(4)
        }}
        >
          <Text style={{color: tabs==4? 'white':'#5396DF'}}>Başvuru Ve Onay Süreci</Text>
        </TouchableOpacity>

       </ScrollView>
       {tabs==1 && <InfoUsual/>}
       {tabs==2 && <PaymentProcces/>}
       {tabs==3 && <DateProcces/>}
       {tabs==4 && <ApplyProcces/>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f7",
    flex: 1,
    padding: 10,
    
  },
  headerText: {
    gap: 10,
  },
  TextHead: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  btnToForm: {
    backgroundColor: "#5396DF",
    padding: 8,
    borderRadius: 4,
    width: "50%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 5,
    width: "100%",
    marginVertical: 10,
    gap:5,
    borderWidth: 0.7,
    borderColor: "#f4f4f4",
    ...Platform.select({
      ios: {
        shadowColor: "#f4f4f4",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  btn:{
    backgroundColor: "#5396DF",
    padding: 8,
    borderRadius: 4,
  }
});