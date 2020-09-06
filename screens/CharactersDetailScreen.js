import React from 'react';
import { View, Text , StyleSheet, Image} from 'react-native';

const CharactersDetail = (item ) => {
    const { name, image, species, type, gender, id } = item.route.params.data;
    return (  
        <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5 }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
          <View>
            <Image
              source={{ uri: image}} 
              style={{
                height: 250,
                width: 360
              }}
            />
          </View>
          <View style={{ padding: 10}}>
            <Text style={{ color: "black", paddingTop: 2, textAlign: "center", justifyContent: "center" }}>
                <Text>{name}</Text> 
            </Text>
            <Text style={{ color: "black", paddingTop: 2 }}>
               Type: <Text style={{ color: "#777"}}>{type ? type : "No type"}</Text> 
            </Text>
            <Text style={{ color: "black", paddingTop: 2 }}>
               Gender: <Text style={{ color: "#777"}}>{gender}</Text> 
            </Text>
            <Text style={{ color: "black", paddingTop: 2 }}>
               Species: <Text style={{ color: "#777"}}>{species}</Text> 
            </Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({

})
 
export default CharactersDetail;