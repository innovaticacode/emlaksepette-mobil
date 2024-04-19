import { View, Text } from 'react-native'
import React,{useState} from 'react'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
export default function PaymentProcces() {
    const [openAccor, setopenAccor] = useState(false)
    const [openAccor2, setopenAccor2] = useState(false)
  return (
    <View style={{gap:15,paddingBottom:100}}>
       <Collapse onToggle={()=>setopenAccor(!openAccor)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Sat Kirala sistemi ile yayınladığım ilanımın fiyatı nasıl belirleniyor?</Text>
        <Icon name=  {openAccor? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15}} >
      <Text style={{color:'#696969'}}>Web sitemiz yada mobil uygulamamız üzerinden bize ulaştırdığınız gayrimenkulün fiyatını piyasa koşullarına göre serbest bir şekilde siz belirlersiniz.</Text>
    </CollapseBody>
</Collapse>
<Collapse onToggle={()=>setopenAccor2(!openAccor2)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Satış gerçekleştiğinde mülk sahibinden komisyon alınıyormu?</Text>
        <Icon name=  {openAccor2? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15}} >
      <Text style={{color:'#696969'}}>Sat Kirala sistemine katılım ücretsizdir. Gayrimenkulünü satmak isteyen kullanıcılarımızdan herhangi bir komisyon veya ücret alınmamaktadır.</Text>
    </CollapseBody>
</Collapse>
    </View>
  )
}