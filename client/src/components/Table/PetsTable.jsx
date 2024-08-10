import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

const PetsTable = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);

    const obtenerMascotas = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/pet');
            if (Array.isArray(data)) {
                setPets(data);
            } else {
                console.error("Unexpected data format:", data);
                setPets([]); // Inicializa con un array vacío si el formato no es el esperado
            }
        } catch (error) {
            console.error("Error fetching pets:", error);
            setError("Error fetching pets"); // Maneja el error adecuadamente
        }
    };

    useEffect(() => {
        obtenerMascotas();
    }, []);

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="p-4">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <h1>Pet Shelter</h1>
                                <h2>These pets are looking for a good home</h2>
                            </div>
                            <Button variant="info" onClick={() => navigate("/crear-mascota")}>
                                Add a Pet to the shelter
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            {error ? (
                                <Card.Text className="text-center text-danger">
                                    {error}
                                </Card.Text>
                            ) : pets.length > 0 ? (
                                <div className="table-responsive">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pets.map((pet, idx) => (
                                                <tr key={pet._id}>
                                                    <td>{pet.petName}</td>
                                                    <td>{pet.petType}</td>
                                                    <td>
                                                        <Button
                                                            variant="outline-info"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => navigate(`/detalle-mascota/${pet._id}`)}
                                                        >
                                                            Details
                                                        </Button>
                                                        <Button
                                                            variant="outline-info"
                                                            size="sm"
                                                            onClick={() => navigate(`/crear-mascota/${pet._id}`)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <Card.Text className="text-center">
                                    No hay mascotas registradas
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PetsTable;
