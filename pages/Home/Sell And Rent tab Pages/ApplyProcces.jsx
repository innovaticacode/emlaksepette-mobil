import { View, Text } from 'react-native'
import React,{useState} from 'react'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default function ApplyProcces() {
    const [openAccor2, setopenAccor2] = useState(false)

    const types=[
       " Başvuruyu yapan kişinin mutlaka tapu sahibi olması gerekmektedir.",
       " Gayrimenkul üzerinde satışa engel oluşturacak kredi, rehin gibi borçlar bulunmamalıdır.",
       "İlanınızın satışa çıkarılmasına onay verdiğinizde minimum 90 gün olarak düzenlenmiş yetkilendirme sözleşmesi gerekmektedir.",
       " Bu şartları sağladığınızda gayrimenkulünüz satış süreci başlatılmış olur."
      ]
  return (
    <View style={{paddingBottom:100}}>
<Collapse onToggle={()=>setopenAccor2(!openAccor2)} >
    <CollapseHeader>
      <View style={{backgroundColor:'#F8F8F8',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#4686FB'}}>Başvuru ve Onay Süreci</Text>
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
    </View>
  )
}