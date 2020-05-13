import mongoose from "mongoose";
import logger from "../tools/logger";

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async remove(id) {
    try {
      let item = this.model.findByIdAndDelete(id);
      if (!item) {
        return {
          error: true,
          message: "item not found"
        };
      } else {
        return {
          error: false,
          data: item
        };
      }
    } catch (errors) {
      return {
        error: true,
        errors
      };
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        data: item
      };
    } catch (errors) {
      return {
        error: true,
        errors
      };
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          data: item
        };
      }
    } catch (errors) {
      logger.error("error saving item ", data);
      return {
        error: true,
        errors
      };
    }
  }

  async getAll(query) {
    let { skip, limit } = query;

    skip = skip ? new Number(skip) : 0;
    limit = limit ? new Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    if (query._id) {
      try {
        query._id = mongoose.mongo.ObjectId(query._id);
      } catch (err) {
        logger.err("not able to generate mongoose id with content", query._id);
      }
    }

    try {
      let items = await this.model
        .query(query)
        .skip(skip)
        .limit(limit);

      let total = this.model.count();

      return {
        error: false,
        data: items,
        total
      };
    } catch (errors) {
      return {
        error: true,
        errors
      };
    }
  }
}

export default Service;
