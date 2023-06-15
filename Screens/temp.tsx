// import { useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function CreateCommunity() {

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [postcode, setPostcode] = useState("");
//   const [img, setImg] = useState("");
//   const [management, setManagement] = useState([{ name: "", img: "" }]);
//   const [contacts, setContacts] = useState([{ name: "", contactInfo: "" }]);

//   const [managementCounter, setManagementCounter] = useState(1);
//   const [contactsCounter, setContactsCounter] = useState(1);

//   const updateManagement = (
//     inputIndex: number,
//     inputKey: string,
//     inputText: string
//   ) => {
//     setManagement((currManagement: any) => {
//       return [
//         ...currManagement.map((object: Object, index: number) => {
//           if (index === inputIndex) {
//             return { ...object, [inputKey]: inputText };
//           } else {
//             return object;
//           }
//         }),
//       ];
//     });
//     console.log(management);
//   };
//   const updateContacts = (
//     inputIndex: number,
//     inputKey: string,
//     inputText: string
//   ) => {
//     setContacts((currContacts: any) => {
//       return [
//         ...currContacts.map((object: Object, index: number) => {
//           if (index === inputIndex) {
//             return { ...object, [inputKey]: inputText };
//           } else {
//             return object;
//           }
//         }),
//       ];
//     });
//     console.log(contacts);
//   };

//   const addManagement = () => {
//     console.log(managementCounter);
//     console.log(management);
//     if (managementCounter === 5) {
//       return;
//     } else {
//       setManagementCounter(managementCounter + 1);
//       setManagement((currManagement: any) => {
//         return [...currManagement, { name: "", img: "" }];
//       });
//     }
//   };

//   const removeManagement = () => {
//     if (managementCounter === 1) {
//       return;
//     } else {
//       setManagementCounter(managementCounter - 1);
//       setManagement((currManagement: any) => {
//         return currManagement.filter((_: any, index: number) => {
//           return index !== managementCounter - 1;
//         });
//       });
//     }

//     console.log(managementCounter);
//     console.log(management);
//   };

//   const addContact = () => {
//     console.log(contactsCounter);
//     console.log(contacts);
//     if (contactsCounter === 5) {
//       return;
//     } else {
//       setContactsCounter(contactsCounter + 1);
//       setContacts((currContacts: any) => {
//         return [...currContacts, { name: "", img: "" }];
//       });
//     }
//   };

//   const removeContact = () => {
//     if (contactsCounter === 1) {
//       return;
//     } else {
//       setContactsCounter(contactsCounter - 1);
//       setContacts((currContact: any) => {
//         return currContact.filter((_: any, index: number) => {
//           return index !== contactsCounter - 1;
//         });
//       });
//     }

//     console.log(managementCounter);
//     console.log(management);
//   };

//   return (
//     <View>
//       <Text>Community Name:</Text>
//       <TextInput value={name} onChangeText={setName}></TextInput>

//       <Text>Description:</Text>
//       <TextInput value={description} onChangeText={setDescription}></TextInput>

//       <Text>Postcode:</Text>
//       <TextInput value={postcode} onChangeText={setPostcode}></TextInput>

//       <Text>Image URL:</Text>
//       <TextInput value={img} onChangeText={setImg}></TextInput>

//       <Text>Management:</Text>
//       <View>
//         {management.map((manager: any, index: number) => {
//           return (
//             <View key={index}>
//               <Text>{`Management ${index + 1} Name:`}</Text>
//               <TextInput
//                 value={manager.name}
//                 onChangeText={(text) => updateManagement(index, "name", text)}
//               ></TextInput>
//               <Text>{`Management ${index + 1} Image URL:`}</Text>
//               <TextInput
//                 value={manager.img}
//                 onChangeText={(text) => updateManagement(index, "img", text)}
//               ></TextInput>
//             </View>
//           );
//         })}
//       </View>

//       <TouchableOpacity onPress={addManagement}>
//         <Text>Add A Manager</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={removeManagement}>
//         <Text>Remove A Manager</Text>
//       </TouchableOpacity>

//       <Text>Useful Contacts:</Text>
//       <View>
//         {contacts.map((contact: any, index: number) => {
//           return (
//             <View key={index}>
//               <Text>{`Contact ${index + 1} Name:`}</Text>
//               <TextInput
//                 value={contact.name}
//                 onChangeText={(text) => updateContacts(index, "name", text)}
//               ></TextInput>
//               <Text>{`Contact ${index + 1} Contact Info:`}</Text>
//               <TextInput
//                 value={contact.contactInfo}
//                 onChangeText={(text) =>
//                   updateContacts(index, "contactInfo", text)
//                 }
//               ></TextInput>
//             </View>
//           );
//         })}
//       </View>

//       <TouchableOpacity onPress={addContact}>
//         <Text>Add A Contact</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={removeContact}>
//         <Text>Remove A Contact</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../config/firebase";

interface FormValues {
  name: string;
  description: string;
  postcode: string;
  img: string;
  management1Name: string;
  management1Img: string;
  management2Name: string;
  management2Img: string;
  management3Name: string;
  management3Img: string;
  contact1Name: string;
  contact1Info: string;
  contact2Name: string;
  contact2Info: string;
  contact3Name: string;
  contact3Info: string;
}

