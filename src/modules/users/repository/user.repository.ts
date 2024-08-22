import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery, PipelineStage } from 'mongoose';
import { IUser } from '../../schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('UserModel') private userModel: Model<IUser>) {}

  async findOne(
    query: FilterQuery<IUser>,
    populateFields?: string[],
  ): Promise<IUser> {
    const queryBuilder = this.userModel.findOne(query).lean();

    if (populateFields?.length) {
      populateFields.forEach((field) => queryBuilder.populate(field));
    }

    return queryBuilder.exec();
  }

  async findById(id: string, populateFields?: string[]): Promise<IUser> {
    return this.findOne({ _id: id }, populateFields);
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async updateById(
    id: string,
    updateData: UpdateQuery<IUser>,
    populateFields?: string[],
  ): Promise<IUser> {
    const queryBuilder = this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean();

    if (populateFields?.length) {
      populateFields.forEach((field) => queryBuilder.populate(field));
    }

    return queryBuilder.exec();
  }

  async find(
    query: FilterQuery<IUser> = {},
    populateFields?: string[],
  ): Promise<IUser[]> {
    const queryBuilder = this.userModel.find(query).lean();

    if (populateFields?.length) {
      populateFields.forEach((field) => queryBuilder.populate(field));
    }

    return queryBuilder.exec();
  }

  async deleteById(id: string): Promise<IUser> {
    return this.userModel.findByIdAndDelete(id).lean().exec();
  }

  async aggregate(
    pipeline: PipelineStage[],
    populateFields?: string[],
  ): Promise<any[]> {
    const aggregation = this.userModel.aggregate(pipeline);

    if (populateFields?.length) {
      populateFields.forEach((field) =>
        aggregation.lookup({
          from: field,
          localField: field,
          foreignField: '_id',
          as: field,
        }),
      );
    }

    return aggregation.exec();
  }
}
