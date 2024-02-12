import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { React, useState } from 'react'
import Ablok from "./Bloks/Ablok"
import Bblok from "./Bloks/Bblok"
export default function OtherHomeInProject() {
    const [tabs, setTabs] = useState(0);
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        onPress={() => setTabs(0)}
                        style={{
                            width: '30%',
                            height: '100%',
                            backgroundColor: tabs===0? 'black':'#EFEFEF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: 16,
                            color:tabs===0? 'white':'black'
                        }}>A BLOK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTabs(1)}
                        style={{
                            width: '30%',
                            height: '100%',
                            backgroundColor: tabs===1? 'black':'#EFEFEF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: 16,
                            color:tabs===1? 'white':'black'
                        }}>B BLOK</Text>
                    </TouchableOpacity>
                            
                </View>
                {tabs === 0 && <Ablok />}
                {tabs === 1 && <Bblok />}

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

        top: 5
    },
    tabBar: {
        width: '100%',
        height: '8%',
        padding: 5,
        top: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        backgroundColor: '#EFEFEF',
    },
    
})