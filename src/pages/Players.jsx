import React, {useState} from 'react'
import { useCollection } from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFireStore'
import AlertBox from '../components/alert-box'
import {
	Box,
	Heading,
	Flex,
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react'

const Players = () => {
    const { documents, error } = useCollection('contenders')
    const { addDocument, response } = useFirestore('contenders')

    // form field values
    const [name, setName] = useState('')
    const [sex, setSex] = useState('')

    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        const theUser = {
            name,
            sex
        }
        
        console.log(theUser);
        await addDocument(theUser)
        console.log('u did it', response);
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
                <Flex flexDirection="column" width="50%">
                <Heading>PLAYERS</Heading>
                {documents && 
                    <Box>
                        {documents.map(player => 
                            <Flex key={player.id} width="20rem" background="gray.500" margin="0.5rem" padding="0.5rem" justifyContent="space-between">
                                <Box>{player.name}</Box>
                                <Box>{player.sex}</Box>
                            </Flex>
                        )}
                    </Box>
                }
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
                        <FormLabel>
                        <span>Sex</span>
                        <Input
                            required 
                            type="sex" 
                            onChange={(e) => setSex(e.target.value)}
                            value={sex}
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
            </Box>
    </Box>
  )
}

export default Players