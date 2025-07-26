const Booking = require('../models/Booking');

// Create a new booking request
exports.createBooking = async (req, res) => {
    try {
        const { userId, providerId, serviceType, bookingDate } = req.body;

        // Check if provider is available (this can be added to your service provider schema)
        // For now, assume provider is available
        const newBooking = new Booking({
            userId,
            providerId,
            serviceType,
            bookingDate,
            status: 'Pending',
            paymentStatus: 'Pending',
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (err) {
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
};

// Provider accepts or rejects a booking
exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;

        // Validate status
        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update booking status
        booking.status = status;
        await booking.save();

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (err) {
        res.status(500).json({ message: 'Error updating booking status', error: err.message });
    }
};

// Payment success (placeholder logic)
exports.paymentSuccess = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update payment status
        booking.paymentStatus = 'Paid';
        await booking.save();

        res.status(200).json({ message: 'Payment success', booking });
    } catch (err) {
        res.status(500).json({ message: 'Error processing payment', error: err.message });
    }
};
