class IRepository {
  create(data) {
    throw new Error("Método 'create()' no implementado");
  }

  getById(id) {
    throw new Error("Método 'getById()' no implementado");
  }

  getAll() {
    throw new Error("Método 'getAll()' no implementado");
  }
}

export default IRepository;