// DashboardScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostActiveStocks();
  }, []);

//   const fetchMostActiveStocks = async () => {
//     try {
//       const response = await axios.get(
//         `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_7e655342b747405697cf291d5ccccebc`
//       );

//       setMostActiveStocks(response.data);
//     } catch (error) {
//       dispatch(setErrorMessage('Error fetching stock data.'));
//     }
//   };

  const fetchMostActiveStocks = async () => {
    try {
      const response = await axios.get(
        `https://cloud.iexapis.com/stable/stock/market/list/tops?listLimit=20&token=pk_7e655342b747405697cf291d5ccccebc`
      );

      setMostActiveStocks(response.data);
    } catch (error) {
      dispatch(setErrorMessage('Error fetching stock data.'));
    } finally {
      setLoading(false);
    }
  };

  const handleStockPress = (symbol) => {
    // Navigate to the detailed page for the selected stock
    navigation.navigate('StockDetail', { symbol });
  };

  const renderStockCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleStockPress(item.symbol)}>
      <Text style={styles.stockName}>{item.companyName}</Text>
      <Text style={styles.latestPrice}>{`Latest Price: ${item.latestPrice}`}</Text>
      <Text style={styles.changePrice}>{`Change: ${item.change} (${item.changePercent}%)`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 20 Stocks</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={mostActiveStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockCard}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // for Android 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  latestPrice: {
    fontSize: 16,
    marginTop: 8,
  },
  changePrice: {
    fontSize: 16,
    color: 'green', // or use red for negative change
    marginTop: 4,
  },
});

export default DashboardScreen;
