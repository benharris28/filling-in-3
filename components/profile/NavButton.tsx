import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react'

interface NavButtonProps extends ButtonProps {
  icon: As
  label: string
  isSelected?: boolean
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, isSelected, ...buttonProps } = props
  return (
    <Button 
      variant="ghost" 
      justifyContent="start" 
      aria-current={isSelected ? 'page' : undefined}
      {...buttonProps}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  )
}