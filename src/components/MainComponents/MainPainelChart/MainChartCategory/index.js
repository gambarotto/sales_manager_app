import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'


// import { Container } from './styles';

export default function MainChartCategory({data}) {

    const chartData = data.map(({ category, totalAmount }) => ({
        key: category.id,
        value: totalAmount,
        svg: {
            fill: category.color
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
        flex:1,
        minWidth:200,
        maxWidth:200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chart: {
        height: 100,
        width: 100,
    }
})