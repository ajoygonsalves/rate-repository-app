import { Formik, FormikValues } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

const SignIn = () => {
  const onSubmit = (values: FormikValues) => {
    console.log("hello!!");
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Pressable style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  error: {
    color: "red",
  },
});

export default SignIn;
