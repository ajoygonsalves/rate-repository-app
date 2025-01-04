import { Formik, FormikProps } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

interface ReviewFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values: ReviewFormValues) => {
          console.log("Form submitted!");
          console.log("Values:", values);
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
          password: yup.string().required("Password is required"),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords do not match")
            .required("Confirm Password is required"),
        })}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }: FormikProps<ReviewFormValues>) => (
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("password")}
              value={values.password}
              placeholder="Password"
              multiline
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <Pressable style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "white",
  },
  errorText: {
    color: "red",
  },
});

export default SignUp;
