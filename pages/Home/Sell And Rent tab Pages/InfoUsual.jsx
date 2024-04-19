import { View, Text ,StyleSheet} from 'react-native'
import React,{useState} from 'react'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default function InfoUsual() {
  const [openAccor, setopenAccor] = useState(false)
  const [openAccor2, setopenAccor2] = useState(false)
  const [openAccor3, setopenAccor3] = useState(false)
  const [openAccor4, setopenAccor4] = useState(false)
  const types=[
    "Arsa",
    "Konut",
    "İşyeri",
    "Turistik Tesis",
    "Devre Mülk",
    "Prefabrik Bina"
  ]
  const explain=[
    "Web sitemiz veya mobil uygulamamız üzerinden ilan bilgileri girilir",
    "Kriterlere uygun ilanlar onaylanır.",
    "Emlak sepette sistemine dahil olan kurumsal satıcılara ilanınız ulaştırılır.",
    "Sat Kirala sistemine dahil olan kurumsal satıcılara ulaştırılır.",
    "Kurumsal satıcımız sizinle temas kurarak gayrimenkulünüzün Fotoğraf çekimleri, değerleme, potansiyel alıcı/müşteri bulma, satış sürecindeki devir ve tüm yasal işlemleri adınıza takip etmektedir.",
    "Satış süreci olumlu tamamlandığında noter ve devi işlemleri sonrasında satışınız tamamlanmış olur.",
  ]
  return (
    <View style={{gap:15,paddingBottom:100}}>
       
    <Collapse onToggle={()=>setopenAccor(!openAccor)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Sat Kirala Nedir?</Text>
        <Icon name=  {openAccor? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15}} >
      <Text style={{color:'#696969'}}>Sat kirala sistemi gayrimenkullerini hızlı güvenli ve değerinde satmak isteyen bireysel satıcıların gayrimenkullerin platforma kayıtlı kurumsal emlak firmaları vasıtasıyla satışını sağlayan bir hizmettir.</Text>
    </CollapseBody>
</Collapse>
<Collapse onToggle={()=>setopenAccor2(!openAccor2)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Hangi Gayrimenkuller Sat Kirala ile satılabilir</Text>
        <Icon name=  {openAccor2? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15,gap:7}} >
        {
            types.map((item,index)=>(
                <View key={index} style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <View style={{width:8,height:8,backgroundColor:'#696969',borderRadius:10}}/>
                <Text style={{color:'#696969',fontSize:13}}>{item}</Text>
            </View> 
            ))
        }
          
    </CollapseBody>
</Collapse>
<Collapse onToggle={()=>setopenAccor3(!openAccor3)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Süreç Nasıl İşlyor</Text>
        <Icon name=  {openAccor3? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15,gap:8,}} >
    {
            explain.map((item,index)=>(
                <View key={index} style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <View style={{width:8,height:8,backgroundColor:'#696969',borderRadius:10}}/>
                <Text style={{color:'#696969',fontSize:13}}>{item}</Text>
            </View> 
            ))
        }
    </CollapseBody>
</Collapse>
<Collapse onToggle={()=>setopenAccor4(!openAccor4)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Satış süreci ne kadar sürüyor</Text>
        <Icon name=  {openAccor4? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{padding:15}} >
      <Text style={{color:'#696969'}}> İlanınız kurumsal satıcımıza ulaştığında onayınız doğrultusunda minimum 90 gün olmak üzere kurumsal satıcımız ile yapacağınız yetkilendirme sözleşmesi süresi boyunca satış süreçleri tarafımızdan yönetilir. Satış gerçekleşmediği taktirde onayınız doğrultusunda hiçbir bedel ödemeden satış sürecini sonlandırabilirsiniz.</Text>
    </CollapseBody>
</Collapse>
    </View>
  )
}
const styles = StyleSheet.create({})
