import { View, Text, ScrollView, TextInput ,TouchableOpacity} from "react-native";
import React from "react";
import AdvertComponent from "../AdvertComponent";
import { useSelector } from "react-redux";
import { frontEndUriBase } from "../../../../components/methods/apiRequest";
import PanelTabsHeaderComponent from "../../../../components/PanelAdvert/PanelTabsHeaderComponent";

import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { RadioFilter } from "../../../../components";
import TextInputAndFilterBtn from "../../../../components/PanelAdvert/TextInputAndFilterBtn";
import { useState } from "react";
export default function RejectBalance() {
  const SummaryRedux = useSelector((state) => state.summary.dataSummary);
  const RejectedTotal =
  SummaryRedux?.estate_summary?.sale_prices_sum?.rejected?.reduce(
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
    ? SummaryRedux?.estate_summary?.sale_prices_sum?.rejected.filter(item => {
        const title = item.housing.title.toLowerCase();
        const description = `2000${item.housing.id}`;
        const term = searchTerm.toLowerCase();
        return title.includes(term) || description.includes(term);
      })
    : SummaryRedux?.estate_summary?.sale_prices_sum?.rejected;

  return (
    <ScrollView contentContainerStyle={{gap:10,paddingLeft:10,paddingRight:10}}>
          <TextInputAndFilterBtn openSortModal={setSortLıstModal} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <PanelTabsHeaderComponent header={'Reddedilen Kazanç Tutarı'} IconStatus={1} IconName={'close'} Price={RejectedTotal} IconContainerColor={'#EA2B2E'}/>
            {
              filterData?.length!==0 &&
              <View style={{}}>
              <Text style={{fontSize:15,color:'#333',fontWeight:'600'}}>Kazancı Reddedilen Konutlar({filterData?.length})</Text>
            </View>
            }

          { 
      (searchTerm && filterData.length==0)?
      <View>
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
  );
}
