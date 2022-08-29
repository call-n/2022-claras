import { useCollection } from '../hooks/useCollection'
import {
	Box,
	Heading,
	Image,
    Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react'
import AlertBox from '../components/alert-box'

const HomePage = () => {
    const { documents, error } = useCollection('teams')

	return (
		<Box paddingBlock="clamp(3.75rem, 3.21rem + 2.68vw, 5.625rem)">
            <Box 
                marginInline="auto"
                width="clamp(16rem, 95vw, 85rem)"
                paddingInline=".1rem"
                position="relative"
            >
                <Heading>SCOREBOARD</Heading>
                {!documents && 'loading...'}
                {documents && 
                    <Accordion allowToggle>
                        {documents.sort((a, b) => {return b.points - a.points}).map((team, i) => (
                            <AccordionItem key={team.id} background="rgba(0, 0, 0, 0.3)" border="none" marginBottom="1rem" marginTop="1rem" borderRadius="10px">
                                <AccordionButton display="flex" justifyContent="space-between" paddingLeft=".5rem">
                                    <Flex textAlign='left' fontWeight="bold" fontSize="20px">
                                        <Box background="#FFE5F4" padding="0.5rem 1rem 0.5rem 1rem" color="#CC0078" borderRadius="10px" marginRight="5px">{i+1}</Box>
                                        <Box background="#C7F5EB" padding="0.5rem 1rem 0.5rem 1rem" color="#0E8161" borderRadius="10px">{team.points}</Box>
                                        <Flex alignItems="center" paddingLeft="1rem" fontSize="18px" color={team.color.hex}>{team.name.toUpperCase()}</Flex>
                                    </Flex>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel display="flex" pb={4} flexDirection="row">
                                    <Flex flexDirection="column" background="#fff" color="black" padding="0.5rem 1rem 0.5rem 1rem" borderRadius="10px" fontWeight="bold">
                                        {team.members.map(player => <div key={player.label}>{player.label}</div>)}
                                    </Flex>
                                    <Flex background="red" width="100%" padding="0.5rem 1rem 0.5rem 1rem" marginLeft=".5rem" borderRadius="10px" background="#C7F5EB" color="#0E8161" fontWeight="bold" flexDirection="column">
                                        <Box>Challange: {team?.activities.activity}</Box>
                                        <Box>Poäng: +{team?.activities.points}</Box>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                }
                {error && <AlertBox status="error" message={error.message} />}
			</Box>
		</Box>
	)
}

export default HomePage