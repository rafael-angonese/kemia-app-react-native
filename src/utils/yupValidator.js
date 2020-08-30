import * as Yup from 'yup';

async function yupValidator(schema, data) {
    try {
        await schema.validate(data, { abortEarly: false });

        return {};
    } catch (errors) {
        const errorMessages = {};
        if (errors instanceof Yup.ValidationError) {
            errors.inner.forEach((error) => {
                console.log(error);
                // errorMessages[error.path] = `${attribute} ${message}`
            });
        }

        return errorMessages;
    }
}

export default yupValidator;
