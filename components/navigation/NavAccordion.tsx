import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    HStack,
    Icon,
    Link,
    Text,
  } from '@chakra-ui/react'
  import {
    FiAlertOctagon,
    FiBarChart,
    FiBook,
    FiBookOpen,
    FiBriefcase,
    FiCompass,
    FiHome,
    FiLock,
    FiPackage,
    FiPenTool,
  } from 'react-icons/fi'
  import { ElementType, ReactNode } from 'react'
  import NextLink from 'next/link'
  
  
  type NavLinkProps = {
    href: string
    icon: ElementType
    onClickMenu?: VoidFunction
    children: ReactNode
  }
  
  const NavLink = (props: NavLinkProps) => {
    const { href, icon, children, onClickMenu } = props
    return (
      <NextLink href={href} scroll={false}>
        <HStack onClick={onClickMenu} py="3" spacing="3" cursor="pointer">
          <Icon color="accent" as={icon} fontSize="xl" />
          <Text fontWeight="medium">{children}</Text>
        </HStack>
      </NextLink>
    )
  }
  
  
  
  export const NavAccordion = ({ onClickMenu }: { onClickMenu: VoidFunction }) => {
    const links = [
        { icon: FiCompass, label: 'Home', href: '#' },
        { icon: FiBook, label: 'Shifts', href: "/shifts" },
       

    ]

    return (
      
         
            
            <Box>
              {links.map((item, index) => (
                <NavLink key={index} href={item.href} icon={item.icon} onClickMenu={onClickMenu}>
                  {item.label}
                </NavLink>
              ))}
            </Box>
         
        
      
   
    )
  }