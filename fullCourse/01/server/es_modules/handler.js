let i = 0;

module.exports = function handler (req, res)  {
    i++
    res.end('Hello world!' + i)
};
