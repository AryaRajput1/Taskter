import sgMail from '@sendgrid/mail'


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async ({ to, subject, html }) => {
    try {
        const msg = {
            to,
            from: 'Taskter <chauhanar89+taskter@gmail.com>',
            subject,
            html
        };

        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
}

export const EMAIL_VERIFICATION_TEMPLATE = (name, link) => `Hi, ${name}
                                                     <p>click <a href='${link}'>Link</a> to verify your email.
`

export const PASSWORD_RESET_TEMPLATE = (name, link) => `Hi, ${name}
                                                     <p>click <a href='${link}'>Link</a> to reset your password.
`