-- DDL

CREATE TABLE USUARIOS(
    id_usuario INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(10) NOT NULL,
    ativo BOOLEAN default true
);

CREATE TABLE EVENTOS_CURSOS(
    id_evento_curso INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
	data_hora_inicio TIMESTAMP NOT NULL,
	data_hora_fim TIMESTAMP NOT NULL,
	necessita_inscricao BOOLEAN default false,
	banner text,
	local VARCHAR(150) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    ativo BOOLEAN default true
);

CREATE TABLE INSCRICOES(
    id_inscricao INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    data_nascimento DATE NOT NULL,
    estado_civil VARCHAR(100) NOT NULL,
    CPF VARCHAR(25) NOT NULL,
    RG VARCHAR(25) NOT NULL,
    id_evento_curso INT NOT NULL,
	FOREIGN KEY (id_evento_curso) REFERENCES EVENTOS_CURSOS(id_evento_curso)
);

CREATE TABLE DOCUMENTOS(
    id_documento INTEGER PRIMARY KEY,
    caminho text NOT NULL,
    tipo VARCHAR(100) NOT NULL,
	id_inscricao int,
	FOREIGN KEY (id_inscricao) REFERENCES INSCRICOES (id_inscricao)
);