const formSchema = yup.object({
  name: yup.string().required().min(4),
  description: yup.string().required().min(4),
  postcode: yup.string().required().min(3),
  img: yup.string().required().min(4),
  managementName: yup.string().required().min(3),
  managementImg: yup.string().required().min(4),
  contactName: yup.string().required().min(4),
  contactInfo: yup.string().required().min(4),
});

export default function CreateCommunity() {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        name: values.name,
        description: values.description,
        postcode: values.postcode,
        img: values.img,
        management1Name: values.management1Name,
        management1Img: values.management1Img,
        management2Name: values.management2Name,
        management2Img: values.management2Img,
        management3Name: values.management3Name,
        management3Img: values.management3Img,
        contact1Name: values.contact1Name,
        contact1Info: values.contact1Info,
        contact2Name: values.contact2Name,
        contact2Info: values.contact2Info,
        contact3Name: values.contact3Name,
        contact3Info: values.contact3Info,
      };

      await addDoc(collection(db, "CommunityList"), docData);
      console.log("Document written successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.heading}>Create A Community</Text>
          <Formik
            initialValues={{
              name: "",
              description: "",
              postcode: "",
              img: "",
              management1Name: "",
              management1Img: "",
              management2Name: "",
              management2Img: "",
              management3Name: "",
              management3Img: "",
              contact1Name: "",
              contact1Info: "",
              contact2Name: "",
              contact2Info: "",
              contact3Name: "",
              contact3Info: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<FormValues>) => (
              <View style={styles.form}>
                <Text style={styles.text}>Community Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Community name..."
                  onChangeText={(text) => props.handleChange("name")(text)}
                  value={props.values.name}
                />
                <Text style={styles.form}>Description:</Text>
                <TextInput
                  // multiline
                  style={styles.input}
                  placeholder="Community description..."
                  onChangeText={(text) =>
                    props.handleChange("description")(text)
                  }
                  value={props.values.description}
                />
                <Text style={styles.form}>Postcode:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Insert at least first half of postcode..."
                  onChangeText={(text) => props.handleChange("postcode")(text)}
                  value={props.values.postcode}
                />
                <Text style={styles.form}>Image URL:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Image URL..."
                  onChangeText={(text) => props.handleChange("img")(text)}
                  value={props.values.img}
                />
                <View>
                  <Text style={styles.form}>Manager 1 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 1 Name..."
                    onChangeText={(text) =>
                      props.handleChange("management1Name")(text)
                    }
                    value={props.values.management1Name}
                  />

                  <Text style={styles.form}>Manager 1 Image URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 1 Image URL..."
                    onChangeText={(text) =>
                      props.handleChange("management1Img")(text)
                    }
                    value={props.values.management1Img}
                  />

                  <Text style={styles.form}>Manager 2 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 2 Name..."
                    onChangeText={(text) =>
                      props.handleChange("management2Name")(text)
                    }
                    value={props.values.management2Name}
                  />

                  <Text style={styles.form}>Manager 2 Image URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 2 Image URL..."
                    onChangeText={(text) =>
                      props.handleChange("management2Img")(text)
                    }
                    value={props.values.management2Img}
                  />

                  <Text style={styles.form}>Manager 3 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 3 Name..."
                    onChangeText={(text) =>
                      props.handleChange("management3Name")(text)
                    }
                    value={props.values.management3Name}
                  />

                  <Text style={styles.form}>Manager 3 Image URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 3 Image URL..."
                    onChangeText={(text) =>
                      props.handleChange("management3Img")(text)
                    }
                    value={props.values.management3Img}
                  />
                </View>

                <View>
                  <Text style={styles.form}>Contact 1 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact 1 Name..."
                    onChangeText={(text) =>
                      props.handleChange("contact1Name")(text)
                    }
                    value={props.values.contact1Name}
                  />

                  <Text style={styles.form}>Contact 1 Info URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact 1 Info URL..."
                    onChangeText={(text) =>
                      props.handleChange("contact1Info")(text)
                    }
                    value={props.values.contact1Info}
                  />

                  <Text style={styles.form}>Contact 2 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact 2 Name..."
                    onChangeText={(text) =>
                      props.handleChange("contact2Name")(text)
                    }
                    value={props.values.contact2Name}
                  />

                  <Text style={styles.form}>Contact 2 Info URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact 2 Info URL..."
                    onChangeText={(text) =>
                      props.handleChange("contact2Info")(text)
                    }
                    value={props.values.contact2Info}
                  />

                  <Text style={styles.form}>Contact 3 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact 3 Name..."
                    onChangeText={(text) =>
                      props.handleChange("contact3Name")(text)
                    }
                    value={props.values.contact3Name}
                  />

                  <Text style={styles.form}>Contact 3 Info URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact 3 Info URL..."
                    onChangeText={(text) =>
                      props.handleChange("contact3Info")(text)
                    }
                    value={props.values.contact3Info}
                  />
                </View>
                <TouchableOpacity
                  onPress={props.handleSubmit}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Submit!</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  form: {
    margin: 10,
  },
  text: {
    marginLeft: 10,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 10,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 10,
    borderColor: "#1B73E7",
  },
  buttonText: {
    color: "white",
  },
});
