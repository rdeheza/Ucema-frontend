import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log("Store Data, error  en el guardado en la key: ", key)
    }
}

export default storeData;