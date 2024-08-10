import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const PetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        petName: '',
        petType: '',
        petDescription: '',
        petSkill1: '',
        petSkill2: '',
        petSkill3:'',
        petLike: 0,
    });
    const [liked, setLiked] = useState(false); // Estado para manejar el estado del botón de "like"

    const obtenerUnaMascota = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/pet/${id}`);
            setPet(prevPet => ({
                ...data.pet,
                petLike: Number(data.pet.petLike)
            }));
            setLiked(Number(data.pet.petLike) > 0); // Configura el estado inicial del botón
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) obtenerUnaMascota();
    }, [id]);

    const eliminarMascota = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/pet/${id}`);
            navigate("/mascotas");
        } catch (error) {
            console.log("eliminarMascota error: ", error);
        }
    }

    const likePet = async () => {
        try {
            await axios.put(`http://localhost:8080/api/pet/${id}`, { petLike: pet.petLike + 1 });
            setPet(prevPet => ({
                ...prevPet,
                petLike: prevPet.petLike + 1
            }));
            setLiked(true);
        } catch (error) {
            console.log("likePet error: ", error);
        }
    };

    // Mostrar mensaje de carga si la mascota no ha sido cargada aún
    if (!pet.petName) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4 position-relative">
                        <Button 
                            variant="info" 
                            onClick={() => navigate("/mascotas")}
                            className="position-absolute top-0 end-0 m-3"
                        >
                            Back to Home
                        </Button>
                        <Card.Body>
                            <Row className="mb-4">
                                <Col className="text-center">
                                    <h1>Pet Shelter</h1>
                                    <h3>Details about: {pet.petName}</h3>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col className="text-end">
                                    <Button 
                                        variant="outline-danger" 
                                        onClick={eliminarMascota}
                                        className="me-2"
                                    >
                                        Adopt {pet.petName}
                                    </Button>
                                </Col>
                            </Row>
                            <div className="border border-dark p-3 mb-3 rounded shadow">
                                <Card.Text className="mb-2">
                                    <strong>Pet Type:</strong> {pet.petType}
                                </Card.Text>
                                <Card.Text className="mb-2">
                                    <strong>Description:</strong> {pet.petDescription}
                                </Card.Text>
                                <Card.Text className="mb-2">
                                    <strong>Skills:</strong>
                                </Card.Text>
                                <ul className="list-unstyled mb-2">
                                    <li>{pet.petSkill1}</li>
                                    <li>{pet.petSkill2}</li>
                                    <li>{pet.petSkill3}</li>
                                </ul>
                                <Row className="align-items-center">
                                    <Col>
                                        <Button
                                            variant="success"
                                            onClick={likePet}
                                            disabled={liked} // Desactiva el botón si ya ha sido clickeado
                                        >
                                            Like {pet.petName}
                                        </Button>
                                    </Col>
                                    <Col className="text-end">
                                        <span>
                                            <strong>{pet.petLike} like(s)</strong>
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PetDetails;
