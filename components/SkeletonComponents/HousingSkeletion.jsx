import { View,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed';
export default function HousingSkeletion({ }) {
    return (
        <TouchableOpacity style={{ backgroundColor: '#ebebeb',marginLeft:10,marginRight:10,marginTop:10}} >
            <View style={styles.container}>
                <View style={styles.ShoppingName}>
                    <View style={styles.ShopImage}></View>
                </View>
                <View>
                    <View style={{width:'65%',display:'flex',flexDirection:'row'}}>
                        <View style={{width: '70%',display:'flex',alignItems:'center',flexDirection:'row'}}>
                            <View style={styles.title}>
                                <Skeleton style={styles.Description} skeletonStyle={{ backgroundColor: '#dbdbdb' }} />
                                <Skeleton style={{marginTop:5}} skeletonStyle={{ backgroundColor: '#dbdbdb' }} />
                            </View>
                        </View>
                        <View style={{width:'55%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            <Skeleton  circle width={30} height={30} marginLeft={10} marginTop={5} skeletonStyle={{ backgroundColor: '#dbdbdb' }} />
                            <Skeleton  circle width={30} height={30} marginLeft={10} marginTop={5} skeletonStyle={{ backgroundColor: '#dbdbdb' }} />
                        </View>
                    </View>
                    <View style={{width:'65%'}}>
                        <View style={styles.button}>
                            <Skeleton height={30} skeletonStyle={{ backgroundColor: '#dbdbdb',height:40 }} />
                            <Skeleton height={20} marginLeft={5} skeletonStyle={{ backgroundColor: '#dbdbdb',height:40,marginLeft:'5' }} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: width > 400 ? 110 : 110,
        display: 'flex',
        flexDirection: 'row',
    },
    ShoppingName: {
        width: '30%',
        backgroundColor: '#ced4da',
        left: 0,
        height: '90%',
        top : 5,
        display: 'flex',
        flexDirection: 'column',
    },
    ShopImage: {
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title : {
        height : 40,
        width:'100%',
        top : 5,
        marginLeft : 10
    },
    title2 : {
        height : 40,
        width:'100%',
        top : 50,
        marginLeft : 10
    },
    button : {
        left : 10,
        top : 25,
        display : 'flex',
        width: '60%',
        flexDirection:'row',
        alignItems : 'center'
    }
})