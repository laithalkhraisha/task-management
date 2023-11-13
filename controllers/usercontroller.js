const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    try {
        const { name,email, password } = req.body;

      
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new userModel({ name, email,password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.read = async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedData = await userModel.findOneAndUpdate(
            { _id: req.query.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedData = await userModel.findByIdAndDelete(req.query.id);
        res.status(200).json(deletedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
     
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            
            const token = generateToken(user);
            const userId=user._id;

            res.status(200).json({ message: 'Login successful', user, token,userId });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


function generateToken(user) {
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    return token;
}
