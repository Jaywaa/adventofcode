import express, {Application, Request, Response } from 'express';
import { getHtmlView } from '@providers/fileProvider';
import { ProblemRequestValidator as requestValidator } from '@validators/problemRequestValidator';
import part1 from '@solutions/day_1/part_1';

const app: Application = express();

app.use(express.json());

app.get('/', (request: Request, response: Response): void => {
    const view = getHtmlView("index");
    
    response.sendFile(view);
});

app.get('/problems/:day-:part', (request: Request, response: Response) => {
    
    const validationResponse = requestValidator.validate(request.params);
    
    if (!validationResponse.isValid)
        throw new Error(`BadRequest: \n\t- ${validationResponse.messages.join('\n\t- ')}`);
    
    response.json({message: part1()});
});

const PORT: any = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))