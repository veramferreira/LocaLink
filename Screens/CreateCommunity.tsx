import {
  Alert,
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
import { auth, db } from "../config/firebase";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddComToUser from "../Utils/AddComToUser";
import { MyContext } from "../Context";
import AddRoleToUser from "../Utils/AddRoleToUser";
import colours from "../constants/colours";

interface FormValues {
  name: string;
  description: string;
  postcode: string;
  img: string;
  email: string;
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
  email: yup.string().required().min(4),
  management1Name: yup.string().required().min(3),
  management1Img: yup.string().required().min(4),
  management2Name: yup.string().min(3),
  management2Img: yup.string().min(4),
  management3Name: yup.string().min(3),
  management3Img: yup.string().min(4),
  contact1Name: yup.string().required().min(4),
  contact1Info: yup.string().required().min(4),
  contact2Name: yup.string().min(4),
  contact2Info: yup.string().min(4),
  contact3Name: yup.string().min(4),
  contact3Info: yup.string().min(4),
});

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

export default function CreateCommunity() {
  const [isButtonPressed, setButtonPressed] = useState(false);

  const { userContext, setUserContext } = useContext(MyContext);

  const navigation = useNavigation();

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
        email: values.email,
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

      resetForm();

      showAlert();
      AddComToUser(auth.currentUser?.email, values.name);
      AddRoleToUser(auth.currentUser?.email, "owner");
      setUserContext({
        ...userContext,
        communityName: values.name,
        role: "owner",
      });
      navigation.navigate("HomepageScreen");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Your Community has been created!",
      `Welcome to your community!`,
      [{ text: "OK!", onPress: () => navigation.navigate("HomepageScreen") }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView scrollIndicatorInsets={{right: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.heading}>Create Community</Text>
          <Formik
            initialValues={{
              name: "",
              description: "",
              postcode: "",
              img: "",
              email: "",
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
                  onBlur={props.handleBlur("name")}
                />
                <Text style={styles.errorText}>
                  {props.touched.name && props.errors.name}
                </Text>
                <Text style={styles.text}>Description:</Text>
                <TextInput
                  multiline
                  minHeight={70}
                  style={styles.input}
                  placeholder="Community description..."
                  onChangeText={(text) =>
                    props.handleChange("description")(text)
                  }
                  value={props.values.description}
                  onBlur={props.handleBlur("description")}
                />
                <Text style={styles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>
                <Text style={styles.text}>Postcode:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Insert at least first half of postcode..."
                  onChangeText={(text) => props.handleChange("postcode")(text)}
                  value={props.values.postcode}
                  onBlur={props.handleBlur("postcode")}
                />
                <Text style={styles.errorText}>
                  {props.touched.postcode && props.errors.postcode}
                </Text>
                <Text style={styles.text}>Community Cover Image URL:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Image URL..."
                  onChangeText={(text) => props.handleChange("img")(text)}
                  value={props.values.img}
                  onBlur={props.handleBlur("img")}
                />
                <Text style={styles.errorText}>
                  {props.touched.img && props.errors.img}
                </Text>
                <Text style={styles.text}>
                  Main Contact Email for Residents:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email..."
                  onChangeText={(text) => props.handleChange("email")(text)}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text style={styles.errorText}>
                  {props.touched.email && props.errors.email}
                </Text>
                <View>
                  <Text style={styles.text}>Manager 1 Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 1 Name..."
                    onChangeText={(text) =>
                      props.handleChange("management1Name")(text)
                    }
                    value={props.values.management1Name}
                    onBlur={props.handleBlur("management1Name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.management1Name &&
                      props.errors.management1Name}
                  </Text>
                  <Text style={styles.text}>Manager 1 Image URL:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 1 Image URL..."
                    onChangeText={(text) =>
                      props.handleChange("management1Img")(text)
                    }
                    value={props.values.management1Img}
                    onBlur={props.handleBlur("management1Img")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.management1Img &&
                      props.errors.management1Img}
                  </Text>

                  <Text style={styles.text}>
                    Manager 2 Name{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 2 Name..."
                    onChangeText={(text) =>
                      props.handleChange("management2Name")(text)
                    }
                    value={props.values.management2Name}
                    onBlur={props.handleBlur("management2Name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.management2Name &&
                      props.errors.management2Name}
                  </Text>
                  <Text style={styles.text}>
                    Manager 2 Image URL{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 2 Image URL..."
                    onChangeText={(text) =>
                      props.handleChange("management2Img")(text)
                    }
                    value={props.values.management2Img}
                    onBlur={props.handleBlur("management2Img")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.management2Img &&
                      props.errors.management2Img}
                  </Text>

                  <Text style={styles.text}>
                    Manager 3 Name{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 3 Name..."
                    onChangeText={(text) =>
                      props.handleChange("management3Name")(text)
                    }
                    value={props.values.management3Name}
                    onBlur={props.handleBlur("management3Name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.management3Name &&
                      props.errors.management3Name}
                  </Text>

                  <Text style={styles.text}>
                    Manager 3 Image URL{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Manager 3 Image URL..."
                    onChangeText={(text) =>
                      props.handleChange("management3Img")(text)
                    }
                    value={props.values.management3Img}
                    onBlur={props.handleBlur("management3Img")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.management3Img &&
                      props.errors.management3Img}
                  </Text>
                </View>

                <View>
                  <Text style={styles.text}>Useful Contact 1:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="example: Council Website"
                    onChangeText={(text) =>
                      props.handleChange("contact1Name")(text)
                    }
                    value={props.values.contact1Name}
                    onBlur={props.handleBlur("contact1Name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.contact1Name && props.errors.contact1Name}
                  </Text>

                  <Text style={styles.text}>Contact 1 Contact Info:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="www.example-council.com"
                    onChangeText={(text) =>
                      props.handleChange("contact1Info")(text)
                    }
                    value={props.values.contact1Info}
                    onBlur={props.handleBlur("contact1Info")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.contact1Info && props.errors.contact1Info}
                  </Text>

                  <Text style={styles.text}>
                    Useful Contact 2{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="example: Community Website"
                    onChangeText={(text) =>
                      props.handleChange("contact2Name")(text)
                    }
                    value={props.values.contact2Name}
                    onBlur={props.handleBlur("contact2Name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.contact2Name && props.errors.contact2Name}
                  </Text>

                  <Text style={styles.text}>
                    Contact 2 Contact Info{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="www.community.com"
                    onChangeText={(text) =>
                      props.handleChange("contact2Info")(text)
                    }
                    value={props.values.contact2Info}
                    onBlur={props.handleBlur("contact2Info")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.contact2Info && props.errors.contact2Info}
                  </Text>

                  <Text style={styles.text}>
                    Useful Contact 3{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="example: Fire Department"
                    onChangeText={(text) =>
                      props.handleChange("contact3Name")(text)
                    }
                    value={props.values.contact3Name}
                    onBlur={props.handleBlur("contact3Name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.contact3Name && props.errors.contact3Name}
                  </Text>

                  <Text style={styles.text}>
                    Contact 3 Contact Info{" "}
                    <Text style={styles.optionalText}>(optional)</Text> :
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="www.fire-department.com"
                    onChangeText={(text) =>
                      props.handleChange("contact3Info")(text)
                    }
                    value={props.values.contact3Info}
                    onBlur={props.handleBlur("contact3Info")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.contact3Info && props.errors.contact3Info}
                  </Text>
                </View>
                <TouchableOpacity
                  title="submit!"
                  onPress={props.handleSubmit}
                  style={[
                    styles.button,
                    isButtonPressed ? buttonPressedStyle : null,
                  ]}
                  onPressIn={() => setButtonPressed(true)}
                  onPressOut={() => setButtonPressed(false)}
                  activeOpacity={1}
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
    fontFamily: "Poppins_700Bold",
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
    fontFamily: "Poppins_500Medium",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colours.secondary,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: colours.secondary,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 10,
    borderColor: colours.secondary,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  optionalText: {
    color: "gray",
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 0,
    fontFamily: "Poppins_400Regular",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
});
