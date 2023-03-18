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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { skills, positions, experiences } from './ShiftFormData';

const validationSchema = Yup.object().shape({
  clinicName: Yup.string().required('Clinic Name is required'),
  clinicCity: Yup.string().required('Clinic City is required'),
  shiftTitle: Yup.string().required('Shift Title is required'),
  shiftOverview: Yup.string().required('Shift Overview is required'),
  skillsRequired: Yup.array().min(1, 'At least one skill is required'),
  position: Yup.string().required('Position is required'),
  experienceRequired: Yup.string().required('Experience Required is required'),
  startDate: Yup.date().required('Start Date is required'),
  startTime: Yup.string().required('Start Time is required'),
  hours: Yup.number().required('Hours is required'),
  totalPay: Yup.number().required('Total Pay is required'),
});

interface ShiftPostFormProps extends BoxProps {
  
}

  export const ShiftPostForm = ({ ...props }: ShiftPostFormProps) => {
    
    const formik = useFormik({
      initialValues: {
        clinicName: '',
        clinicCity: '',
        shiftTitle: '',
        shiftOverview: '',
        skillsRequired: [],
        position: '',
        experienceRequired: '',
        startDate: '',
        startTime: '',
        hours: '',
        totalPay: '',
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

    console.log(skills) 
    return (

    <Box as="form" margin='auto' w='100%' maxW={{ base: '100%', md: 'xl'}}  {...props}>
      <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
       
      <FormControl id="clinicName" isInvalid={!!formik.errors.clinicName && formik.touched.clinicName}>
        <FormLabel>Clinic Name</FormLabel>
        <Input {...formik.getFieldProps('clinicName')} />
        <FormErrorMessage>{formik.errors.clinicName}</FormErrorMessage>
      </FormControl>
        <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
        <FormControl id="clinicCity" isInvalid={!!formik.errors.clinicCity && formik.touched.clinicCity}>
        <FormLabel>Clinic City</FormLabel>
        <Input {...formik.getFieldProps('clinicCity')} />
        <FormErrorMessage>{formik.errors.clinicCity}</FormErrorMessage>
      </FormControl>
      <FormControl id="shiftTitle" isInvalid={!!formik.errors.shiftTitle && formik.touched.shiftTitle}>
        <FormLabel>Shift Title</FormLabel>
        <Input {...formik.getFieldProps('shiftTitle')} />
        <FormErrorMessage>{formik.errors.shiftTitle}</FormErrorMessage>
      </FormControl>
        
        </Stack>
        <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input defaultValue="Berlin" />
          </FormControl>
          <FormControl id="skillsRequired" isInvalid={!!(formik.errors.skillsRequired && formik.touched.skillsRequired && formik.touched.skillsRequired.length > 0)}>
        <FormLabel>Skills Required</FormLabel>
        <CheckboxGroup {...formik.getFieldProps('skillsRequired')}>
          <Stack direction={{ base: 'column', md: 'row' }}>
            {skills.map((skill) => (
              <Checkbox key={skill.value} value={skill.value}>
                {skill.label}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        <FormErrorMessage>{formik.errors.skillsRequired}</FormErrorMessage>
      </FormControl>
          <FormControl id="zip">
            <FormLabel>ZIP/ Postal Code</FormLabel>
            <Input defaultValue="10961" />
          </FormControl>
        </Stack>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Stack>
      <Divider />
      <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
        <Button type="submit" variant="primary" bg='blue'>
          Save
        </Button>
      </Flex>
    </Box>
  )
    }