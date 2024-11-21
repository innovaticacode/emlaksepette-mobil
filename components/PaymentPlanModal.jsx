import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import IconGraph from 'react-native-vector-icons/SimpleLineIcons'
import { addDotEveryThreeDigits } from "./methods/merhod";
import SettingsItem from "./SettingsItem";
import PaymentItem from "./PaymentItem";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import WhiteOrRedButtons from "./Buttons/WhiteOrRedButtons/WhiteOrRedButtons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "./methods/user";
export default function PaymentPlanModal({
  visible,
  onClose,
  title,
  content,
  data,
  RoomOrder,
  deposit_rate,
  addToCard
}) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentItems, setPaymentItems] = useState([]);
    const formatPrice = (price) => addDotEveryThreeDigits(Math.round(price));
  
    useEffect(() => {
      setPaymentItems([]);
      setTotalPrice(0);
      if (data &&   RoomOrder !== null) {
        let total = 0;
        const items = [];
  
        for (
          let _index = 0;
          _index <
          data["pay-dec-count"+RoomOrder];
          _index++
        ) {
          const priceString = addDotEveryThreeDigits(
            data["share_sale[]"] !== "[]"
              ? (data[
                  `pay_desc_price${RoomOrder}` + _index
                ] /
                  data[
                    "number_of_shares[]"
                  ]).toFixed(0)
              : data[
                  `pay_desc_price${RoomOrder}` + _index
                ]
          );
  
          const price = parseInt(priceString.replace(/\./g, ""), 10);
          const roundedPrice = Math.round(price);
          total += roundedPrice;
            
          const date = new Date(
            data[
              "pay_desc_date" + RoomOrder + _index
            ]
          );
  
          const padZero = (num) => (num < 10 ? `0${num}` : num);
  
          const formattedDate = `${padZero(date.getDate())}.${padZero(
            date.getMonth() + 1
          )}.${date.getFullYear()}`;
  
          items.push(
            <View key={_index}>
              <PaymentItem
                header={`${_index + 1} . Ara Ödeme`}
                price={formatPrice(price)}
                date={formattedDate}
                dFlex="column"
                index={_index}
              />
            </View>
          );
        }
        
       
        setTotalPrice(total);
        
        setPaymentItems(items);
      }
    }, [data, RoomOrder]);

    const [MonthlyPriceWithoutShare, setMonthlyPriceWithoutShare] = useState(null)
    const [MonthlyPriceWithShare, setMonthlyPriceWithShare] = useState(null)
    const navigation=useNavigation()
    const [user, setuser] = useState({})
    useEffect(() => {
        getValueFor('user',setuser)
    }, [])
    

  return (
    <Modal
    animationType="fade" 
      visible={visible}
      onRequestClose={onClose}
      style={{ margin: 0 }}
      onBackdropPress={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
       
          <View style={styles.ModalHeader}>
            <View style={{ width: "70%" }}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
                {title} Projesinde {RoomOrder} No'lu İlan Ödeme Detayı
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={onClose}>
                <Icon name="closecircle" size={25} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView  contentContainerStyle={{ gap:10,paddingLeft:10,paddingRight:10,paddingBottom:10}}>
            <View style={{alignItems:'center',paddingTop:10}}>
            <View style={{width:166,height:32}}>
            <Image source={require('../components/emlaksepettelogo.png')} style={{width:'100%',height:'100%'}} resizeMode='contain' />
            </View>
            </View>

                {
                 data['projected_earnings[]'] &&
                  <View style={styles.ongorulenView}>
                  <Text style={styles.text}>Yıllık Değer Artışı</Text>
                  <View>
                  <Text style={styles.text}>%{addDotEveryThreeDigits(data['projected_earnings[]'])}</Text>
                  </View>
                 
                </View>
                }
                {
                 data['projected_earnings[]'] &&
                  <View style={styles.ongorulenView}>
                  <Text style={styles.text}>Aylık Kira Getirisi</Text>
                  <View>
                  <Text style={styles.text}>{addDotEveryThreeDigits(data['ong_kira[]'])}₺</Text>
                  </View>
                 
                </View>
                }
              <View style={{gap:10}}>
              <SettingsItem info={'Peşin Fiyat'} 
                        
                       numbers={
                            data["share_sale[]"] != "[]" &&
                            data["number_of_shares[]"] ?
                          addDotEveryThreeDigits(
                                (
                                    parseInt(
                                      data["price[]"].replace('.','')
                                    ) /
                                    
                                    
                                       parseInt(
                                      data["number_of_shares[]"].replace('.','')
                                       )
                                    
                                  ).toFixed(0)
                            ):
                            (
                                addDotEveryThreeDigits(
                                data["price[]"] ) + ' ₺'  
                            )
                       }/> 
                       { data &&  RoomOrder !==null &&  data['payment-plan[]'] &&   
                            JSON.parse(
                                data["payment-plan[]"]
                              ) &&
                              JSON.parse(
                                data["payment-plan[]"]
                              ).includes("taksitli") && (
                                <>
                               
                                {
                                   data["installments-price[]"] &&
                                       <SettingsItem
                                 border={'0'}
                                info={
                                  data["installments[]"] +
                                  " " +
                                  "Ay Taksitli Fiyat"
                                }
                                numbers={
                                  data["share_sale[]"] !== "[]" &&
                                  data["number_of_shares[]"]
                                    ? addDotEveryThreeDigits(
                                        Math.round(
                                          data["installments-price[]"] /
                                            data["number_of_shares[]"]
                                        )
                                      ) + "₺"
                                    : addDotEveryThreeDigits(
                                        Math.round(
                                          data["installments-price[]"]
                                        )
                                      ) + " ₺"
                                }
                              />
                                }
                            

                               <SettingsItem
                                
                                    info="Peşinat"
                                    numbers={
                                      data["share_sale[]"] != "[]" &&
                                      data["number_of_shares[]"]
                                        ? addDotEveryThreeDigits(
                                            Math.round(
                                              data["advance[]"] /
                                                data["number_of_shares[]"]
                                            )
                                          ) + "₺"
                                        : addDotEveryThreeDigits(
                                            Math.round(
                                              data["advance[]"]
                                            )
                                          ) + " ₺"
                                    }
                                  />
                                  {
                                          data["installments-price[]"] && 
                                          <SettingsItem 
                                          border={'0'}
                                            info="Aylık Ödenecek Tutar"
                                            numbers={
                                              data["share_sale[]"] != "[]" &&
                                              data["number_of_shares[]"]
                                                ? addDotEveryThreeDigits(
                                                    (data["installments-price[]"] /
                                                      data["number_of_shares[]"] -
                                                      (parseInt(
                                                        data["advance[]"]
                                                      ) /
                                                        parseInt(
                                                          data["number_of_shares[]"]
                                                        ) +
                                                        parseInt(totalPrice))) /
                                                      parseInt(
                                                        data["installments[]"]
                                                      )
                                                  ) + " ₺"
                                                : addDotEveryThreeDigits(
                                                    (
                                                      (parseInt(
                                                        data["installments-price[]"]
                                                      ) -
                                                        (parseInt(
                                                          data["advance[]"]
                                                        ) +
                                                          parseInt(totalPrice))) /
                                                      parseInt(
                                                        data["installments[]"]
                                                      )
                                                    ).toFixed(0)
                                                  ) + " ₺"
                                            }
                                          />
                                  }
                              
                                  <SettingsItem info={'Taksit Başlangıç Tarihi'} numbers={'30 Ekim 2024'}/>
                                  <View style={styles.headerGrey}>
                                        <Text style={{ color: "#212529", fontSize: 13, fontWeight: "700",textAlign:'center'}}>Ara Ödemeler</Text>
                                  </View>
                                  
                                    
                                    {paymentItems && paymentItems}
                            
                                 
                                  </>  
                              )
                                
                              
                       }

              </View>
                       <View style={{gap:10,alignItems:'center'}}>
                        <View>
                          <Text style={{fontSize:12,fontWeight:'500',textAlign:'center'}}>Bu ilan satış noktalarımızda %4 indirimli en yakın satış noktası için tıklayın.</Text>
                        </View>
                        <View style={{width:'60%'}}>
                         <WhiteOrRedButtons text={'Satış Noktası'}/>
                        </View>
                       </View>
                       <View style={{padding:15,backgroundColor:'#FFEAEB',borderRadius:10,gap:10}}>
                          <View style={{}}>
                            <Text style={{color:'#EA2B2E',fontSize:14,fontWeight:'600',textAlign:'center'}}>Şu anda Ödenecek Kapora Tutarı</Text>
                            </View>
                            <View>
                            <Text style={{color:'#EA2B2E',fontSize:14,fontWeight:'600',textAlign:'center'}}> {addDotEveryThreeDigits((data['price[]'] * deposit_rate) / 100 ) }₺</Text>
                            </View>
                          
                         
                          <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={{backgroundColor:'#EA2B2E',padding:10,borderRadius:10,width:'70%'}} onPress={()=>{
                              onClose()
                              setTimeout(() => {
                                addToCard()
                              }, 800);
                           
                            }}>
                            <Text style={{color:'white',fontWeight:'600',textAlign:'center'}}>Sepete Ekle</Text>
                            </TouchableOpacity>
                          </View>
                       </View>
                       <View>
                        <Text style={{color:'#EA2B2E',fontSize:14,fontWeight:'600',textAlign:'center'}}>
                        ‘‘Şimdi Alın veya Kiralayın, kaporanız emlaksepette.com’da güvence altında!’’
                        </Text>
                       </View>
          </ScrollView>
        
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
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
   maxHeight:'90%',
    paddingBottom:10
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
  Icon:{
backgroundColor:'#40C351',
padding:4,
borderRadius:50,
alignItems:'center',
justifyContent:'center'
  },
  headerGrey:{
    width:'100%',
    backgroundColor:'#EEEEEE',
    padding:10,
    borderRadius:10
  },
  ongorulenView:{
    backgroundColor:'#E7F6EE',
    padding:10,
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text:{
    color:'#0E713D',
    fontSize:14,
    fontWeight:'semibold'
  }

});
