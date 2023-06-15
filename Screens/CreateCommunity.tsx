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
  management1Name: yup.string().required().min(3),
  management1Img: yup.string().required().min(4),
  management2Name: yup.string().required().min(3),
  management2Img: yup.string().required().min(4),
  management3Name: yup.string().required().min(3),
  management3Img: yup.string().required().min(4),
  contact1Name: yup.string().required().min(4),
  contact1Info: yup.string().required().min(4),
  contact2Name: yup.string().required().min(4),
  contact2Info: yup.string().required().min(4),
  contact3Name: yup.string().required().min(4),
  contact3Info: yup.string().required().min(4),
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
                  title="Submit!"
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
