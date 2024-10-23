import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AdvertComponent from '../AdvertComponent'
import { useSelector } from 'react-redux';
import { frontEndUriBase } from '../../../../components/methods/apiRequest';
import TextInputAndFilterBtn from '../../../../components/PanelAdvert/TextInputAndFilterBtn';
import PanelTabsHeaderComponent from '../../../../components/PanelAdvert/PanelTabsHeaderComponent';
import { RadioFilter } from '../../../../components';


export default function RejectBalanceForDaily() {
  const SummaryRedux = useSelector(
    (state) => state.summary.dataSummary
  );
  const RejectTotal =
  SummaryRedux?.rental_summary?.sale_prices_sum?.rejected?.reduce(
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
         <PanelTabsHeaderComponent header={'Reddedilen Kazanç Tutarı'} IconStatus={1} IconName={'close'} Price={RejectTotal} IconContainerColor={'#EA2B2E'}/>
       {
        SummaryRedux?.rental_summary?.sale_prices_sum?.rejected.map((item,index)=>(
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