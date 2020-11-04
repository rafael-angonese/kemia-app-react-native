const handlingErros = (error) => {
    // Error 😨 🚀
    const errorMessages = {};
    if (error.response) {
        const { data, status } = error.response;

        console.log(data);
        console.log(status);
        if (status === 401) {
            errorMessages.error = 'Não autorizado';
        }
        if (status === 500) {
            errorMessages.error = 'Erro interno do servidor';
        }

        data?.errors?.forEach((item) => {
            console.log(item);
        });
    } else if (error.request) {
        errorMessages.error = 'Sem conexeção';
      } else {
        errorMessages.error = 'nao foi possivel formar a request';
      }

    return errorMessages;
};

export default handlingErros;
