import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Map from "../components/map";
export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1200;

  const UnorderedListItem = ({ children }) => (
  <View style={styles.listItem}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.text, isMobile && { fontSize: 16 }]}>{children}</Text>
  </View>
  );

  const colors = {
    background: '#89b7d6ff',
    text: '#333333',
    greenBG: '#3b9b3bff',
    redBG: '#a53737ff',
    blueBG: '#3030b1ff',
    orangeBG: '#408b27ff',
    greenText: '#008000',
    redText: '#800000',
    blueText: '#000080',
  };
  return (
    <ScrollView contentContainerStyle={{
      alignItems: "center",
      paddingVertical: 20,
      width: '100%',
    }}>
      <View style={[styles.content, {backgroundColor: colors.background}]}>
        <Image
          source={require('./../assets/images/franchiseLogo.png')}
          style={isMobile ? {width: 120, height: 120} : {width: 200, height: 200}}
        />
        <Text style={[styles.title, isMobile && { fontSize: 24 }]}>Franchise Sports Camp</Text>
        <View style={{width: '100%', backgroundColor: colors.greenBG, marginBottom: 20, padding: isMobile ? 15 : 30, alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <Text style={{fontSize: isMobile ? 20 : 32, color: 'white',}}>Registration Open Now!</Text>
          <Text style={{fontSize: isMobile ? 12 : 16, color: 'white',}}>Registration Open March 1st to July 20th</Text>
          <Text style={{fontSize: isMobile ? 12 : 16, color: 'white',}}>Camp Runs rom July 24th to August 21st </Text>
        </View>
        <View style={[styles.sideBySide, isMobile && { flexDirection: 'column', height: 'auto' }]}>
          <View style={{ paddingRight: isMobile ? 0 : 10, height: isMobile ? 'auto' : '100%', flex: isMobile ? undefined : 3, justifyContent: 'space-around', backgroundColor: colors.blueBG, padding: isMobile ? 15 : 20, width: isMobile ? '100%' : undefined }}>
            <Text style={{color: 'white', fontSize: isMobile ? 16 : 24}}>Welcome to Franchise Sports Camp!</Text>
            <Text style={{color: 'white', fontSize: isMobile ? 16 : 24, marginTop: isMobile ? 10 : 0}}>Our summer camp offers a fun and engaging experience for children.</Text>
            <Text style={{color: 'white', fontSize: isMobile ? 16 : 24, marginTop: isMobile ? 10 : 0}}>4 Week Summer camp for children aged 5 - 13</Text>
          </View>
          <Image 
            source={require('./../assets/images/parachute.jpg')} 
            style={[styles.image, isMobile && { width: '100%', height: 250 }]}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.sideBySide, isMobile && { flexDirection: 'column-reverse', height: 'auto' }]}>
          <Image 
            source={require('./../assets/images/tug-of-war.jpg')} 
            style={[styles.image, isMobile && { width: '100%', height: 250 }]}
            resizeMode="cover"
          />
          <View style={{ paddingLeft: isMobile ? 0 : 10, height: isMobile ? 'auto' : '100%', flex: isMobile ? undefined : 3, justifyContent: 'space-around', backgroundColor: colors.redBG, padding: isMobile ? 15 : 20, width: isMobile ? '100%' : undefined }}>
            <Text style={{color: 'white', fontSize: isMobile ? 16 : 24}}>Excersise over summer break</Text>
            <Text style={{color: 'white', fontSize: isMobile ? 16 : 24, marginTop: isMobile ? 10 : 0}}>Learning through games that incorporate math, counting, and spelling (horse?)</Text>
            <Text style={{color: 'white', fontSize: isMobile ? 16 : 24, marginTop: isMobile ? 10 : 0}}>Safe socialization with other children their age</Text>
          </View>
        </View>
        <View style={[styles.sideBySide, {marginTop: isMobile ? 20 : 50, gap: isMobile ? 0 : 64}, isMobile && { flexDirection: 'column', height: 'auto' }]}>
          <Image 
            source={require('./../assets/images/soccer.jpg')} 
            style={[styles.image, {flex: isMobile ? undefined : 2}, isMobile && { width: '100%', height: 250 }]}
            resizeMode="cover"
          />
          <View style={{ paddingLeft: isMobile ? 0 : 10, height: isMobile ? 'auto' : '100%', flex: isMobile ? undefined : 3, gap: isMobile ? 16 : 32, padding: isMobile ? 15 : 20, alignItems: 'flex-start', justifyContent: 'center', width: isMobile ? '100%' : undefined }}>
            <Text style={{fontSize: isMobile ? 24 : 32}}>Activities Include:</Text>
            <View style={[styles.sideBySide, {height: 'auto', gap: isMobile ? 16 : 64, justifyContent: 'flex-start'}, isMobile && { flexDirection: 'column', alignItems: 'flex-start' }]}>
              <View>
                <UnorderedListItem>Baseball</UnorderedListItem>
                <UnorderedListItem>Basketball</UnorderedListItem>
                <UnorderedListItem>Pickleball</UnorderedListItem>
                <UnorderedListItem>67 Tag</UnorderedListItem>
              </View>
              <View>
                <UnorderedListItem>Softball</UnorderedListItem>
                <UnorderedListItem>Line Dancing</UnorderedListItem>
                <UnorderedListItem>Flag Football</UnorderedListItem>
                <UnorderedListItem>Foot Races</UnorderedListItem>
              </View>
              <View>
                <UnorderedListItem>Puzzles</UnorderedListItem>
                <UnorderedListItem>Painting</UnorderedListItem>
                <UnorderedListItem>Clay Sculpting</UnorderedListItem>
                <UnorderedListItem>And much more...</UnorderedListItem>
              </View>
            </View>
            
          </View>
        </View>
        <View style={[styles.sideBySide, {backgroundColor: colors.greenBG, marginTop: isMobile ? 20 : 50, gap: isMobile ? 0 : 64}, isMobile && { flexDirection: 'column', height: 'auto' }]}>
          <View style={{ paddingLeft: isMobile ? 0 : 10, height: isMobile ? 'auto' : '100%', flex: isMobile ? undefined : 1, gap: isMobile ? 16 : 32, padding: isMobile ? 15 : 20, alignItems: 'flex-start', justifyContent: 'center', width: isMobile ? '100%' : undefined }}>
            <View style={[styles.sideBySide, {height: 'auto', gap: isMobile ? 24 : 82, justifyContent: 'flex-start'}, isMobile && { flexDirection: 'column', alignItems: 'flex-start' }]}>
              <View style={{ gap: isMobile ? 10 : 20, flex: 1 }}>
                <Text style={{color: 'white', fontSize: isMobile ? 32 : 42, fontWeight:"bold"}}>Location:</Text>
                <Text style={{color: 'white', fontSize: isMobile ? 24 : 32, marginTop: isMobile ? 10 : 0}}>Conveniently location in Woodbury, NJ</Text>
                <Text style={{color: 'white', fontSize: isMobile ? 24 : 32, marginTop: isMobile ? 10 : 0}}>30 minutes from Philadelphia</Text>
                <Text style={{color: 'white', fontSize: isMobile ? 24 : 32, marginTop: isMobile ? 10 : 0}}>Close to the NJ Turnpike, RT. 295, RT. 55, and RT. 42</Text>
              </View>
            </View>
          </View>
          <View style={[styles.mapContainer, isMobile ? { width: '100%', height: 400 } : { flex: 1, height: '80%'} ]}>
            <Map />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    gap: 0,
  },
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    height: 500,
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
    resizeMode: 'cover',
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    marginRight: 10,
    fontSize: 20,
    lineHeight: 28,
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
});
