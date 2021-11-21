import React,{useState} from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default DoctorMyPatientMedication = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={{marginTop:-40}}>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    );
}