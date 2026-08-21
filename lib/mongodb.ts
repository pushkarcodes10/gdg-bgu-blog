import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

mongoose.set('bufferCommands', false)

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI || MONGODB_URI.includes('your_mongodb_uri')) {
    return null
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 3000, // Quick 3s timeout for connection attempt
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m
    })
  }

  try {
    cached.conn = await cached.promise
    if (mongoose.connection.readyState !== 1) {
      return null
    }
  } catch (e: any) {
    cached.promise = null
    cached.conn = null
    console.warn(`[MongoDB Info] Connection attempt failed: ${e?.message || e}. Using fallback data.`)
    return null
  }

  return cached.conn
}
