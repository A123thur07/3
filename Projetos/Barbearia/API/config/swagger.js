const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API FinanControl',
        description: 'Documentação da API do sistema FinanControl',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'localhost'
        }
    ],
    tags: [
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Serviços', description: 'Operações relacionadas aos serviços' },
        { name: 'Agendamentos', description: 'Operações relacionadas aos agendamentos' }
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Usuarios' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: "Recebe nome, email, senha para cadastrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}": {
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
                            example: {
                                nome: "Ricardo Santos",
                                email: "ricardo5@sesisp.com",
                                senha: "senhaAtualizada",
                                tipo: "cliente"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover Usuário',
                description: 'Remove usuário existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },

        "/servicos": {
            get: {
                tags: ["Serviços"],
                summary: "Listar todos os serviços",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Servicos' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Serviços'],
                summary: 'Cadastrar novo serviço',
                description: "Recebe nome, preço e descricao para cadastrar novo serviço",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Servico"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Serviço cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/servicos/{id_servico}": {
            put: {
                tags: ['Serviços'],
                summary: 'Atualizar todos os dados do serviço',
                description: 'Atualiza todos os dados de um serviço existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID do serviço a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Servico" },
                            example: {
                                nome: "corte de cabelo",
                                preco: 100.00,
                                descricao: "corte de cabelo masculino",
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Serviço atualizado com sucesso!"
                    },
                    404: {
                        description: "Serviço não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Serviço não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Serviços'],
                summary: 'Remover Serviço',
                description: 'Remove serviço existente pelo ID',
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID do serviço a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Serviço removido com sucesso!"
                    },
                    404: {
                        description: "Serviço não encontrado    ",
                        content: {
                            "application/json": {
                                example: { message: "Serviço não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },
        },


        "/agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar todos os agendamentos",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Agendamento' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Agendamentos'],
                summary: 'Cadastrar novo agendamento',
                description: "Recebe data_hora, id_cliente, id_servico e id_barbeiro para cadastrar novo agendamento",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Agendamento"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Agendamento cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/agendamentos/{id_agendamento}": {
            put: {
                tags: ['Agendamentos'],
                summary: 'Atualizar todos os dados do agendamento',
                description: 'Atualiza todos os dados de um agendamento existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        description: "ID do agendamento a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Agendamento" },
                            example: {
                                "id_cliente": 2,
                                "id_servico": 2,
                                "data_hora": "2023-12-01 14:00:00",
                                "status": "confirmado"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Agendamento atualizado com sucesso!"
                    },
                    404: {
                        description: "Agendamento não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Agendamento não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Agendamentos'],
                summary: 'Remover Agendamento',
                description: 'Remove agendamento existente pelo ID',
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        description: "ID do agendamento a ser removido ",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Transação removida com sucesso!"
                    },
                    404: {
                        description: "Transação não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Transação não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },
        },


    },
    components: {
        schemas: {
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id_usuario: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" },
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo: { type: "string", example: "cliente" }
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha", "tipo"],
                properties: {
                    nome: { type: "string", example: "Nina" },
                    email: { type: "string", example: "nina@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo: { type: "string", example: "cliente" }
                }
            },

            Listar_Servicos: {
                type: 'object',
                properties: {
                    id_servico: { type: "integer", example: 1 },
                    nome: { type: "string", example: "corte de cabelo" },
                    preco: { type: "number", example: 50.00 },
                    descricao: { type: "string", example: "Corte de cabelo masculino" }
                }
            },
            Cadastrar_Servico: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "corte de cabelo" },
                    descricao: { type: "string", example: "Corte de cabelo masculino" },
                    preco: { type: "number", example: 50.00 }
                }
            },
            Atualizar_Servico: {
                type: 'object',
                required: ["nome", "descricao", "preco"],
                properties: {
                    nome: { type: "string", example: "corte de cabelo" },
                    descricao: { type: "string", example: "Corte de cabelo masculino" },
                    preco: { type: "number", example: 50.00 }
                }
            },

            Listar_Agendamentos: {
                type: 'object',
                properties: {
                    id_agendamento: { type: "integer", example: 1 },
                    id_cliente: { type: "integer", example: 2 },
                    id_servico: { type: "integer", example: 2 },
                    data_hora: { type: "string", example: "2023-10-10T10:00:00" },
                    status: { type: "string", example: "cancelado" }
                }
            },
            Cadastrar_Agendamento: {
                type: 'object',
                properties: {
                    id_cliente: { type: "integer", example: 2 },
                    id_servico: { type: "integer", example: 2 },
                    data_hora: { type: "string", example: "2023-10-10T10:00:00" },
                    status: { type: "string", example: "cancelado" }
                }
            },
            Atualizar_Agendamento: {
                type: 'object',
                required: ["id_cliente", "id_servico", "data_hora", "status"],
                properties: {
                    id_cliente: { type: "integer", example: 2 },
                    id_servico: { type: "integer", example: 2 },
                    data_hora: { type: "string", example: "2023-10-10T10:00:00" },
                    status: { type: "string", example: "cancelado" }


                }
            },
        }
    }
}
export default documentacao