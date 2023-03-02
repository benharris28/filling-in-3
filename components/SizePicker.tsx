import {
    FormControl,
    FormControlProps,
    FormLabel,
    HStack,
    useRadioGroup,
    UseRadioGroupProps,
    Wrap,
  WrapItem,
  } from '@chakra-ui/react'
  import { SizePickerButton } from './SizePickerButton'
  
  interface Option {
    label: string
    value: string
  }
  
  interface SizePickerProps extends UseRadioGroupProps {
    options: Option[]
  rootProps?: FormControlProps
  hideLabel?: boolean
  label?: string
  onChange?: (selectedValue: string) => void;
  }
  
  export const SizePicker = (props: SizePickerProps) => {
    const { options, rootProps, hideLabel, label, ...rest } = props
    const { getRadioProps, getRootProps, value } = useRadioGroup(rest)
    const selectedOption = options.find((option) => option.value == value)

    const handleRoleChange = (selectedValue: string) => {
      if (onchange) {
        onchange(selectedValue);
      }
    };
  
    return (
      <FormControl {...rootProps}>
        {!hideLabel && (
          <FormLabel fontSize="sm" fontWeight="medium">
            {label ?? `Size: ${selectedOption?.label}`}
          </FormLabel>
        )}
        <Wrap {...getRootProps()} spacing={2}>
          {options.map((option) => (
            <WrapItem key={option.value}>
              <SizePickerButton
                label={option.label}
                {...getRadioProps({ value: option.value })}
           
              />
            </WrapItem>
          ))}
        </Wrap>
      </FormControl>
    );
  }