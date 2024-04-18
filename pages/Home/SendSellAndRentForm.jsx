import { View, Text,StyleSheet,TextInput,TouchableOpacity ,ScrollView} from 'react-native'
import React,{useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CheckBox } from 'react-native-elements'
import Modal from 'react-native-modal';
import CheckboxForm from '../../components/CheckboxForm';
import { FaLess } from 'react-icons/fa';
import { Alert } from 'react-native';

export default function SendSellAndRentForm() {
    const [selectedIndexRadio, setIndexRadio] = useState(0);
    const [selectedInfo, setselectedInfo] = useState(0)
    const [cityModal, setcityModal] = useState(false);
    const [countyModal, setcountyModal] = useState(false);
    const [neigbourhoodModal, setneigbourhoodModal] = useState(false);

   const [buildTypeModal, setbuildTypeModal] = useState(false)
   const [sideModal, setsideModal] = useState(false)
   const [hotModal, sethotModal] = useState(false)
   const [ViewModal, setViewModal] = useState(false)
   const [roomCounModal, setroomCounModal] = useState(false)
   const [bathModal, setbathModal] = useState(false)
   const [CertificateModal, setCertificateModal] = useState(false)

    const [city, setcity] = useState("");
    const [county, setcounty] = useState("");
    const [neigbourhod, setneigbourhod] = useState("");
    const toggleCityModal = () => {
        setcityModal(false);
      };
      const toggleCountyModal = () => {
        setcountyModal(false);
      };
      const toggleNeigbourhoodModal = () => {
        setneigbourhoodModal(false);
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
      const [checked, setChecked] = React.useState(false);
      const toggleCheckbox = () => setChecked(!checked);

      const [checked2, setChecked2] = React.useState(false);
      const toggleCheckbox2 = () => setChecked2(!checked2);

      const [checked3, setChecked3] = React.useState(false);
      const toggleCheckbox3 = () => setChecked3(!checked3);
      const [checked4, setChecked4] = React.useState(false);
      const toggleCheckbox4 = () => setChecked4(!checked4);

        const Settings=[
   "DSL",
  "ASANSÖR",
  "EŞYALI",
  "GARAJ",
  "BARBEKÜ",
  "BOYALI",
  "ÇAM. ODASI",
  "ÇELİK KAPI",
  "DUŞAKABİN",
  "İNTERCOM",
  "JAKUZİ",
  "M.S.D.",
  "JENERATÖR",
  "MUTFAK D.",
  "SAUNA",
  "SERAMİK Z.",
  "SU DEPOSU",
  "ŞÖMİNE",
  "TERAS",
  "GÜVENLİK",
  "GÖNME DOLAP",
  "KABLO TV",
  "MUTFAK L.",
  "OTOPARK",
  "GÖR. DİAFON",
  "KİLER",
  "OYUN PARKI",
  "HİDROFOR",
  "KLİMA",
  "PVC",
  "HİLTON BANYON",
  "KOMBİ",
  "PANJUR",
  "ISICAM",
  "LAMİNANT Z.",
  "PARKE",
  "YANGIN M.",
  "YÜZME H.",
  "Wi-Fi"
        ]
        const [alert, setalert] = useState(false)
            const SendForm=()=>{
                if (checked4===false) {
                    setalert(true)
                    setTimeout(() => {
                        setalert(false)
                    }, 2000);
                
                }else{
                    Alert.alert('Başvuru Gönderildi')
                }
               
            }
  return (
    <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>  
    <View style={{padding:10,gap:10}}>
      <Text style={{fontSize:20,color:'#333',fontWeight:'500'}}>Formu Doldur</Text>
      <Text style={{color:'grey'}}>Gayrimenkulunüzün detaylarını girin. Onay durumunda size dönüş sağlayacağz.</Text>
    </View>
    <View style={{padding:10,gap:20}}>
    <View style={{gap:6}}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>İsim Soyisim</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>Telefon Numarası</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>E-Posta Adresi</Text>
        <TextInput style={[styles.Input]}/>
    </View>
    </View>
    <View style={{padding:10,paddingTop:20,gap:10}}>
        <Text style={{fontSize:19}}>İlan Bilgileri</Text>
        <View style={{paddingTop:10}}>
        <CheckBox
                  checked={selectedIndexRadio === 1}
                  onPress={() => setIndexRadio(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={<Text style={{ fontSize: 14 }}>Konut</Text>}
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 0,
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
                      <Text style={{ fontSize: 14 }}>
                        Ticari
                      </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 0,
                  }}
                />
        </View>
        <View style={{borderColor:'#ebebeb',gap:5,borderTopWidth:1}}>
        <CheckBox
                  checked={selectedInfo === 3}
                  onPress={() => setselectedInfo(3)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={<Text style={{ fontSize: 14 }}>Kiralık</Text>}
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 0,
                  }}
                />
                <CheckBox
                  checked={selectedInfo=== 4}
                  onPress={() => setselectedInfo(4)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={
                    <View style={{}}>
                      <Text style={{ fontSize: 14 }}>
                        Satılık
                      </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 0,
                  }}
                />
                 <CheckBox
                  checked={selectedInfo=== 5}
                  onPress={() => setselectedInfo(5)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={
                    <View style={{}}>
                      <Text style={{ fontSize: 14 }}>
                        Devren
                      </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 0,
                  }}
                />
        </View>
        <View style={{gap:10}}>

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
            <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>Adres Açıklaması</Text>
        <TextInput style={styles.Input}/>
    </View>
            <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>Gayrimenkulunuz için belirlediğiniz fiyat</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6,height:100}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>İlan Açıklaması</Text>
        <TextInput style={[styles.Input,{height:'100%'}]} multiline/>
    </View>
    <View style={{gap:6,paddingTop:20,}}>
    <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
           title={<Text style={{left:5}}>Sözleşme</Text>}
           containerStyle={{backgroundColor:'transparent'}}
         />
            <CheckBox
           checked={checked2}
           onPress={toggleCheckbox2}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
           title={<Text style={{left:5}}>Afiş</Text>}
           containerStyle={{backgroundColor:'transparent'}}
         />
            <CheckBox
           checked={checked3}
           onPress={toggleCheckbox3}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
           title={<Text style={{left:5}}>Anahtar Yetkili</Text>}
           containerStyle={{backgroundColor:'transparent'}}
         />
    </View>
    <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Yapı Tipi
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setbuildTypeModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>Bina Kat</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>Bulunduğu Kat</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>M2 Net</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>M2 Brüt</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{gap:6}}>
    <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>Bina Yaşı</Text>
        <TextInput style={styles.Input}/>
    </View>
    <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
               Cephe
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setsideModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
               Isınma
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => sethotModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
           
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
               Manzara
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setViewModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
               Oda Ve Salon
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setroomCounModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
               Banyo/Tuvalet
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setbathModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
               Tapu
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Input}
                onPress={() => setCertificateModal(true)}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
            {
                Settings.map((item,index)=>(
                    
                    <CheckboxForm item={item} key={index} />
                  
                  
                ))
            }
            </View>
            <CheckBox
           checked={checked4}
           onPress={toggleCheckbox4}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
           title={<View style={{padding:5,width:'100%',borderRadius:10}}>
                <Text style={{color:'blue'}}>
                    Sat Kirala Formu sözleşmesini 
                </Text>
                <Text>
                    okudum onaylıyorum
                </Text>

            </View>}
           containerStyle={{backgroundColor:alert?'#FFE0DB':'transparent',borderWidth:0}}
         />
            <View style={{alignItems:'center',paddingBottom:40}}>
                <TouchableOpacity style={styles.btnToForm}
                    onPress={SendForm}
                >
                    <Text style={{textAlign:'center',color:'white',fontSize:14}}>Başvuruyu Tamamla</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
        isVisible={cityModal}
        onBackdropPress={toggleCityModal}
        swipeDirection={['down']}
        backdropColor="transparent"
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
        backdropColor="transparent"
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
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={buildTypeModal}
        onBackdropPress={()=>setbuildTypeModal(!buildTypeModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Yapı tipi</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={sideModal}
        onBackdropPress={()=>setsideModal(!sideModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={hotModal}
        onBackdropPress={()=>sethotModal(!hotModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={ViewModal}
        onBackdropPress={()=>setViewModal(!ViewModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>maznara</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={roomCounModal}
        onBackdropPress={()=>setroomCounModal(!roomCounModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={bathModal}
        onBackdropPress={()=>setbathModal(!bathModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
      <Modal
        isVisible={CertificateModal}
        onBackdropPress={()=>setCertificateModal(!CertificateModal)}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>mahalle</Text>
      
        </View>
      </Modal>
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    Input:{
        borderWidth:1,
        borderColor:'#bdc6cf',
        borderRadius:6,
        padding:8,
        fontSize:14
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      modalContent: {
        backgroundColor: '#F8F7F4',
        padding: 20,
        height:'40%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      btnToForm: {
        backgroundColor: "#5396DF",
        padding: 10,
        borderRadius: 4,
        width: "80%",
      },

})
