import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateCommunity() {
  //   const [inputs, setInputs] = useState({
  //     name: "",
  //     description: "",
  //     postcode: "",
  //     img: "",
  //     management: [{ name: "", img: "" }],
  //     contacts: [{ name: "", contactInfo: "" }],
  //   });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [postcode, setPostcode] = useState("");
  const [img, setImg] = useState("");
  const [management, setManagement] = useState([{ name: "", img: "" }]);
  const [contacts, setContacts] = useState();

  const [managementCounter, setManagementCounter] = useState(1);
  const [contactsCounter, setContactsCounter] = useState(1);

  const updateManagement = (
    inputIndex: number,
    inputKey: string,
    inputText: string
  ) => {
    setManagement((currManagement: any) => {
      return [
        ...currManagement.map((object: Object, index: number) => {
          if (index === inputIndex) {
            return { ...object, [inputKey]: inputText };
          } else {
            return object;
          }
        }),
      ];
    });
    console.log(management);
  };

  const addManagement = () => {
    console.log(managementCounter);
    console.log(management);
    if (managementCounter === 5) {
      return;
    } else {
      setManagementCounter(managementCounter + 1);
      setManagement((currManagement: any) => {
        return [...currManagement, { name: "", img: "" }];
      });
    }
  };

  const removeManagement = () => {
    if (managementCounter === 1) {
      return;
    } else {
      setManagementCounter(managementCounter - 1);
      setManagement((currManagement: any) => {
        return currManagement.filter((_: any, index: number) => {
          return index !== managementCounter - 1;
        });
      });
    }

    console.log(managementCounter);
    console.log(management);
  };

  return (
    <View>
      <Text>Community Name:</Text>
      <TextInput value={name} onChangeText={setName}></TextInput>
      <Text>Description:</Text>
      <TextInput value={description} onChangeText={setDescription}></TextInput>
      <Text>Postcode:</Text>
      <TextInput value={postcode} onChangeText={setPostcode}></TextInput>
      <Text>Image URL:</Text>
      <TextInput value={img} onChangeText={setImg}></TextInput>
      <Text>Management:</Text>
      <View>
        <Text>Management 1 Name:</Text>
        <TextInput
          value={management[0].name}
          onChangeText={(text) => updateManagement(0, "name", text)}
        ></TextInput>
      </View>
      <View>
        <Text>Management 1 Image URL:</Text>
        <TextInput
          value={management[0].img}
          onChangeText={(text) => updateManagement(0, "img", text)}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={addManagement}>
        <Text>Add A Manager</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeManagement}>
        <Text>Remove A Manager</Text>
      </TouchableOpacity>
      <Text>Useful Contacts:</Text>
      <TextInput value={contacts}></TextInput>
    </View>
  );
}
