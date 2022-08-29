import React, { useState, useEffect } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFireStore'
import AlertBox from '../components/alert-box'
import Select from 'react-select'
import InputColor from 'react-input-color';
import {
	Box,
	Heading,
	Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
} from '@chakra-ui/react'

const Teams = () => {
    const { documents, error } = useCollection('teams')
    const contenders = useCollection('contenders')
    const { addDocument, response } = useFirestore('teams')

    // form field values
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [member1, setMember1] = useState('')
    const [member2, setMember2] = useState('')
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if(contenders.documents) {
            setUsers(contenders.documents.map(user => {
                return { value: {...user, id: user.id}, label: user.name }
            }))
        }
    }, [contenders.documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        const members = [member1,member2]
        const activities = [{activity: '5 Shots', points: 0}]
        const points = 0

        const theTeam = {
            name,
            members,
            points,
            color,
            activities
        }
        
        console.log(theTeam);
        await addDocument(theTeam)
    }

    console.log(documents);

  return (
    <Box paddingBlock="clamp(3.75rem, 3.21rem + 2.68vw, 5.625rem)">
            <Box 
                marginInline="auto"
                width="clamp(16rem, 95vw, 85rem)"
                paddingInline="clamp(1.375rem, 1.2rem + 0.89vw, 2rem)"
                position="relative"
                display="Flex"
                flexDirection="column"
            >
                {documents && 
                <>
                    <Flex flexDirection="column">
                    <Heading>Teams</Heading>
                    
                    <Box>
                        {documents.map(team => 
                            <Flex key={team.name} backgroundColor={team.color.hex} width="20rem" padding="0.5rem" justifyContent="space-between" fontWeight="bold" marginTop="1rem" marginBottom="1rem">
                                <Box>{team.name}</Box>
                                <Box>
                                    {team.members[0].label} / {team.members[1].label}
                                </Box>
                            </Flex>
                        )}
                    </Box>
                    
                    {error && <AlertBox status="error" message={error.message} />}
                    </Flex>
                    <Flex>
                        <form onSubmit={handleSubmit}>
                            <FormLabel>
                            <span>Name</span>
                            <Input
                                required 
                                type="text" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            </FormLabel>
                            <FormLabel display="flex" justifyContent="space-between">
                            <span>Color:</span>
                            <InputColor
                                initialValue="#5e72e4"
                                onChange={setColor}
                                placement="right"
                            />
                            </FormLabel>

                            <FormLabel color="black">
                                <Heading color="white" fontSize="18px">Player 1</Heading>
                                <Select
                                    onChange={(option) => setMember1(option)}
                                    options={users}
                                />
                            </FormLabel>

                            <FormLabel color="black">
                                <Heading color="white" fontSize="18px">Player 2</Heading>
                                <Select
                                    onChange={(option) => setMember2(option)}
                                    options={users}
                                />
                            </FormLabel>
                            
                            <Button
                                mt={4}
                                colorScheme='teal'
                                type='submit'
                            >Add player</Button>
                        </form>
                        {formError && <AlertBox status="error" message={formError} />}
                    </Flex>
                </>
                }
            </Box>
    </Box>
  )
}

export default Teams