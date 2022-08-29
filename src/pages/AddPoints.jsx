import React, { useState, useEffect } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFireStore'
import AlertBox from '../components/alert-box'
import Select from 'react-select'
import {
	Box,
	Heading,
	Flex,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react'

const AddPoints = () => {
    const { documents, error } = useCollection('teams')
    const { updateDocument, response } = useFirestore('teams')

    // form field values
    const [teams, setTeams] = useState([])
    const [activity, setActivity] = useState('')
    const [team, setTeam] = useState('')
    const [points, setPoints] = useState(0)
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if(documents) {
            setTeams(documents.map(team => {
                return { value: {...team, id: team.id}, label: team.name }
            }))
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        const theActivity = {
            activity: activity, 
            points: points,
        }

        const numberCheck = team.value.points+Number(points)

        const UpdatedTeam = {
            points: numberCheck,
            activities: theActivity,
        }

        await updateDocument(team.value.id, UpdatedTeam)
        alert('den gick igenom')
    }

  return (
    <Box paddingBlock="clamp(3.75rem, 3.21rem + 2.68vw, 5.625rem)">
            <Box 
                marginInline="auto"
                width="clamp(16rem, 95vw, 85rem)"
                paddingInline="clamp(1.375rem, 1.2rem + 0.89vw, 2rem)"
                position="relative"
                display="Flex"
            >
                {documents && 
                <Flex>
                    <form onSubmit={handleSubmit}>
                        <Heading marginBottom="1rem">Lägg till poäng</Heading>
                        <FormLabel color="black">
                            <Heading color="white" fontSize="18px">Team</Heading>
                            <Select
                                onChange={(option) => setTeam(option)}
                                options={teams}
                            />
                        </FormLabel>
                        
                        <FormLabel>
                        <span>Aktivitet</span>
                        <Input
                            required 
                            type="text" 
                            onChange={(e) => setActivity(e.target.value)}
                            value={activity}
                        />
                        </FormLabel>

                        <FormLabel>
                        <span>Poäng</span>
                        <Input
                            required 
                            type="number" 
                            onChange={(e) => setPoints(e.target.value)}
                            value={points}
                        />
                        </FormLabel>

                        <Button
                            mt={4}
                            colorScheme='teal'
                            type='submit'
                        >Add Points</Button>
                    </form>
                    {formError && <AlertBox status="error" message={formError} />}
                </Flex>
                }
            </Box>
    </Box>
  )
}

export default AddPoints