export type Usuario = {
    nome: string;
    email: string;
    senha: string;
};

export const usuariosMock: Usuario[] = [
    { nome: "ariadne", email: "ariadne@gmail.com", senha: "123456" },
]