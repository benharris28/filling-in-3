import { useEffect, useState } from "react";
import { Box, Grid, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { CheckboxFilter } from './CheckboxFilter'
import { ColorPicker } from './ColorPicker'
import { PriceRangePicker } from './PriceRangePicker'
import { SizePicker } from './SizePicker'
import { SortBySelect } from './SortBySelect'
import { MobileFilter } from './MobileFilter'
import { pinkFilters, breadcrumbData, colorFilter, genderFilter, sizeFilter, skillsFilter, roleFilter, cityFilter } from '../../data/data'
import ShiftCardList, { Shift } from "./ShiftCardList";
import CenteredPageHeader from "../CenteredPageHeader";
import { getShifts } from "../../services/airtable";


interface Filters {
  skills: string[];
  role: string;
  brand: string[];
  cities: string[];
  // add more filter types here
}

export default function ShiftList() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  const [filters, setFilters] = useState<Filters>({
    skills: [],
    role: '',
    brand: [],
    cities: []
    // initialize more filter types here
  });

  useEffect(() => {
    async function fetchData() {
      const shiftsData = await getShifts() as Shift[];
      setShifts(shiftsData);
    }

    fetchData();
  }, []);

  const handleFilterChange = (filterType: string, selectedOptions: string | string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions],
    }));
  }

  console.log(filters);

return (
  <Box
    width='100%'
    maxW="1200px"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <CenteredPageHeader short_title="Shifts" title="Available Shifts" subtitle="These are the available shifts" />
    
    <Box mt={{ base: '8', md: '16' }}>
      <Grid templateColumns={{ base: '1fr', md: '240px 1fr' }} gap="14">
        <Box>
        <Stack spacing="10" maxW="240px" display={{ base: 'none', md: 'flex' }} position="sticky" top="100px">
          <CheckboxFilter 
            spacing="3" 
            options={skillsFilter.options} 
            label="Skills" 
            onChange={(selectedOptions) => handleFilterChange("skills", selectedOptions)}
            selectedOptions={filters.skills}
            />
            <CheckboxFilter 
            spacing="3" 
            options={cityFilter.options} 
            label="City" 
            onChange={(selectedOptions) => handleFilterChange("cities", selectedOptions)}
            selectedOptions={filters.cities}
            />
          <SizePicker 
            {...roleFilter} 
            label="Role" 
            onChange={(selectedOptions) => handleFilterChange('role', selectedOptions)}
            />
          
         
          <Stack spacing="5">
            <label>Price range</label>
            <PriceRangePicker defaultValue={[6, 40]} />
            <HStack spacing="6">
              <Input type="number" placeholder="$500" />
              <Input type="number" placeholder="$1,000" />
            </HStack>
          </Stack>
        </Stack>
        </Box>

        <Box>
          <Stack
            spacing={{ base: '6', md: '4' }}
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="flex-start"
            width="full"
          >
            <Stack direction={{ base: 'column', md: 'row' }} align="baseline">
              <Heading size="md" fontSize="2xl">
                Available Shifts
              </Heading>
              
            </Stack>
            <MobileFilter filters={filters} handleFilterChange={handleFilterChange} />
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Text flexShrink={0} color="gray.500" fontSize="sm">
                Sort by
              </Text>
              <SortBySelect />
            </HStack>
          </Stack>
          <Box mt="6" borderWidth="2px" minH="480px" rounded="xl" borderStyle="dashed">
            <ShiftCardList shifts={shifts} filters={filters} />
          </Box>
        </Box>
      </Grid>
    </Box>
  </Box>
)
    }