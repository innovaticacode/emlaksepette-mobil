import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Animated, Keyboard } from 'react-native'
import { useState, useRef } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import OfferCheckbox from './profileComponents/OfferCheckbox';
import ListCheckBox from './profileComponents/ListCheckBox';
export default function Offer() {
  const [OfferPrice, setOfferPrice] = useState(0)
  const route = useRoute();

  const translateY = useRef(new Animated.Value(400)).current;
  const [selectedPressAl, setSelectedPresAll]=useState(false);
  const [display, setdisplay] = useState(false)

  const openSheet = () => {
    setdisplay(true)

    Animated.timing(translateY, {

      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  const closeSheet = () => {
    setdisplay(false)
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const [isSelected, setisSelected] = useState(false)
  const [estateName, setestateName] = useState('')
  const handlePres = (text) => {
    setisSelected(text)
    openSheet()

  }
  const ChooseEstate = (item) => {
    setestateName(item)
   
  }
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (value) => {
    const index = checkedItems.indexOf(value);
    if (index === -1) {
      setCheckedItems([...checkedItems, value]);
    } else {
      const newCheckedItems = [...checkedItems];
      newCheckedItems.splice(index, 1);
      setCheckedItems(newCheckedItems);
    }
  };

  const handleSelectAll = () => {

   
    if (checkedItems.length === options.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(options.map((option, index) => index));
    }
  };

  const [check, setcheck] = useState(1)

  const Projectdata={
    a:[
      {id:1,title:'Master Sonsuz Tail Köyü'},
      {id:2,title:'Master Köy Evleri'}
    ],
    b:[
      {id:1,title:'Konya Kandıra'},
      {id:2,title:'Sakarya Bungalov'}
    ]
  }


  const [selectedArray, setSelectedArray] = useState('a')

  const options = [
    { label: 'Seçenek 1' },
    { label: 'Seçenek 2' },
    { label: 'Seçenek 3' },
    { label: 'Seçenek 3' },
    { label: 'Seçenek 3' },
    { label: 'Seçenek 3' },
    { label: 'Seçenek 3' },
    { label: 'Seçenek 3' },
    // Diğer seçenekler buraya eklenebilir
  ];
const Realtor=[
  {label:'Tiny House'},
  {label:'Villa'}
]


  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }} onTouchStart={() => closeSheet} >
        <View style={styles.container} onTouchStart={() => {
          Keyboard.dismiss()
          closeSheet()
        }} >
          <View style={styles.Offer}>
            <View style={styles.Ticket1}>
              <Text style={{ fontSize: 17, textAlign: 'center', color: '#EA2C2E', fontWeight: '400' }}>Kampanya Tutarı</Text>
              <View style={{ backgroundColor: 'transparent', width: '100%', padding: 10, }}>
                <Text style={{ fontSize: 19,  textAlign: 'center', fontWeight: 'bold', color: 'green' }}>{OfferPrice === 0 ? 0 : OfferPrice} ₺</Text>
              </View>

            </View>
            <View style={styles.ınputs}>
              <View>
                <Text style={styles.Label}>İndirim Tutarı (TL)</Text>
                <TextInput style={styles.Input} keyboardType='numeric'
                  value={OfferPrice}
                  onChangeText={setOfferPrice}
                />
              </View>
              <View>
                <Text style={styles.Label}>Türü</Text>
                <TouchableOpacity style={styles.Input}
                  onPress={() => {
                    handlePres('Type')
                  }}
                >

                  <Text style={{ fontSize: 15, color: 'grey' }}>{check == 1 ? 'Emlak İlanları' : 'Proje'}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.Label}>{check == 1 ? 'Emlak İlanları' : 'Proje'}</Text>
                <TouchableOpacity style={styles.Input}
                  onPress={() => {
                    handlePres('Konut')
                  }}
                >

                  <Text style={{ fontSize: 15, color: 'grey' }}>

                    {estateName === '' ? 'Seçiniz' : estateName}

                  </Text>
                </TouchableOpacity>
              </View>

              {
                check == 2 ?
                  <>

                    <View style={{ height: 300, gap: 9 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5 }} onPress={() => {

                        }}  >
                          <Text style={{ color: 'white' }}>Seçilenlere Uygula</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, paddingLeft: 10, paddingRight: 10 }} onPress={() => {
                          handleSelectAll()
                        }}>
                          <Text style={{ color: 'white' }}>Tümüne Uygula</Text>
                        </TouchableOpacity>
                        {/* <ListCheckBox
                          title="Tümünü Seç"
                          checked={checkedItems.length === options.length}
                          onPress={handleSelectAll}
                        /> */}
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                          <Text style={{ color: 'white' }}>Kapat</Text>
                        </TouchableOpacity>
                      </View>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ gap: 8 }}>

                       
                      {
                        
                      }
                          {Projectdata[selectedArray].map((item,index)=>(
                              <ListCheckBox key={index} title={item.title}
                              checked={checkedItems.includes(index)}
                              onPress={() => toggleItem(index)} />
                            ))}

                        </View>
                      </ScrollView>
                    </View>

                  </> : <>


                    <View style={{ height: 300, gap: 9 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5 }} onPress={() => {

                        }}  >
                          <Text style={{ color: 'white' }}>Seçilenlere Uygula</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, paddingLeft: 10, paddingRight: 10 }} onPress={() => {
                          setSelectedPresAll(!selectedPressAl)
                          handleSelectAll()
                        }}>
                          <Text style={{ color: 'white' }}>{selectedPressAl? 'Hepsini Kaldır':'Hepsini Seç'}</Text>
                        </TouchableOpacity>
                        {/* <ListCheckBox
      title="Tümünü Seç"
      checked={checkedItems.length === options.length}
      onPress={handleSelectAll}
    /> */}
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                          <Text style={{ color: 'white' }}>Kapat</Text>
                        </TouchableOpacity>
                      </View>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ gap: 8 }}>

                          {Realtor.map((option, index) => (
                            <ListCheckBox key={index} title={option.label}
                              checked={checkedItems.includes(index)}
                              onPress={() => toggleItem(index)} />
                          ))}

                        </View>
                      </ScrollView>
                    </View>
                  </>
              }




              <View>
                <Text style={styles.Label}>Giriş Tarihi</Text>
                <TouchableOpacity style={styles.Input}
                  onPress={() => {
                    handlePres('Entre')
                  }}
                >

                  <Text style={{ fontSize: 15, color: 'grey' }}>Seçiniz</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.Label}>Çıkış Tarihi</Text>
                <TouchableOpacity style={styles.Input} onPress={() => {
                  handlePres('Exit')
                }}>

                  <Text style={{ fontSize: 15, color: 'grey' }}>Seçiniz</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
          <View style={{ padding: 18 }}>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 6 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Ekle</Text>
            </TouchableOpacity>
          </View>

        </View>


      </ScrollView>

                


      <View style={{ flex: 1, position: 'absolute', bottom: 0, width: '100%', display: display == false ? 'none' : 'flex' }}>

        <Animated.View
          style={[styles.animatedView, { transform: [{ translateY }], }]}>

          <View style={{ width: '100%', }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ width: 40, height: 7, backgroundColor: '#ebebeb', borderRadius: 10 }} onPress={closeSheet}>

              </TouchableOpacity>
            </View>

            <View style={{ gap: 18, height: isSelected == 'Konut' ? 300 : 'auto' }}>
              {
                isSelected == 'Type' ?
                  <>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 20, alignItems: 'center', gap: 10 }}
                      onPress={() => {
                        setcheck(1)
                        setTimeout(() => {
                          closeSheet()
                        }, 1000);
                      }}
                    >

                      <Icon name={check == 1 ? 'checksquare' : 'check'} size={16} color={check == 1 ? 'green' : 'white'} />

                      <Text>Emlak ilanları</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 20, alignItems: 'center', gap: 10 }}
                      onPress={() => {
                        setcheck(2)

                        setTimeout(() => {
                          closeSheet()
                        }, 1000);

                      }}
                    >

                      <Icon name={check == 2 ? 'checksquare' : 'check'} size={16} color={check == 2 ? 'green' : 'white'} />


                      <Text>Proje</Text>
                    </TouchableOpacity>

                  </> : ''
              }


              {
                isSelected == 'Konut' ?
                  <>

                    {
                      check == 1 ?
                        <>
                          <View style={{ paddingTop: 20, gap: 10 }}>
                            <OfferCheckbox title={'Tiny House'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                            <OfferCheckbox title={'Apart Otel'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />

                          </View>

                        </> :
                        <>
                          <ScrollView>
                            <View style={{ paddingTop: 20, gap: 10 }}>

                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master '} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />
                              <OfferCheckbox title={'Master Sonsuz tatil Köyü'} closeSheet={closeSheet} ChooseEstate={ChooseEstate} />

                            </View>
                          </ScrollView>
                        </>

                    }


                  </> : ''
              }
            </View>





          </View>


        </Animated.View>
      </View>
     
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  
  },
  Offer: {
    padding: 20,
    gap: 1
  },
  Ticket1: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    gap: 30,
    paddingVertical: 25,
    paddingHorizontal: 10,
    width: '100%',


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
  ınputs: {
    paddingTop: 20,
    gap: 20
  },
  Input: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#ebebeb',
    paddingLeft: 20
  },
  Label: {
    fontSize: 14,
    bottom: 3,
    left: 6,
    fontWeight: '300',
    letterSpacing: 0.5,
  
  },
  animatedView: {


    alignItems: "center",
    justifyContent: "center",

    backgroundColor: '#FFF',
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

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 20,
  },
})

