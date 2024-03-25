import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
 FlatList

  
} from "react-native";
import { React, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed";
import ıcon from "react-native-vector-icons/SimpleLineIcons";
import AccordionItem from "./AccordionItem";
import Modal from 'react-native-modal';
export default function Company() {
  const [selectedIndexRadio, setIndexRadio] = useState(1);
  {
    /* Input States */
  }
  const [accounttype, setaccounttype] = useState("");
  const [focusArea, setfocusArea] = useState("");
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const [neigbourhod, setneigbourhod] = useState("");
  const [TaxPlaceCity, setTaxPlaceCity] = useState("");
  const [TaxPlace, setTaxPlace] = useState('')

  {
    /* cheked documents */
  }
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const toggleCheked = () => setChecked(!checked);
  const toggleCheked1 = () => setChecked1(!checked1);
  const toggleCheked2 = () => setChecked2(!checked2);
  const toggleCheked3 = () => setChecked3(!checked3);

  {
    /* Functions */
  }
  const [Show, setShow] = useState(false);
  const show = () => {
    setShow(!Show);
  };
  const chooseAccount = (text) => {
    setaccounttype(text);
    setModalVisible(false)
  
  };
  const chooseArea = (text) => {
    setfocusArea(text);
    setfocusAreaModal(false)
  };
  const chooseCity = (text) => {
    setcity(text);
   
  };
  const chooseCounty = (text) => {
    setcounty(text);

  }
  const chooseNeigbourhood = (text) => {
    setneigbourhod(text);
  
  }
  const toggleAccountModal = () => {
  setModalVisible(false)
  };

  const toggleFocusAreaModal = () => {
    setfocusAreaModal(false);
  };
  const toggleCityModal = () => {
    setcityModal(false);
  };
  const toggleCountyModal = () => {
    setcountyModal(false);
  };
  const toggleNeigbourhoodModal = () => {
    setneigbourhoodModal(false);
  };
  const toggleTaxCityModal = () => {
    setTaxCityModall(false);
  };
  const toggleTaxplaceModal = () => {
    setTaxPlaceModal(false);
  };
  {
    /* Input Data Arrays */
  }
  const focusarea = [{ title: "İnşaat" }, { title: "Emlak" }];
  const chooseAccountItems = [{ title: "İnşaat" }, { title: "Emlak" }];

  {
    /* Modal boolean States */
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [focusAreaModal, setfocusAreaModal] = useState(false);
  const [cityModal, setcityModal] = useState(false);
  const [countyModal, setcountyModal] = useState(false);
  const [neigbourhoodModal, setneigbourhoodModal] = useState(false);
  const [TaxCityModal, setTaxCityModall] = useState(false);
  const [TaxPlaceModal, setTaxPlaceModal] = useState(false);

  {
    /* Data Arrays for Modals */
  }
  const itemsAccount = [
    "Emlakçı",
    "Banka",
    "İnşaat",
    "Turizm",
    
  ];
  const FocusAreaItems=[
    "İnşaat",
    "Gayrimenkul",
    "Turizm",
    "Banka"
  ]
 

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ padding: 15, gap: 20 }}>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  E-Posta
                </Text>
              </View>
              <TextInput style={styles.Input} placeholder="example@gmail.com" />
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Cep Telefonu
                </Text>
              </View>
              <TextInput
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
              />
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Şifre
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.Input}
                  placeholder="*********"
                  secureTextEntry={Show ? false : true}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, bottom: 9 }}
                  onPress={show}
                >
                  <EyeIcon
                    name={Show ? "eye" : "eye-off-sharp"}
                    size={20}
                    color={"#333"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Yetkili İsim Soyisim
                </Text>
              </View>
              <TextInput style={styles.Input} placeholder="" />
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Firma Adı
                </Text>
              </View>
              <TextInput style={styles.Input} placeholder="" />
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Sabit Telefon
                </Text>
              </View>
              <TextInput
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
              />
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Iban
                </Text>
              </View>
              <TextInput
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
              />
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Kurumsal Hesap Türü
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() =>  setModalVisible(true)}
              >
                <Text>{accounttype}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Faailiyet Alanınız
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setfocusAreaModal(true)}
              >
                <Text>{focusArea}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  İl
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setcityModal(true)}
              >
                <Text>{city}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  İlçe
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setcountyModal(true)}
              >
                <Text>{county}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Mahalle
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setneigbourhoodModal(true)}
              >
                <Text>{neigbourhod}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>İşletme Türü</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  checked={selectedIndexRadio === 1}
                  onPress={() => setIndexRadio(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={<Text style={{ fontSize: 12 }}>Şahıs Şirketi</Text>}
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
                  }}
                />
                <CheckBox
                  checked={selectedIndexRadio === 2}
                  onPress={() => setIndexRadio(2)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={
                    <View style={{}}>
                      <Text style={{ fontSize: 12 }}>
                        Limited veya Anonim Şirketi{" "}
                      </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
                  }}
                />
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                 Vergi Dairesi İli
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setTaxCityModall(true)}
              >
                <Text>{}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                 Vergi Dairesi 
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setTaxPlaceModal(true)}
              >
                <Text>{}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5, display:selectedIndexRadio==1? 'flex':'none'}}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Tc Kimlik No
                </Text>
              </View>
              <TextInput
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
                maxLength={11}
              />
            </View>
            {/* Contracts */}
            <View>
              <CheckBox
                checked={checked}
                onPress={toggleCheked}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ color: "#027BFF", fontSize: 13 }}>
                        {" "}
                        Bireysel üyelik sözleşmesini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 0, width: "100%" }}
              />
              <CheckBox
                checked={checked1}
                onPress={toggleCheked1}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ color: "#027BFF", fontSize: 13 }}>
                        Kvkk metnini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
              <CheckBox
                checked={checked2}
                onPress={toggleCheked2}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ color: "#027BFF", fontSize: 13 }}>
                        Gizlilik sözleşmesi ve aydınlatma metnini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
              <CheckBox
                checked={checked3}
                onPress={toggleCheked3}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      Tarafıma elektronik ileti gönderilmesini kabul ediyorum.
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
            </View>
            {/* Contract Finish */}


                {/* Register Button */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnRegister} >
                <Text style={styles.btnRegisterText}>Üye Ol</Text>
              </TouchableOpacity>
            </View>
              {/* Register Button */}

          </View>
        </View>
        <Modal
      isVisible={modalVisible}
      onBackdropPress={toggleAccountModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <FlatList
          data={itemsAccount}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}
                onPress={()=>{
                    chooseAccount(item);
                }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
      <Modal
        isVisible={focusAreaModal}
        onBackdropPress={toggleFocusAreaModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
        <FlatList
          data={FocusAreaItems}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}
                onPress={()=>{
                    chooseArea(item);
                }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        
        </View>
      </Modal>
      <Modal
        isVisible={cityModal}
        onBackdropPress={toggleCityModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>il</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={countyModal}
        onBackdropPress={toggleCountyModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>ilçe</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={neigbourhoodModal}
        onBackdropPress={toggleNeigbourhoodModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={TaxCityModal}
        onBackdropPress={toggleTaxCityModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>vergi dairesi ili</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={TaxPlaceModal}
        onBackdropPress={toggleTaxplaceModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>vergi dairesi</Text>
      
        </View>
      </Modal>
    
   
       
      

      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Input: {
    padding: 9,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },
  btnRegister:{
    backgroundColor: "#E54242",
    padding: 9,
    borderRadius: 10,
    width: "90%",
  },
  btnRegisterText:{
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    height:300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor:'transparent',
    borderBottomWidth:1,
    borderBottomColor:'#ebebeb',
    marginTop: 10,
    padding: 10,
  },
});
