import { useUser } from "@auth0/nextjs-auth0/client";
import { Auth0User } from "../../utils/types";
import { v4 } from "uuid";
import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  CheckboxGroup,
  Checkbox,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import OptionTypeBase from "react-select";

import { useFormik } from "formik";
import * as Yup from "yup";
import { skills, positions, experiences, hours } from "./ShiftFormData";
import { addShiftToTable } from "../../services/airtable";

type SkillOption = {
  value: string;
  label: string;
};

const validationSchema = Yup.object().shape({
  clinic_name: Yup.string().required("Clinic Name is required"),
  city: Yup.string().required("Clinic City is required"),
  shift_title: Yup.string().required("Shift Title is required"),
  shift_overview: Yup.string().required("Shift Overview is required"),
  skills_required: Yup.array().min(1, "At least one skill is required"),
  position: Yup.string().required("Position is required"),
  experience: Yup.string().required("Experience Required is required"),
  start_date: Yup.date().required("Start Date is required"),
  start_time: Yup.string().required("Start Time is required"),
  shift_hours: Yup.number().required("Hours is required"),
  shift_pay: Yup.number().required("Total Pay is required"),
});

interface ShiftPostFormProps extends BoxProps {}

//Submit form to Airtable

export const ShiftPostForm = ({ ...props }: ShiftPostFormProps) => {
  
  const { user, isLoading } = useUser() as {
    user: Auth0User | undefined;
    isLoading: boolean;
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "40px",
      height: "40px",
      borderColor: state.isFocused ? "#3182CE" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #3182CE" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#3182CE" : "#CBD5E0",
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "40px",
      padding: "0 6px",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: "0px",
      borderRadius: "0.5rem",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "40px",
    }),
  };

  const formik = useFormik({
    initialValues: {
      clinic_name: "",
      city: "",
      shift_title: "",
      shift_overview: "",
      skills_required: [],
      position: "",
      experience: "",
      start_date: "",
      start_time: "",
      shift_hours: "",
      shift_pay: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      alert("Submitting");
      console.log("Form values:", values);
      if (!user) {
        console.error("User is undefined");
        return; // Stop executing the function if the user is undefined
      }

      const uuid = v4();
      const shift = {
        uuid,
        user_id: user.sub,
        hours: Number(values.shift_hours),
        total_pay: Number(values.shift_pay),
        ...values,
      };
      try {
        await addShiftToTable({ shift });
        console.log("Shift added successfully");
      } catch (error) {
        console.error("Error adding shift:", error);
      }
    },
  });

  return (
    <Box margin="auto" w="100%" maxW={{ base: "100%", md: "xl" }} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing="5"
          px={{ base: "4", md: "6" }}
          py={{ base: "5", md: "6" }}
        >
          <FormControl
            id="clinic_name"
            isInvalid={
              !!formik.errors.clinic_name && formik.touched.clinic_name
            }
          >
            <FormLabel>Clinic Name</FormLabel>
            <Input {...formik.getFieldProps("clinic_name")} />
            <FormErrorMessage>{formik.errors.clinic_name}</FormErrorMessage>
          </FormControl>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="city"
              isInvalid={!!formik.errors.city && formik.touched.city}
            >
              <FormLabel>Clinic City</FormLabel>
              <Input {...formik.getFieldProps("city")} />
              <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="shift_title"
              isInvalid={
                !!formik.errors.shift_title && formik.touched.shift_title
              }
            >
              <FormLabel>Shift Title</FormLabel>
              <Input {...formik.getFieldProps("shift_title")} />
              <FormErrorMessage>{formik.errors.shift_title}</FormErrorMessage>
            </FormControl>
            <FormControl
  id="shift_overview"
  isInvalid={!!formik.errors.shift_overview && formik.touched.shift_overview}
>
  <FormLabel>Shift Overview</FormLabel>
  <Input {...formik.getFieldProps("shift_overview")} />
  <FormErrorMessage>{formik.errors.shift_overview}</FormErrorMessage>
</FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="skills_required"
              isInvalid={
                !!(
                  formik.errors.skills_required &&
                  formik.touched.skills_required
                )
              }
            >
              <FormLabel>Skills Required</FormLabel>
              <ReactSelect<SkillOption, true>
                value={formik.values.skills_required.map((skill) => ({
                  value: skill,
                  label:
                    skills.find((option) => option.value === skill)?.label ||
                    "",
                }))}
                options={skills}
                isMulti
                onChange={(
                  selectedOptions: ReadonlyArray<SkillOption> | null
                ) => {
                  formik.setFieldValue(
                    "skills_required",
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  );
                }}
                onBlur={() => {
                  formik.setFieldTouched("skills_required", true);
                }}
                styles={customStyles}
              />
              <FormErrorMessage>
                {formik.errors.skills_required}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="position"
              isInvalid={!!formik.errors.position && formik.touched.position}
            >
              <FormLabel>Position</FormLabel>
              <Select {...formik.getFieldProps("position")}>
                {positions.map((position) => (
                  <option key={position.value} value={position.value}>
                    {position.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formik.errors.position}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="experience"
              isInvalid={
                !!formik.errors.experience && formik.touched.experience
              }
            >
              <FormLabel>Experience Required</FormLabel>
              <Select {...formik.getFieldProps("experience")}>
                {experiences.map((experience) => (
                  <option key={experience.value} value={experience.value}>
                    {experience.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formik.errors.experience}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="start_date"
              isInvalid={
                !!formik.errors.start_date && formik.touched.start_date
              }
            >
              <FormLabel>Start Date</FormLabel>
              <Input type="date" {...formik.getFieldProps("start_date")} />
              <FormErrorMessage>{formik.errors.start_date}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="start_time"
              isInvalid={
                !!formik.errors.start_time && formik.touched.start_time
              }
            >
              <FormLabel>Start Time</FormLabel>
              <Input type="time" {...formik.getFieldProps("start_time")} />
              <FormErrorMessage>{formik.errors.start_time}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="shift_hours"
              isInvalid={
                !!formik.errors.shift_hours && formik.touched.shift_hours
              }
            >
              <FormLabel>Hours</FormLabel>
              <Select {...formik.getFieldProps("shift_hours")}>
                {hours.map((hour) => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formik.errors.shift_hours}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="shift_pay"
              isInvalid={!!formik.errors.shift_pay && formik.touched.shift_pay}
            >
              <FormLabel>Total Pay</FormLabel>
              <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" {...formik.getFieldProps("shift_pay")} />
              </InputGroup>
              <FormErrorMessage>{formik.errors.shift_pay}</FormErrorMessage>
            </FormControl>
          </Stack>
        </Stack>
        <Divider />
        <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
          <Button 
              onClick={(e) => {
                console.log("Submit button clicked");
                console.log("Form values:", formik.values);
                const form = e.currentTarget.closest("form");
                if (form) {
                  form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                }
              }}
              variant="primary" 
              bg="blue">
            Save
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
