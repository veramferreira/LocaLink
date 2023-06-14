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
  const [contacts, setContacts] = useState([{ name: "", contactInfo: "" }]);

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
  const updateContacts = (
    inputIndex: number,
    inputKey: string,
    inputText: string
  ) => {
    setContacts((currContacts: any) => {
      return [
        ...currContacts.map((object: Object, index: number) => {
          if (index === inputIndex) {
            return { ...object, [inputKey]: inputText };
          } else {
            return object;
          }
        }),
      ];
    });
    console.log(contacts);
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

  const addContact = () => {
    console.log(contactsCounter);
    console.log(contacts);
    if (contactsCounter === 5) {
      return;
    } else {
      setContactsCounter(contactsCounter + 1);
      setContacts((currContacts: any) => {
        return [...currContacts, { name: "", img: "" }];
      });
    }
  };

  const removeContact = () => {
    if (contactsCounter === 1) {
      return;
    } else {
      setContactsCounter(contactsCounter - 1);
      setContacts((currContact: any) => {
        return currContact.filter((_: any, index: number) => {
          return index !== contactsCounter - 1;
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
        {management.map((manager: any, index: number) => {
          return (
            <View key={index}>
              <Text>{`Management ${index + 1} Name:`}</Text>
              <TextInput
                value={manager.name}
                onChangeText={(text) => updateManagement(index, "name", text)}
              ></TextInput>
              <Text>{`Management ${index + 1} Image URL:`}</Text>
              <TextInput
                value={manager.img}
                onChangeText={(text) => updateManagement(index, "img", text)}
              ></TextInput>
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={addManagement}>
        <Text>Add A Manager</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeManagement}>
        <Text>Remove A Manager</Text>
      </TouchableOpacity>

      <Text>Useful Contacts:</Text>
      <View>
        {contacts.map((contact: any, index: number) => {
          return (
            <View key={index}>
              <Text>{`Contact ${index + 1} Name:`}</Text>
              <TextInput
                value={contact.name}
                onChangeText={(text) => updateContacts(index, "name", text)}
              ></TextInput>
              <Text>{`Contact ${index + 1} Contact Info:`}</Text>
              <TextInput
                value={contact.contactInfo}
                onChangeText={(text) =>
                  updateContacts(index, "contactInfo", text)
                }
              ></TextInput>
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={addContact}>
        <Text>Add A Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeContact}>
        <Text>Remove A Contact</Text>
      </TouchableOpacity>
    </View>
  );
}
