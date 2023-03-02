import { useEffect, useState } from "react";
import { Box, Grid, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { CheckboxFilter } from './CheckboxFilter'
import { ColorPicker } from './ColorPicker'
import { PriceRangePicker } from './PriceRangePicker'
import { ProductBreadcrumb } from './ProductBreadcrumb'
import { SizePicker } from './SizePicker'
import { SortBySelect } from './SortBySelect'
import { MobileFilter } from './MobileFilter'
import { pinkFilters, breadcrumbData, colorFilter, genderFilter, sizeFilter, skillsFilter, roleFilter } from '../data/data'
import ShiftCardList, { Shift } from "./ShiftCardList";
import { getShifts } from "../services/airtable";

interface Filters {
  skills: string[];
  role: string;
  brand: string[];
  // add more filter types here
}

export default function ShiftList() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  const [filters, setFilters] = useState<Filters>({
    skills: [],
    role: '',
    brand: [],
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
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <ProductBreadcrumb data={breadcrumbData} />
    <Box mt={{ base: '8', md: '16' }}>
      <Grid templateColumns={{ base: '1fr', md: '240px 1fr' }} gap="14">
        <Stack spacing="10" maxW="240px" display={{ base: 'none', md: 'flex' }}>
          <CheckboxFilter 
            spacing="3" 
            options={skillsFilter.options} 
            label="Skills" 
            onChange={(selectedOptions) => handleFilterChange("skills", selectedOptions)}
            />
          <SizePicker 
            {...roleFilter} 
            label="Role" 
            onChange={(selectedOptions) => handleFilterChange('role', selectedOptions)}
            />
          <ColorPicker {...colorFilter} label="Color" />
          <CheckboxFilter 
            spacing="3" 
            options={pinkFilters.options} 
            label="Brand" 
            showSearch 
            onChange={(selectedOptions) => handleFilterChange("brand", selectedOptions)}
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

        <Box width="full">
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
              <Text color="gray.500">(300 products)</Text>
            </Stack>
            <MobileFilter />
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