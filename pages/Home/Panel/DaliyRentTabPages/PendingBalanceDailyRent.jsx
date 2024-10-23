import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AdvertComponent from '../AdvertComponent'
import { useSelector } from 'react-redux';
import { frontEndUriBase } from '../../../../components/methods/apiRequest';
import PanelTabsHeaderComponent from '../../../../components/PanelAdvert/PanelTabsHeaderComponent';
import TextInputAndFilterBtn from '../../../../components/PanelAdvert/TextInputAndFilterBtn';
import { RadioFilter } from '../../../../components';


export default function PendingBalanceForDailyRent() {
  const SummaryRedux = useSelector(
    (state) => state.summary.dataSummary
  );
  const pendingTotal =
  SummaryRedux?.rental_summary?.sale_prices_sum?.pending?.reduce(
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
  return (
    <ScrollView contentContainerStyle={{gap:10,paddingLeft:10,paddingRight:10}}>
       <TextInputAndFilterBtn openSortModal={setSortLıstModal}/>
            <PanelTabsHeaderComponent header={'Onay Bekleyen Kazanç Tutarı'} IconStatus={2} IconName={'clock'} Price={pendingTotal} IconContainerColor={'#FC8F00'}/>
            {
              SummaryRedux?.rental_summary?.sale_prices_sum?.pending.length!==0 &&
              <View style={{}}>
              <Text style={{fontSize:15,color:'#333',fontWeight:'600'}}>Kazanç Getiren Konutlar ({SummaryRedux?.rental_summary?.sale_prices_sum?.pending.length})</Text>
              </View>
            }
       {
        SummaryRedux?.rental_summary?.sale_prices_sum?.pending.map((item,index)=>(
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