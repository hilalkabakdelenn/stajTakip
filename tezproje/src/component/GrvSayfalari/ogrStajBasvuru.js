import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';
import { Alert } from "react-native";


const { width, height } = Dimensions.get('window');
class ogrListe extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  async componentDidMount() {

    try {
      const response = await fetch(getIp() + '/react-native-insert/ogrStajYapanlar.php');
      const responseJson = await response.json();
      this.setState({
        dataSource: responseJson
      });
    }
    catch (error) {
      Alert.alert("Başvuran öğrenci bulunmamaktadır!");
      { this.props.navigation.goBack() }
    }
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "gray",
        }}
      />
    );
  }

  render() {
    { this.componentDidMount() }
    return (
      <LinearGradient colors={['#D9CAC1', '#A3B0D9']}
        // colors={['white','green','pink', 'purple']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.container}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>STAJ YAPAN ÖĞRENCİLER</Text>
        <FlatList
          style={styles.fl}
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={dataSource => dataSource.id}
          renderItem={({ item }) =>
            <View style={{  justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => Actions.ogrStajYapan({ ogrenciId: item.id, firmaId: item.firmaId })}>
                <Text style={styles.baslik}>{item.name}</Text>
                <Text style={styles.altbaslik}>{item.email}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </LinearGradient>

    );

  }
}
const styles = StyleSheet.create({
  fl: {
    marginTop: 30,
    height: 1,
    width: width,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  baslik: {
    paddingBottom: 10,
    paddingTop: 10,
    padding: 50,
    fontSize:18,
    fontWeight: 'bold',
    height: 44,
  },
  altbaslik: {
    paddingBottom: 10,
    textAlign:'center',
    paddingTop: 10,
    fontStyle:'italic',
    padding: 50,
    fontSize: 15,
    height: 44,
  },
  image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  container: {
    width, height,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 22
  },
  item: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  section: {
    flex: 9,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.07,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 10
  },
});
export default ogrListe;