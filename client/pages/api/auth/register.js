import {register} from '../../../middleware/services/userService'
import axios from "axios";
const sendConfirmationMail = async (user) => {
    try{
        const resp = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_API_KEY}&email=${user?.email}`)
            .then(response => {
                console.log(response?.data);
                return response?.data
            })
            .catch(error => {
                console.log(error);
            });
        if(resp?.deliverability === 'DELIVERABLE' && resp?.is_valid_format?.value) { //email id is deliverable
            //send registration confirmation to user email id
            let payload = {
                "service_id": process.env.EMAILJS_SERVICE_ID,
                "template_id": process.env.EMAILJS_TEMPLATE_ID,
                "user_id": process.env.EMAILJS_PUBLIC_KEY,
                "accessToken": process.env.EMAILJS_PRIVATE_KEY,
                "template_params": {
                    "to_name": user?.username || user?.name,
                    "reply_to": user?.email,
                    "from_name": "My Recipes App",
                    "message": `You can login to the application with this url: ${process.env.NEXT_SERVER_BASE_URL}`
                }
            };
            const {data} = await axios.post(`https://api.emailjs.com/api/v1.0/email/send?accessToken=${process.env.EMAILJS_PRIVATE_KEY}`,payload)
            console.log('----Email Confirmation Response----', data)
        }
    }catch (e) {
        console.error('Error in sending registration confirmation email: ',e?.message)
    }
}

export default async function handler (req, res) {
    const response = await register(req.body)
    if(!response?.error) {
        sendConfirmationMail(req.body)
    }
    return res.json(response)
}