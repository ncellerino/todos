class Controller {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async getAll(req, res) {
    let response = await this.service.getAll();
    if (response.error) {
      return res.status(500).send(response);
    }
    return res.status(200).send(response.data);
  }

  async insert(req, res) {
    const data = req.body;
    let response = await this.service.insert(data);
    if (response.error) return res.status(500).send(response);
    return res.status(201).send(response.data);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    let response = await this.service.update(id, data);
    return res.status(200).send(response.data);
  }

  async remove(req, res) {
    const { id } = req.params;
    await this.service.remove(id);
    return res.status(204).send();
  }
}

export default Controller;
