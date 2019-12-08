interface IValidationResponse {
    isValid: boolean,
    messages: string[]
}

export class ProblemRequestValidator {
    static validate = (params: {day?: string, part?:string}): IValidationResponse => {

        const { day, part } = params;

        const isDayValid = /^day[0-9]*$/.test(day || "");
        const isPartValid = /^part[0-9]+([and]*[0-9])*$/.test(part || "");

        const validationMessages: string[] = [];

        if (!isDayValid)
            validationMessages.push("Day parameter is invalid");

        if (!isPartValid)
            validationMessages.push("Part parameter is invalid");

        return {
            isValid: isDayValid && isPartValid,
            messages: validationMessages
        }
    }
}
