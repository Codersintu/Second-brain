import mongoose from "mongoose";
declare const User: mongoose.Model<{
    username: string;
    password: string;
    email: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
    email: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    username: string;
    password: string;
    email: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password: string;
    email: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    username: string;
    password: string;
    email: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    username: string;
    password: string;
    email: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=Auth.d.ts.map