import {
    View, Text, StyleSheet,
    ScrollView, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    LayoutAnimation,
    UIManager,
} from 'react-native'
import { React, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import EyeIcon from "react-native-vector-icons/Ionicons"
import { CheckBox } from '@rneui/themed';
import ıcon from "react-native-vector-icons/SimpleLineIcons"
import AccordionItem from './AccordionItem';






UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const Accordion = ({ title, children, index, selectedIndex, setSelectedIndex }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);


    };

    return (
        <View>
            <TouchableOpacity style={styles.row} onPress={toggleExpand}>
                <View style={{ flex: 1.8 / 2 }}>
                    <Text style={[styles.title, { color: '#333' }]}>{title}</Text>
                </View>
                <View style={{ flex: 0.1 / 2 }}>
                    <ıcon name={expanded ? 'arrow-down' : 'arrow-right'} color={'grey'} />
                </View>


            </TouchableOpacity>
            {expanded && <View style={styles.child}>{children}</View>}
        </View>
    );
};

export default function Company() {
    const [accounttype, setaccounttype] = useState('')
    const [focusArea, setfocusArea] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [eye, seteye] = useState('eye-off-sharp')
    const [Show, setShow] = useState(false)
    const show = () => {
        setShow(!Show)
    }
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const toggleCheked = () => setChecked(!checked)
    const toggleCheked1 = () => setChecked1(!checked1)
    const toggleCheked2 = () => setChecked2(!checked2)
    const toggleCheked3 = () => setChecked3(!checked3)
    
    const chooseAccount=(text)=>{
            setaccounttype(text)
    }
    const chooseArea=(text)=>{
        setfocusArea(text)
}
    const focusarea=[
        {title:'İnşaat'},
        {title:'Emlak'}
    ]
    const chooseAccountItems=[
        {title:'İnşaat'},
        {title:'Emlak'}
    ]

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ padding: 15, gap: 20 }}>

                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>E-Posta</Text>
                            </View>
                            <TextInput style={styles.Input} placeholder='example@gmail.com' />
                        </View>

                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Cep Telefonu</Text>
                            </View>
                            <TextInput style={styles.Input} placeholder='' keyboardType='number-pad' />
                        </View>

                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Şifre</Text>
                            </View>
                            <View>
                                <TextInput style={styles.Input} placeholder='*********' secureTextEntry={Show ? false : true} />
                                <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 9 }} onPress={show}>
                                    <EyeIcon name={Show ? 'eye' : 'eye-off-sharp'} size={20} color={'#333'} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Yetkili İsim Soyisim</Text>
                            </View>
                            <TextInput style={styles.Input} placeholder='' />
                        </View>

                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Firma Adı</Text>
                            </View>
                            <TextInput style={styles.Input} placeholder='' />
                        </View>
                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Sabit Telefon</Text>
                            </View>
                            <TextInput style={styles.Input} placeholder='' keyboardType='number-pad' />
                        </View>
                        <View style={{ gap: 5 }}>
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Iban</Text>
                            </View>
                            <TextInput style={styles.Input} placeholder='' keyboardType='number-pad' />
                        </View>
                        <View style={{gap:5}}>
                            <View style={{paddingLeft:5}}>
                            <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Kurumsal Hesap Türü</Text>  
                            </View>
                       
            <Accordion
                title={accounttype}
                index={0}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <ScrollView style={{height:100,}} nestedScrollEnabled={true}>
                    <View style={{gap:10}}>

                        {
                            chooseAccountItems.map((item,index)=>(
                                <TouchableOpacity key={index} onPress={()=>{
                                       chooseAccount(item.title)
                                }}>
                                <AccordionItem text={item.title}/>
                                </TouchableOpacity>
                            ))
                        }
                      
                
               
                

                  
                    </View>
                </ScrollView>
                
              </Accordion>
              </View>
              <View style={{gap:5}}>
                            <View style={{paddingLeft:5}}>
                            <Text style={{ fontSize: 14, color: 'grey', fontWeight: 600 }}>Faailyet Alanınız</Text>  
                            </View>
                       
            <Accordion
                title={focusArea}
                index={1}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <ScrollView style={{height:100,}} nestedScrollEnabled={true}>

                    <View style={{gap:10}}>
                        {
                            focusarea.map((item,index)=>(
                                <TouchableOpacity key={index}
                                    onPress={()=>{
                                        chooseArea(item.title)
                                    }}
                                >
                                <AccordionItem  text={item.title}/>
                                </TouchableOpacity>
                            ))
                        }
                    
                 
                
                

                  
                    </View>
                </ScrollView>
                
              </Accordion>
              </View>

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
                                    <Text>
                                        <Text style={{ color: '#027BFF', fontSize: 13 }}>   Bireysel üyelik sözleşmesini</Text>
                                        <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>

                                    </Text>
                                }
                                textStyle={{ fontSize: 13, fontWeight: 400 }}
                                size={22}
                                containerStyle={{ padding: 0, width: '100%' }}
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
                                    <Text>
                                        <Text style={{ color: '#027BFF', fontSize: 13 }}>   Kvkk metnini</Text>
                                        <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>

                                    </Text>
                                }
                                textStyle={{ fontSize: 13, fontWeight: 400 }}
                                size={22}
                                containerStyle={{ padding: 1, }}
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
                                            <Text style={{ color: '#027BFF', fontSize: 13 }}>Gizlilik sözleşmesi ve aydınlatma metnini</Text>
                                            <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>

                                        </Text>
                                    </View>
                                }

                                textStyle={{ fontSize: 13, fontWeight: 400 }}
                                size={22}
                                containerStyle={{ padding: 1, }}
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
                                        <Text>Tarafıma elektronik ileti gönderilmesini kabul ediyorum.</Text>
                                    </View>
                                }
                                textStyle={{ fontSize: 13, fontWeight: 400 }}
                                size={22}
                                containerStyle={{ padding: 1, }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#E54242', padding: 9, borderRadius: 10, width: '90%' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' }}>Üye Ol</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    Input: {
        padding: 9,
        borderWidth: 1,
        borderColor: '#ebebeb',
        borderRadius: 5,
        backgroundColor: '#FAFAFA'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        padding: 11,
      borderWidth:1,
      borderRadius:5,
      borderColor:'#ebebeb',
      backgroundColor:'#FAFAFA'
    
    
      },
      title: {
        fontSize: 14,
        color: 'grey', 
        fontWeight: 600,
        
      },
      child:{
        backgroundColor:'#fff',
        paddingTop:10,
        borderWidth:1,
        borderColor:'#D1D5DB',
        borderTopColor:'white',
        borderRadius:5,
        padding:10
      },
})