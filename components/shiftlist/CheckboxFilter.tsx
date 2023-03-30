import {
    Box,
    Checkbox,
    CheckboxGroup,
    CheckboxGroupProps,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    StackProps,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { FiSearch } from 'react-icons/fi'
  
  type CheckboxFilterProps = Omit<CheckboxGroupProps, 'onChange'> & {
    hideLabel?: boolean
    options: Array<{ label: string; value: string; count?: number }>
    label?: string
    onChange?: (value: string[]) => void
    spacing?: StackProps['spacing']
    showSearch?: boolean
    selectedOptions?: string[];
  }
  
  export const CheckboxFilter = (props: CheckboxFilterProps) => {
    const { options, label, hideLabel, spacing = '2', showSearch, selectedOptions = [], onChange, ...rest } = props

    const handleOnChange = (value: string[]) => {
      if (onChange) {
        onChange(value)
      }
    }
  
    return (
      <Stack as="fieldset" spacing={spacing}>
        {!hideLabel && (
          <FormLabel fontWeight="semibold" as="legend" mb="0">
            {label}
          </FormLabel>
        )}
        {showSearch && (
          <InputGroup size="md" pb="1">
            <Input
              placeholder="Search..."
              rounded="md"
              focusBorderColor={mode('pink.500', 'pink.200')}
            />
            <InputRightElement pointerEvents="none" color="gray.400" fontSize="lg">
              <FiSearch />
            </InputRightElement>
          </InputGroup>
        )}
        <CheckboxGroup onChange={handleOnChange} value={selectedOptions} {...rest}>
          {options.map((option) => (
            <Checkbox 
              key={option.value} 
              value={option.value}
              colorScheme="pink"
              isChecked={selectedOptions.includes(option.value)}
              >
              <span>{option.label}</span>
              {option.count != null && (
                <Box as="span" color="gray.500" fontSize="sm">
                  {' '}
                  ({option.count})
                </Box>
              )}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>
    )
  }