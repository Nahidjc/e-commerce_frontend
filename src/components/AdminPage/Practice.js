<FormContainer>
    <Typography component="h1" variant="h5">
        Update User Information
    </Typography>
    <Form >

        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control

                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control

                type='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='isadmin'>
            <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
            >
            </Form.Check>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Update
        </Button>

    </Form>

</ FormContainer>