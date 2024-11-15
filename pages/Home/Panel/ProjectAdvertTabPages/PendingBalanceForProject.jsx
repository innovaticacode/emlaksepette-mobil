import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AdvertComponent from '../AdvertComponent'
import { useSelector } from 'react-redux';
import { frontEndUriBase } from '../../../../components/methods/apiRequest';
import TextInputAndFilterBtn from '../../../../components/PanelAdvert/TextInputAndFilterBtn';
import PanelTabsHeaderComponent from '../../../../components/PanelAdvert/PanelTabsHeaderComponent';
import { RadioFilter } from '../../../../components';

export default function PendingBalanceForProject() {
  const SummaryRedux = useSelector(
    (state) => state.summary.dataSummary
  );
  const PendingTotal =
  SummaryRedux?.project_summary?.sale_prices_sum?.pending?.reduce(
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
    ? SummaryRedux?.project_summary?.sale_prices_sum?.pending.filter(item => {
        const title = item.project.project_title.toLowerCase();
        const description =`1000${item.project.id}`;
        const term = searchTerm.toLowerCase();
        return title.includes(term) || description.includes(term);
      })
    : SummaryRedux?.project_summary?.sale_prices_sum?.pending;
  return (
    <ScrollView contentContainerStyle={{gap:10,paddingLeft:10,paddingRight:10}}>
              <TextInputAndFilterBtn openSortModal={setSortLıstModal} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
              <PanelTabsHeaderComponent header={'Onay Bekleyen Kazanç Tutarı'} IconStatus={2} IconName={'clock'} Price={PendingTotal} IconContainerColor={'#FC8F00'}/>
              {
                  filterData.length !==0 &&
                  <View style={{}}>
                  <Text style={{fontSize:15,color:'#333',fontWeight:'600'}}>Kazanç Onayı Bekleyen Konutlar({filterData?.length})</Text>
                </View>
              }
           
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
       
          title={item?.project.project_title}
          ID={item?.project.id}
          ımage={frontEndUriBase+item?.project?.image?.replace("public/", "storage/")}
          price={item?.price}
        />
        ))
      } 
       <RadioFilter selectedIndex={selectedIndex} sortListModal={SortLıstModal} setSortListModal={setSortLıstModal} handleRadio={handleRadio} />
    </ScrollView>
  )
}