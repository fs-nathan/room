import 'dotenv/config'
const config = {
    db: {
        url: process.env.MONGO_URL,
        name: process.env.MONGO_DB
    }
}

export default config
