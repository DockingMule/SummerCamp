import { Text, View, Image, StyleSheet, ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={{
      alignItems: "center",
      paddingVertical: 20,
    }}>
      <Text style={styles.title}>Franchise Sports Camp</Text>
      <View style={{width: '90%', backgroundColor: 'green', marginBottom: 20, padding: 30, alignItems: 'center', justifyContent: 'center', gap: 10}}>
        <Text style={{fontSize: 32, color: 'white',}}>Registration Open Now!</Text>
        <Text style={{fontSize: 16, color: 'white',}}>Registration Open March 1st to July 20th</Text>
      </View>
      <View style={[styles.sideBySide, {paddingLeft: 10}]}>
        <View style={{ paddingRight: 10, height: '100%', justifyContent: 'space-around' }}>
          <Text style={{color: 'white', fontSize: 16}}>Welcome to Franchise Sports Camp!</Text>
          <Text style={{color: 'white', fontSize: 16}}>Our summer camp offers a fun and engaging experience for children.</Text>
          <Text style={{color: 'white', fontSize: 16}}>4 Week Summer camp for children aged 5 - 13</Text>
        </View>
        <Image 
          source={require('./../assets/images/parachute.jpg')} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={[styles.sideBySide, {backgroundColor: '#3737ffff', paddingRight: 10}]}>
        <Image 
          source={require('./../assets/images/parachute.jpg')} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ paddingLeft: 10, height: '100%', justifyContent: 'space-around' }}>
          <Text style={{color: 'white', fontSize: 16}}>Welcome to Franchise Sports Camp!</Text>
          <Text style={{color: 'white', fontSize: 16}}>Our summer camp offers a fun and engaging experience for children.</Text>
          <Text style={{color: 'white', fontSize: 16}}>4 Week Summer camp for children aged 5 - 13</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    height: 500,
    backgroundColor: '#ff3737ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 50,
  },
  image: {
    width: 700,
    height: '100%',
    resizeMode: 'cover'
  },
});
