import { CreateReview } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { Formik, FormikProps } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

interface ReviewFormValues {
  rating: number;
  reviewText: string;
  repositoryName: string;
  repositoryOwner: string;
}

const AddReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CreateReview, {
    refetchQueries: ["GET_REVIEWS"],
    onCompleted: () => {
      console.log("Review created successfully");
    },
    onError: (error) => {
      console.error("Error creating review:", error);
    },
  });

  return (
    <View>
      <Formik
        initialValues={{
          rating: 0,
          reviewText: "",
          repositoryName: "",
          repositoryOwner: "",
        }}
        onSubmit={async (values: ReviewFormValues) => {
          console.log("Values:", values);
          try {
            await createReview({
              variables: {
                review: {
                  ownerName: values.repositoryOwner,
                  rating: Number(values.rating),
                  repositoryName: values.repositoryName,
                  text: values.reviewText,
                },
              },
            });
            navigate(
              `/repository/${values.repositoryOwner}.${values.repositoryName}`,
            );
          } catch (error) {
            console.error("Error creating review:", error);
          }
        }}
        validationSchema={yup.object().shape({
          rating: yup
            .number()
            .required("Rating is required")
            .min(0, "Rating must be greater than 0")
            .max(100, "Rating must be less than 100"),
          reviewText: yup
            .string()
            .required("Review is required")
            .min(10, "Review must be at least 10 characters"),
          repositoryName: yup.string().required("Repository Name is required"),
          repositoryOwner: yup
            .string()
            .required("Repository Owner is required"),
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
              onChangeText={handleChange("rating")}
              value={values.rating.toString()}
              placeholder="Rating"
              keyboardType="numeric"
              autoCapitalize="none"
            />
            {touched.rating && errors.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )}
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("reviewText")}
              value={values.reviewText}
              placeholder="Review"
              multiline
            />
            {touched.reviewText && errors.reviewText && (
              <Text style={styles.errorText}>{errors.reviewText}</Text>
            )}
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("repositoryName")}
              value={values.repositoryName}
              placeholder="Repository Name"
              autoCapitalize="none"
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.errorText}>{errors.repositoryName}</Text>
            )}
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("repositoryOwner")}
              value={values.repositoryOwner}
              placeholder="Repository Owner"
              autoCapitalize="none"
            />
            {touched.repositoryOwner && errors.repositoryOwner && (
              <Text style={styles.errorText}>{errors.repositoryOwner}</Text>
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

export default AddReviewForm;
