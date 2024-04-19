import { View, Text } from 'react-native'
import React,{useState} from 'react'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
export default function DateProcces() {
    const [openAccor, setopenAccor] = useState(false)
  return (
    <View style={{paddingBottom:100}}>
      <Collapse onToggle={()=>setopenAccor(!openAccor)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Sat Kirala üzerinden nasıl randevu alabilirim?</Text>
        <Icon name=  {openAccor? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15}} >
      <Text style={{color:'#696969'}}>Web sitemiz yada mobil uygulamamız üzerinden girdiğiniz ilanınız onaylandıktan sonra binlerce kurumsal mağazamız içerisinden lokasyonunuza en uygun konumdaki kurumsal satıcımız size ulaşıp randevu alacaktır.</Text>
    </CollapseBody>
</Collapse>
    </View>
  )
}