import admin from 'firebase-admin'
import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { serviceAccount } = await import('./firebaseServiceAccountKey')

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      })
    }

    const { authorization } = req.headers
    if (!authorization) return res.status(401).send('Unauthorized')

    const token = authorization.split('Bearer ')[1]
    if (!token) return res.status(401).send('Unauthorized')

    try {
      const decodedToken = await admin.auth().verifyIdToken(token)
      req['user_id'] = decodedToken.uid
      next()
    } catch (error) {
      return res.status(401).send('Unauthorized')
    }
  }
}
