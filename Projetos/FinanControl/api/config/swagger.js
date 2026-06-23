const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API FinanControl',
        description: 'Documentação da API do sistema FinanControl',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'localhost'
        },
        {
            url: 'https://api-arthurfsantos16-5215s-projects.vercel.app',
            description: 'Vercel'
        }
    ],
    tags: [
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Categorias', description: 'Operações relacionadas às categorias' },
        { name: 'Subcategorias', description: 'Operações relacionadas às subcategorias' },
        { name: 'Transações', description: 'Operações relacionadas às transações' },
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
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
                security: [
                    {
                        bearerAuth: []
                    }
                ],
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
                security: [
                    {
                        bearerAuth: []
                    }
                ],
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
                                senha: "senhaAtualizada"
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
                security: [
                    {
                        bearerAuth: []
                    }
                ],
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

        "/categorias": {
            get: {
                tags: ["Categorias"],
                summary: "Listar todas as categorias",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Categorias' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Categorias'],
                summary: 'Cadastrar nova categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Recebe nome, descricao, cor, icone, tipo e ativo para cadastrar nova categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Categoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias/{id_categoria}": {
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar todos os dados da categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: 'Atualiza todos os dados de uma categoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser atualizada",
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
                            schema: { $ref: "#/components/schemas/Atualizar_Categoria" },
                            example: {
                                nome: "Ricardo Santos",
                                descricao: "ricardo5@sesisp.com",
                                cor: "senhaAtualizada",
                                icone: "iconAtualizado",
                                tipo: "S",
                                ativo: true
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Categoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover Categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: 'Remove categoria existente pelo ID',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser removida ",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Categoria removida com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Categoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },
        },

        "/subcategorias": {
            get: {
                tags: ["Subcategorias"],
                summary: "Listar todas as subcategorias",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Subcategorias' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Subcategorias'],
                summary: 'Cadastrar nova subcategoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Recebe nome, ativo e id_categoria para cadastrar nova subcategoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Subcategoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Subcategoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/subcategorias/{id_subcategoria}": {
            put: {
                tags: ['Subcategorias'],
                summary: 'Atualizar todos os dados da subcategoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: 'Atualiza todos os dados de uma subcategoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser atualizada",
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
                            schema: { $ref: "#/components/schemas/Atualizar_Subcategoria" },
                            example: {
                                nome: "Alimentação",
                                ativo: true,
                                id_categoria: 1
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Categoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Subcategorias'],
                summary: 'Remover Subcategoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: 'Remove subcategoria existente pelo ID',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser removida ",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Subcategoria removida com sucesso!"
                    },
                    404: {
                        description: "Subcategoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Subcategoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },
        },

        "/transacoes": {
            get: {
                tags: ["Transações"],
                summary: "Listar todas as transações",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacao' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Transações'],
                summary: 'Cadastrar nova transação',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Recebe valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria e id_categoria para cadastrar nova transação",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Transacao"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Subcategoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/{id_transacao}": {
            put: {
                tags: ['Transações'],
                summary: 'Atualizar todos os dados da transação',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: 'Atualiza todos os dados de uma transação existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transação a ser atualizada",
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
                            schema: { $ref: "#/components/schemas/Atualizar_Transacao" },
                            example: {
                                valor: 100.00,
                                descricao: "Compra de alimentos",
                                data_vencimento: "2023-10-10",
                                data_pagamento: "2023-10-15",
                                tipo: "E",
                                id_subcategoria: 1,
                                id_categoria: 1
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Transação atualizada com sucesso!"
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
            delete: {
                tags: ['Transações'],
                summary: 'Remover Transação',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: 'Remove transação existente pelo ID',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transação a ser removida ",
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
        "/transacoes/tipo/{tipo}": {
            get: {
                tags: ["Transações"],
                summary: "Listar transações por tipo",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna uma lista de transações filtradas pelo tipo",
                parameters: [
                    {
                        name: "tipo",
                        in: "path",
                        required: true,
                        description: "Tipo da transação (E para entrada, S para saída)",
                        schema: {
                            type: "string",
                            enum: ["E", "S"],
                            example: "E"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Lista de transações por tipo",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Transacao" }
                                }
                            }
                        }
                    },
                    404: {
                        description: "Nenhuma transação encontrada para o tipo especificado"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/periodo": {

        },
        "/transacoes/agendar": {
            post: {
                tags: ["Transações"],
                summary: "Agendar compromisso unico",
                description: "Esta rota verifica se o usuário possui um registro para a mesma",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Agendar_Transacao" }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Transação agendada com sucesso"
                    },
                    409: {
                        description: "Conflito ao agendar transação"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/categoria/{id_categoria}": {
            get: {
                tags: ["Transações"],
                summary: "Listar transações por categoria",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna uma lista de transações filtradas pela categoria",
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria para filtrar as transações",
                        schema: {
                            type: "number",
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Lista de transações por categoria",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Transacao" }
                                }
                            }
                        }
                    },
                    404: {
                        description: "Nenhuma transação encontrada para o tipo especificado"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/subcategoria/{id_subcategoria}": {
            get: {
                tags: ["Transações"],
                summary: "Listar transações por subcategoria",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna uma lista de transações filtradas pela subcategoria",
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria para filtrar as transações",
                        schema: {
                            type: "number",
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Lista de transações por subcategoria",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Transacao" }
                                }
                            }
                        }
                    },
                    404: {
                        description: "Nenhuma transação encontrada para o tipo especificado"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },


        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resposta_Login"
                                }
                            }
                        }
                    },
                    400: { description: "Email e senha são obrigatorios" },
                    401: { description: "Credenciais inválidas" },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },

        "/dashboard": {
            get: {
                tags: ["Dashboard"],
                summary: "Obtém todos os dados consolidados do Dashboard",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna o resumo do mês atual, gastos por categoria, maiores despesas",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        resumoMesAtual: {
                                            type: "object",
                                            properties: {
                                                entradas: { type: "number", example: 500 },
                                                saidas: { type: "number", example: 259 },
                                                saldo: { type: "number", example: 241 },
                                            }
                                        },
                                        gastosCategorias: {
                                            type: "object",
                                            properties: {
                                                nome: { type: "string", example: "Alimentação" },
                                                total: { type: "number", example: 500 }
                                            }
                                        },
                                        resumoMaioresGastos: {
                                            type: "object",
                                            properties: {
                                                descricao: { type: "string", example: "Aluguel" },
                                                valor: { type: "number", example: 1500.00 },
                                                data: { type: "string", example: "10/052026" }
                                            }
                                        },
                                        resumoUltimasTransacoes: {
                                            type: "object",
                                            properties: {
                                                descricao: { type: "string", example: "Aluguel" },
                                                valor: { type: "number", example: 1500.00 },
                                                data: { type: "string", example: "10/052026" }
                                            }
                                        },
                                        resumoEvolucao: {
                                            type: "object",
                                            properties: {
                                                mes: { type: "string", example: "05/2025" },
                                                entradas: { type: "number", example: 1500.00 },
                                                saidas: { type: "string", example: 2000 }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            },
        }


    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: "Insira o token JWT obtido no login"
            }
        },
        schemas: {
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" }
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "admin" }
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha", "tipo_acesso"],
                properties: {
                    nome: { type: "string", example: "Nina" },
                    email: { type: "string", example: "nina@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "admin" }
                }
            },
            Listar_Categorias: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Categoria de alimentação" },
                    cor: { type: "string", example: "#FF0000" },
                    icone: { type: "string", example: "https://exemplo.com/icone.png" },
                    tipo: { type: "string", example: "S" },
                    ativo: { type: "boolean", example: true }
                }
            },
            Cadastrar_Categoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "TI" },
                    descricao: { type: "string", example: "Categoria de tecnologia" },
                    cor: { type: "string", example: "#FF0000" },
                    icone: { type: "string", example: "https://exemplo.com/icone.png" },
                    tipo: { type: "string", example: "E" },
                    ativo: { type: "boolean", example: true }
                }
            },
            Atualizar_Categoria: {
                type: 'object',
                required: ["nome", "descricao", "cor", "icone", "tipo", "ativo"],
                properties: {
                    nome: { type: "string", example: "TI" },
                    descricao: { type: "string", example: "Categoria de tecnologia" },
                    cor: { type: "string", example: "#FF0000" },
                    icone: { type: "string", example: "https://exemplo.com/icone.png" },
                    tipo: { type: "string", example: "S" },
                    ativo: { type: "boolean", example: true }
                }
            },
            Listar_Subcategorias: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Alimentação" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Cadastrar_Subcategoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "TI" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Atualizar_Subcategoria: {
                type: 'object',
                required: ["nome", "ativo", "id_categoria"],
                properties: {
                    nome: { type: "string", example: "TI" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Listar_Transacao: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 1 },
                    valor: { type: "number", example: 100.00 },
                    descricao: { type: "string", example: "Compra de alimentos" },
                    data_criacao: { type: "string", example: "2023-10-01" },
                    data_vencimento: { type: "string", example: "2023-10-10" },
                    data_pagamento: { type: "string", example: "2023-10-15" },
                    tipo: { type: "string", example: "despesa" },
                    id_subcategoria: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Cadastrar_Transacao: {
                type: 'object',
                properties: {
                    valor: { type: "numeric", example: 90.00 },
                    descricao: { type: "string", example: "Compra de alimentos" },
                    data_vencimento: { type: "string", example: "2023-10-10" },
                    data_pagamento: { type: "string", example: "2023-10-15" },
                    tipo: { type: "string", example: "S" },
                    id_subcategoria: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Atualizar_Transacao: {
                type: 'object',
                required: ["valor", "descricao", "data_vencimento", "data_pagamento", "tipo", "id_subcategoria", "id_categoria"],
                properties: {
                    valor: { type: "numeric", example: 100.00 },
                    descricao: { type: "string", example: "Compra de alimentos" },
                    data_vencimento: { type: "string", example: "2023-10-10" },
                    data_pagamento: { type: "string", example: "2023-10-15" },
                    tipo: { type: "string", example: "E" },
                    id_subcategoria: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Login_Usuario: {
                type: 'object',
                required: true,
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" }
                }
            },
            Resposta_Login: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Login realizado com sucesso'
                    },
                    token: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlJpY2FyZG8iLCJpYXQiOjE2ODg4ODQ4MDAsImV4cCI6MTY4ODg4NTcwMH0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567'
                    },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "string", example: 1 },
                            nome: { type: "string", example: "Ricardo" },
                        }
                    }
                }
            },
            Agendar_Transacao: {
                type: 'object',
                required: true,
                properties: {
                    valor: { type: "numeric", example: 100.00 },
                    descricao: { type: "string", example: "Compra de alimentos" },
                    data_vencimento: { type: "string", example: "10/10/2023" },
                    data_pagamento: { type: "string", example: "15/10/2023" },
                    tipo: { type: "string", example: "E" },
                    id_subcategoria: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 }
                }
            },

        }
    }
}
export default documentacao