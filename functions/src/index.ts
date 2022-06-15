import * as cors from "cors";
import * as express from "express";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

app.post('/send', async (req, res) => {
    try {
        const { token, title, body } = req.body;
        const message = { token, notification: { title, body } };
        const response = await admin.messaging().send(message);
        functions.logger.info(response);
        return res.status(200).json({
            message: 'Notificacion enviada',
            response
        });
    } catch (error) {
        functions.logger.error(error);
        return res.status(500).json({
            message: 'Error al enviar notificacion',
            error
        });
    }
});

export const srv = functions.https.onRequest(app);