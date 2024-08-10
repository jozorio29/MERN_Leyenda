import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form as BootstrapForm, Button, Alert, Container, Row, Col, Card } from "react-bootstrap";
import Swal from 'sweetalert2';

const PetForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        petName: '',
        petType: '',
        petDescription: '',
        petSkill1: '',
        petSkill2: '',
        petSkill3: '',
        petLike: 0,
    });
    const [errorsResponse, setErrorsResponse] = useState();

    const obtenerUnaMascota = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/pet/${id}`);
            setPet({ ...data.pet });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) obtenerUnaMascota();
    }, [id]);

    const petSchema = Yup.object().shape({
        petName: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .required('Debe ingresar el nombre de la mascota'),
        petType: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .required('Debe ingresar el Tipo de mascota (cat, dog, bird...)'),
        petDescription: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .required('Debe ingresar una descripción de la mascota'),
        petSkill1: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres'),
        petSkill2: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres'),
        petSkill3: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres'),
    });

    const crearNuevaMascota = async (values) => {
        try {
            const nuevaMascota = id ? 
                await axios.put(`http://localhost:8080/api/pet/${id}`, values) : 
                await axios.post('http://localhost:8080/api/pet', values);
    

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Mascota guardada con exito!",
                showConfirmButton: false,
                timer: 1500
            });
    
            navigate("/mascotas");
        } catch (error) {
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message || 'Something went wrong!',
                });
            } else {
                console.log(error);
          
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    };

    return (
        <Container className="my-4">
            <Card>
                <Card.Body>
                    <Row className="mb-4">
                        <Col md={8}>
                            <h1>Pet Shelter</h1>
                            <h2>Know a pet needing a home?</h2>
                            <p>{id ? `Editando a ${pet.petName}` : <span className="text-muted fst-italic">Añadir nueva mascota</span>}</p>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end align-items-start">
                            <Button onClick={() => navigate("/mascotas")} variant="info">
                                Back to home
                            </Button>
                        </Col>
                    </Row>
                    <Formik
                        enableReinitialize
                        initialValues={pet}
                        validationSchema={petSchema}
                        onSubmit={crearNuevaMascota}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label htmlFor="petName">Nombre de la mascota:</BootstrapForm.Label>
                                    <Field name="petName" as={BootstrapForm.Control} />
                                    {errors.petName && touched.petName && (
                                        <Alert variant="danger">{errors.petName}</Alert>
                                    )}
                                    {errorsResponse?.petName && (
                                        <Alert variant="danger">{errorsResponse.petName.message}</Alert>
                                    )}
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label htmlFor="petType">Tipo de mascota:</BootstrapForm.Label>
                                    <Field name="petType" as={BootstrapForm.Control} />
                                    {errors.petType && touched.petType && (
                                        <Alert variant="danger">{errors.petType}</Alert>
                                    )}
                                    {errorsResponse?.petType && (
                                        <Alert variant="danger">{errorsResponse.petType.message}</Alert>
                                    )}
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label htmlFor="petDescription">Descripción de la mascota:</BootstrapForm.Label>
                                    <Field name="petDescription" as={BootstrapForm.Control} />
                                    {errors.petDescription && touched.petDescription && (
                                        <Alert variant="danger">{errors.petDescription}</Alert>
                                    )}
                                    {errorsResponse?.petDescription && (
                                        <Alert variant="danger">{errorsResponse.petDescription.message}</Alert>
                                    )}
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label htmlFor="petSkill1">Habilidad 1:</BootstrapForm.Label>
                                    <Field name="petSkill1" as={BootstrapForm.Control} />
                                    {errors.petSkill1 && touched.petSkill1 && (
                                        <Alert variant="danger">{errors.petSkill1}</Alert>
                                    )}
                                    {errorsResponse?.petSkill1 && (
                                        <Alert variant="danger">{errorsResponse.petSkill1.message}</Alert>
                                    )}
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label htmlFor="petSkill2">Habilidad 2:</BootstrapForm.Label>
                                    <Field name="petSkill2" as={BootstrapForm.Control} />
                                    {errors.petSkill2 && touched.petSkill2 && (
                                        <Alert variant="danger">{errors.petSkill2}</Alert>
                                    )}
                                    {errorsResponse?.petSkill2 && (
                                        <Alert variant="danger">{errorsResponse.petSkill2.message}</Alert>
                                    )}
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label htmlFor="petSkill3">Habilidad 3:</BootstrapForm.Label>
                                    <Field name="petSkill3" as={BootstrapForm.Control} />
                                    {errors.petSkill3 && touched.petSkill3 && (
                                        <Alert variant="danger">{errors.petSkill3}</Alert>
                                    )}
                                    {errorsResponse?.petSkill3 && (
                                        <Alert variant="danger">{errorsResponse.petSkill3.message}</Alert>
                                    )}
                                </BootstrapForm.Group>

                                <Button variant="primary" type="submit">
                                    {id ? "Update Pet" : "Create Pet"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PetForm;
