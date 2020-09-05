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
          <View style={{ padding: 10, width: 155}}>
            <Text>Name:</Text>
            <Text style={{ color: "#777", paddingTop: 2 }}>
               {name}
            </Text>
            <Text>Type:</Text>
            <Text style={{ color: "#777", paddingTop: 2 }}>
                {type ? type : "No type"}
            </Text>
            <Text>Gender:</Text>
            <Text style={{ color: "#777", paddingTop: 2 }}>
               {gender}
            </Text>
            <Text>Species:</Text>
            <Text style={{ color: "#777", paddingTop: 2 }}>
               {species}
            </Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({

})
 
export default CharactersDetail;