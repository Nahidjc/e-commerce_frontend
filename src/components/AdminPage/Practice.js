<Typography component="h1" variant="h5">
                                                    Add New Product
                                                </Typography>
                                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} >
                                                            <Grid item xs={6} >
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="name"
                                                                    required

                                                                    id="name"
                                                                    label="Product Name"
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    autoFocus
                                                                />
                                                            </Grid>
                                                            <Grid item xs={6} >
                                                                <TextField
                                                                    required
                                                                    label="Brand"
                                                                    onChange={(e) => setUsername(e.target.value)}
                                                                />
                                                            </Grid>
                                                        </Grid>


                                                        <Grid item xs={12} >
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label="Category"
                                                                onChange={(e) => setUsername(e.target.value)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label="Product Price"
                                                                onChange={(e) => setUsername(e.target.value)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label="Product Stock"
                                                                onChange={(e) => setUsername(e.target.value)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                id="email"
                                                                label="Email Address"
                                                                name="email"
                                                                value={email}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                autoComplete="email"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                multiline
                                                                label="Product Description"
                                                                InputProps={{
                                                                    inputComponent: TextareaAutosize,
                                                                    rows: 5
                                                                }}

                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Add Product
                                                    </Button>

                                                </Box>