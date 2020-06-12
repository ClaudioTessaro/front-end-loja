<Tab>
  <table className="table">
    <caption>Lista dos Produtos Comprados</caption>
    <thead>
      <tr>
        <th scope="col">Nome do cliente</th>
        <th scope="col">Nome do Produto</th>
        <th scope="col">Quantidade do Produto Comprado</th>
        <th scope="col">Data da compra</th>
        <th scope="col">Valor de Venda</th>
        <th scope="col">Status</th>
        <th scope="col">Editar</th>
        <th scope="col">Excluir</th>
      </tr>
    </thead>
    <tbody>
      {listaProdutos.map(item => (
        <tr key={item.id}>
          <td>{item.nomeCliente}</td>
          <td>{item.nomeProduto}</td>
          <td>{item.quantidadeDeCompra}</td>
          <td>{item.dataDaCompra}</td>
          <td>{item.valorVenda}</td>
          <td>{item.status}</td>

          <td>
            <button type="button">
              <BsPencil size={20} />
            </button>
          </td>
          <td>
            <button type="button">
              <BsFillTrashFill size={20} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</Tab>;

useEffect(() => {
  async function handleCli() {
    const cliente = await api.get('cliente');
    setListaProdutos(cliente.data);
  }
  handleCli();
}, [listaProdutos, autoCompleteCliente]);

import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
