import axios from 'axios';
import FormData from 'form-data';

//explantion: need this class defining critical method for upload file to send to fastapi using our model and ensure proper format
export default class Prediction {
    //initialize fast api endpoint('predict') as defined in modelapi
    constructor(){
        this.apiUrl = 'http://127.0.0.1:8000/predict/';;
    }

    async predict(imageFile){
        try {
            //format the file recieved in order to comply with what fast api expects
            const formData =  new FormData();
            //attaches the file to the request
            formData.append('file', imageFile.buffer, imageFile.originalname);
            //send the file uploaded to fast api
            const response = await axios.post(this.apiUrl, formData, {
                headers: {
                  ...formData.getHeaders(),
                },
              });
              return response.data;
        } catch (error) {
            //error handling
            console.error('Prediction error:', error.response?.data || error.message);
            throw new Error('Failed to make prediction');
        }
    }
}
