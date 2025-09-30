import mongoose from "mongoose";
declare const Link: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    hash: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    hash: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    hash: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    hash: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    hash: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    hash: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Link;
//# sourceMappingURL=Link.d.ts.map