# Use a imagem oficial do Go como base, especificando a versão 1.22.5
FROM golang:1.22.5 AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o go.mod e o go.sum para o diretório de trabalho
COPY go.mod go.sum ./

# Baixe as dependências
RUN go mod download

# Copie o código da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN go build -o /main .

# Exponha a porta que a aplicação irá rodar (ajuste conforme necessário)
EXPOSE 3333

# Especifique o comando para rodar a aplicação
CMD ["/main"]
