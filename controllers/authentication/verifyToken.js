import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (token == null || token == undefined) {
        return res.status(403).send("Forbidden")
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send()
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(403).send()
    }

}