import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

// import { Container } from './styles';

export default function MainChartSeller({ data }) {

    const chartData = data.map(({ seller, totalAmount }) => ({
        key: seller.id,
        value: totalAmount,
        svg: {
            fill: seller.color
        },
        arc: {
            outerRadius: '100%',
            innerRadius: '75%'
        }

    }))
    return (
        <View style={styles.container}>
            <PieChart
                style={styles.chart}
                data={chartData}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        minWidth:200,
        maxWidth:200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        height: 100,
        width: 100,
    }
})

//pardinho 1:40
//120 x sem juros 50 ultimas quitadas construir casa r$ 85.000 9% parc 750
//450m2 15frente 30fundo 