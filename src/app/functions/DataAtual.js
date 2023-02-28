const DataAtual = () => {
    const datacerta = new Date(Date.now());
    const datahoje = `${datacerta.getFullYear()}-${
        datacerta.getMonth() + 1
    }-${datacerta.getDate()}`;

    return datahoje;
};

export default DataAtual();
