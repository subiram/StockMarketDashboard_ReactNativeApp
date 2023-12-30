// StockDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { AreaChart, Grid } from 'react-native-svg-charts';
import orientation from '../utility/orientation';


const StockDetailScreen = ({ route }) => {
  const { symbol } = route.params;
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart&range=1d&last=10&token=pk_7e655342b747405697cf291d5ccccebc`
      );

      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

//   const renderChart = () => {
//     if (stockData && stockData.chart) {
//       const chartData = stockData.chart.map((point) => ({ x: point.label, y: point.close }));

//       return (
//         <AreaChart
//           style={{ height: 200 }}
//           data={chartData}
//           svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
//           contentInset={{ top: 20, bottom: 20 }}
//         >
//           <Grid />
//         </AreaChart>
//       );
//     }
//     return null;
//   };  

  const renderChart = () => {
    if (stockData && stockData.chart) {
      const chartData = stockData.chart.map((point) => point.close);
      const labels = stockData.chart.map((point) => point.label);

      return (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={300}
          height={200}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '1',
              
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      );
    }
    return null;
  };

  const renderImportantRecords = () => {
    if (stockData && stockData.quote) {
      const { companyName, symbol, latestPrice, change, changePercent } = stockData.quote;

      return (
        <View style={styles.grid}>
          <Text style={styles.gridTitle}>Important Records</Text>
          <View style={styles.gridRow}>
            <Text style={styles.gridLabel}>Company Name:</Text>
            <Text style={styles.gridValue}>{companyName}</Text>
          </View>
          <View style={styles.gridRow}>
            <Text style={styles.gridLabel}>Symbol:</Text>
            <Text style={styles.gridValue}>{symbol}</Text>
          </View>
          <View style={styles.gridRow}>
            <Text style={styles.gridLabel}>Latest Price:</Text>
            <Text style={styles.gridValue}>${latestPrice}</Text>
          </View>
          <View style={styles.gridRow}>
            <Text style={styles.gridLabel}>Change:</Text>
            <Text style={styles.gridValue}>{change} ({changePercent}%)</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderRemainingRecords = () => {
    if (stockData && stockData.quote) {
        const { avgTotalVolume, currency, high, low, peRatio, week52High, week52Low } = stockData.quote;
  
        return (
          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Other Details</Text>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>Avg Total Volume:</Text>
              <Text style={styles.gridValue}>{avgTotalVolume}</Text>
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>Currency:</Text>
              <Text style={styles.gridValue}>{currency}</Text>
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>Day High:</Text>
              <Text style={styles.gridValue}>${high}</Text>
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>Day Low:</Text>
              <Text style={styles.gridValue}>${low}</Text>
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>PE Ratio:</Text>
              <Text style={styles.gridValue}>{peRatio}</Text>
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>52 Week High:</Text>
              <Text style={styles.gridValue}>${week52High}</Text>
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.gridLabel}>52 Week Low:</Text>
              <Text style={styles.gridValue}>${week52Low}</Text>
            </View>
          </View>
        );
      }
      return null;
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
      <>
      {renderChart()}
      {renderImportantRecords()}
      {renderRemainingRecords()}
      </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  grid: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gridTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  gridLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  gridValue: {
    flex: 2,
  },
});

export default StockDetailScreen;
