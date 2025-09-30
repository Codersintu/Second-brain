const jwt_password = "your_jwt_secret_key";
import jwt from "jsonwebtoken";
export const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header, jwt_password);
    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "u are not logged in"
        });
    }
};
//# sourceMappingURL=middleware.js.map