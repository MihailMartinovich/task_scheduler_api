import pick from 'lodash';
import { Board } from './../models/';
import { SUCCESS } from '../../../constants/HTTPStatuses';

class BoardController {
  static async create(ctx) {
    let newBoardData = pick(ctx.request.body, Board.createFields).value();
    newBoardData.owner = ctx.loggedUser._id;

    let { _id } = await Board.create(newBoardData);
    let board = await Board.findOneWithPublicFields({_id});
    ctx.body = {data: board};
  }

  static async update(ctx) {
    let id = ctx.params.id;
    let newBoardData = pick(ctx.request.body, Board.createFields).value();

    let updatedBoard = await Board.findByIdAndUpdate(id, { $set : newBoardData}, { new: true} );

    ctx.body = { data: updatedBoard };
  }

  static async delete(ctx) {
    let id = ctx.params.id;
    let isDeleted = await Board.remove({ _id: id });

    if(isDeleted && isDeleted.n > 0){
      ctx.status = SUCCESS;
    }
  }

  static async get(ctx) {
    let id = ctx.params.id;
    let board = await Board.findOne({ _id: id });

    ctx.body = { data: board };
  }

  static async getAll(ctx) {
    let ownerId = ctx.loggedUser._id;
    let boards = await Board.find({ owner: ownerId });

    ctx.body = {data: boards};
  }
}

export default BoardController;