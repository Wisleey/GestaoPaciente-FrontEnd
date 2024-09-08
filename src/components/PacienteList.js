import React, { useEffect, useState } from 'react';
import axios from '../api/Index'; 
import { FaPlus,  FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';

const PacienteList = () => {
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

    useEffect(() => {
        const buscarPacientes = () => {
            axios.get('/pacientes')
                .then(response => {
                    setPacientes(response.data);
                })
                .catch(error => {
                    console.error("Ocorreu um erro", error);
                });
        };
        buscarPacientes();
    }, []);

    const abrirModal = (paciente) => {
        setPacienteSelecionado(paciente);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setPacienteSelecionado(null);
    };

    const abrirModalSucesso = () => {
        setModalSucessoAberto(true);
        setTimeout(() => setModalSucessoAberto(false), 2000);
    };

    const removerPaciente = () => {
        axios.delete(`/pacientes/${pacienteSelecionado.id}`)
            .then(() => {
                setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== pacienteSelecionado.id));
                fecharModal();
                abrirModalSucesso();
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Pacientes</h2>
            <button className="btn btn-primary mb-2">
                <FaPlus className="icon" /> Adicionar Paciente
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome Completo</th>
                        <th>Telefone</th>
                        <th>Sexo</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Plano de Saúde</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.id}>
                            <td>{paciente.nome}</td>
                            <td>{paciente.telefone}</td>
                            <td>{paciente.sexo}</td>
                            <td>{paciente.cpf}</td>
                            <td>{paciente.rg}</td>
                            <td>{paciente.planoSaude || 'N/A'}</td>
                            <td>
                                <button onClick={() => abrirModal(paciente)} className="btn btn-sm btn-danger">
                                    <FaTrash className="icon" /> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalAberto}
                onRequestClose={fecharModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaExclamationTriangle className="icon" />
                    <h2>Confirmar Exclusão</h2>
                    <p>Tem certeza que deseja excluir o paciente 
                        {pacienteSelecionado && pacienteSelecionado.nome}?
                    </p>
                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                        <button onClick={removerPaciente} className="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalSucessoAberto}
                onRequestClose={() => setModalSucessoAberto(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaCheckCircle className="icon successIcon" />
                    <h2>Paciente excluído com sucesso!</h2>
                </div>
            </Modal>
        </div>
    );
};

export default PacienteList;
