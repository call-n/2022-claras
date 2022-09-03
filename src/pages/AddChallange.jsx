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

const AddChallange = () => {
    const { documents, error } = useCollection('challenges')
    const { addDocument, response } = useFirestore('challenges')

    // form field values
    const [name, setName] = useState('')
    const [points, setPoints] = useState(0)
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        const theChallenge = {
            name,
            points,
        }
        
        console.log(theChallenge);
        await addDocument(theChallenge)
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
                    <Heading>Challenges</Heading>
                    
                    <Box>
                        {documents.map(challenge => 
                            <Flex key={challenge.name} width="20rem" padding="0.5rem" justifyContent="space-between" fontWeight="bold" marginTop="1rem" marginBottom="1rem">
                                <Box>{challenge.name}</Box>
                                <Box>
                                    {challenge.points}
                                </Box>
                            </Flex>
                        )}
                    </Box>
                    
                    {error && <AlertBox status="error" message={error.message} />}
                    </Flex>
                    <Flex>
                        <form onSubmit={handleSubmit}>
                            <FormLabel>
                            <span>Challenge Name</span>
                            <Input
                                required 
                                type="text" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            </FormLabel>

                            <FormLabel>
                            <span>Points for challenge</span>
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
                            >Add Challenge</Button>
                        </form>
                        {formError && <AlertBox status="error" message={formError} />}
                    </Flex>
                </>
                }
            </Box>
    </Box>
  )
}

export default AddChallange