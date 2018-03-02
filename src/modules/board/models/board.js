import mongoose, {Schema} from 'mongoose';

const BoardSchema = new Schema({
    title: {
      type: String,
      required: 'Task title is required'
    },
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }],
    owner: {
      type: Schema.Types.ObjectId,
      required: 'Owner is required',
      ref: 'User'
    }
  }, {
    timestamps: true
  }
);

BoardSchema.statics.createFields = ['title'];

BoardSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({__v: 0, createdAt: 0, updatedAt: 0});
};

export default mongoose.model('board', BoardSchema);