import AsyncStorage from '@react-native-community/async-storage';

const getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.log("getData, error en la obtencion de datos")
    }
}

export default getData;