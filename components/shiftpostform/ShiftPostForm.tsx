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
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { skills, positions, experiences } from "./ShiftFormData";

const validationSchema = Yup.object().shape({
  clinicName: Yup.string().required("Clinic Name is required"),
  clinicCity: Yup.string().required("Clinic City is required"),
  shiftTitle: Yup.string().required("Shift Title is required"),
  shiftOverview: Yup.string().required("Shift Overview is required"),
  skillsRequired: Yup.array().min(1, "At least one skill is required"),
  position: Yup.string().required("Position is required"),
  experienceRequired: Yup.string().required("Experience Required is required"),
  startDate: Yup.date().required("Start Date is required"),
  startTime: Yup.string().required("Start Time is required"),
  hours: Yup.number().required("Hours is required"),
  totalPay: Yup.number().required("Total Pay is required"),
});

interface ShiftPostFormProps extends BoxProps {}

export const ShiftPostForm = ({ ...props }: ShiftPostFormProps) => {
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
      clinicName: "",
      clinicCity: "",
      shiftTitle: "",
      shiftOverview: "",
      skillsRequired: [],
      position: "",
      experienceRequired: "",
      startDate: "",
      startTime: "",
      hours: "",
      totalPay: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(skills);
  return (
    <Box
      as="form"
      margin="auto"
      w="100%"
      maxW={{ base: "100%", md: "xl" }}
      {...props}
    >
      <Stack
        spacing="5"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        <FormControl
          id="clinicName"
          isInvalid={!!formik.errors.clinicName && formik.touched.clinicName}
        >
          <FormLabel>Clinic Name</FormLabel>
          <Input {...formik.getFieldProps("clinicName")} />
          <FormErrorMessage>{formik.errors.clinicName}</FormErrorMessage>
        </FormControl>
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl
            id="clinicCity"
            isInvalid={!!formik.errors.clinicCity && formik.touched.clinicCity}
          >
            <FormLabel>Clinic City</FormLabel>
            <Input {...formik.getFieldProps("clinicCity")} />
            <FormErrorMessage>{formik.errors.clinicCity}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="shiftTitle"
            isInvalid={!!formik.errors.shiftTitle && formik.touched.shiftTitle}
          >
            <FormLabel>Shift Title</FormLabel>
            <Input {...formik.getFieldProps("shiftTitle")} />
            <FormErrorMessage>{formik.errors.shiftTitle}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl
            id="skillsRequired"
            isInvalid={
              !!(formik.errors.skillsRequired && formik.touched.skillsRequired)
            }
          >
            <FormLabel>Skills Required</FormLabel>
            <ReactSelect
              {...formik.getFieldProps("skillsRequired")}
              options={skills}
              isMulti
              onChange={(selectedOptions) => {
                formik.setFieldValue("skillsRequired", selectedOptions);
              }}
              onBlur={() => {
                formik.setFieldTouched("skillsRequired", true);
              }}
              styles={customStyles}
            />
            <FormErrorMessage>{formik.errors.skillsRequired}</FormErrorMessage>
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
            id="experienceRequired"
            isInvalid={
              !!formik.errors.experienceRequired &&
              formik.touched.experienceRequired
            }
          >
            <FormLabel>Experience Required</FormLabel>
            <Select {...formik.getFieldProps("experienceRequired")}>
              {experiences.map((experience) => (
                <option key={experience.value} value={experience.value}>
                  {experience.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {formik.errors.experienceRequired}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="startDate"
            isInvalid={!!formik.errors.startDate && formik.touched.startDate}
          >
            <FormLabel>Start Date</FormLabel>
            <Input type="date" {...formik.getFieldProps("startDate")} />
            <FormErrorMessage>{formik.errors.startDate}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl
            id="startTime"
            isInvalid={!!formik.errors.startTime && formik.touched.startTime}
          >
            <FormLabel>Start Time</FormLabel>
            <Input type="time" {...formik.getFieldProps("startTime")} />
            <FormErrorMessage>{formik.errors.startTime}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="hours"
            isInvalid={!!formik.errors.hours && formik.touched.hours}
          >
            <FormLabel>Hours</FormLabel>
            <Input type="number" {...formik.getFieldProps("hours")} />
            <FormErrorMessage>{formik.errors.hours}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl
            id="totalPay"
            isInvalid={!!formik.errors.totalPay && formik.touched.totalPay}
          >
            <FormLabel>Total Pay</FormLabel>
            <Input type="number" {...formik.getFieldProps("totalPay")} />
            <FormErrorMessage>{formik.errors.totalPay}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Stack>
      <Divider />
      <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
        <Button type="submit" variant="primary" bg="blue">
          Save
        </Button>
      </Flex>
    </Box>
  );
};
