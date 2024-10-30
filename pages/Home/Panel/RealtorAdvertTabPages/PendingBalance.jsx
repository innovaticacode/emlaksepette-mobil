import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import AdvertComponent from '../AdvertComponent'
import { useSelector } from 'react-redux';
import { frontEndUriBase } from '../../../../components/methods/apiRequest';
import PanelTabsHeaderComponent from '../../../../components/PanelAdvert/PanelTabsHeaderComponent';
import { TextInput } from 'react-native';
import { Platform } from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { RadioFilter } from '../../../../components';
import TextInputAndFilterBtn from '../../../../components/PanelAdvert/TextInputAndFilterBtn';
export default function PendingBalance() {
  const SummaryRedux = useSelector(
    (state) => state.summary.dataSummary
  );
  const PendingTotal =
  SummaryRedux?.estate_summary?.sale_prices_sum?.pending?.reduce(
    (accumulator, item) => {
      return accumulator + item.price;
    },
    0
  );
  const [SortLıstModal, setSortLıstModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [selectedIndex, setIndex] = useState(null);

  const handleRadio = (index, sort) => {
    setIndex(index);
    setTimeout(() => {
      setSortLıstModal(false);
    
    }, 600);
  };
  const [searchTerm, setSearchTerm] = useState('');

  // Eğer arama terimi boşsa tüm veriyi göster, değilse filtrele
  const filterData = searchTerm
    ? SummaryRedux?.estate_summary?.sale_prices_sum?.pending.filter(item => {
        const title = item.housing.title.toLowerCase();
        const description = `2000${item.housing.id}`;
        const term = searchTerm.toLowerCase();
        return title.includes(term) || description.includes(term);
      })
    : SummaryRedux?.estate_summary?.sale_prices_sum?.pending;
  return (
    <ScrollView contentContainerStyle={{gap:10,paddingLeft:10,paddingRight:10}}>
        <TextInputAndFilterBtn openSortModal={setSortLıstModal} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <PanelTabsHeaderComponent header={'Onay Bekleyen Kazanç Tutarı'} IconStatus={2} IconName={'clock'} Price={PendingTotal} IconContainerColor={'#FC8F00'}/>
        <View style={{}}>
            <Text style={{fontSize:15,color:'#333',fontWeight:'600'}}>Kazanç Onayı Bekleyen Konutlar({filterData?.length})</Text>
          </View>
      { 
      (searchTerm && filterData.length==0)?
      <View >
        <Text style={{textAlign:'center',color:'#333',fontSize:14}}>Sonuç Bulunmadı</Text>
      </View>
      :
        filterData?.map((item,index)=>(
          <AdvertComponent
          item={item}
          key={index}
          title={item?.housing.title}
          ID={item?.housing.id}
          ımage={
            item &&
            item?.housing &&
            item?.housing.housing_type_data &&
            frontEndUriBase + 'housing_images/'+JSON.parse(item?.housing.housing_type_data)["image"]
          }
          price={item?.price}
        />
        ))
      } 
          <RadioFilter selectedIndex={selectedIndex} sortListModal={SortLıstModal} setSortListModal={setSortLıstModal} handleRadio={handleRadio} />
    </ScrollView>
  )
}
const styles = StyleSheet.create({

  card2: {
      flexDirection:'row'
      },

  IconContainer:{
        backgroundColor:'transparent',
        borderRightColor:'#F6F6F6',
        borderTopRightRadius:12,
        borderBottomRightRadius:12,
        borderRightWidth:5,
        alignItems:'center',
        justifyContent:'center',
        width:'20%'
  },
  Input: {
    backgroundColor: "#ebebeb",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#0c03033d",
  },
  modalContent: {
    gap: 5,
    paddingBottom: 25,
    backgroundColor: "#ffffff",
    padding: 10,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});