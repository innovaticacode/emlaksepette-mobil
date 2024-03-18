import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { React, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import EyeIcon from "react-native-vector-icons/Ionicons"
import { CheckBox } from '@rneui/themed';
export default function Company() {
    const [selectedValue, setSelectedValue] = useState(null);
    const [faaliyet, setfaaliyet] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalstatu, setModalstatu] = useState(false);
    const [Cityvalue, setCityvalue] = useState(null)
    const [cityModal, setcityModal] = useState(false)
    const [Town, setTown] = useState(null)
    const [TownModal, setTownModal] = useState(false)
    const [street, setstreet] = useState(null)
    const [streetModal, setstreetModal] = useState(false)
    const [selectedIndex, setIndex] = useState(0);
    const [TaxLocation, setTaxLocation] = useState(null)
    const [TaxModal, setTaxModal] = useState(false)
    const [TaxPlace, setTaxPlace] = useState(null)
    const [TaxPlaceModal, setTaxPlaceModal] = useState(false)
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const toggleCheckbox1 = () => setChecked1(!checked1);
    const toggleCheckbox2 = () => setChecked2(!checked2);
    const toggleCheckbox3 = () => setChecked3(!checked3);
    const [Show, setShow] = useState(false)
    const OpenTaxModal = () => {
        setTaxModal(true)
    }

    const CloseTaxModal = () => {
        setTaxModal(false)
    }
    const getTaxValue = (TaxValue) => {
        setTaxLocation(TaxValue)
        setTaxModal(false)
    }


    const openTaxPlaceModal = () => {
        setTaxPlaceModal(true)
    }
    const closeTaxPlaceModal = () => {
        setTaxPlaceModal(false)
    }
    const getTaxPlaceValue = (TaxPlaceValue) => {
        setTaxPlace(TaxPlaceValue)
        setTaxPlaceModal(false)
    }


    const show=()=>{
        setShow(!Show)
    }

    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const openModal = () => {
        setModalstatu(true)
    }
    const closeModal = () => {
        setModalstatu(false)
    }
    const openInput = (faaliyetval) => {
        setfaaliyet(faaliyetval)
        setModalstatu(false)
    }
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectValue = (value) => {
        setSelectedValue(value);
        setModalVisible(false);
    };


    const openCityModal = () => {
        setcityModal(true);
    }
    const closeCityModal = () => {
        setcityModal(false)
    }
    const getCityValue = (Cityvalue) => {
        setCityvalue(Cityvalue)
        setcityModal(false)
    }


    const openTownModal = () => {
        setTownModal(true)
    }
    const closeTownModal = () => {
        setTownModal(false)
    }
    const getTownValue = (TownValue) => {
        setTown(TownValue)
        setTownModal(false)
    }
    const getStreetValue = (StreetValue) => {
        setstreet(StreetValue)
        setstreetModal(false)
    }
    const openStreetModal = () => {
        setstreetModal(true)

    }
    const closeStreetModal = () => {
        setstreetModal(false)
    }

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <View style={styles.form}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Normal İnputlar*/}
                    <View style={styles.ınputs}>
                        <View>
                            <Text style={styles.label}>E-Posta</Text>
                            <TextInput style={styles.Input} />
                        </View>
                        <View>
                            <Text style={styles.label}>Cep Telefonu</Text>
                            <TextInput style={styles.Input} />
                        </View>

                        <View>
                            <Text style={styles.label}>Şifre</Text>
                            <View style={{display:'flex',flexDirection:'row'}}>
                                <TextInput style={{
                                     width:'100%',
                                     height:'100%',
                                     backgroundColor: '#FAFAFA',
                                     padding:10,
                                     fontSize:20,
                                     borderRadius:6,
                                     borderWidth: 1,
                                     borderColor: '#EEEEEE'
                                }} secureTextEntry={!Show}/>
                                <TouchableOpacity  style={{
                                    position:'absolute',
                                    right:10,
                                    bottom:7
                                }} onPress={show}>
                                <EyeIcon name={Show? 'eye-outline':'eye-off-outline'}size={30}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.label}>Yetkili İsim Soyisim</Text>
                            <TextInput style={styles.Input} />
                        </View>
                        <View>
                            <Text style={styles.label}>Firma Adı</Text>
                            <TextInput style={styles.Input} />
                        </View>
                        <View>
                            <Text style={styles.label}>Sabit Telefon</Text>
                            <TextInput style={styles.Input} />
                        </View>
                        <View>
                            <Text style={styles.label}>Iban</Text>
                            <TextInput style={styles.Input} />
                        </View>
                        {/* Sections*/}

                        <View>
                            <Text style={styles.label}>Kurumsal Hesap Türü</Text>
                            <TextInput style={styles.Input} onFocus={handleOpenModal} value={selectedValue} placeholder='Seçiniz' />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={handleCloseModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            selectedValue={selectedValue}
                                            onValueChange={(itemValue, itemIndex) => {
                                                handleSelectValue(itemValue)

                                            }}
                                        >
                                            <Picker.Item label="Emlakçı" value="Emlakçı" />
                                            <Picker.Item label="Banka" value="Banka" />
                                            <Picker.Item label="İnşaat" value="İnşaat" />
                                            <Picker.Item label="Turizm" value="Turizm" />
                                        </Picker>
                                        <Button title="Kapat" onPress={handleCloseModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={styles.label}>Faaliyet Alanınız</Text>
                            <TextInput style={styles.Input} onFocus={openModal} value={faaliyet} placeholder='Seçiniz' />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalstatu}
                                onRequestClose={closeModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            faaliyet={faaliyet}
                                            onValueChange={(faaliyetVal, itemIndex) => {
                                                openInput(faaliyetVal)

                                            }}
                                        >
                                            <Picker.Item label="İnşaat" value="İnşaat" />
                                            <Picker.Item label="Gayrimenkul" value="Gayrimenkul" />
                                            <Picker.Item label="Banka" value="Banka" />

                                            <Picker.Item label="Turizm" value="Turizm" />
                                        </Picker>
                                        <Button title="Kapat" onPress={closeModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={styles.label}>İl</Text>
                            <TextInput style={styles.Input} onFocus={openCityModal} value={Cityvalue} placeholder='Seçiniz' />
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={cityModal}
                                onRequestClose={closeCityModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            Cityvalue={Cityvalue}
                                            onValueChange={(Cityvalue, itemIndex) => {
                                                getCityValue(Cityvalue)

                                            }}
                                        >
                                            <Picker.Item label="İstanbul" value="İstanbul" />
                                            <Picker.Item label="İzmir" value="İzmir" />



                                        </Picker>
                                        <Button title="Kapat" onPress={closeCityModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={styles.label}>İlçe</Text>
                            <TextInput style={styles.Input} onFocus={openTownModal} value={Town} placeholder='Seçiniz' />
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={TownModal}
                                onRequestClose={closeTownModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            Townvalue={Town}
                                            onValueChange={(TownValue, itemIndex) => {
                                                getTownValue(TownValue)

                                            }}
                                        >
                                            <Picker.Item label="Kartal" value="Kartal" />
                                            <Picker.Item label="Karşıyaka" value="Karşıyaka" />



                                        </Picker>
                                        <Button title="Kapat" onPress={closeTownModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={styles.label}>Mahalle</Text>
                            <TextInput style={styles.Input} onFocus={openStreetModal} value={street} placeholder='Seçiniz' />
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={streetModal}
                                onRequestClose={closeStreetModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            StreetValue={street}
                                            onValueChange={(StreetValue, itemIndex) => {
                                                getStreetValue(StreetValue)

                                            }}
                                        >
                                            <Picker.Item label="Cevizli" value="Cevizli" />
                                            <Picker.Item label="Karşıyaka" value="Karşıyaka" />



                                        </Picker>
                                        <Button title="Kapat" onPress={closeStreetModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={{ fontSize: 17, }}>İşletme Türü</Text>
                        </View>
                        <View style={styles.radios}>

                            <CheckBox
                                checked={selectedIndex === 0}
                                onPress={() => setIndex(0)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                title={'Şahıs Şirketi'}
                                textStyle={{ fontSize: 12 }}
                            />
                            <CheckBox
                                checked={selectedIndex === 1}
                                onPress={() => setIndex(1)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                title={'Limited veya Anonim Şirketi'}
                                textStyle={{ fontSize: 12 }}
                                containerStyle={{ width: 200 }}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Vergi Dairesi İli</Text>
                            <TextInput style={styles.Input} onFocus={OpenTaxModal} value={TaxLocation} placeholder='Seçiniz' />
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={TaxModal}
                                onRequestClose={CloseTaxModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            TaxValue={TaxLocation}
                                            onValueChange={(TaxValue, itemIndex) => {
                                                getTaxValue(TaxValue)
                                            }}
                                        >
                                            <Picker.Item label="Cevizli" value="Cevizli" />
                                            <Picker.Item label="Karşıyaka" value="Karşıyaka" />
                                        </Picker>
                                        <Button title="Kapat" onPress={CloseTaxModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={styles.label}>Vergi Dairesi</Text>
                            <TextInput style={styles.Input} onFocus={openTaxPlaceModal} value={TaxPlace} placeholder='Seçiniz' />
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={TaxPlaceModal}
                                onRequestClose={closeTaxPlaceModal}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%' }}>
                                        <Picker
                                            TaxValue={TaxPlace}
                                            onValueChange={(TaxPlaceValue, itemIndex) => {
                                                getTaxPlaceValue(TaxPlaceValue)
                                            }}
                                        >
                                            <Picker.Item label="Cevizli" value="Cevizli" />
                                            <Picker.Item label="Karşıyaka" value="Karşıyaka" />
                                        </Picker>
                                        <Button title="Kapat" onPress={closeTaxPlaceModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View>
                            <Text style={styles.label}>Vergi No</Text>
                            <TextInput style={styles.Input} keyboardType='number-pad' />
                        </View>
                        <View>
                            <Text style={{
                                  bottom: 10,
                                  fontSize: 17,
                                  display:selectedIndex===1? 'none':'flex'
                            }}>TC Kimlik No</Text>
                            <TextInput style={{
                                 height: 45,
                                 backgroundColor: '#FAFAFA',
                                 borderRadius: 6,
                                 padding: 9,
                                 fontSize: 18,
                                 fontWeight: '600',
                                 borderWidth: 1,
                                 borderColor: '#EEEEEE',
                                 display:selectedIndex===1? 'none':'flex'
                            }} keyboardType='number-pad' />
                        </View>
                                <View>
                        <CheckBox
                            checked={checked}
                            onPress={toggleCheckbox}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#284ABB"
                            title={'Kurumsal üyelik sözleşmesini okudum onaylıyorum'}
                        />

                        <CheckBox
                            checked={checked1}
                            onPress={toggleCheckbox1}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#284ABB"
                            title={'Kvkk metnini okudum onaylıyorum'}
                        />
                          <CheckBox
                            checked={checked2}
                            onPress={toggleCheckbox2}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#284ABB"
                            title={'Gizlilik sözleşmesi ve aydınlatma metnini okudum onaylıyorum'}
                        />
                           <CheckBox
                            checked={checked3}
                            onPress={toggleCheckbox3}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#284ABB"
                            containerStyle={{width:'100%',}}
                            title={'Tarafıma elektronik ileti gönderilmesini kabul ediyorum'}
                        />
                        </View>
                        <View style={{
                            width:'100%',
                            height:'2.3%',
                            alignItems:'center'
                    }}>
                        <TouchableOpacity style={{
                            width:'90%',
                            height:'100%',
                            backgroundColor:'#284ABB',
                            justifyContent:'center',
                            borderRadius:8
                    }}>
                        <Text style={{
                            fontSize:25,
                            textAlign:'center',
                            color:'white'
                        }}>Üye Ol</Text>
                        </TouchableOpacity>
                        </View>



                    </View>


                </ScrollView>

            </View>
        </View>
        // </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',

    },
    form: {
        width: '90%',
        height: '100%'


    },
    Input: {
        height: 45,
        backgroundColor: '#FAFAFA',
        borderRadius: 6,
        padding: 9,
        fontSize: 18,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: '#EEEEEE'
    },
    ınputs: {
        gap: 35,
        height: 2200,
        display: 'flex',
        flexDirection: 'column',

        marginTop: 30
    },
    label: {
        bottom: 10,
        fontSize: 17
    },
    SectionInputs: {
        width: '100%',

        backgroundColor: 'red'
    },
    radios: {
        display: 'flex',
        flexDirection: 'row',
        bottom: 30
    }
   
})