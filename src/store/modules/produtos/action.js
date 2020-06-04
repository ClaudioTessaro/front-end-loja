export function updateProdutoRequest(id) {
  return {
    type: '@produto/UPDATE_PRODUTO_REQUEST',
    id,
  };
}

export function tipoProdutoSuccess(produto) {
  return {
    type: '@produto/UPDATE_TIPO_PRODUTO_SUCCESS',
    produto,
  };
}
