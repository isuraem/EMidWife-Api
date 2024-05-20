const axios = require('axios');

const mlapiService = async (req, res) => {
    // Define your payload
    const payload = {
        text: req
    };
    try {
        console.log("req>>>", req)
        // Make POST request to ML API
        const response = await axios.post('https://chat-model-423823.el.r.appspot.com/predict', payload);

        console.log('ResponseML:', response.data.Predicted_Risk_Level);

        // Return the response data
        return response.data.Predicted_Risk_Level;
    } catch (error) {
        console.error('ErrorML:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}

module.exports = { mlapiService };
