import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import * as Clipboard from "expo-clipboard";
export default function EftPay() {
    const [selectedIban, setselectedIban] = useState(false)
    const [selectedBank, setselectedBank] = useState(0)
    const [showCopyAlert, setshowCopyAlert] = useState(false)
    const [showCopyAlert2, setshowCopyAlert2] = useState(false)
    const [showPaymentAccountName, setshowPaymentAccountName] = useState(false)
    const IbanControl=(Iban)=>{
        setselectedIban(Iban)
        setshowPaymentAccountName(true)
        Clipboard.setStringAsync(Iban);
    }

  return (
    <View style={{gap:10}}>
            <View style={{gap:10}}>
                <Text style={{color:'#696969'}}>EFT/Havale yapacağınız bankayı seçniz</Text>
                <Text style={{color:'#696969'}}>1. <Text style={{color:'red'}}>2000047</Text> Kodunu EFT/Havale açıklama alanına yazdığınızdan emin olun</Text>
            </View>
            <View style={{alignItems:'center',gap:10}}>
                <TouchableOpacity style={{width:300,height:150,borderWidth:selectedBank==1? 1:0,padding:10,borderColor:'red'}}
                    onPress={()=>{
                        IbanControl('TR45 0006 2000 7030 0006 2959 64')
                        setselectedBank(1)
                        setshowCopyAlert(true)
                        setTimeout(() => {
                            setshowCopyAlert(false)
                        }, 1000);

                    }}
                >
                        <Text style={{textAlign:'center',color:'green',display:showCopyAlert? 'flex':'none'}}>IBAN Kopyalandı</Text>
                    <ImageBackground style={{width:'100%',height:'100%'}} source={require('./Garanti.png')} resizeMode='contain'/>
                </TouchableOpacity>

                <TouchableOpacity style={{width:300,height:150,padding:10,borderWidth:selectedBank==2? 1:0,borderColor:'red'}}
                     onPress={()=>{
                        IbanControl('TR16 0001 0020 9997 7967 8350 01')
                        setselectedBank(2)
                        setshowCopyAlert2(true)
                        setTimeout(() => {
                            setshowCopyAlert2(false)
                        }, 1000);
                    }}
                >
                <Text style={{textAlign:'center',color:'green',display:showCopyAlert2? 'flex':'none'}}>IBAN Kopyalandı</Text>
                    <ImageBackground style={{width:'100%',height:'100%'}} source={require('./Ziraat.png')} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <View style={{padding:10,gap:20,display:showPaymentAccountName?'flex':'none'}}>
                <View style={{}}>
                    <Text>Hesap Sahibinin Adı Soyadı : <Text style={{fontWeight:'bold'}}>Master Girişim Bilgi Teknolojileri Gayrimenkul Yatırım ve Pazarlama AŞ</Text></Text>
                </View>
                <View>
                    <Text>IBAN: <Text style={{fontWeight:'bold'}}>{selectedIban}</Text></Text>
                </View>
            </View>

            <View>
                <Text style={{color:'#696969',fontSize:15}}>
                Ödeme işlemini tamamlamak için, lütfen bu <Text style={{color:'red'}}>2000247</Text> kodu kullanarak ödemenizi yapın. IBAN açıklama alanına bu kodu eklemeyi unutmayın. Ardından <Text style={{color:'red'}}>Dekont Ekleyin</Text>  Ve <Text style={{color:'red'}}>"Ödemeyi Tamamla" </Text>düğmesine tıklayarak işlemi bitirin.
                </Text>
            </View>
            <View style={{padding:10,paddingTop:20}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor: '#000000', padding:13,justifyContent:'center',gap:15,borderRadius:5 ,width:'50%'}}>
                <Icon name='link' color={'white'} size={17}/>
                <Text style={{color:'white'}}>Dekont Ekle</Text>
            </TouchableOpacity>
          </View>

            <View style={{padding:10,paddingTop:20}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor: '#29A745', padding:13,justifyContent:'center',gap:15,borderRadius:5 }}
              
            >
                <Text style={{color:'white'}}>Ödemeyi Tamamla</Text>
            </TouchableOpacity>
          </View>
    </View>
  )
}
const styles = StyleSheet.create({})