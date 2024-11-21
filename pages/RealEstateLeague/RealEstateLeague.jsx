import React from 'react'
import { View, Image } from 'react-native'
import { styles } from './RealEstateLeague.style'
import ComingSoon from '../../assets/coming-soon-real-estate.png'

const RealEstateLeague = () => {
    return (
        <View style={styles.container}>
            <Image source={ComingSoon} style={styles.image} />
        </View>
    )
}

export default RealEstateLeague