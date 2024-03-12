import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert, TouchableWithoutFeedback } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
export default function RegisterRealtorClub({setİsLoggedIn}) {
    const route = useRoute();
    const navigation=useNavigation()
    
    const [tcNo, setTcNo] = useState('');

    const onChangeTC = (text) => {
      // Girilen metindeki sadece rakamları al
      const cleanedText = text.replace(/[^0-9]/g, '');
      // Temizlenmiş metni 3-2-2-2-2 formatında düzenle
      let formattedTcNo = '';
      for (let i = 0; i < cleanedText.length; i++) {
        if (i === 3 || i === 5 || i === 7 || i === 9) {
          formattedTcNo += ' ';
        }
        formattedTcNo += cleanedText[i];
      }
      setTcNo(formattedTcNo);
    };

    const [iban, setIban] = useState('TR');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onChangeText = (text2) => {
      // Girilen metindeki sadece rakamları al
      const cleanedText = text2.replace(/[^0-9]/g, '');
      // Temizlenmiş metni 3-3-2-2 formatında düzenle
      let formattedPhoneNumber = '';
      for (let i = 0; i < cleanedText.length; i++) {
        if (i === 4 || i === 7 || i === 9)  {
          formattedPhoneNumber += ' ';
        }
        formattedPhoneNumber += cleanedText[i];
      }
      setPhoneNumber(formattedPhoneNumber);
    };


  const onChangeText2 = (text) => {
    // Girilen metindeki harf ve rakamları temizle
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, '');
    // Temizlenmiş metni dört karakterden bir boşluk ekleyerek formatla
    let formattedIban = '';
    for (let i = 0; i < cleanedText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedIban += ' ';
      }
      formattedIban += cleanedText[i];
    }
    setIban(formattedIban);
  };

  const onFocus = () => {
    // IBAN alanı boşsa, varsayılan değeri göster
    if (iban.length<2) {
      setIban('TR');
    } 
  };
  const [fullName, setFullName] = useState('');

  const onChangeFullName = (text) => {
    const capitalizedText = text
      .split(' ')
      .map((word, index) => index === 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
      .join(' ');
    setFullName(capitalizedText);
  };
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Emlak Sepette | Emlak Kulüp Başvurusu</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.FormContainer}>
                    <View style={styles.Inputs}>
                        <View>
                            <Text style={styles.Label}>Telefon</Text>
                            <TextInput
                                style={styles.Input}
                             value={phoneNumber}
                             onChangeText={onChangeText}
                            keyboardType="phone-pad" 
                            />
                        </View>
                        <View>
                            <Text style={styles.Label}>Tc Kimlik No</Text>
                            <TextInput style={styles.Input} keyboardType='number-pad' 
                            value={tcNo}
                            onChangeText={onChangeTC}
                            maxLength={15}
                            />
                        </View>
                        <View>
                            <Text style={styles.Label}>Banka Alıcı Adı</Text>
                            <TextInput style={styles.Input} 
                                  value={fullName}
                                  onChangeText={onChangeFullName}
                            />
                        </View>
                        <View>
                            <Text style={styles.Label}>Iban Numarası</Text>
                            <TextInput style={styles.Input} keyboardType='number-pad'
                             value={iban}
                             onChangeText={onChangeText2}
                             onFocus={onFocus}
                             maxLength={28} 
                            />
                        </View>
                    </View>
                    <View style={{alignItems:'center',top:10}}>
                        <TouchableOpacity style={{backgroundColor:'#E54242',width:'70%',padding:10}} onPress={()=>{
                           
                           if (fullName===''  || phoneNumber==='' || tcNo==='' || iban.length<28) {
                               Alert.alert('Lütfen Tüm Alanları Doldurunuz!')
                           }else{
                            setİsLoggedIn(true)
                            navigation.navigate('ShopProfile')
                           }
                            

                        }}>
                            <Text style={{textAlign:'center',color:'white',fontSize:17,fontWeight:'500'}}>Üye Ol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb'
    },
    headerText: {
        fontSize: 16,
        fontWeight: '300',
       
        textAlign: 'center'
    },
    FormContainer: {
        backgroundColor: '#FFFFFF',

        paddingVertical: 25,
        paddingHorizontal: 5,
        width: '90%',
        marginVertical: 10,

        borderWidth: 0.7,
        borderColor: '#e6e6e6',
        ...Platform.select({
            ios: {
                shadowColor: ' #e6e6e6',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),

    },
    Inputs: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: 10,
        gap: 15

    },
    Input: {
        backgroundColor: '#ebebebba',
        marginTop: 10,
        padding: 13,
        fontSize: 17,
        borderRadius: 4,

    },
    Label: {
        top: 5,
        color:'#131313'
    }
})