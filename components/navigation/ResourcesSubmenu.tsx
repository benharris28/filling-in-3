import {
    AspectRatio,
    Box,
    Button,
    Container,
    Icon,
    Image,
    Link,
    SimpleGrid,
    SlideFade,
    Stack,
    Text,
    UseDisclosureProps,
  } from '@chakra-ui/react'
  import { FiPlayCircle } from 'react-icons/fi'
  import { items, tutorials } from './navdata'



  
  export const ResourcesSubmenu = (props: UseDisclosureProps) => {
    const { isOpen } = props
   
  

   

    return (
      <SlideFade in={isOpen}>
        <Box bg="bg-surface" boxShadow="md" pt={{ base: '4', md: '8' }} pb="8">
          <Container>
            <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '14', lg: '16' }}>
              <SimpleGrid margin="auto" columns={{ base: 1, md: 2 }} maxW={{ lg: '2xl' }} gap={6}>
                {items.map((item, id) => (
                  <Stack key={id} spacing="3">
                   
                    <Stack>
                      {item.links.map((link, id) => (
                        <Link variant="menu" href={link.href} key={id}>
                          <Stack spacing="4" direction="row" p="3">
                            <Icon as={link.icon} boxSize="6" color="accent" />
                            <Stack spacing="1">
                              <Text fontWeight="medium">{link.title}</Text>
                              <Text fontSize="sm" color="muted">
                                {link.description}
                              </Text>
                            </Stack>
                          </Stack>
                        </Link>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </SimpleGrid>
             
            </Stack>
          </Container>
        </Box>
      </SlideFade>
    )
  }