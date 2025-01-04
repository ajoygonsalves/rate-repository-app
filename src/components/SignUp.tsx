import { CREATE_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { Formik, FormikProps } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

interface ReviewFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: ["GET_USER"],
  });

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values: ReviewFormValues) => {
          try {
            await createUser({
              variables: {
                user: {
                  username: values.email,
                  password: values.password,
                },
              },
            });
          } catch (error) {
            console.error("Error creating user:", error);
          }
        }}
        validationSchema={yup.object().shape({
          email: yup.string().required("Email is required"),
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
              autoCapitalize="none"
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
              autoCapitalize="none"
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
              autoCapitalize="none"
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
