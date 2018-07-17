const response = {};

/**
 * Send a success response to the client
 * @param {Object} res Response object
 * @param {Object} data Data to return as response
 * @param {string} message Response message (default='Successful')
 * @param {number} status Response status (default=200)
 */
response.success = (res, data, message = 'Successful', status = 200) => {
  res.json({ message, status, data });
};

/**
 * 
 * @param {Object} res Response object
 * @param {Object} errors Error object containing error info (default={ message: 'Error occurred.' })
 * @param {number} status Response status (default=500)
 */
response.error = (res, errors = { message: 'Error occurred.' }, status = 500) => {
  res.json({ errors, status });
};

module.exports = response;