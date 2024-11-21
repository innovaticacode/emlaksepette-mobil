import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

export default function PaymentItem({
  header,
  price,
  dFlex,
  date,
  align,
  top,
  color,
  fontWeight,
  border,
  index
}) 

{
const [indexKalan, setindexKalan] = useState(null)
  useEffect(() => {
    const indexKalan=(index%2)
    setindexKalan(indexKalan)
  }, [])

  return (
    <View
      style={{
        width: "100%",
        backgroundColor:indexKalan==0? "transparent":'#F2F2F2',
        display: "flex",
   
        padding: 10,
        borderWidth:  1,
        borderColor: "#D0D0D0",
        borderRadius:10
      }}
    >
        <View style={{ justifyContent:'space-around' ,flexDirection:'row',}}>
          <Text
            style={{
              fontSize: 12,
              color: color ? color : "black",
              fontWeight: fontWeight ? fontWeight : 500,
            }}
          >
            {header}
          </Text>
          <Text  style={{
              fontSize: 12,
              color: color ? color : "black",
              fontWeight: '500', // fontWeight 700 yerine "bold" da kullanılabilir
            }}>  {price}</Text>
            <Text
             style={{
              fontSize: 12,
              color: color ? color : "black",
              fontWeight: '500', // fontWeight 700 yerine "bold" da kullanılabilir
            }}
            > {date}</Text>
        </View>
      
    </View>
  );
}
