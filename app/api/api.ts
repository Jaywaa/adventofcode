import express, { Application, Request, Response } from 'express';
import { getHtmlView } from './providers/fileProvider';
import { ProblemRequestValidator as requestValidator } from './validators/problemRequestValidator';
import solutionProvider from './providers/solutionProvider';
import favicon from 'serve-favicon';

const app: Application = express();

app.use(express.json());
app.use(express.static(__dirname + '/../'));
app.use(favicon(__dirname + '/../favicon.png'));

app.get('/', (request: Request, response: Response): void => {
    const view = getHtmlView("index");

    response.sendFile(view);
});

app.get('/solutions/:day/:part', async (request: Request, response: Response) => {

    try {
        const { day, part } = request.params;

        const validationResponse = requestValidator.validate({ day, part });

        if (!validationResponse.isValid)
            throw new Error(`BadRequest: \n\t- ${validationResponse.messages.join('\n\t- ')}`);

        const solution = await solutionProvider.get(day, part);

        response.json({ status: 200, description: "ok", solution });

    } catch (error) {
        console.error(error);
        response.json({ status: 400, message: error.message });
    }
});

const PORT: any = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));